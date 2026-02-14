const express = require('express');
const router = express.Router();
const {
    getProducts,
    getProductById,
    getProductBySlug,
    deleteProduct,
    updateProduct,
    createProduct,
} = require('../controllers/productController');
const { protect, admin, restoreUser } = require('../middlewares/authMiddleware');

router.route('/').get(restoreUser, getProducts).post(protect, admin, createProduct);
router.route('/slug/:slug').get(getProductBySlug);
router.route('/:id').get(getProductById).delete(protect, admin, deleteProduct).put(protect, admin, updateProduct);

module.exports = router;
