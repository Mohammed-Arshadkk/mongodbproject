const express = require("express")
const app = express()
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const Router = require("./router/userrouter")
const Router2 = require("./router/adminrouter")
const session = require('express-session')

// session
app.use(session({
    secret: "messi",
    resave: false,
    saveUninitialized: true
}))

// set view engine
app.set("view engine","ejs")

// Middleware
app.use(bodyParser.urlencoded({extended:true}))

// connect mongoose
mongoose.connect("mongodb://127.0.0.1:27017/MongoProject?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2")
.then(()=>{
    console.log("Data is connected");
})
.catch((err)=>{
    console.log(err);
})

app.use("/",Router)
app.use("/admin",Router2)

app.listen(5000,()=>{
    console.log("server Running.....");
})