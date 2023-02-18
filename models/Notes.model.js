const mongoose=require("mongoose")



const notesSchema=mongoose.Schema({
    title:String,
   note:String,
   category:String,
   userID:String
})


const NoteModel=mongoose.model("note",notesSchema)



module.exports={
    NoteModel
}