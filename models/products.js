const mongoose=require('mongoose')

const productSchema = new mongoose.Schema({
    imagePath: {
        type: String
    },
    productName: {
        type: String
    },
    productPrice: {
        type: Number
    }
});


const products=mongoose.model("Products",productSchema)

module.exports=products