const { signUp,otpSend,otpCheck,updatePassword,login,deleteUser,getUserDetails } = require("../service/userService");

/// Controller For Handeling Signup Request Of User---------->
exports.postSignup = async (req, res) => {
  try {
    const response = await signUp(req, res);
    res.send({ data: response, status: 200, success: true });
  } catch (error) {
    if (error.code === 11000) {
      // if the error is a duplicate key error
      const duplicateField = error.message.match(/(?<=index:\s)(\w+)_/)[1];
      
      const errorMessage = `${duplicateField} is already taken`;
      // send an error response with the customized message
      res.send({message:errorMessage,status:400,success:false});
    } else {
      res.send({
        message: "Internal Server Error",
        status: 500,
        success: false,
      });
    }
  }
};

/// Controller For Sending The Otp to Email For Password Change-->
exports.postOtpSend=async (req,res)=>{
     try {
     
      const response=await otpSend(req,res);
       if(response===true){
        res.send({message:"OTP Has Been Sent To Your Email",success:true,status:200});
       }else if(response===false){
        res.send({msg:"The Email Doesn't Exists",success:false,status:401})
       }
     } catch (error) {
      res.send({
        message: "Internal Server Error",
        status: 500,
        success: false,
      });
     }
};


/// Controller For Veryfing The Otp given From The User Side With The Otp Available in Database---->

exports.checkOtp=async(req,res)=>{
   try {
    const response=await otpCheck(req,res);
    if(response===true){
      res.send({message:"Otp Validation Successfull",status:200,success:true});
    }else{
      res.send({message:"Internal Server Error",status:500,success:false});
    }
   } catch (error) {
    res.send({message:error.message,status:401,success:false});
   }
}


/// Controller For Updating The Password after Otp Verification is Done --------------------------->

exports.passwordUpdate=async(req,res)=>{

  try {
    const response =await updatePassword(req,res);
    if(response===true){ 
   res.send({message:"Password Has Been Updated Successfully",status:200,success:true});
    }else{
      res.send({message:"Internal Server Error",status:500,success:false});
    }
  } catch (error) {
    res.send({message:error.message,status:500,success:false});
  }

};


/// Controller For The User So He/She can Login --------------------------------------------------->

exports.userLogin=async (req,res)=>{

  try {
    const response=await login(req,res);
    if(response.login===true){
    res.send({message:"Login Successfull",status:200,success:true,data:response.userData,loginToken:response.token});
    }else if(response.login===false){
      res.send({message:"Incorrect Email or Password",status:401,success:false});
    }
  } catch (error) {
    res.send({message:"Internal Server Error",status:500,success:false})
  }

};


/// Controller For The Logged in User so that they can delete their account------------------------->

exports.userDelete=async (req,res)=>{
  try {
   const {id,username}=req.userDetails;
   const deleteResponse=await deleteUser(id);
   res.send(deleteResponse);
   
  } catch (error) {
    res.send({message:error.message,status:500,success:false});
  }
};


/// Controller For Getting The Details of User ----------------------------------------------------->
exports.getUser=async (req,res)=>{
  try {

    const getResponse=await getUserDetails(req);
    res.send({message:"User Data Has Been Found",status:200,success:true,userData:getResponse});
  } catch (error) {
    res.send({message:error.message,status:500,success:false})
  }
}