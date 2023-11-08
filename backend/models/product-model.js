const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    sku: {
        required: true,
        type: String,
    },
    quantity: {
        required: true,
        type: Number,
    },
    price: {
        required: true,
        type: Number,
    },
    productName: {
        required: true,
        type: String,
    },
    images: [
        {
            type: String,
            required: true,
        }
    ],
    description: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Product', productSchema);