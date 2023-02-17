const express=require("express")
const {connection}=require("./config/db")
const {NoteModel}=require("./models/Notes.model")
const {users}=require("./routes/user.router")
const {notes}=require("./routes/notes.router")
var cors = require('cors')
const app=express()
app.use(cors())
app.use(express.json())

require("dotenv").config()

app.use("/users",users)
app.use("/notes",notes)


app.get("/",(req,res)=>{
    console.log("welcome")
    res.send("Hello")
})



app.listen(process.env.port,async()=>{
    try{
       await connection
       console.log("server running")
    }
    catch(err){
        console.log(err)
    }
})