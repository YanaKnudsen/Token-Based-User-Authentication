import {Application,Request, Response} from "express";

//import express, cors and mongoose
const express = require('express');
const cors=require('cors');
const mongoose = require('mongoose');

//create express app
const app:Application=express();

//read .env
require('dotenv').config();



//middleware for parsing json from the body
app.use(express.json());

//define cors
app.use(cors({
    credentials:true,
    origin:'http://localhost:5173',
}));



//connect to the mongoDB database
//console.log(process.env.MONGO_URL)
mongoose.connect(process.env.MONGO_URL);

const loginRouter=require('./routes/login');
const signupRouter=require('./routes/signup');
const profileRouter=require('./routes/profile');
app.use("/login",loginRouter);
app.use("/signup",signupRouter);
app.use("/profile",profileRouter);



//run server on port 3000
app.listen(3000,()=>{
    console.log(`app is running on port 3000`);
});