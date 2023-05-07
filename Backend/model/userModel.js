const mongoose=require("mongoose");


const userSchema=mongoose.Schema({
    username:{
        type:String,
        unique:true,
        required:true,
        index:true
    },
    useremail:{
        type:String,
        required:true,
        unique:true,
        index:true,
    },
    userpassword:{
        type:String,
        required:true
    },
    usertype:{
        type:String,
        required:true
    },
    createdat:{
        type:Date,
        default:()=>{
            return Date.now();
        },
        immutable:true
    }
});


module.exports = mongoose.model("userdetails",userSchema)