const express=require("express")
const notes=express.Router()
const mongoose=require("mongoose")
const {NoteModel}=require("../models/Notes.model")
const {authorization}=require("../middleware/authorization")


notes.get("/",authorization,async(req,res)=>{
            try{
                let data=await NoteModel.find()
                res.send(data)
               }catch(err){
                console.log(err)
               }
            })

notes.post("/create",authorization,async(req,res)=>{
let {title,author,about,userId}=req.body
try{
    let data=new NoteModel({title,author,about,userId})
    await data.save()
    res.send("created note sucessfully")
}catch(err){
    console.log(err)
}
})

notes.patch("/update/:id",authorization,async(req,res)=>{
    let q=req.body
    let id=req.params.id
    let note=await NoteModel.findOne({"_id":id})
    let user=note.userId
    let user_making_req=req.body.userId
    try{
        if(user!=user_making_req){
            res.send("you are not authorized")  
        }
        else{
            let data=await NoteModel.findByIdAndUpdate({"_id":id},q)
            res.send("updated")
        }
    }catch(err){
        console.log(err)
    }
    })

    notes.delete("/delete/:id",authorization,async(req,res)=>{
        let q=req.body
    let id=req.params.id
    let note=await NoteModel.findOne({_id:id})
    let user=note.userId
    let user_making_req=req.body.userId
    try{
        if(user==user_making_req){
            let data=await NoteModel.findByIdAndDelete({_id:id})
            res.send("deleted")
        }
        else{
            res.send("you are not authorized")  
        }
    }catch(err){
        console.log(err)
    }
    })

module.exports={
    notes
}