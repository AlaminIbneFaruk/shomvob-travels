# 🌍 Tourism Management System

A modern full-stack tourism management platform that simplifies tour booking, tour guide collaboration, and administrative oversight — all in one place.

---

## 🔑 Admin Credentials

* **Username:** [admin@tms.com](mailto:admin@tms.com)
* **Password:** Admin\@123

> ⚠️ These credentials are for demonstration purposes only. Do not use them in production.

---

## 🔗 Live Website

👉 [Visit the Live Site](https://your-tourism-management.vercel.app)

---

## 🚀 Key Features

* 🔐 **Authentication System:**
  Secure JWT-based login, Google OAuth, password recovery, and logout functionality.

* 📦 **Tour Package Booking:**
  Tourists can browse, filter, and book curated travel packages with just a few clicks.

* 🧑‍✈️ **Tour Guide Management:**
  Tourists select guides; guides accept/reject bookings and manage their assigned tours.

* 🖼️ **User Stories Section:**
  Tourists and guides can share travel experiences and images.

* 💳 **Stripe Payment Integration:**
  Secure and seamless booking payments with transaction tracking.

* 📊 **Admin Dashboard:**
  Full control panel for managing users, guides, packages, stories, and analytics.

* 🧠 **Role-Based Dashboards:**
  Unique views and features for Tourist, Guide, and Admin.

* 🧾 **Booking Status Tracking:**
  Tourists monitor booking statuses: Pending, Accepted, Rejected, In Review.

* 🧲 **Admin Analytics:**
  Dashboard insights: payments, users, guides, packages, and stories count.

* 📱 **Responsive + Animated UI:**
  Tailored for all screen sizes with Framer Motion animations.

* 🔍 **Pagination & Filtering:**
  Admin tables include 10-row pagination for efficient navigation.

---

## 🧰 Tech Stack

* **Frontend:** React, Tailwind CSS, Framer Motion, Firebase Auth, Stripe
* **Backend:** Node.js, Express.js, MongoDB Atlas
* **Deployment:** Vercel (Frontend), Render/Heroku (Backend)

---

## ⚙️ How to Install Locally

### 🗓️ Prerequisites

* Node.js (v18+)
* MongoDB Atlas account
* Firebase project with enabled authentication
* Stripe account
* Git

---

### 🚀 Clone the Repository

```bash
git clone https://github.com/yourusername/tourism-management-system.git
cd tourism-management-system
```

---

### 📂 Setup Frontend

```bash
cd client
npm install
```

Create a `.env` file inside the `client` directory:

```env
VITE_API_BASE_URL=http://localhost:5000
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
```

To start the frontend:

```bash
npm run dev
```

---

### 🛠️ Setup Backend

```bash
cd server
npm install
```

Create a `.env` file inside the `server` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
```

To start the backend:

```bash
npm run dev
```

---

### ✅ Final Steps

* Make sure both frontend (`http://localhost:5173`) and backend (`http://localhost:5000`) are running.
* Test the full flow: register/login → book tour → select guide → pay → track status.

---

## 🤝 Contributions

Pull requests are welcome. For major changes, open an issue to discuss proposed changes first.

---

© 2025 Tourism Management System — All rights reserved.
