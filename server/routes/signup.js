//const jwt = require("jsonwebtoken");
var express = require('express');
var router = express.Router();

const User = require("../models/user");

router.post("/", async (request, response) => {
    const body = request.body;
    console.log(body);
    if (!body) {
        return response.json({status: "not ok"});
    }
    await User.create({
        username: body.username,
        displayName: body.displayName,
        email: body.email,
        password: body.password,
    });

    return response.json({status: "ok"});
});

router.get("/", (request, response) => {
    User.findOne({username: "priyanka"}, function (err, data) {if (err){
        console.log(err)
    }
    else{
        console.log("Result : ", data);
    }})

});


module.exports = router