const mongoose = require('mongoose');
//need to add to api.js and need to make it accessible in the page 
const saveItemSchema = mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true,
        // Example: item.price * item.quantity
    },
    user:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('saveItem', saveItemSchema);
