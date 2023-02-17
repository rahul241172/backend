const mongoose=require("mongoose")



const notesSchema=mongoose.Schema({
    title:String,
   about:String,
   author:String,
   userId:String
})


const NoteModel=mongoose.model("note",notesSchema)



module.exports={
    NoteModel
}