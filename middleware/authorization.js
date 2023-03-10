var jwt = require('jsonwebtoken');
require("dotenv").config()


const authorization=(req,res,next)=>{
    const token=req.headers.authorization
    if(token){
        jwt.verify(token,process.env.jwtsecret,async(err, decoded)=>{
            if(decoded){
                // console.log(decoded)
                const userID=decoded.userID
                req.body.userID=userID
                next()
            }
            else{
                res.send("Please login")
            }
        })
    }
    else{
        res.send("Please login")
    }
}
   





module.exports={
    authorization
}