const Product = require('../models/Product');
const Category = require('../models/Category');

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
    try {
        const pageSize = 12;
        const page = Number(req.query.pageNumber) || 1;

        const keyword = req.query.keyword
            ? {
                title: {
                    $regex: req.query.keyword,
                    $options: 'i',
                },
            }
            : {};

        // Filter by Category
        let categoryFilter = {};
        if (req.query.category) {
            // Try treating as ObjectId first, if it fails, search by slug
            if (req.query.category.match(/^[0-9a-fA-F]{24}$/)) {
                categoryFilter = { categories: req.query.category };
            } else {
                const foundCategory = await Category.findOne({ slug: req.query.category });
                if (foundCategory) {
                    categoryFilter = { categories: foundCategory._id };
                } else {
                    // Category slug not found, return empty results
                    return res.json({ products: [], page, pages: 0 });
                }
            }
        }

        // If not admin, only show published products
        const isAdmin = req.user && req.user.isAdmin;
        const filter = { ...keyword, ...categoryFilter };
        if (!isAdmin) {
            filter.published = true;
        }
        console.log('Backend GET Products Filter:', JSON.stringify(filter), 'isAdmin:', isAdmin);

        const count = await Product.countDocuments(filter);
        const products = await Product.find(filter)
            .sort({ createdAt: -1 })
            .skip(pageSize * (page - 1))
            .limit(pageSize)
            .populate({ path: 'categories', select: 'name' });

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
        const product = await Product.findById(req.params.id).populate({ path: 'categories', select: 'name' });

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
    try {
        console.log('Incoming product data:', req.body);
        const { title, sku, price, description, images, variants, sizes, colors, fabric, silhouette, neckline, sleeve, embellishments, careInstructions, productionLeadTime, shippingEstimate, returnPolicy, isMadeToOrder, isLimitedEdition, published, categories } = req.body;

        if (!title) {
            return res.status(400).json({ message: 'Title is required' });
        }

        // Generate slug from title if not provided
        const slug = req.body.slug || title.toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)+/g, '') + '-' + Date.now().toString().slice(-4);

        const product = new Product({
            title,
            slug,
            sku,
            price: Number(price), // Ensure price is a number
            description,
            images,
            variants,
            sizes,
            colors: colors || [],
            fabric,
            silhouette,
            neckline,
            sleeve,
            embellishments,
            careInstructions,
            productionLeadTime,
            shippingEstimate,
            returnPolicy,
            isMadeToOrder,
            isLimitedEdition,
            published,
            categories: categories || []
        });

        const createdProduct = await product.save();
        console.log('Product created successfully:', createdProduct._id);
        res.status(201).json(createdProduct);
    } catch (error) {
        console.error('Create product error:', error);
        res.status(400).json({
            message: error.message || 'Failed to create product',
            errors: error.errors // Mongoose validation errors
        });
    }
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
