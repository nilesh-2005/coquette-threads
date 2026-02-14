const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    sku: { type: String, required: true },
    description: { type: String }, // HTML allowed
    shortDescription: { type: String },
    price: { type: Number, required: true }, // In INR
    compareAtPrice: { type: Number },
    currency: { type: String, default: 'INR' },
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
    tags: [{ type: String }],
    images: [{
        url: String,
        alt: String,
        type: { type: String, enum: ['hero', 'zoom', 'thumbnail'], default: 'zoom' }
    }],
    variants: [{
        sku: String,
        size: String,
        color: String,
        fabric: String,
        inventoryQty: { type: Number, default: 0 },
        images: [String], // URLs
        weightGrams: Number
    }],
    sizes: [{ type: String }], // e.g. XS, S, M, L
    colors: [{
        name: String,
        hex: String,
        swatchImage: String
    }],
    fabric: String,
    silhouette: String,
    neckline: String,
    sleeve: String,
    embellishments: [{ type: String }],
    careInstructions: String,
    productionLeadTime: String,
    shippingEstimate: String,
    returnPolicy: String,
    measurements: {
        bust: Map, // e.g. { XS: 82, S: 86 }
        waist: Map,
        hips: Map
    },
    isMadeToOrder: { type: Boolean, default: false },
    isLimitedEdition: { type: Boolean, default: false },
    published: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
