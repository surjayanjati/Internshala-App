/// Requiring The Functions For Handeling The Controller Actions----->
const { signUp,otpSend,otpCheck } = require("../service/userService");

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