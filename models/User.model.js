const mongoose=require("mongoose")



const userSchema=mongoose.Schema({
    name:{required:String},
   email:{required:String},
   password:{required:String}
})


const UserModel=mongoose.model("user",userSchema)



module.exports={
    UserModel
}