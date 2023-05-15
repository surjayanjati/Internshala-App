const mongoose=require("mongoose");
const bcrypt=require("bcrypt");

const adminSchema=mongoose.Schema({
    superAdminName:{
        type:String,
        required:true,
        index:true,
        unique:true,
       
    },
    superAdminEmail:{
     type:String,
     required:true,
     unique:true,
     index:true
    },
    superAdminPassword:{
  type:String,
  required:true
    },
    adminType:{
        type:String,
        required:true,
        unique:true,
        index:true,
        default:"Super-Admin"
    },

    admins:[{
        adminName:{
            type:String,
            required:true,
            unique:true,
            index:true,
        },
        adminEmail:{
            type:String,
            required:true,
            unique:true,
            index:true,
        },
        adminPassword:{
            type:String,
            required:true,
         
        },
        adminCreated:{
            type:Date,
            default:()=>{
                return Date.now();
            }
        },
        adminType:{
            type:String,
            required:true,
            default:"admin"
        },
        adminModified:{
            type:Date,
        }
    }]
});

adminSchema.pre("save",async function(next){
  
    if(this.isModified("superAdminPassword")){
      
     this.superAdminPassword=await bcrypt.hash(this.superAdminPassword,8);
    };
    next()
})


module.exports=mongoose.model("admindetails",adminSchema);