const express = require("express")
const router = express.Router()

const {loginController} = require("../controllers/adminController")
const {signupController} = require("../controllers/adminController")
const {userHomeController} = require("../controllers/adminController")
const {adminHomeController} = require("../controllers/adminController")
const {postSignupController} = require("../controllers/adminController")
const {productController} = require("../controllers/adminController")
const {profileController} = require("../controllers/userController")
const {updateController} = require("../controllers/userController")
const {getLogoutController} = require("../controllers/userController")
const {postloginController} = require("../controllers/userController")

router.get("/login",loginController)
router.get("/signup",signupController)
router.get("/userHome",userHomeController)
router.get("/adminHome",adminHomeController)
router.post("/signup",postSignupController)
router.get("/products",productController)
router.get("/profile",profileController)
router.get("/update",updateController)
router.get("/logout",getLogoutController)
router.post("/login",postloginController)


module.exports = router