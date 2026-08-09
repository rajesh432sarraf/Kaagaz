# 📂 Kaagaz — Smart Personal Document Administration

**Kaagaz** is a premium, offline-first personal document vault designed to help users securely organize, view, and track critical life documents. With a modern, responsive interface and advanced expiry-tracking algorithms, Kaagaz ensures you are always prepared for audits, renewals, and daily transactions.

---

## ✨ Key Features

- 🔒 **Local & Private Vault:** Security-focused architecture designed to store files locally in your browser. Zero cloud tracking.
- 📆 **Smart Expiry Tracking:** Computes validity periods for cards (Aadhaar, License, Insurance, etc.) and color-codes them (Valid, Expiring Soon, Critical, Expired).
- 🏆 **Personal Readiness Index:** Interactive dashboard calculator that measures your general preparedness based on document presence.
- 🎨 **Premium Glassmorphic Design:** Harmonious dark & ivory color palettes (`amoled-ui`) with custom paper/parchment background textures.
- 📁 **Structured Categories:** Easily tag documents into categories like Identity, Travel, Vehicle, Insurance, Health, Property, or Finance.
- 👤 **JWT Authentication:** Secure user signup and login to maintain personal document records.

---

## 🛠️ Tech Stack

- **Frontend:** React, Vite, Tailwind CSS, Lucide React, React Router Dom
- **Backend:** Node.js, Express, MongoDB (Mongoose), JWT, Multer
- **Deployment:** Render (Live Production Backend)

---

## 📂 Project Structure

```
Kaagaz/
├── backend/
│   ├── src/
│   │   ├── config/          # Database configuration
│   │   ├── middleware/      # Authentication & Multer upload middleware
│   │   ├── models/          # Mongoose database models (User, Document)
│   │   ├── routes/          # API endpoint routes (Auth, Documents)
│   │   └── server.js        # Main Express server entry point
│   ├── uploads/             # Locally uploaded document assets
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── assets/          # Logo images and custom backgrounds
    │   ├── components/      # Reusable UI elements (Sidebar, StatCard, etc.)
    │   ├── context/         # React Auth context provider
    │   ├── pages/           # Application pages (Landing, Dashboard, Login, etc.)
    │   ├── services/        # API communication layer (api.js)
    │   └── index.css        # Custom styles and glassmorphism definitions
    ├── vite.config.js       # Vite bundler configuration
    └── package.json
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB installed locally OR a MongoDB Atlas cloud database URI

### 1. Backend Setup
1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend/` directory:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   CLIENT_ORIGIN=http://localhost:5173
   ```
4. Start the server in development mode:
   ```bash
   npm run dev
   ```

### 2. Frontend Setup
1. Navigate to the frontend folder:
   ```bash
   cd ../frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `frontend/` directory (for local development, you can omit this or point to localhost):
   ```env
   VITE_API_BASE_URL=http://localhost:5000/api
   ```
4. Start the Vite development server:
   ```bash
   npm run dev
   ```
5. Open your browser and navigate to `http://localhost:5173`.

---

## 🌐 Production Deployment

- **Frontend Web Application is live at:** `https://kaagaz-frontend.onrender.com`

### Frontend Production Environment Configuration
For hosting the frontend (e.g. on Render or custom static host), configure `frontend/.env` with the production backend endpoint:
```env
VITE_API_BASE_URL=https://kaagaz-backend.onrender.com/api
```

To compile and package the frontend for production build:
```bash
cd frontend
npm run build
```
This will compile all React assets into a highly optimized, minified `dist/` directory ready for deployment.

---

## 👤 Developer Profile

- **Created by:** Rajesh Sarraf
- **Email:** [sarrafrajesh432@gmail.com](mailto:sarrafrajesh432@gmail.com)
- **GitHub:** [rajesh432sarraf](https://github.com/rajesh432sarraf)

