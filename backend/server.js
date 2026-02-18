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
      serverSelectionTimeoutMS: 10000, // Wait up to 10s for initial selection
      connectTimeoutMS: 10000,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (err) {
    console.error('CRITICAL: MongoDB connection failed!');
    console.error(`Error Message: ${err.message}`);
    console.error('Stack Trace:', err.stack);
    return false;
  }
};

mongoose.connection.on('error', err => {
  console.error('Mongoose runtime error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.warn('Mongoose disconnected. Reconnection will be handled by Mongoose.');
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

// Start Server Function
const startServer = async () => {
  const dbConnected = await connectDB();

  if (!dbConnected && process.env.NODE_ENV === 'production') {
    console.error('Failed to connect to database in production. Exiting.');
    process.exit(1);
  }

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  });
};

startServer();
