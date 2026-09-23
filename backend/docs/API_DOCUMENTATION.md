# KIRSI - Backend API Reference Manual

This document details the REST API specifications, model properties, response formats, and proximity parameters.

- **Base URL**: `http://localhost:5000`
- **Architecture**: MVC (Model-View-Controller)
- **Database Engine**: MongoDB (2dsphere geospatial indices enabled)
- **Response Format**: Clean JSON envelope

---

## 1. Mongoose Schema Definitions

### User Model (`User.js`)
Stores account credentials, profile settings, and geolocation coords.

| Field Name | Data Type | Properties | Description |
| :--- | :--- | :--- | :--- |
| `name` | `String` | Required | User's full name |
| `email` | `String` | Unique, Required | Contact email address |
| `phone` | `String` | Unique, Required | 10-digit Indian phone number |
| `password` | `String` | Required, Hashed | Account password (bcrypt) |
| `role` | `String` | Enum, Default: 'Farmer' | Role: Farmer, Buyer, Seller, Mechanic, Veterinarian, Admin |
| `address` | `String` | Optional | Line address details |
| `state` | `String` | Optional | State of residence |
| `district` | `String` | Optional | District region |
| `village` | `String` | Optional | Village locality |
| `pincode` | `String` | Optional | Postal zip code |
| `latitude` | `Number` | Optional | Coords latitude |
| `longitude` | `Number` | Optional | Coords longitude |
| `location` | `Object` | GeoJSON Point | `{ type: "Point", coordinates: [longitude, latitude] }` |
| `profileImage`| `String` | Default | Path URL to avatar |

---

### Crop Model (`Crop.js`)
Product items listed by farmers in the marketplace.

| Field | Type | Options | Desc |
| :--- | :--- | :--- | :--- |
| `cropName` | `String` | Required | Name of the harvested crop |
| `category` | `String` | Required | e.g. Wheat, Rice, Cotton, Pulses |
| `quantity` | `String` | Required | Stock quantity (e.g. 500) |
| `unit` | `String` | Required | Measurement unit (kg, quintal, ton) |
| `price` | `String` | Required | Selling quote (e.g. ₹2,200/quintal) |
| `description`| `String` | Optional | Details of harvest and soil |
| `images` | `[String]` | Default: `[]` | Multer uploaded listing images |
| `sellerId` | `ObjectId` | Ref: 'User' | Ref to listing creator |
| `location` | `Object` | GeoJSON Point | `2dsphere` index location point |
| `address` | `String` | Required | Delivery/Pickup address |
| `status` | `String` | Enum | Available, Sold |

---

### Tool Model (`Tool.js`)
Farm machinery listed for rent or purchase.

| Field | Type | Options | Desc |
| :--- | :--- | :--- | :--- |
| `toolName` | `String` | Required | Name of machinery |
| `category` | `String` | Required | Rotavator, Tractor, Ploughs, etc. |
| `buyOrSell` | `String` | Enum | buy, sell, rent |
| `price` | `String` | Required | Buy/Rental price |
| `owner` | `ObjectId` | Ref: 'User' | Ref to owner profile |
| `location` | `Object` | GeoJSON Point | Location coordinate point |
| `address` | `String` | Required | Location address |

---

### Animal Model (`Animal.js`)
Livestock listed in the animals trading panel.

| Field | Type | Options | Desc |
| :--- | :--- | :--- | :--- |
| `animalType` | `String` | Required | e.g. Cow, Buffalo, Goat |
| `breed` | `String` | Required | Sahiwal, Murrah, Sirohi, etc. |
| `age` | `String` | Required | Animal age (e.g. 2 years) |
| `price` | `String` | Required | Listing price |
| `seller` | `ObjectId` | Ref: 'User' | Ref to seller profile |
| `location` | `Object` | GeoJSON Point | Location coordinate point |
| `address` | `String` | Required | Location address |

---

### Mechanic Model (`Mechanic.js`)
Service center directory for heavy machinery maintenance.

| Field | Type | Options | Desc |
| :--- | :--- | :--- | :--- |
| `name` | `String` | Required | Mechanic's name |
| `shopName` | `String` | Required | Name of repair workshop |
| `phone` | `String` | Required | Shop contact number |
| `services` | `[String]` | Default | Services offered |
| `location` | `Object` | GeoJSON Point | Location coordinate point |
| `rating` | `Number` | Default: `4.0` | Rating score |
| `availability`| `Boolean` | Default: `true` | Availability status |

---

## 2. API Endpoints Table

### Authentication API `/api/auth`
| Method | Route | Middleware | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/register` | Multer Upload | Create user profile & upload avatar |
| `POST` | `/login` | Rate Limiter | Validate credentials & set cookies |
| `GET` | `/logout` | - | Clear cookie token sessions |
| `GET` | `/me` | Protect | Get profile of logged user |
| `PUT` | `/me` | Protect, Upload | Edit profile information |
| `POST` | `/forgot-password`| - | Generate mock password recovery token |
| `POST` | `/reset-password/:token`| - | Reset password using valid token |

### Marketplace & Service APIs
| Resource | Method | Route | Middleware | Desc |
| :--- | :--- | :--- | :--- | :--- |
| **Crops** | `GET` | `/api/crops` | - | Query all crops |
| | `GET` | `/api/crops/nearby`| - | Proximity search nearest crops |
| | `GET` | `/api/crops/:id` | - | Fetch single crop detail |
| | `POST`| `/api/crops` | Protect, Upload | List a new crop |
| | `PUT` | `/api/crops/:id` | Protect, Upload | Update listed crop |
| | `DELETE`| `/api/crops/:id` | Protect | Delete crop listing |
| **Tools** | `GET` | `/api/tools` | - | Query all tools |
| | `GET` | `/api/tools/nearby`| - | Proximity search nearest tools |
| | `POST`| `/api/tools` | Protect, Upload | List new tool |
| | `PUT` | `/api/tools/:id` | Protect, Upload | Update tool details |
| | `DELETE`| `/api/tools/:id` | Protect | Delete tool listing |
| **Animals**| `GET` | `/api/animals` | - | Query animal directory |
| | `GET` | `/api/animals/nearby`| - | Proximity search livestock |
| | `POST`| `/api/animals` | Protect, Upload | List animal for sale |
| | `PUT` | `/api/animals/:id` | Protect, Upload | Update animal details |
| | `DELETE`| `/api/animals/:id` | Protect | Delete animal listing |
| **Mechanics**|`GET` | `/api/mechanics` | - | Query mechanic services |
| | `GET` | `/api/mechanics/nearby`| - | Proximity search repair shops |
| | `POST`| `/api/mechanics` | Protect | Register new mechanic |
| | `PUT` | `/api/mechanics/:id` | Protect | Update mechanic details |
| | `DELETE`| `/api/mechanics/:id` | Protect | Delete mechanic listing |

---

## 3. GeoJSON Proximity Queries
All `/nearby` endpoints execute high-performance spherical searches using the `$near` operator:
```javascript
const maxDistanceInMeters = 50 * 1000; // 50km
const results = await Model.find({
  location: {
    $near: {
      $geometry: {
        type: "Point",
        coordinates: [userLongitude, userLatitude]
      },
      $maxDistance: maxDistanceInMeters
    }
  }
});
```
* **Calculated Distance**: Response payloads contain mapped properties `distanceValue` (numerical km) and `distanceText` (string representation, e.g. `"4.2 km away"`).
