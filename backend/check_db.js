const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./src/models/User');
const Product = require('./src/models/Product');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

const checkDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/coquette_threads');
        console.log('Connected to MongoDB');

        const users = await User.find({}, 'name email isAdmin');
        console.log('\nSTART_USERS');
        for (const u of users) {
            console.log(`U:${u.email}:${u.isAdmin}:${u._id}`);
        }
        const products = await Product.find({}, 'title images');
        console.log('\nSTART_PRODUCTS');
        products.forEach(p => {
            console.log(`P:${p.title}`);
            p.images.forEach(i => console.log(`  IMG:${i.url}`));
        });
        console.log('END_PRODUCTS');


        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

checkDB();
