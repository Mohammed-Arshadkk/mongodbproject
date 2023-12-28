const { render } = require("ejs")
const userData = require('../models/user')
const bcrypt = require('bcrypt')
message = "";

let obj = {

    loginController: (req, res) => {
        res.render("login")
    },
    signupController: (req, res) => {

        res.render("signup", { message: message })

    },
    userHomeController: (req, res) => {
        res.render("userfolder/userHome")
    },
    adminHomeController: (req, res) => {
        res.render("adminHome")
    },
    postSignupController: async (req, res) => {
        const { username, password, email } = req.body;
        console.log(req.body, "req.body");
        try {
            const check = await userData.findOne({ email: email })

            if (check) {
                message = "user is already exist please login"
                res.redirect('/signup')
            } else {

                const hashedPass = await bcrypt.hash(password, 10)
                const newuser = new userData({
                    username: username,
                    password: hashedPass,
                    email: email
                })
                await newuser.save();
                res.redirect('/userHome')
            }
        } catch (error) {
            console.error('Error saving user to the database:', error);
            message = "Error occurred while signing up. Please try again.";
            res.redirect('/signup');
        }

    },
    productController: (req, res) => {
        res.render("userfolder/product")
    },
    profileController: (req, res) => {
        res.render("userfolder/updateProfile")
    },
    updateController: (req, res) => {
        res.render("userfolder/updateInformation")
    },
    postloginController: async (req, res) => {
        try {
            const { username, password } = req.body
            const check = await userData.findOne({ username })
            const passMatch = await bcrypt.compare(
                password,
                check.password
            )
            if(!passMatch){
                return res.redirect('/login')
            }
            if(check.userType=='admin'){
                res.redirect('/admin/adminHome')
            }else{
                res.redirect('/userHome')
            }
        } catch (err) {
            console.log(err)
        }
    },
    getLogoutController: (req, res) => {
        req.session.destroy(err => {
            if (err) {
                console.error('Error destroying session:', err);
                res.sendStatus(500);
            } else {
                res.redirect('/login');
            }
        })
    },
}

module.exports = obj