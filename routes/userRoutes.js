import express from "express"
import { current, login, logout, register } from "../controller/userController.js";
import jwt from "jsonwebtoken";



const userroute = express.Router();

export const validateToken = async(req, res, next) => {
    let token;
    let authHeader = await req.headers.Authorization || req.headers.authorization;
    if(authHeader && authHeader.startsWith("Bearer")){
        token = authHeader.split(" ")[1];
       jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if(err)
            {
                return res.status(401).json({msg:"User is not Authorized"})
            }
            console.log(decoded?.user)
            req.user = decoded?.user;
            next();
        });
    }
    if(!token) return res.status(401).json({msg:"User is not authorized or token is missing"})
}

userroute.post("/register", register)
userroute.post("/login", login)
userroute.get("/current",validateToken, current)
userroute.post("/logout",validateToken, logout)

export default userroute;
