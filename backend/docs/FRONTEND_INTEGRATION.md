# KIRSI - Frontend to Backend Integration Manual

This guide describes how to connect the React + Vite frontend of the **KIRSI** platform with the newly created Node.js MVC backend.

---

## 1. CORS & Dev Server Proxy Configuration
To avoid CORS issues during local development, configure a Vite proxy in your React frontend.

Update your **`vite.config.js`** file (located in the `kirsi/` frontend folder) to include a proxy option:

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false
      },
      '/uploads': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false
      }
    }
  }
})
```

By configuring this proxy:
* Any client fetch request directed to `/api/auth/login` or `/api/crops` will be automatically forwarded to `http://localhost:5000/api/auth/login` or `http://localhost:5000/api/crops`.
* Static assets uploaded via Multer (served at `http://localhost:5000/uploads/...`) will be accessible in image tags via relative paths (e.g. `<img src={crop.images[0]} />`).

---

## 2. Setting Up Session Credentials (JWT & Cookies)
The backend returns a signed JSON Web Token (JWT) in the response payload AND automatically sets it as an HTTP-only cookie named `token`.

If you are using **Axios** in your frontend:
1. Enable `withCredentials` globally so the browser automatically stores and transmits the authentication cookies on every request:
   ```javascript
   import axios from 'axios';
   
   axios.defaults.baseURL = '/api';
   axios.defaults.withCredentials = true;
   ```
2. If you are using standard **Fetch API**:
   Always pass `credentials: 'include'` inside your fetch options block:
   ```javascript
   const response = await fetch('/api/crops/nearby?latitude=18.5&longitude=73.8', {
     method: 'GET',
     credentials: 'include'
   });
   ```

If you prefer to transmit JWT tokens in Request Headers:
* Extract the `token` string returned on successful `/api/auth/login` or `/api/auth/register` responses.
* Store it in `localStorage` or context.
* Attach it to the Authorization header of subsequent requests:
  ```javascript
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
  ```

---

## 3. Image Upload Handling (Multipart/Form-Data)
When sending profile images or marketplace listing assets (which are files), standard JSON headers must **not** be set. Use the browser `FormData` API to construct requests:

```javascript
const submitListing = async (event) => {
  event.preventDefault();
  
  const formData = new FormData();
  formData.append('cropName', cropName);
  formData.append('category', category);
  formData.append('price', price);
  formData.append('quantity', quantity);
  formData.append('unit', unit);
  formData.append('address', address);
  formData.append('latitude', coords.latitude);
  formData.append('longitude', coords.longitude);
  
  // Append files (e.g. from an HTML input: type="file")
  const fileInput = document.querySelector('#crop-image-input');
  if (fileInput.files.length > 0) {
    for (let i = 0; i < fileInput.files.length; i++) {
      formData.append('images', fileInput.files[i]);
    }
  }

  const response = await fetch('/api/crops', {
    method: 'POST',
    body: formData, // Browser automatically sets Content-Type to multipart/form-data
    credentials: 'include'
  });
};
```

---

## 4. Querying Location-Aware (Nearby) Data
To hook the frontend lists with the proximity-sorted backend endpoints, retrieve the coordinate values from your global context and request nearby endpoints:

```javascript
import { useLocationContext } from '../../context/LocationContext';

const CropMarketplace = () => {
  const { coords } = useLocationContext();
  const [crops, setCrops] = useState([]);
  
  useEffect(() => {
    const fetchNearby = async () => {
      // Pass coordinates to nearby endpoint
      const res = await fetch(`/api/crops/nearby?latitude=${coords.latitude}&longitude=${coords.longitude}`);
      const payload = await res.json();
      if (payload.success) {
        setCrops(payload.data); // data is pre-sorted nearest-first
      }
    };
    
    if (coords.latitude && coords.longitude) {
      fetchNearby();
    }
  }, [coords]);
  
  return (
    // Render sorted list showing crop.distanceText (e.g. "3.5 km away")
  );
};
```
This is fully compatible with the existing `LocationContext` coordinates logic!
