const mongoose = require('mongoose');
const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    // image:[{
    //     type: String,
    //     required: true
    // }],
    price: {
        type: Number,
        default: 0 // Removed quotes to ensure it's a number
    },
    category: {
        type: String, // Changed to String to match your hardcoded data
        required: true,
    },
    rating: {
        type: Number, // Changed to Number to match your hardcoded data
        default: 0
    },
});

productSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

productSchema.set('toJSON', {
    virtuals: true,
});

module.exports = mongoose.model('Product', productSchema);
