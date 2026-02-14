const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const User = require('../src/models/User');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/coquette_threads');
        console.log('MongoDB Connected for Seeding...');

        const adminExists = await User.findOne({ email: 'admin@coquettethreads.com' });

        if (adminExists) {
            console.log('Admin user already exists. Updating role...');
            adminExists.role = 'admin';
            adminExists.isAdmin = true;
            await adminExists.save();
            console.log('Admin user updated.');
        } else {
            const admin = await User.create({
                name: 'Admin User',
                email: 'admin@coquettethreads.com',
                password: 'adminpassword123', // User should change this
                role: 'admin',
                isAdmin: true
            });
            console.log('Admin user created:', admin.email);
        }

        process.exit();
    } catch (error) {
        console.error('Error seeding admin:', error);
        process.exit(1);
    }
};

seedAdmin();
