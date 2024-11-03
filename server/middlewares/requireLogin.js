const express = require("express");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const mongoose = require("mongoose")
const User = require('../models/user')
dotenv.config();

const isLoggedin = async (req,res,next) => {
    const authHeader = await req.headers['authorization'];
    console.log(authHeader);
    if(!authHeader){
        return res.json("You must be logged in!")
    }
    const token = await authHeader.split(" ")[1];
    //console.log(token);
    // console.log(typeof(token));
    // console.log(typeof(process.env.JWT_SECRET));
    //console.log(process.env.JWT_SECRET);


  jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
       if(err){
        return res.json(err);
       }

       const {user_id} = payload;
          
       const userFound = await User.findById(user_id)
       console.log("USERFOUND : ", userFound);
       
       if(!userFound){
          return res.json("JWT Error: User not found")
       }
       const user = userFound;

       req.user = user;
       next();
    })

  
}

module.exports = isLoggedin