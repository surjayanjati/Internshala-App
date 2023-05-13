/// Requiring The Pakages --------------------------------------------->
const jwt=require("jsonwebtoken");
/// Requiring The Secret Key ------------------------------------------>
const SecretKey=require("../config/secretKey")
/// Requiring The User Model ------------------------------------------>
const userModel=require("../model/userModel");

const userIdCheck=(req,res,next)=>{
    try {
        
        const token=req.headers['userid'];
      
        if(token!==undefined && token!==""){
           
         jwt.verify(token,SecretKey.key,(err,decode)=>{
            if(err){
              return   res.send({message:"Kindly Authenticate Yourself",status:401,success:false});

            }
            req.userId=decode.id;
            next()
         })
        }else{
            res.send({message:"Kindly Authenticate Yourself",status:401,success:false});
        }
    } catch (error) {
        res.send({message:"Internal Server Error",status:500,success:false});
        
    }
 
    

};
const userAuthentication=async (req,res,next)=>{
try {

   const   userData=await userModel.findOne({_id:req.userId});
  if(userData){
   req.userDetails=userData;
   next();
  }else{
    res.send({message:"Kindly Authenticate Yourself",status:401,success:false});
  }
   
} catch (error) {
    res.send({message:"Internal Server Error",status:500,success:false});
}

}

module.exports={idCheck:userIdCheck,userCheck:userAuthentication};
