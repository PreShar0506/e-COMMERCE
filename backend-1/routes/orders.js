const express = require('express');
require("../connection")
const router = express.Router();
const stripe=require("stripe")(process.env.STRIPE);
const mongoose = require('mongoose');
const Order = require('../models/order');
const OrderItem = require('../models/order-item');
const Product = require('../models/product');

router.post("/create-checkout-session",async(req,res)=>{
const {products}=req.body;
const lineItems=products.map((product)=>({
    price_data:{
        currency:"usd",
        product_data:{
            name:product.name,
        },
        unit_amount:Math.round(product.price*100),
    },
    quantity:product.quantity}))
    const session=await stripe.checkout.sessions.create({
        payment_method_types:["card"],
        line_items:lineItems,
        mode:"payment",
        success_url:"http://localhost:5173/success",
        cancel_url:"http://localhost:5173/cancel"
    })
    res.json({id:session.id})
});

router.post('/cart', async (req, res) => {
    try {
        const { product, name, price, quantity, totalPrice, user } = req.body;

        // First, try to find an existing cart item for this product and user
        let existingCartItem = await OrderItem.findOne({ product: product, user: user });

        if (existingCartItem) {
            // If the item exists, update the quantity and total price
            existingCartItem.quantity = quantity;
            existingCartItem.totalPrice += totalPrice;
            
            // Save the updated cart item
            const updatedCartItem = await existingCartItem.save();
            
            console.log("Updated cart item:", updatedCartItem);
            res.status(200).send(updatedCartItem);
        } else {
            // If the item doesn't exist, create a new cart item
            let newCartItem = new OrderItem({
                product,
                name,
                price,
                quantity,
                totalPrice,
                user
            });

            // Save the new cart item
            const savedCartItem = await newCartItem.save();

            console.log("New cart item created:", savedCartItem);
            res.status(201).send(savedCartItem);
        }
    } catch (error) {
        console.error('Error processing cart item:', error);
        res.status(500).send('Error: ' + error.message);
    }
});
//getiing all the data from the dtabase 
// router.post('/get/cart', async (req, res) => {
//     // Create a new user object
//     const user=req.body.user
//     const cart = await OrderItem.find({user:user})
//     try{
//     if (!cart || cart.length === 0) {
//         return res.status(404).json({ success: false, message: 'No cart found' });
//     }
//     if(res.status(200)){
//    return  cart ;}
// } catch (error) {
//     res.status(500).json({ success: false, message: 'Server error: ' + error.message });
// }
// })

router.post('/get/cart', async (req, res) => {
    const user=req.body.user;
    const cart = await OrderItem.find({user:user})  

    if (!cart) {
        res.status(500).json({ success: false, message: 'cart empty' })
    }
    res.status(200).send(cart)
})
//posting the order
// router.post('/finalorder', async (req, res) => {
//     const orderItemIds = req.body.orderItems .map(item => item.id);
//     const neworder={orderItems:orderItemIds ,
//         name:req.body.name,
//         email:req.body.email,
//         address:req.body.address,
//         totalPrice:req.body.totalPrice,
//         user:req.body.email
//       }
//     const Order = await neworder.save();  

//     if (!cart) {
//         res.status(500).json({ success: false, message: 'cart empty' })
//     }
//     res.status(200).send(Order)
// })
router.post('/finalorder', async (req, res) => {
    try {
        // Extract order item IDs from the request body
        const orderItemIds = req.body.orderItems.map(item => item.id);
        
        // Create a new order object
        const newOrder = new Order({
            orderItems: orderItemIds,
            name: req.body.name,
            email: req.body.email,
            address: req.body.address,
            totalPrice: req.body.totalPrice,
            user: req.body.user,
        });

        // Assuming you have a model named Order to save the new order
        const order = await newOrder.save();  
        console.log(order.orderItems);
        // Check if the order was created successfully
        if (!order) {
            return res.status(500).json({ success: false, message: 'Failed to create order' });
        }
        
        // Send the created order in the response
        res.status(200).json(order);
    } catch (error) {
        // Handle any errors that occur during the process
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
});
//posting request
router.post('/', async (req, res) => {
   
    const orderItemsIds = Promise.all(req.body.orderItems.map( async (orderItem) => {
        let newOrderItem = new OrderItem({
            quantity: orderItem.quantity,
            product: orderItem.product
        })

        newOrderItem = await newOrderItem.save();

        return newOrderItem._id;
    }))

    const orderItemsIdsResolved = await orderItemsIds;

    const totalPrices = await Promise.all(orderItemsIdsResolved.map(async (orderItemId) => {
        const orderItem = await OrderItem.findById(orderItemId).populate('product', 'price')
        const totalPrice = orderItem.product.price * orderItem.quantity;
        return totalPrice
    }))

    const totalPrice = totalPrices.reduce((a, b) => a+ b , 0 );

    let order = new Order({
        orderItems: orderItemsIdsResolved,
        shippingAddress1: req.body.shippingAddress1,
        shippingAddress2: req.body.shippingAddress2,
        city: req.body.city,
        zip: req.body.zip,
        country: req.body.country,
        phone: req.body.phone,
        status: req.body.status,
        totalPrice: totalPrice,
        user: req.body.user,
    })

    order = await order.save();

 
    if (!order)
        return res.status(404).send('Order cannot be created')
    res.send(order);
})

router.post('/deletecart/:productId', async (req, res) => {
    const { productId } = req.params;
    const user = req.body.user;
    console.log("user",user);
console.log("productId",productId);
    try {
        // Find the order item by productId
        const cartItem = await OrderItem.findOneAndDelete({ product : productId ,user});
   console.log("orderitems",cartItem);
        if (cartItem) {
            return res.status(200).json({ success: true, message: 'Order item deleted successfully' });
        } else {
            return res.status(404).json({ success: false, message: 'Order item not found' });
        }
    } catch (err) {
        return res.status(400).json({ success: false, error: err.message });
    }
});

//new changes made into it
router.post('/delete/cart/all', async (req, res) => {
    const user = req.body.user;
    console.log("user",user);
    try {
        // Find the order item by productId
        const cartItem = await OrderItem.deleteMany({user:user})
   console.log("orderitems",cartItem);
        if (cartItem) {
            return res.status(200).json({ success: true, message: 'Order item deleted successfully' });
        } else {
            return res.status(404).json({ success: false, message: 'Order item not found' });
        }
    } catch (err) {
        return res.status(400).json({ success: false, error: err.message });
    }
});
//getting user by userid
router.post('/get/usersorders/history', async (req, res) => {
    try {
        const { user } = req.body;

        // Fetch the user's orders sorted by date
        const userOrderList = await Order.find({ user: user }).sort({ 'dateOrdered': -1 });

        if (!userOrderList || userOrderList.length === 0) {
            return res.status(404).json({ success: false, message: 'No orders found for this user' });
        }

        // Fetch the products for each order and replace the orderItems with the actual product details
        const updatedOrders = await Promise.all(
            userOrderList.map(async (userOrder) => {
                // Fetch all products related to the order's orderItems
                const products = await Promise.all(
                    userOrder.orderItems.map(async (productId) => {
                        return await Product.findById(productId);
                    })
                );

                // Replace the orderItems with the fetched product details
                return {
                    ...userOrder._doc,  // Spread the existing order details
                    orderItems: products // Replace orderItems with actual products
                };
            })
        );

        // Send the updated order list with product details
        res.status(200).json({ success: true, orders: updatedOrders });
    } catch (error) {
        console.error('Error fetching user order history:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});
module.exports = router;