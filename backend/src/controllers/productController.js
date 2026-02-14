const Product = require('../models/Product');

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
    try {
        const pageSize = 12;
        const page = Number(req.query.pageNumber) || 1;

        const keyword = req.query.keyword
            ? {
                name: {
                    $regex: req.query.keyword,
                    $options: 'i',
                },
            }
            : {};

        // Filter by Category
        const categoryFilter = req.query.category ? { categories: req.query.category } : {};

        const count = await Product.countDocuments({ ...keyword, ...categoryFilter, published: true });
        const products = await Product.find({ ...keyword, ...categoryFilter, published: true })
            .limit(pageSize)
            .skip(pageSize * (page - 1));

        res.json({ products, page, pages: Math.ceil(count / pageSize) });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Fetch single product by slug
// @route   GET /api/products/slug/:slug
// @access  Public
const getProductBySlug = async (req, res) => {
    try {
        const product = await Product.findOne({ slug: req.params.slug });

        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        await product.deleteOne();
        res.json({ message: 'Product removed' });
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = async (req, res) => {
    const product = new Product({
        title: 'Sample Name',
        slug: 'sample-name-' + Date.now(),
        sku: 'SAMPLE-SKU',
        price: 0,
        user: req.user._id,
        images: [{ url: '/images/sample.jpg', alt: 'Sample', type: 'hero' }],
        description: 'Sample description',
        variants: [],
        published: false,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = async (req, res) => {
    const {
        title,
        slug,
        sku,
        price,
        description,
        images,
        variants,
        sizes,
        colors,
        fabric,
        published,
        categories,
        measurements
    } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
        product.title = title || product.title;
        product.slug = slug || product.slug;
        product.sku = sku || product.sku;
        product.price = price || product.price;
        product.description = description || product.description;
        product.images = images || product.images;
        product.variants = variants || product.variants;
        product.sizes = sizes || product.sizes;
        product.colors = colors || product.colors;
        product.fabric = fabric || product.fabric;
        product.published = published !== undefined ? published : product.published;
        product.categories = categories || product.categories;
        product.measurements = measurements || product.measurements;

        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
};

module.exports = {
    getProducts,
    getProductById,
    getProductBySlug,
    deleteProduct,
    createProduct,
    updateProduct,
};
