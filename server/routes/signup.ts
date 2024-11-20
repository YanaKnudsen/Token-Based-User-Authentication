import {Request, Response} from "express";
import {User} from "../@types/User";
const express=require('express');
const bcrypt=require("bcryptjs");
const UserModel = require("../models/UserModel");

const router =express.Router();
const bcryptSalt=bcrypt.genSaltSync(8);

router.get("/",async (req:Request,res:Response) =>{
    const {name,email,password}=req.body;
    try{
        //create user in the database
        const userInfo:User = await UserModel.create({
            name,
            email,
            password:bcrypt.hashSync(password,bcryptSalt),
        });
        res.json(userInfo);
    }
    catch(e){
        res.status(422).json(e);
    }
})



module.exports=router;