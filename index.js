const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");

dotenv.config();
mongoose.connect(process.env.mongo_url)
.then(()=>{console.log("DB connection is successfull")})
.catch((err)=>{
    console.log(err);
})

const app = express();
app.use(express.json());
app.use('/', userRoute);
app.get('/testing', (req, res)=>{
    res.status(200).send("Hello the basics have been setup...");
})
const port = process.env.PORT || 9000
app.listen(port, ()=>{
    console.log("Listening on port", port);
})