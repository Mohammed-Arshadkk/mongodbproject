const express = require("express")
const router = express.Router()

const {loginController, postProfileSubmit} = require("../controllers/userController")
const {signupController} = require("../controllers/userController")
const {userHomeController} = require("../controllers/userController")
const {adminHomeController} = require("../controllers/userController")
const {postSignupController} = require("../controllers/userController")
const {productController} = require("../controllers/userController")
const {profileController} = require("../controllers/userController")
const {getLogoutController} = require("../controllers/userController")
const {postloginController} = require("../controllers/userController")


router.get("/login",loginController)
router.get("/signup",signupController)
router.get("/userHome",userHomeController)
router.get("/adminHome",adminHomeController)
router.get("/products",productController)
router.get("/profile",profileController)
router.get("/logout",getLogoutController)


router.post("/login",postloginController)
router.post("/signup",postSignupController)
router.post('/submitProfile',postProfileSubmit)


module.exports = router