const express=require("express")
const jwt=require("jsonwebtoken")
const app=express()
app.use(express.json())
const SECRET_KEY="supersecretadmin"
const JWT_SECRET='your_jwt_secret'
const verifyJWT=(req,res,next)=>{
    const token=req.headers['authorization']//we will pass headers in the fronend that will contain key as 'authorization
    if(!token){
        return res.status(401).json({message:"No token provided"})
    }
    try {
    //  const decodedtOKEN=jwt.verify(token)
     console.log(token)   
    }catch(error){
        return res.status(402).json({message:"Invalid Token"})
    }
}
app.post("/admin/login",(req,res)=>{
    const {secret}=req.body
    if(secret===SECRET_KEY){
        const token=jwt.sign({role:"admin"},JWT_SECRET,{expiresIn:"24h"})
        res.json({token})
    }else{
        res.json({message:"Invalid Secret"})
    }
})

app.listen(5000,()=>{
    console.log("App Running at port 5000")
})