const jwt = require("jsonwebtoken");
var express = require('express');
var router = express.Router();
const bycrypt = require("bcrypt")
const JWT_SECRET = "9FpBFd*eF*z2?4X!dA%Pdp/})Y&-B[$;"

const User = require("../models/user");



router.post("/", async (request, response) => {
    const hashed_password = await bycrypt.hash(request.body.password, 10);

    const body = request.body;
    console.log("navigating to signup");
    console.log(body);
       
    if (!body) {
        errors.push("no request body");
    }
    let errors = []
    if (await User.exists({username: body.username})) {
        errors.push("username exists");
    }
    if (body.username.length < 5 || body.username.length > 50) {
        errors.push("username must be between 5 and 50 characters.")
    }
    if (await User.exists({email: body.email})) {
        errors.push("email exists");
    }
    if (errors.length > 0) {
        return response.send({status: "error", errors: errors})
    }

    await User.create({
        username: body.username,
        displayName: body.displayName,
        email: body.email,
        password: body.password,
    });
    const token = jwt.sign({
        username: body.username,
        email: body.email,
    },
    JWT_SECRET
    );

    return response.send({status: "ok"});
});

// router.get("/", (request, response) => {
//     User.findOne({username: "priyanka"}, function (err, data) {if (err){
//         console.log(err)
//     }
//     else{
//         console.log("Result : ", data);
//     }})

// });


module.exports = router