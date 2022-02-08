const express = require('express');
const router =express.Router();
const User = require('../models/user');


router.post('signin',(req,res)=>{

})

router.post('/signup',(req,res)=>{
    
    User.findOne({email:req.body.email})
    .exec((error, user)=>{
        console.log(user)
        if(user)
        {
            
            return res.status(400).json({
                messege:'Users already registered'
            })
        }
        const {
            firstName,
            lastName,
            userName,
            email,
            password
        } = req.body;
        console.log(req.body);

        const _user = new User({firstName, lastName, userName, email, password});

        _user.save((error,data)=>{
            
            if(error)
            {
                return res.status(400).json({
                    messege:'Something went wrong'
                })
            }
            if(data){
                return res.status(200).json({
                    messege:'User is Registered Succefully'
                })
            }
        })

    })
})

module.exports = router;