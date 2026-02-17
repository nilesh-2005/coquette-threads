# 🎀 Coquette Threads

> A modern, aesthetic e-commerce platform built with the MERN stack (MongoDB, Express, React/Next.js, Node.js).

**Coquette Threads** is a fully functional e-commerce application designed with a focus on visual aesthetics and user experience. It features a complete shopping flow from product browsing to checkout, robust user authentication, and a powerful admin dashboard for managing the catalog.

[**View Live Demo**](https://coquette-threads.vercel.app/) (*Replace with actual link*)

---

## ✨ Features

### 🛍️ Client Side
*   **Responsive & Aesthetic UI:** Built with **Tailwind CSS v4** and **GSAP** animations for a premium feel.
*   **Product Catalog:** Advanced filtering, sorting, and categorization.
*   **Smart Cart:** Persistent shopping cart with real-time updates.
*   **User Accounts:** Secure registration, login, and profile management.
*   **Order Tracking:** Users can view their order history and status.

### 🛡️ Admin Side
*   **Dashboard:** Overview of sales, orders, and products.
*   **Product Management:** Create, update, and delete products with image uploads.
*   **Order Management:** Process orders and update shipping statuses.
*   **User Management:** View detailed customer information.

---

## 🛠️ Tech Stack

### Frontend
*   **Framework:** [Next.js 16](https://nextjs.org/) (React)
*   **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
*   **Animations:** [GSAP](https://greensock.com/gsap/)
*   **Icons:** [Lucide React](https://lucide.dev/) & [Heroicons](https://heroicons.com/)
*   **State Management:** React Context API
*   **HTTP Client:** Axios

### Backend
*   **Runtime:** [Node.js](https://nodejs.org/)
*   **Framework:** [Express.js](https://expressjs.com/)
*   **Database:** [MongoDB](https://www.mongodb.com/) (Mongoose ODM)
*   **Authentication:** JWT (JSON Web Tokens)
*   **Security:** Helmet, CORS, Rate Limiting, Bcryptjs

---

## 📂 Folder Structure

```bash
coquette-threads/
├── backend/                # Node.js + Express API
│   ├── seed/               # Database seeder scripts
│   ├── src/
│   │   ├── controllers/    # Request logic
│   │   ├── middlewares/    # Auth & Error handling
│   │   ├── models/         # Mongoose Schemas (User, Product, Order)
│   │   ├── routes/         # API Route definitions
│   │   └── utils/          # Helper functions
│   ├── server.js           # Entry point
│   └── package.json
│
├── frontend/               # Next.js Application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── context/        # Global state (Auth, Cart)
│   │   ├── lib/            # Utilities & API configuration
│   │   ├── pages/          # Application routes
│   │   ├── styles/         # Global styles
│   │   └── middleware.js   # Next.js middleware
│   └── package.json
│
└── package.json            # Root configuration
```

---

## 🚀 Getting Started

### Prerequisites
*   Node.js (v18+ recommended)
*   MongoDB Atlas Account (or local MongoDB)

### 1. Clone the Repository
```bash
git clone https://github.com/nilesh-2005/coquette-threads.git
cd coquette-threads
```

### 2. Install Dependencies
Install dependencies for both frontend and backend from the root directory:
```bash
npm run install:all
```
*Alternatively, install them individually in `backend/` and `frontend/`.*

### 3. Environment Configuration
Create a `.env` file in the **root** (or `backend/`) directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/coquette_threads

# Security
JWT_SECRET=your_super_secret_jwt_key_here

# Frontend URL (for CORS)
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### 4. Database Seeding
Populate your database with initial products and an admin user:
```bash
npm run seed
```
> **Default Admin Credentials:**
> *   Email: `admin@coquette.test`
> *   Password: `admin123`

### 5. Run Locally
Start both backend and frontend servers concurrently:
```bash
npm run dev:all
```
*   **Frontend:** `http://localhost:3000`
*   **Backend:** `http://localhost:5000`

---

## 🌐 Deployment

### Frontend (Vercel)
1.  Push code to GitHub.
2.  Import project into **Vercel**.
3.  Set Root Directory to `frontend`.
4.  Add Environment Variable: `NEXT_PUBLIC_API_URL` (Your Render Backend URL).
5.  Deploy.

### Backend (Render)
1.  Create a **Web Service** on **Render**.
2.  Connect GitHub repo.
3.  Set Root Directory to `backend`.
4.  Build Command: `npm install`
5.  Start Command: `node server.js`
6.  Add Environment Variables: `MONGO_URI`, `JWT_SECRET`, `NODE_ENV=production`.
7.  **Important:** Whitelist `0.0.0.0/0` in MongoDB Atlas Network Access.

---

## 📸 Screenshots

*(Add screenshots of your Home Page, Product Page, and Admin Dashboard here)*

---

## 🔮 Future Improvements
*   **Payment Gateway:** Integration with Stripe/Razorpay.
*   **Email Notifications:** Send order confirmations via Nodemailer/SendGrid.
*   **Redis Caching:** Implement caching for product routes to improve load times.
*   **Social Login:** Google/Facebook authentication using NextAuth.
