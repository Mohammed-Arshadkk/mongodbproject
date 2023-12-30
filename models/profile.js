const mongoose=require('mongoose')

const profileSchema = new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    address:{
        type:String
    },
    place:{
        type:String
    },
    pincode:{
        type:Number
    },
    phone:{
        type:Number
    },
    district:{
        type:String
    },
    state:{
        type:String
    },
    userD:{
        type:mongoose.Types.ObjectId,
        require:true
    }
});


const profile=mongoose.model("Profile",profileSchema)

module.exports=profile