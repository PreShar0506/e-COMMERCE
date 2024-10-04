const express = require('express');
const router = express.Router();
require("../connection")
const mongoose = require('mongoose');
const multer = require('multer');

const Product = require('../models/product');
const Category = require('../models/category');

const FILE_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg',
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const isValid = FILE_TYPE_MAP[file.mimetype];
        let uploadError = new Error('Invalid Image Type');
        if(isValid){
            uploadError = null
        }
        cb(uploadError, 'public/uploads')
    },
    filename: function (req, file, cb) {
        const fileName = file.originalname.split('').join('-');
        const extension = FILE_TYPE_MAP[file.mimetype];
        cb(null, `${fileName}-${Date.now()}.${extension}`)
    }
})

const upload  = multer({ storage: storage })

//get product by id
router.get('/:id', async (req, res) => {
    const product = await Product.findById(req.params.id)  

    if (!product) {
        res.status(500).json({ success: false, message: 'The product with the given ID not exists' })
    }
    res.status(200).send(product)
})

//getting the products from database
router.get('/', async (req, res) => {
    try {
        const products = await Product.find({});
        console.log("products from the database",products);
        if (!products || products.length === 0) {
            return res.status(404).json({ success: false, message: 'No products found' });
        }
        res.status(200).send(products);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error: ' + error.message });
    }
});

module.exports = router;