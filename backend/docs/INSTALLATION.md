# KIRSI Backend Installation & Quickstart Manual

This manual guides you through installing, configuring, and executing the Express + MongoDB MVC backend for the KIRSI Farmer Platform.

---

## 1. Prerequisites
Ensure you have the following installed on your machine:
- **Node.js** (v18.x or higher recommended)
- **NPM** (packaged with Node.js)
- **MongoDB** (Local Community Server running on `mongodb://localhost:27017` or a MongoDB Atlas cloud URI)

---

## 2. Directory Setup
Navigate to your backend directory in your terminal:
```bash
cd backend
```

---

## 3. Package Installation
Install the required dependencies listed in `package.json`:
```bash
npm install
```

---

## 4. Configuration
Create a `.env` file in the root of the `backend/` directory (you can copy the template from `.env.example`):
```bash
cp .env.example .env
```

Configure your environment variables inside the `.env` file:
* Set `MONGO_URI` to your local connection string (`mongodb://localhost:27017/kirsi`) or your cloud Atlas connection URI.
* Change `JWT_SECRET` to a secure random string key.
* Adjust `PORT` to another listening port if port `5000` is occupied.

---

## 5. Execution Modes

### Development Mode (with hot-reloading)
Runs the server utilizing `nodemon` to watch and reload on file edits:
```bash
npm run dev
```

### Production Mode
Runs the server with standard Node process execution:
```bash
npm start
```

On successful startup, you will see the console log output:
```
🟢 MongoDB Connected: localhost:27017
🚀 Server running in development mode on port 5000
```
The application will automatically verify/create the `backend/uploads/` local directory to store Multer files.

---

## 6. Geospatial Coordinates Note
MongoDB requires coordinates to be stored in **longitude-first** sequence within GeoJSON arrays:
`[longitude, latitude]`

This is handled automatically by Mongoose pre-save middlewares on the **User**, **Crop**, **Tool**, **Animal**, and **Mechanic** schemas. When you list latitude/longitude values on request body forms, Mongoose formats the location point fields correctly before committing to disk.
