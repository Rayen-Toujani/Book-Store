import express, { response } from "express";
import nodemon from "nodemon";
import{PORT} from "./config.js";
import{mongo_url} from "./config.js";
import mongoose from "mongoose";
import {Book} from "./models/bookModel.js";





const app = express();

app.use(express.json());

app.get('/',(req,res)=>{
    console.log(req);
    return res.status(234).send('welcome to mern stack');

});



app.post('/books',async(req,res)=>{
    try {
        if (
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear

        ) {
            return response.status(400).send({
                message: 'Send all required fiels'
            });
            
        }

        const newbook = {
            title : req.body.title,
            author : req.body.author,
            publishYear : request.body.publishYear,
        };
        
        const book = await Book.create(newbook);
       return response.status(201).send(book);
       
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message : error.message});
    }
    
});

app.get('/books',async(req,res)=>{
    try {
        const books = await Book.find({});
        
        
        return response.status(200).json({
            count : books.length,
            data : books

        });
    } catch (error) {
        
        console.log(error.message);
        response.status(500).send({message : error.message});
    }
});

app.get('/books/:id',async(req,res)=>{
    try {
        const {id } = req.params;

        const book = await Book.findById(id);
        
        
        return response.status(200).json(book);
    } catch (error) {
        
        console.log(error.message);
        response.status(500).send({message : error.message});
    }
});

app.put('/books/:id',async (req,res)=>{
    try {
        if (!req.body.title ||
            !req.body.author ||
            !req.body.publishYear) {
            return res.status(400).send({
                message : 'send all required fiels'
            });
        }
        const {id} = req.params;
        const result = await Book.findByIdAndUpdate(id);
        if(!result){
            return res.status(404).json({message : 'book not found'});
        }

        return res.status(200).send({message:'Book updated'});
        
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message : error.message});
    }
});

app.listen(PORT , ()=>{
    console.log("app is listening");
});

mongoose.connect(mongo_url).then(()=>{
    console.log('App connected to db');

}).catch((error)=>{
    console.log(error);
})

