const express=require('express')
const router=express.Router()
const adminController=require('../controllers/adminController')
const upload=require('../models/multer')


router.get('/adminHome',adminController.adminHome)
router.get('/seeallusers',adminController.seeAllUsers)
router.get('/logout',adminController.logout)
router.get('/products',adminController.productform)
router.get('/seeProducts',adminController.seeProduct)
router.get('/deleteProduct/:id',adminController.deleteProduct)
router.get('/editProduct/:id',adminController.editProduct)
router.post('/update-product/:id',upload.single('productImage'),adminController.updateProduct)

router.post('/addproduct',upload.single('image'),adminController.addProduct)

module.exports=router



