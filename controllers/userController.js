const { render } = require("ejs")
const userData = require('../models/user')
const products = require('../models/products')
const profile = require('../models/profile')
const bcrypt = require('bcrypt');
const { default: mongoose, trusted } = require("mongoose");
message = "";

let obj = {

    loginController: (req, res) => {
        if (req.session.userId) {
            if (req.session.isAdmin) {
                res.redirect('/adminHome')
            } else {
                res.redirect('/userHome')
            }
        } else {
            res.render("login")
        }
    },
    signupController: (req, res) => {
        if (req.session.userId) {
            res.redirect('/userHome')
        } else {
            res.render("signup", { message: message })
        }
    },
    userHomeController: (req, res) => {
        if (req.session.userId) {
            res.render("userfolder/userHome")
        } else {
            res.redirect('/login')
        }
    },
    adminHomeController: (req, res) => {
        res.render("adminHome")
    },

    postSignupController: async (req, res) => {
        const { username, password, email } = req.body;
        const userid = req.session.userId
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
                console.log('====================================');
                console.log(newuser._id);
                console.log('====================================');
                req.session.userId = newuser._id    //session created
                res.redirect('/userHome')
            }
        } catch (error) {
            console.error('Error saving user to the database:', error);
            message = "Error occurred while signing up. Please try again.";
            res.redirect('/signup');
        }

    },

    productController: async (req, res) => {
        if (req.session.userId) {
            const allProducts = await products.find()
            res.render("userfolder/product", { allProducts })
        } else {
            res.redirect('/login')
        }
    },

    profileController: async (req, res) => {
        if (req.session.userId) {
            const used = req.session.userId
            console.log('used', used);
            console.log('====================================');
            console.log('req.session.userId', req.session.userId);

            const fulldata = await userData.aggregate([
                {
                    $match: { _id: new mongoose.Types.ObjectId(used) }
                },
                {
                    $lookup: {
                        from: "profiles",
                        localField: "_id",
                        foreignField: "userD",
                        as: "fullprofile"
                    }
                }
            ]);
            console.log('=================bottom===================');
            console.log('fulldata', fulldata);
            //   console.log('====================================');

            res.render("userfolder/updateProfile", { fulldata })
        } else {
            res.redirect('/login')
        }
    },

    postloginController: async (req, res) => {
        try {
            const { username, password } = req.body
            const check = await userData.findOne({ username })
            const passMatch = await bcrypt.compare(
                password,
                check.password
            )
            if (!passMatch) {
                return res.redirect('/login')
            }
            if (check.userType == 'admin') {
                req.session.isAdmin = true
                res.redirect('/admin/adminHome')
            } else {
                req.session.isAdmin = false
                req.session.userId = check._id
                console.log('====================================');
                console.log(check._id)
                // console.log('============hello=====================');

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

    postProfileSubmit: async (req, res) => {
        try {
            const { name, email, address, place, pincode, phone, district, state } = req.body
            console.log(req.body);

            const userId = req.session.userId
            console.log(userId);

            await profile.updateOne(
                { userD: userId },
                {
                    $set: {
                        name: name,
                        email: email,
                        address: address, // Fix the typo here
                        place: place,
                        pincode: pincode,
                        phone: phone,
                        district: district,
                        state: state,
                        userD: userId,
                    },
                },
                { upsert: true }
            );

            console.log('====================================');

            console.log('====================================');

            res.redirect("/profile")



        } catch (error) {
            console.error('Error updating profile:', error);
            res.status(500).send("Error updating profile");
        }

    }
}

module.exports = obj