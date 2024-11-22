import {Request, Response} from "express";
const express=require('express');
import {authenticateToken} from "../helpers/tokens";
const router =express.Router();


router.get('/',authenticateToken,(req:Request,res:Response)=> {
    res.json({name:res.locals.user.name,email:res.locals.user.email});

});

module.exports=router;