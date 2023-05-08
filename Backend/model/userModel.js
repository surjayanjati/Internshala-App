const mongoose=require("mongoose");
const bcrypt=require("bcrypt");
const secretKey=require("../config/secretKey");

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
    resetCode:{
        type:Number
    },
    createdat:{
        type:Date,
        default:()=>{
            return Date.now();
        },
        immutable:true
    }
});

/// Hashing The Password Before Saving------------------>
userSchema.pre("save",async function(next){
    if(this.isModified("userpassword")){
        this.userpassword=await bcrypt.hash(this.userpassword,8);
    };
    next()
})

module.exports = mongoose.model("userdetails",userSchema)