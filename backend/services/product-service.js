"use strict";
var ProductModel = require("../models/product-model.js");
var FavoriteModel = require('../models/favorite-model.js');

async function emptyAttributes(req) {
    const { sku, quantity, price, productName, images, description } = req.body;
    const errors = [];
    if (!sku) {
        errors.push("SKU cannot be empty.");
    }

    if (!quantity) {
        errors.push("Quantity cannot be empty.");
    }
    if (!price) {
        errors.push("Price cannot be empty.");
    }
    if (!productName) {
        errors.push("Product Name URL cannot be empty.");
    }

    if (!images) {
        errors.push("Images cannot be empty.");
    }
    if (!description) {
        errors.push("Description cannot be empty.");
    }

    if (errors.length > 0) {
        return { error: errors };
    } else {
        return { success: "All attributes are present." };
    }
}
async function isSkuExists(sku) {
    const result = await ProductModel.findOne({ sku: sku });
    if (result) {
        return { success: result };
    } else {
        return { error: "SKU does not exist." };
    }

}
async function createProduct(req) {
    const { sku, quantity, price, productName, images, description } = req.body;
    const newProduct = new ProductModel({
        sku: sku,
        quantity: quantity,
        price: price,
        productName: productName,
        images: images,
        description: description,

    });

    try {
        const isExists = await isSkuExists(sku);
        if (isExists.success) {
            return { error: "SKU already exists." };
        }
        const result = await newProduct.save();
        return { success: result };
    } catch (err) {
        return { error: err };
    }
}

async function getProducts(req) {
    try {
        const result = await ProductModel.find();
        return { success: result };
    } catch (err) {
        return { error: err };
    }
}
async function setFavorite(req) {
    try {
        const { productId } = req.body; // Assuming the request contains productId
        const favorite = new FavoriteModel({ product: productId });
        await favorite.save();
        return { success: favorite };
    } catch (error) {
        return { error: error };
    }
}
async function getProductById(req) {
    try {
        const { productId } = req.params;
        const result = await ProductModel.findOne({ _id: productId });
        return { success: result };
    } catch (error) {
        return { error: error };
    }
}

async function updateProduct(req) {
    try {
        const { productId } = req.params;
        const { sku, quantity, price, productName, images, description } = req.body;
        const result = await ProductModel.findOneAndUpdate({ _id: productId }, {
            sku: sku,
            quantity: quantity,
            price: price,
            productName: productName,
            images: images,
            description: description,
        });
        return { success: result };
    } catch (error) {
        return { error: error };
    }
}

async function deleteProduct(req) {
    try {
        const { productId } = req.params;
        const result = await ProductModel.findOneAndDelete({ _id: productId });
        console.log(result);
        if (!result) return { error: "Product not found" };
        return { success: result };
    }
    catch (error) {
        return { error: error };
    }

}




module.exports = { emptyAttributes, createProduct, isSkuExists, getProducts, setFavorite, getProductById, updateProduct, deleteProduct };
