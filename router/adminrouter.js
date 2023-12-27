const express = require("express")
const router = express.Router()


const {loginController} = require("../controllers/adminController")
const {signupController} = require("../controllers/adminController")
const {userHomeController} = require("../controllers/adminController")
const {adminHomeController} = require("../controllers/adminController")
const {postSignupController} = require("../controllers/adminController")
const {productController} = require("../controllers/adminController")

router.get("/login",loginController)
router.get("/signup",signupController)
router.get("/userHome",userHomeController)
router.get("/adminHome",adminHomeController)
router.post("/signup",postSignupController)
router.get("/products",productController)


module.exports = router
