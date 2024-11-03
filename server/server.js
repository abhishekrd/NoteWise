const express = require("express")
const app = express();
const cors = require('cors')
const mongoose = require('mongoose')
const noteRoutes = require("./routes/noteRoutes")
const userRoutes = require("./routes/userRoutes")
require("dotenv").config()

app.use(cors());

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser:true, useUnifiedTopology:true })
.then(() => console.log('Connected to MongoDB!!!'))
.catch((err) => console.log(err))

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
