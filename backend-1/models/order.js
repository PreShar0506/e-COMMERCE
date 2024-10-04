const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    orderItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'OrderItem',
        required: true,
    }],
    name: { // Added name field
        type: String,
        required: true
    },
    email: { // Added email field
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v); // Basic email format validation
            },
            message: props => `${props.value} is not a valid email!`
        }
    },
    address: {
        type: String,
        required: true // Made required
    },
    totalPrice: {
        type: Number,
        required: true // Made required
    },
    user: {
        type: String,
        required:true
    },
    status:{
        type:String,
        default:'pending',
    },
    dateOrdered: {
        type: Date,
        default: Date.now
    },
    
});

orderSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

orderSchema.set('toJSON', {
    virtuals: true,
});

module.exports = mongoose.model('Order', orderSchema);
