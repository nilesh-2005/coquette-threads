import axios from 'axios';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to include the auth token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        console.log(`[API Request] ${config.method.toUpperCase()} ${config.url}`);
        console.log(`[Auth Debug] Token exists: ${!!token}`);
        if (token) {
            console.log(`[Auth Debug] Token prefix: ${token.substring(0, 10)}...`);
            config.headers.Authorization = `Bearer ${token}`;
        } else {
            console.warn(`[Auth Debug] NO TOKEN FOUND IN LOCAL STORAGE!`);
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
