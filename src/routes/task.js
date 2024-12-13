const express = require("express");
const User =require("../models/user");
const { userAuth } = require("../middlewares/auth");
const {validateEditRequest}=require("../utils/validateSignup");


const taskRouter= express.Router();

taskRouter.patch("/task",userAuth, async(req,res)=>{
    try{
        if(!validateEditRequest(req)){
            throw new Error("Invalid Edit reques")
        }
        const user= req.user;
        const task=req.body;
        Object.keys(req.body).forEach((key)=>(user[key]=req.body[key ]))

        await user.save();
        res.send( user.firstName+' task  updated succesfully');
        
    }catch(err){
        res.status(400).send("Error:"+ " "+err.message); 
    }
})


module.exports= {taskRouter};