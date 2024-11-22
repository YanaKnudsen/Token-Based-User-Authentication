import {NextFunction, Request, Response} from "express";
import {User} from "../@types/User";
const express=require('express');
const bcrypt=require("bcryptjs");
const router =express.Router();
//import user model
const UserModel = require("../models/UserModel");
//import helpers
const {generateAccessToken} = require('../helpers/tokens')

router.post("/",async (req:Request,res:Response) =>{
   const {loginEmail,loginPassword}=req.body;
   //find user with this email in the databse
   const userInfo:User = await UserModel.findOne({loginEmail})
   //if user exists in the database
   if(userInfo){
      //compare passwords
      const passOk= await bcrypt.compareSync(loginPassword,userInfo.password);
      if(passOk){
         //generate AccessToken
         const accessToken = generateAccessToken(userInfo);
         //rend accessToken to client
         //correct status
         res.status(200).json({accessToken});
      }
      else{
         //implement so it is visible on the client side
         res.status(422).json('password is incorrect');
      }
   }
   else{
      //send status
      res.json('user not found');
   }
})


module.exports=router;