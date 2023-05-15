/// Requiring The Controller For AdminController---------------------------------------->
const adminController=require("../controller/adminController");





module.exports=(app)=>{

    /// Routes For Handeling The Post Request Of Creating New SuperAdmin---------------->
    app.post("/internshalaapp/api/v1/superadmins",adminController.postSuperAdminCreation)

    /// Routes For Handeling The Login Request of The Super Admin ---------------------->

    app.post("/internshalaapp/api/v1/superadmins/login",adminController.superAdminLogin)

    /// Routes For Handeling The Put Request of Creating New Admins-------------------->
    
    app.put("/internshalaapp/api/v1/superadmins",adminController.adminCreation)
}