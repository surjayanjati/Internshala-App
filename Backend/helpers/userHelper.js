/// Requiring The Pakages--------------------------------->
const jwt=require("jsonwebtoken");
/// Requiring The SecretKey ------------------------------>
const SecretKey=require("../config/secretKey");

/// Function For Generatiing The Token-/
const generateToken=(userId)=>{
    const token =jwt.sign({id:userId},SecretKey.key,{expiresIn:"1w"});
    return token;
};

module.exports={generateToken:generateToken}