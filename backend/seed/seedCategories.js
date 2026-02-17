const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const Category = require('../src/models/Category'); // Adjust path if needed

dotenv.config({ path: path.join(__dirname, '../../.env') });

const categories = [
    { name: 'Bridal', slug: 'bridal' },
    { name: 'Ball Gowns', slug: 'ball-gowns' },
    { name: 'New Arrivals', slug: 'new-arrivals' },
    { name: 'Accessories', slug: 'accessories' }
];

const seedCategories = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('MongoDB Connected');

        for (const cat of categories) {
            const exists = await Category.findOne({ slug: cat.slug });
            if (!exists) {
                await Category.create(cat);
                console.log(`Created category: ${cat.name}`);
            } else {
                console.log(`Category exists: ${cat.name}`);
            }
        }

        console.log('Category seeding complete');
        process.exit();
    } catch (error) {
        console.error('Error seeding categories:', error);
        process.exit(1);
    }
};

seedCategories();
