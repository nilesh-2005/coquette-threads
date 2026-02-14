# Deployment Guide

## Frontend (Vercel)

1.  Push your code to GitHub.
2.  Import the repository into Vercel.
3.  Configure the **Root Directory** to `frontend`.
4.  Add Environment Variables:
    - `NEXT_PUBLIC_API_URL`: The URL of your deployed backend (e.g., `https://coquette-api.onrender.com/api`).
5.  Deploy.

## Backend (Render)

1.  Create a **Web Service** on Render.
2.  Connect your GitHub repository.
3.  Settings:
    - **Root Directory**: `backend`
    - **Build Command**: `npm install`
    - **Start Command**: `npm start`
4.  Add Environment Variables:
    - `MONGO_URI`: Your MongoDB Atlas connection string.
    - `JWT_SECRET`: A secure random string.
    - `NODE_ENV`: `production`
5.  Deploy.

## Database (MongoDB Atlas)

1.  Create a Cluster on MongoDB Atlas.
2.  Allow access from all IPs (`0.0.0.0/0`) or specific Render IPs.
3.  Get the Connection String.
