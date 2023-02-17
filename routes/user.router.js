const express=require("express")
const users=express.Router()
const mongoose=require("mongoose")
const {UserModel}=require("../models/User.model")
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


users.get("/",async(req,res)=>{
    let q=req.headers.authorization
    jwt.verify(q,process.env.jwtsecret,async(err, decoded)=>{
        if(decoded){
            try{
                let data=await UserModel.find()
                res.send(data)
               }catch(err){
                console.log(err)
               }
            }
            else{
                res.send("Please Login")
            }
      })
})
users.post("/register",async(req,res)=>{
let {email,password,name}=req.body
try{
    let data=await UserModel.find({email})
        if(data.length>0){
    res.send("Already registered")
        }
    else{
    bcrypt.hash(password, 5,async(err, hash)=>{
        let data=new UserModel({email,password:hash,name})
    await data.save()
    res.send("registered")
    });
    }
}catch(err){
    console.log(err)
}
})

users.post("/login",async(req,res)=>{
    let {email,password}=req.body
    try{
        let data=await UserModel.find({email})
        if(data.length>0){
            bcrypt.compare(password, data[0].password,(err, result)=> {
                if(result){
                    var token= jwt.sign({userId:data[0]._id},"masai", {
                        expiresIn: '1h' // expires in 1 hour
                     });
                     res.send("Login sucess")
                     console.log(token)
                }
             });
        }
        else{
            res.send("wrong credentials")  
        }
    }catch(err){
        console.log(err)
    }
    })

module.exports={
    users
}