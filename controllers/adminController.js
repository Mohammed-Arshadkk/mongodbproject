const { render } = require("ejs")

let obj = {
    loginController:(req,res)=>{
        res.render("login")
    },
    signupController:(req,res)=>{
        res.render("signup")
    },
    userHomeController:(req,res)=>{
        res.render("userfolder/userHome")
    },
    adminHomeController:(req,res)=>{
        res.render("adminHome")
    },
    postSignupController:(req,res)=>{
        const data = req.body
        console.log(data,"");
        res.redirect("/userHome")
    },
    productController:(req,res)=>{
        res.render("userfolder/product")
    }      
} 

module.exports = obj