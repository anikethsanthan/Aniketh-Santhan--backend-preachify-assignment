const express =require("express");
const {connectDb}= require("./config/database")

const app= express();
app.use((req,res)=>{res.send("Hello")})


connectDb().then(()=>{
    console.log("Connection established to database");
    app.listen(5678,()=>{
        console.log("Server running successfully");
    })
    
}
    ).catch(()=>{
        console.log(" unsuccessfull connection with the database")
    }
    
)