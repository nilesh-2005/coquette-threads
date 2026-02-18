# 🏗️ Technical Implementation Guide

This document provides a deep dive into the architecture, design decisions, and implementation details of the **Coquette Threads** e-commerce platform.

---

## 1. System Architecture

The application checks follows a classic **Client-Server** architecture using the **MERN** stack (MongoDB, Express, React/Next.js, Node.js).

### Data Flow
1.  **Client (Next.js):** User interacts with the UI.
2.  **API Request:** Axios sends HTTP requests (GET, POST, PUT, DELETE) to the backend.
3.  **Server (Express):** Receives requests, validates data, and routes to appropriate controllers.
4.  **Database (MongoDB):** Controller queries the database via Mongoose.
5.  **Response:** Server sends JSON data back to the client.
6.  **State Update:** React updates the UI based on the response.

---

## 2. Frontend Implementation (Next.js)

### Why Next.js?
*   **SSR (Server-Side Rendering):** Improves initial load performance and SEO for product pages.
*   **Routing:** File-based routing (App Router) simplifies navigation structure.
*   **Image Optimization:** `next/image` automatically optimizes images for different screen sizes and formats (WebP).

### State Management
Instead of Redux, we use **React Context API** for simplicity and performance:
*   **`AuthContext`:** Manages user login state, JWT token storage (localStorage), and user profile data.
*   **`CartContext`:** Manages cart items, quantities, and totals. Syncs with localStorage for persistence.

### Styling & Animations
*   **Tailwind CSS v4:** Utility-first CSS for rapid development and consistent design system.
*   **GSAP (GreenSock):** Used for complex animations (hero section, reveal effects) that CSS transitions cannot handle smoothly.

### Component Structure
*   **`components/`:** Reusable UI elements (ProductCard, Navbar, Footer).
*   **`pages/`:** Application views (Home, Shop, Product Details, Cart, Checkout).
*   **`layouts/`:** Wrappers for consistent page structure (Navbar + Footer).

---

## 3. Backend Implementation (Node.js + Express)

### REST API Design
The backend follows RESTful principles with clear resource-based endpoints:
*   `GET /api/products` - Retrieve all products (with pagination & filtering).
*   `POST /api/users/login` - Authenticate user & issue JWT.
*   `POST /api/orders` - Create a new order (Protected).

### Middleware
*   **`authMiddleware`:** Verifies JWT token from `Authorization` header. Attaches `req.user` to the request object.
*   **`admin`:** Checks if `req.user.isAdmin` or `req.user.role === 'admin'`.
*   **`errorMiddleware`:** Global error handling. Catches async errors and sends formatted JSON responses (message + stack trace in dev).

### Security Practices
*   **Helmet:** Sets HTTP headers to secure the app.
*   **CORS:** Configured to allow requests only from the frontend domain.
*   **Rate Limiting:** Prevents brute-force attacks on auth routes.
*   **Bcryptjs:** Hashes passwords with salt before saving to the database.

---

## 4. Database (MongoDB)

### Schema Design
We use **Mongoose** for data modeling. Key collections:

1.  **User:**
    *   `name`, `email` (unique index), `password` (hashed).
    *   `isAdmin` (boolean), `role` (string).
2.  **Product:**
    *   `name`, `slug` (unique index for SEO URLs).
    *   `image`, `description`, `brand`, `category`.
    *   `price`, `countInStock`, `rating`.
3.  **Order:**
    *   `user` (Reference to User).
    *   `orderItems` (Array of objects with product reference).
    *   `shippingAddress`, `paymentMethod`, `paymentResult`.
    *   `taxPrice`, `shippingPrice`, `totalPrice`.
    *   `isPaid`, `isDelivered`.

### Why MongoDB?
*   **Flexible Schema:** E-commerce products often vary in attributes (sizes, colors). NoSQL allows flexible document structures.
*   **Scalability:** Horizontal scaling via sharding is easier than SQL.
*   **JSON-Native:** Seamless integration with JavaScript (Node.js + React).

---

## 5. Deployment Strategy

### Frontend: Vercel
*   **Why:** Best-in-class support for Next.js.
*   **Features:** Automatic deployments on git push, global CDN, edge functions for fast content delivery.

### Backend: Render
*   **Why:** Simple deployment for Node.js APIs, offers free tier, easy environment variable management.
*   **Health Checks:** `/api/health` endpoint ensures the service is running.

---

## 6. Trade-offs & Scalability

### Why No Microservices?
For this scale, a **Monolithic** architecture is more efficient. It simplifies deployment, testing, and development. Microservices introduce latency and complexity (inter-service communication) that aren't needed yet.

### Scalability Plan
1.  **Database:** Add indexing on frequently queried fields (`slug`, `category`, `user`). MongoDB Atlas handles scaling.
2.  **Caching:** Implement **Redis** to cache `GET /api/products` responses. This reduces DB load significantly.
3.  **Load Balancing:** Run multiple instances of the backend on Render/AWS behind a load balancer.
4.  **CDN:** Serve static assets (images) via Cloudinary or AWS S3 + CloudFront.

---

## 7. Interview & Viva Questions

### Q1: Why did you choose the MERN stack?
**A:** MERN offers a unified language (JavaScript) across the entire stack, which streamlines development. MongoDB's JSON-like documents map directly to frontend objects. React/Next.js provides a dynamic user interface, and Node.js allows for handling concurrent requests efficiently with its non-blocking I/O model.

### Q2: Why MongoDB instead of SQL (PostgreSQL)?
**A:** E-commerce product catalogs often require flexible schemas (e.g., a shirt has size/color, a laptop has RAM/CPU). MongoDB allows us to store these varied attributes without complex JOINs or rigid table structures, making iteration faster.

### Q3: How do you handle authentication securely?
**A:** We use **JWT (JSON Web Token)**. When a user logs in, the server signs a token with a `JWT_SECRET`. The client stores this token in `localStorage`. For every protected request, the token is sent in the `Authorization` header. The server verifies the signature before granting access. Passwords are never stored in plain text; they are hashed using `bcryptjs`.

### Q4: How would you scale this application for millions of users?
**A:**
1.  **Database:** Implement sharding in MongoDB to distribute data across multiple servers. Use read replicas for read-heavy operations.
2.  **Caching:** Use Redis to cache popular products and user sessions.
3.  **CDN:** Offload all static assets (images, CSS, JS) to a global CDN.
4.  **Backend:** Use a container orchestrator like Kubernetes to auto-scale Node.js instances based on CPU/Memory load.

### Q5: Explain the difference between `isAdmin` and `role` in your User model.
**A:** Use `role: 'admin'` as the primary check for RBAC (Role-Based Access Control). The `isAdmin` boolean is a legacy flag or a secondary quick check. Our middleware explicitly checks `req.user.role === 'admin' || req.user.isAdmin` to ensure backward compatibility and robustness.

### Q6: How do you prevent "Over-posting" or Mass Assignment attacks?
**A:** Mongoose schemas define strictly what fields can be saved. Even if a user sends extra fields in the JSON body, Mongoose will ignore fields that are not defined in the schema (unless explicitly set to `strict: false`). Additionally, we validate input data in the controller before creating documents.

### Q7: Why use Next.js `Image` component instead of `<img>` tag?
**A:** The `next/image` component automatically optimizes images. It lazy-loads them (only loads when near the viewport), resizes them for the user's device to save bandwidth, and serves them in modern formats like WebP/AVIF, which are significantly smaller than JPEG/PNG.
