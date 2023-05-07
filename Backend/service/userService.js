/// Requiring The userModel From The Model Folder----------------------------->
const userModel=require("../model/userModel");




/// Exporting All The Function------------------------------------------------>
module.exports={
    signUp
}


/// Function For The User's Signup/////
async function signUp(req,res){
  const{username,useremail,userpassword,usertype}=req.body;
    const userData=new userModel({
        username:username,
        useremail:useremail,
        userpassword:userpassword,
        usertype:usertype
    });

    const response=await userData.save();

    if(response!==null){
        return response;
    }else{
        throw new Error("Unable To Signup");
    }

}