import express from "express";
import nodemon from "nodemon";
import{PORT} from "./config.js";
import{mongo_url} from "./config.js";
import mongoose from "mongoose";





const app = express();

app.get('/',(req,res)=>{
    console.log(req);
    return res.status(234).send('welcome to mern stack');

});

app.listen(PORT , ()=>{
    console.log("app is listening");
});

mongoose.connect(mongo_url).then(()=>{
    console.log('App connected to db');

}).catch((error)=>{
    console.log(error);
})

