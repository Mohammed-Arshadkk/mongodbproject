const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:8
    },
    userType:{
        type:String,
        default:"user"
    }
})

const users= mongoose.model("Users",userSchema)

module.exports=users