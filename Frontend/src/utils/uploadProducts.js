// uploadProducts.js
const mongoose = require('mongoose');
const Product = require('./Product');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mydb', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Import your products
const products = [
    {
        id: 1,
        name: "Classic T-Shirt",
        description: "A classic unisex t-shirt made from soft, breathable cotton. Perfect for everyday casual wear.",
        price: 19.99,
        image: ["t_shirts.jfif", "classic_t_shirt1.jfif", "classic_t_shirt2.jfif"],
        category: "Men",
        rating: 4.2
    },
    {
        id: 2,
        name: "Jeans",
        description: "Comfortable blue jeans crafted from high-quality denim. Ideal for both casual and semi-formal occasions.",
        price: 49.99,
        image: ["jense.jfif", "jense1.jfif", "jense2.jfif"],
        category: "Unisex",
        rating: 4.5
    },
    {
        id: 3,
        name: "Sneakers",
        description: "Stylish sneakers designed for everyday wear, providing great support and comfort for all-day activities.",
        price: 89.99,
        image: ["sneakers.jfif"],
        category: "Women",
        rating: 4.0
    },
    {
        id: 4,
        name: "Cotton T-shirt",
        description: "A stylish cotton t-shirt perfect for casual outings. Soft and lightweight, it ensures all-day comfort.",
        price: 90.99,
        image: ["CottonTshirt.jfif", "Cottontshirt1.jfif", "CottontShirt2.jfif"],
        category: "Unisex",
        rating: 4.1
    },
    {
        id: 5,
        name: "Shirts for Women",
        description: "Trendy shirts designed specifically for women. Flattering cuts and styles make them suitable for various occasions.",
        price: 99.99,
        image: ["shirtsForWomen.jfif", "shirtsForWomen1.jfif", "shirtsForWomen2.jfif"],
        category: "Women",
        rating: 4.3
    },
    {
        id: 6,
        name: "Shirts for Men",
        description: "Elegant shirts designed for men, suitable for both casual and formal wear. Versatile and stylish for any wardrobe.",
        price: 100,
        image: ["shirtsForMen.jfif", "shirtsForMen1.jfif", "shirtsForMen2.jfif"],
        category: "Men",
        rating: 4.5
    },
];

// Function to upload products
const uploadProducts = async () => {
    try {
        await Product.insertMany(products);
        console.log('Products uploaded successfully!');
    } catch (error) {
        console.error('Error uploading products:', error);
    } finally {
        mongoose.connection.close(); // Close the connection
    }
};

// Call the upload function
uploadProducts();
