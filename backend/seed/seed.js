const mongoose = require('mongoose');
const dotenv = require('dotenv');
const colors = require('colors'); // Optional but helpful if installed, removing to avoid dep error if not
const User = require('../src/models/User');
const Product = require('../src/models/Product');
const Category = require('../src/models/Category');
const products = require('./products');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../../.env') }); // Load root .env

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/coquette_threads', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

const importData = async () => {
    await connectDB();

    try {
        await Product.deleteMany();
        await User.deleteMany();
        await Category.deleteMany();

        // Create Admin User
        const createdUser = await User.create({
            name: 'Admin User',
            email: 'admin@coquette.test',
            password: 'password123', // Will be hashed by pre-save hook
            isAdmin: true,
        });

        const adminUserId = createdUser._id;

        // Process categories from products
        const categoryNames = [...new Set(products.flatMap(p => p.categories))];
        const categoryDocs = await Category.insertMany(
            categoryNames.map(name => ({
                name,
                slug: name.toLowerCase().replace(/ /g, '-')
            }))
        );

        // Map category names to IDs
        const categoryMap = {};
        categoryDocs.forEach(c => { categoryMap[c.name] = c._id; });

        const sampleProducts = products.map((product) => {
            return {
                ...product,
                user: adminUserId,
                categories: product.categories.map(c => categoryMap[c])
            };
        });

        await Product.insertMany(sampleProducts);

        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

const destroyData = async () => {
    await connectDB();

    try {
        await Product.deleteMany();
        await User.deleteMany();
        await Category.deleteMany();

        console.log('Data Destroyed!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}
