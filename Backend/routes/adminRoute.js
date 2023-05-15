/// Requiring The Controller For AdminController---------------------------------------->
const adminController=require("../controller/adminController");





module.exports=(app)=>{

    /// Routes For Handeling The Post Request Of Creating New SuperAdmin---------------->
    app.post("/internshalaapp/api/v1/superadmins",adminController.postSuperAdminCreation)
}