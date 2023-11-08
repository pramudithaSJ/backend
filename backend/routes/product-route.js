var express = require('express');
var router = express.Router();

const ProductController = require('../controllers/product-controller.js');

router.post('/', function (req, res) {
    ProductController.createProduct(req, res);
});
router.get('/', function (req, res) {
    ProductController.getProducts(req, res);
});
router.post('/favorite', function (req, res) {
    ProductController.setFavorite(req, res);
});
router.get('/:productId', function (req, res) {
    ProductController.getProductById(req, res);
});
router.put('/:productId', function (req, res) {
    ProductController.updateProduct(req, res);
});
router.delete('/:productId', function (req, res) {
    ProductController.deleteProduct(req, res);
});

module.exports = router;