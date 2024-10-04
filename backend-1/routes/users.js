const express = require('express');
const bcrypt = require('bcryptjs');
require("../connection")
const router = express.Router();
const User = require('../models/user');

router.post('/register', async (req, res) => {
    let newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10)
        
    });
    try {
        let user = await newUser.save();
        if (!user) return res.status(500).send('User cannot be created');
        res.status(201).send(user);
    } catch (error) {
        return res.status(500).send('Error: ' + error.message);
    }
});

router.post('/login', async (req, res) => {
    const user = await User.findOne({ email: req.body.email})

    if(!user) {
        return res.status(400).send('User with given Email not found');
    }
    if(user && bcrypt.compareSync(req.body.password ,user.password)) {
       
       res.status(200).send({user: user.email, userId: user._id});
    } else {
     res.status(400).send('Password is mismatch');
    }

})

module.exports = router;