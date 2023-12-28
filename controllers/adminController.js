const users = require('../models/user')
const products = require('../models/products')

const adminHome = (req, res) => {
    res.render('adminPage/adminHome')
}

const logout = (req, res) => {
    res.redirect('/login')
}
const seeProduct = async (req, res) => {
    const allProducts = await products.find()
    res.render('adminpage/adminSeeProducts', { allProducts })
}

const seeAllUsers = async (req, res) => {
    const allUsers = await users.aggregate([
        { $match: { userType: 'user' } }
    ])
    res.render('adminpage/userList', { allUsers });
}
const productform = (req, res) => {
    res.render('adminpage/productionForm')
}

const addProduct = async (req, res) => {
    try {
        const { productName, productPrice } = req.body;
        const imagePath = req.file.path;


        const newProd = new products({
            imagePath,
            productName,
            productPrice
        });

        await newProd.save();
        res.redirect('/admin/seeProducts')
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

const deleteProduct = async (req,res)=>{
    const productId = req.params.id
    await products.findByIdAndDelete(productId)
    res.redirect('/admin/seeProducts')
}

const editProduct = async (req,res)=>{
    const productId = req.params.id
    const findProduct = await products.findById(productId)
    res.render("adminpage/editproduct",{findProduct})
}

const UpdateProduct = async (req,res) =>{
    const productId = req.params.id 
    
}


module.exports = {
    adminHome,
    logout,
    seeAllUsers,
    productform,
    addProduct,
    seeProduct,
    deleteProduct,
    editProduct
}