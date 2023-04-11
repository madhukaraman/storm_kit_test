const express = require('express');
const router = express.Router();
const User = require('../model/User');
const jwt = require('jsonwebtoken');

router.post('/register', async(req,res) => {
    const user = new User({
        email : req.body.email,
        password : req.body.password
    });
    try {
        const savedUser =await user.save();
        res.send(savedUser);
    }
    catch(err){
        res.status(400).send(err);
    }
});


router.post('/login', async(req,res) => {
    const emailExist = await User.findOne({email:req.body.email});
    if(!emailExist){
        res.status(400).send('Email not registered');
    }
    if(!(emailExist.password == req.body.password)){
        res.status(400).send('Enter correct password');
    }
    //create and assign token
    const token =jwt.sign({id: this._id}, process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRES_TIME
    });
    const refreshToken = jwt.sign({id: this._id}, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });


    res.header('auth-token',token).send(token);
    // res.send('Logged in');
});


module.exports = router;