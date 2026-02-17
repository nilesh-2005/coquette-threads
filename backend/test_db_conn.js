const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

const testConn = async () => {
    console.log('Attempting to connect to:', process.env.MONGO_URI);
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000 // Timeout after 5s
        });
        console.log('SUCCESS: Connected to MongoDB');
        process.exit(0);
    } catch (err) {
        console.error('FAILURE: Could not connect to MongoDB');
        console.error(err.message);
        process.exit(1);
    }
};

testConn();
