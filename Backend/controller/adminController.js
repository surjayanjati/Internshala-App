const {superAdminCreation}=require("../service/adminService");



/// Controller For Handeling The Post Request Of Creating SuperAdmin ------------------------------->
exports.postSuperAdminCreation=async (req,res)=>{
    try {
        const response=await superAdminCreation(req);
        res.send({message:"Super-Admin Creation Successfull",status:200,success:true,superAdminData:response});
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
}