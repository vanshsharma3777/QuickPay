const mongoose = require('mongoose')
require('dotenv').config();
mongoose.connect(process.env.MD_URL)
const userSchema= new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        minLength:4,
        trim:true,
    },
    password:{
        type:String,
        required:true,
        minLength:4,
        maxLength:16,
    },
    firstName:{
        type:String,
        required:true,
        minLength:2,
        trim:true,
    },
    lastName:{
        type:String,
        required:true,
        minLength:2,
        trim:true,
    }
})
const User = mongoose.model('User',userSchema)

const accountSchema = mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    balance:{
        type:Number,
        
    }
     
})

const Account = mongoose.model('Account', accountSchema)

    module.exports={
        User,
        Account
    }