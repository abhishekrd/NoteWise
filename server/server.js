const express = require("express")
const app = express();
const pool = require("./db")
const cors = require('cors')
const noteRoutes = require("./routes/noteRoutes")

app.use(cors());
app.use(express.json())

app.use(noteRoutes);


app.listen(5000, () => {
    try{
        console.log("Server Started Running on PORT 5000!!!");
    }
    catch(err){
        console.log(err)
    }
})
