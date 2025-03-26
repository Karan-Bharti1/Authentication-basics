const express=require("express")
const cors=require("cors")
const jwt=require("jsonwebtoken")
const app=express()
app.use(express.json())
const SECRET_KEY="supersecretadmin"
const JWT_SECRET='your_jwt_secret'
const corsOptions={
    origin:"*",
    credentials:true,
    optionsSuccessStatus:200,
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "Authorization"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
}
app.use(cors(corsOptions))
const verifyJWT=(req,res,next)=>{
    const token=req.headers['authorization']//we will pass headers in the fronend that will contain key as 'authorization
    if(!token){
        return res.status(401).json({message:"No token provided"})
    }
    try {
     const decodedtOKEN=jwt.verify(token,JWT_SECRET)
     res.user=decodedtOKEN
     next()
    
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
app.get('/admin/api/data',verifyJWT,(req,res)=>{
    res.json({message:"Protected route accessible"})
})
app.listen(5000,()=>{
    console.log("App Running at port 5000")
})