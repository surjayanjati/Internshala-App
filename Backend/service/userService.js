/// Requiring The userModel From The Model Folder----------------------------->
const userModel = require("../model/userModel");
const nodemailer = require("nodemailer");
/// Requiring The Pakages ---------------------------------------------------->
const bcrypt=require("bcrypt");
/// Requiring The Helper Functions From userHelper---------------------------->
const userHelper=require("../helpers/userHelper");


/// Exporting All The Function------------------------------------------------>
module.exports = {
  signUp,
  otpSend,
  otpCheck,
  updatePassword,
  login,
  deleteUser
};

/// Function For The User's Signup/////
async function signUp(req, res) {
  const { username, useremail, userpassword, usertype } = req.body;
  const userData = new userModel({
    username: username,
    useremail: useremail,
    userpassword: userpassword,
    usertype: usertype,
  });

  const response = await userData.save();

  if (response !== null) {
    return response;
  } else {
    throw new Error("Unable To Signup");
  }
}

/// Function For Sending The OTP///////
async function otpSend(req, res) {
  const { email } = req.body;

 const findEmailResponse=await userModel.findOne({useremail:email});
 if(findEmailResponse!==null){
  // generate the OTP
  const otp = Math.floor(1000 + Math.random() * 9000);
  console.log(otp);
  // Saving The OTP In The Database

  const otpUpdateInDatabaseResponse = await userModel.updateOne(
    { useremail: email },
    { $set: { resetCode: otp } }
  );
  if (otpUpdateInDatabaseResponse.acknowledged === true) {
    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: "chester.jacobi51@ethereal.email",
        pass: "VVYTAUgUtvKKpjR7Q1",
      },
    });

    // setup email data
    const mailOptions = {
      from: "chester.jacobi51@ethereal.email",
      to: "recipient@example.com",
      subject: "OTP Verification",
      text: "Your OTP is " + otp,
    };

    // send mail with defined transport object
    let info = await transporter.sendMail(mailOptions);
    if (info.accepted[0] !== null) {
      return true;
    } else {
      throw new Error("Kindly Try Again");
    }
  } else {
    throw new Error("Kindly Try Again");
  }
 }else {
    return false;
 }


}


/// Function For Checking The Otp is Valid or Not

async function otpCheck(req,res){
   const {useremail,userOtp}=req.body;
   const userData=await userModel.findOne({useremail:useremail});

   if(userData){
   if(userData.resetCode===userOtp){
    return true;
   }else{
    throw new Error("The Otp Is Not Matching");
   }
   }else{
    throw new Error("Kindly Signup First")
   }
};


/// Function For Updating Password ------------->
async function updatePassword(req,res){
 
  const {useremail,password,confirmPassword}=req.body;

  const userData=await userModel.findOne({useremail:useremail});

  if(userData){
   const newPassword=await bcrypt.hash(password,8);
   if(newPassword){
  const updatePassword=await userModel.updateOne({useremail:useremail,userpassword:newPassword});
  if(updatePassword.acknowledged===true){
    return true;
  }else{
    throw new Error ("Internal Server Error");
  }
   }else {
    throw new Error ("Internal Server Error");
   }
    }else{
     throw new Error("Kindly Signup First")
    }

};


/// Function For The User To Login ----------------->

async function login(req,res){
  const {useremail,userpassword}=req.body;

  const userData=await userModel.findOne({useremail:useremail});
  if(userData){
   const passwordCheck=await bcrypt.compare(userpassword,userData.userpassword);
   if(passwordCheck===true){

  const token=userHelper.generateToken(userData.id);
    if(token){
    return {login:true,userData:userData,token:token};
   }else{
    return {login:false};
   }

   
   }else {
    return {login:false};
   }
   
  }else{
    return {login:false};
  }
};


/// Function For Deleting The User -------------->
async function deleteUser(userId){
  const deleteData=await userModel.deleteOne({_id:userId});
  if(deleteData.acknowledged===true){
    return {message:"Your Account Has Been Deleted",status:200,success:true};
  }else {
    throw new Error("Unable To Delete The User");
  }
}
