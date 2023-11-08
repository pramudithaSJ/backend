"use strict";

var ProductModel = require('../models/product-model.js');
var response = require('../utils/response-util.js');
var CategoryService = require('../services/product-service.js');

module.exports.createProduct = async function (req, res) {

    const result = await CategoryService.emptyAttributes(req);
    if (result.error) {
        return response.sendBadRequestResponse("Bad Request", null, result.error, res);
    }
    const savedProduct = await CategoryService.createProduct(req);
    if (savedProduct.error) {
        return response.sendServerErrorResponse(null, null, savedProduct.error, res);
    }
    return response.sendSuccessResponse("Product Created Successfully", savedProduct.success, null, res);
};

module.exports.getProducts = async function (req, res) {
    const result = await CategoryService.getProducts(req);
    if (result.error) {
        return response.sendServerErrorResponse(null, null, result.error, res);
    }
    return response.sendSuccessResponse("Product Retrieved Successfully", result.success, null, res);
}
module.exports.getProductById = async function (req, res) {
    const result = await CategoryService.getProductById(req);
    if (result.error) {
        return response.sendServerErrorResponse(null, null, result.error, res);
    }
    return response.sendSuccessResponse("Product Retrieved Successfully", result.success, null, res);
}

module.exports.updateProduct = async function (req, res) {
    const result = await CategoryService.updateProduct(req);
    if (result.error) {
        return response.sendServerErrorResponse(null, null, result.error, res);
    }
    return response.sendSuccessResponse("Product Updated Successfully", result.success, null, res);
}
module.exports.deleteProduct = async function (req, res) {
    const result = await CategoryService.deleteProduct(req);
    if (result.error) {
        return response.sendServerErrorResponse(null, null, result.error, res);
    }
    return response.sendSuccessResponse("Product Deleted Successfully", null, null, res);
}

module.exports.setFavorite = async function (req, res) {
    const result = await CategoryService.setFavorite(req);
    if (result.error) {
        return response.sendServerErrorResponse(null, null, result.error, res);
    }
    return response.sendSuccessResponse("Added to favorite list successfully ", result.success, null, res);

}


