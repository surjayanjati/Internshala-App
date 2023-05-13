/// Requiring The JosnWeb Token -------------------------->\
const jwt=require("jsonwebtoken");
/// Requiring The SecretKey ------------------------------>
const SecretKey=require("../config/secretKey");

/// Function For Generating The Token with Jsonwebtoke --->
const generateToken=(userId)=>{

const secretKey=SecretKey;
const expiresIn="1w";
const payload={
 userId:userId
};
console.log(secretKey);
const token =jwt.sign(payload,secretKey,{expiresIn});
if(token){
    return {tokenGenerated:true,token:token};
}else{
   return{tokenGenerated:false,token:""};
}

};

module.exports={generateToken};