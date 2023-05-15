/// Requiring The Admin Model ------------------------------------------------------------------>
const adminModel=require("../model/adminModel");
/// Requring The Utilitis ---------------------------------------------------------------------->
const utilitis=require("../utils/utilitis");


module.exports={
superAdminCreation,
superAdminLoginService
};

/// Function For Handeling The Post Request For SuperAdmin Creation------/
async function superAdminCreation(req){
  const {superAdminName,superAdminEmail,superAdminPassword}=req.body;
  const superAdminData=new adminModel({
    superAdminName:superAdminName,
    superAdminEmail:superAdminEmail,
    superAdminPassword:superAdminPassword,
     });

     const response =await superAdminData.save();
     if(response){
      return response;
     }else{
  throw new Error("Unable To Save Data")
     }
};

/// Function For Handeling The Login Request For Super Admin ------------/
async function superAdminLoginService(req,res){
 const {superAdminEmail,superAdminPassword}=req.body;

 const findingResponse=await adminModel.findOne({superAdminEmail:superAdminEmail});
 if (findingResponse) {
   const passwordCheckResponse=await utilitis.checkPassword({givenPassword:superAdminPassword,dataBasePassword:findingResponse.superAdminPassword});
   const tokenResponse=utilitis.generateToken(findingResponse.id);

   if(tokenResponse){
  return ({superAdminData:findingResponse,token:tokenResponse});
   }
 }else{
  throw new Error("Check Your Email")
 }
}