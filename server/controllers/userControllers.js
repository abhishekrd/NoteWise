const pool = require("../db");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken")
const saltRounds = 10;
dotenv.config();

const signupUser = async (req,res) => {
  try {
    const { name, email, password } = await req.body;
      if(!name || !email || !password){
         return res.send("Please Enter all the Fields!");
      }
    
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPass = await bcrypt.hash(password, salt);

    const newUser = await pool.query("INSERT INTO users (name, email, password) VALUES($1, $2, $3)", [name, email, hashedPass])
    res.json("Signup Successful!");
    console.log(newUser.rows);

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
        
        const existUser = await pool.query("SELECT * FROM users WHERE email = $1",[email]);
        if(existUser.rows.length === 0){
            return res.json("You have not signed up yet, Please signup before signing in!");
        }

        const user = existUser.rows[0];
        const isValid = await bcrypt.compare(password, user.password);
        if(!isValid){
            return res.json("Invalid Email or Password!");
        }
        
        const token = await jwt.sign({user_id:user.user_id}, process.env.JWT_SECRET);

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