const mongoose= require('mongoose');
const bcrypt = require('bcrypt');
const userScheme = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true,
        minlength:3,
        maxlength:45
    },
    lastName:{
        type:String,
        required:true,
        trim:true,
        minlength:3,
        maxlength:45
    },
    userName:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        index:true,
        lowercase:true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
    },
    hashPassword:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    },
    contact:{
        type:String
    },
    profilePic:{
        type:String
    }



},{timestamps:true});

userScheme.virtual('password')
.set(function(password){
    this.hashPassword = bcrypt.hashSync(password,20);
})

userScheme.method= {
    authenticate:function(password){
        return bcrypt.compareSync(password,this.hashPassword);
    }
}


module.exports = mongoose.model('User',userScheme);