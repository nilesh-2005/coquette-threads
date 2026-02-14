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

## Currency
All prices are in **INR (₹)**.

## Deployment

See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) for detailed instructions.
