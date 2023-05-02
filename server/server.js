const express = require("express")
const app = express();
const pool = require("./db")
const cors = require('cors')
const noteRoutes = require("./routes/noteRoutes")
const userRoutes = require("./routes/userRoutes")
require("dotenv").config()


app.use(cors());
app.use(express.json())

app.use(noteRoutes);
app.use(userRoutes);

app.listen(5000, () => {
    try{
        console.log("Server Started Running on PORT 5000!!!...");
    }
    catch(err){
        console.log(err)
    }
})
