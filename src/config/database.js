const mongoose = require("mongoose");
const connectDb =async()=>{
    await mongoose.connect("mongodb+srv://anikethsanthan999:m7zQv1R7hfjwyUUg@reachify-backend.7a7vt.mongodb.net/?retryWrites=true&w=majority&appName=Reachify-backend")
}

module.exports={connectDb}