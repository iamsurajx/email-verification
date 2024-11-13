import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true
    },
    isVerified:{
        type:Boolean,
        default:false,
    },
    verificationCode:{
        type:String,
    }
})

const Usermodel=mongoose.model("User", userSchema);
export default Usermodel;