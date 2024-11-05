const mongoose = require('mongoose')
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const User = require('../models/user')
const saltRounds = 10;
dotenv.config();

const signupUser = async (req,res) => {
  try {
    const { name, email, password } = await req.body;
      if(!name || !email || !password){
         return res.send("Please Enter all the Fields!");
      }

    const regexForEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    const isValidEmail = (mail, pattern) => {
         return pattern.test(mail)
    }
    
    if(!isValidEmail(email, regexForEmail)){
       return res.status(400).json({error:"Please enter valid email"})
    }
    
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPass = await bcrypt.hash(password, salt);

    const newUser = new User({
         name:name,
         email:email,
         password:hashedPass
    })

    await newUser.save()
    res.status(200).json({message: "Signup Successful!"});
    console.log(newUser);

    } catch (error) {
        console.log(error);
    }
      
}

const signinUser = async (req,res) => {
    try {
        const { email, password } = await req.body;
        if(!email || !password){
            return res.json("Please enter all the fields!");
        }
        
        const existUser = await User.find({email:email})
        if(existUser.length === 0){
            return res.status(401).json("Signup first...then you can login!")
        }

        console.log("EXIST USER : ", existUser);
        
        const user = existUser[0];
        const isValid = await bcrypt.compare(password, user.password);
        if(!isValid){
                return res.status(401).json("Invalid Email or Password!");
        }
        
        const token = await jwt.sign({user_id:user._id}, process.env.JWT_SECRET);
        return res.json({
            message:"Sign in Successfull!",
            user:user,
            token:token
        })
   
    } catch (error) {
        console.log(error);
    }
}


module.exports = {signupUser,signinUser};