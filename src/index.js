const express =require("express");
const {connectDb}= require("./config/database")

const User =require("./models/user");


const cookieparser=require("cookie-parser");
const cors=require("cors");




const app=express()
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(express.json());
app.use(cookieparser());

const {authRouter}=require("./routes/auth");

app.use("/",authRouter);







connectDb().then(()=>{
    console.log("Connection established to database");
    app.listen(8888,()=>{
        console.log("Server running successfully");
    })
    
}
    ).catch(()=>{
        console.log(" unsuccessfull connection with the database")
    }
    
)