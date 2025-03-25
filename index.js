const express=require("express")
const app=express()
app.use(express.json())
const SECRET_KEY="supersecretadmin"
app.post("/admin/login",(req,res)=>{
    const {secret}=req.body
    if(secret===SECRET_KEY){
        res.json({message:"Access Granted"})
    }else{
        res.json({message:"Invalid Secret"})
    }
})
app.listen(5000,()=>{
    console.log("App Running at portal 5000")
})