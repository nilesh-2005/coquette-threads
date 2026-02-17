const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') }); // Load from root or local .env

mongoose.set('bufferCommands', false);

// Health Check Log
console.log('--- Server Starting ---');
console.log('PORT:', process.env.PORT || 5000);
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('MONGO_URI exists:', !!process.env.MONGO_URI);
if (process.env.MONGO_URI) {
  const maskedUri = process.env.MONGO_URI.replace(/:([^@]+)@/, ':****@');
  console.log('MONGO_URI (masked):', maskedUri);
} else {
  console.warn('WARNING: MONGO_URI is not defined! Using local default.');
}

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files for uploaded images (Development only)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Database Connection
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/coquette_threads', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 10000,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    // Don't exit here, let Mongoose retry if possible, or handle via middleware
  }
};

connectDB();

mongoose.connection.on('error', err => {
  console.error('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.warn('Mongoose disconnected. Attempting to reconnect...');
});

// Routes (Placeholder)
app.get('/', (req, res) => {
  res.send('Coquette Threads API Running');
});

// Import Routes
const productRoutes = require('./src/routes/productRoutes');
const authRoutes = require('./src/routes/authRoutes');
const uploadRoutes = require('./src/routes/uploadRoutes');
const { notFound, errorHandler } = require('./src/middlewares/errorMiddleware');

app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/health', (req, res) => res.json({ status: 'healthy', timestamp: new Date() }));
app.use('/api/upload', uploadRoutes);
app.use('/api/orders', require('./src/routes/orderRoutes'));
app.use('/api/categories', require('./src/routes/categoryRoutes'));

// Error Middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
