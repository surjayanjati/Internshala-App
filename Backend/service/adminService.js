/// Requiring The Admin Model ------------------------------------------------------------------>
const adminModel=require("../model/adminModel");



module.exports={
superAdminCreation
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
}