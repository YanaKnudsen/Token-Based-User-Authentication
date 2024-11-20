import {User} from "../@types/User";

const jwt=require("jsonwebtoken");
// function for generating access token
function generateAccessToken(userInfo:User){
    //15min
    return jwt.sign({email:userInfo.email, id:userInfo._id,},process.env.ACCESS_TOKEN_SECRET,{});
}

module.exports = {generateAccessToken}