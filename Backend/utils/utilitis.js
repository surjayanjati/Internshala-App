/// Requiring The Pakages ---------------------------------------------------->
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
/// Requiring The SecretKey --------------------------------------------------->
const SecretKey=require("../config/secretKey");
/// Function For Checking The Password When User is Login-/
const checkPassword= async(passwords)=>{

   const checkPasswordMatchingResponse=await bcrypt.compare(passwords.givenPassword,passwords.dataBasePassword);
  
   if(checkPasswordMatchingResponse===true){

    return true;
   }else {
 throw new Error("Password Is Not Matching")
   }
};

/// Function For Generating Token When User Has Login-/
const generateToken=(userId)=>{
    const token =jwt.sign({id:userId},SecretKey.key,{expiresIn:"1w"});
    if(token){
        return token;
    }else {
        throw new Error("Internal Server Error");
    }
};


module.exports={checkPassword:checkPassword,generateToken:generateToken};