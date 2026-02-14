# Coquette Threads

> Romance, Tailored.

A full-stack MERN e-commerce application for European/Victorian-inspired gowns.

## Tech Stack

- **Frontend**: Next.js (React), Tailwind CSS, GSAP
- **Backend**: Node.js, Express, MongoDB
- **Deployment**: Vercel (Frontend), Render (Backend)

## Quick Start

### Prerequisites

- Node.js (v18+)
- MongoDB (Local or Atlas URI)

### Installation

1.  **Clone the repository**
    ```bash
    git clone <repository-url>
    cd coquette-threads
    ```

2.  **Install dependencies**
    ```bash
    # Install root dependencies
    npm install

    # Install backend dependencies
    cd backend
    npm install

    # Install frontend dependencies
    cd ../frontend
    npm install
    ```

3.  **Environment Setup**
    - Copy `.env.example` to `.env` in both `backend/` and `frontend/` (or root if using monorepo style, but we use separate folders).
    - Update `MONGO_URI` and other secrets.

4.  **Run Locally**

    ```bash
    # Run both frontend and backend concurrently
    npm run dev:all
    ```

    - Frontend: http://localhost:3000
    - Backend: http://localhost:5000

5.  **Seed Database**
    ```bash
    npm run seed
    ```

## Folder Structure

- `frontend/`: Next.js application
- `backend/`: Express API
- `seed/`: Database seed scripts
- `design/`: Design assets and documentation

## GSAP Animations

This project uses **GSAP (GreenSock Animation Platform)** and **ScrollTrigger** for performant, luxury-grade animations.

### Setup & Configuration

- **Registry**: `frontend/src/lib/gsap.js` (Handles plugin registration and default settings).
- **Global Styles**: `frontend/src/styles/animations.css` (Base states and accessible reduced motion logic).
- **Custom Hooks**: `frontend/src/hooks/useGsap.js` provides reusable animation logic:
    - `useGsap`: Safe context-based hook for any GSAP animation.
    - `useFadeUp`: Entrance animation for elements.
    - `useStagger`: Staggered reveal for grids and lists.
    - `useParallax`: Smooth scroll-based parallax.

### Best Practices

1.  **Cleanup**: Always use the `useGsap` hook or wrap animations in `gsap.context()` to ensure proper cleanup on component unmount.
2.  **Performance**: Use the provided hooks which are optimized for React and Next.js.
3.  **Accessibility**: Animations are automatically disabled if the user has `prefers-reduced-motion` enabled.

## Currency
All prices are in **INR (₹)**.

## Deployment

See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) for detailed instructions.
