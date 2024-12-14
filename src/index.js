const express =require("express");
const {connectDb}= require("./config/database")

const User =require("./models/user");


const cookieparser=require("cookie-parser");
const cors=require("cors");



//Server
const app=express()
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
    methods: ["GET", "POST", "PATCH", "DELETE"],
}))
app.use(express.json());
app.use(cookieparser());


app.get("/", (req, res) => {
    res.send("Welcome to the backend API");
});
module.exports = (req, res) => {
    res.status(200).send("Server is running!");
};


const {authRouter}=require("./routes/auth");
const { taskRouter } = require("./routes/task");


app.use("/",authRouter);
app.use("/",taskRouter);








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

module.exports = app; 