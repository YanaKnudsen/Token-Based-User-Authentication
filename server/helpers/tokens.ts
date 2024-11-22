import {User} from "../@types/User";
import {NextFunction, Request, Response} from "express";
const UserModel = require("../models/UserModel");

const jwt=require("jsonwebtoken");
// function for generating access token
export function generateAccessToken(userInfo:User){
    //15min
    return jwt.sign({email:userInfo.email, id:userInfo._id,},process.env.ACCESS_TOKEN_SECRET,{});
}


export function authenticateToken(req:Request,res:Response,next:NextFunction){
    console.log("authenticating");
    const authHeader=req.headers.authorization;
    const accessToken = authHeader?.split(" ")[1]
    if (accessToken==null){
        return res.sendStatus(401);
    }
    else{
        jwt.verify(accessToken,process.env.ACCESS_TOKEN_SECRET,async (err:Error,user:any)=>{

            if (err) res.sendStatus(403);
            console.log(user);
            const {email}=user;
            console.log(email);
            const userInfo = await UserModel.findOne({email: email});
            res.locals.user=userInfo;
            next();
        });
    }

}

//module.exports = {generateAccessToken,authenticateToken}