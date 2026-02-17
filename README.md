# Coquette Threads - Romance, Tailored. 🎀

Coquette Threads is a premium, full-stack MERN e-commerce platform specializing in curated, vintage-inspired gowns. Designed for historical grandeur and modern elegance, the application offers a seamless luxury shopping experience with high-performance animations, dynamic product management, and a secure checkout flow.

---

## 🌟 Key Features

### 🛍️ Customer Experience
- **Exquisite Product Discovery**: Browse collections like Bridal, Ball Gowns, and Accessories with a focus on high-quality visuals.
- **Dynamic Filtering & Sorting**: Filter products by price range and sort by newest arrivals or price (low to high/high to Low).
- **Responsive Animations**: Fluid, luxury-grade entrance and stagger animations powered by GSAP.
- **Secure Checkout**: Streamlined order placement with real-time validation and shipping detail collection.
- **Personalized Accounts**: Order history tracking and profile management.

### 🛠️ Admin Suite (The Atelier)
- **Product Management**: Amazon-style product creation with support for multiple images, descriptions, and variant tracking (sizes/colors).
- **Category Control**: Dynamic category assignment using a robust backend management system.
- **Order Oversight**: Real-time order monitoring and fulfillment status updates.
- **Dashboard Analytics**: Overview of total sales, order counts, and recent store activity.

---

## 🚀 Tech Stack

- **Frontend**: [Next.js](https://nextjs.org/) (React), [Tailwind CSS](https://tailwindcss.com/), [GSAP](https://greensock.com/gsap/) (Animations)
- **Backend**: [Node.js](https://nodejs.org/), [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) (Mongoose ODM)
- **Authentication**: JWT (JSON Web Tokens) with Secure Local Storage
- **Deployment**: [Vercel](https://vercel.com/) (Frontend), [Render](https://render.com/) (Backend)

---

## 📁 Folder Structure

```text
Coquette-Threads/
├── backend/                # Node.js + Express API
│   ├── src/
│   │   ├── controllers/    # Route controllers (logic)
│   │   ├── models/         # Mongoose schemas
│   │   ├── routes/         # API endpoints
│   │   └── middleware/     # Auth & Error handling
│   └── seed/               # Database population scripts
├── frontend/               # Next.js Application
│   ├── src/
│   │   ├── components/     # Reusable UI elements
│   │   ├── hooks/          # Custom GSAP & logic hooks
│   │   ├── lib/            # API & GSAP configurations
│   │   ├── pages/          # Next.js dynamic routes
│   │   └── styles/         # Global & animation CSS
└── design/                 # Assets and Reference documentation
```

---

## 🛠️ Setup Instructions

### 1. Prerequisites
- Node.js (v18 or higher)
- MongoDB (Local installation or MongoDB Atlas URI)

### 2. Installation
Clone the repository and install all dependencies:
```bash
git clone <repository-url>
cd Coquette-Threads
npm run install:all
```

### 3. Environment Variables
Create a `.env` file in the **root** and **backend** directories with the following:

**Backend (`backend/.env`):**
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
```

**Frontend (`frontend/.env.local`):**
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### 4. Running Locally
Run both the frontend and backend concurrently:
```bash
npm run dev:all
```
- **Frontend**: `http://localhost:3000`
- **Backend (API)**: `http://localhost:5000`

### 5. Seeding Data
Populate the database with initial categories and premium products:
```bash
npm run seed
```

---

## 🚢 Deployment

### Frontend (Vercel)
1. Push your code to GitHub.
2. Link the repository to a new Vercel project.
3. Add `NEXT_PUBLIC_API_URL` to Vercel environment variables.

### Backend (Render)
1. Create a "Web Service" on Render.
2. Root Directory: `backend`.
3. Build Command: `npm install`.
4. Start Command: `node server.js`.
5. Add `MONGO_URI` and `JWT_SECRET` to Render environment variables.

---

## 🔮 Future Improvements
- **Payment Integration**: Implement Stripe or Razorpay for live transactions.
- **Wishlist**: Allow users to save their favorite pieces for later.
- **AI Stylist**: A chatbot to help users find the perfect gown for their occasion.
- **Enhanced SEO**: Comprehensive meta-tags and schema markup for all products.

---

## 📝 License
Distributed under the ISC License.

Developed with ❤️ for **Coquette Threads**.
