/// Requiring The user Controller --------------------->
const userController=require("../controller/userController");
/// Requiring The Middleware -------------------------->
const userAuthCheck=require("../middleware/userAuthCheck");




/// Defining The Routes Related To User Controller------>
module.exports=(app)=>{

    // Route For Handeling The User Signup Request//
    app.post("/internshalaapp/api/v1/users",userController.postSignup);

    // Route For Handeling The User OTP Send Request//
    app.post("/internshalaapp/api/v1/users/otpsend",userController.postOtpSend);

    
    // Route For Checking The Otp is Valid or Not//
    app.post("/internshalaapp/api/v1/users/checkotp",userController.checkOtp);

    
    // Route For Updating The Password//
    app.put("/internshalaapp/api/v1/users/updatepassword", userController.passwordUpdate);

        
    // Route For User To Login//
    app.post("/internshalaapp/api/v1/users/login",userController.userLogin);

    // Route For Deleting The User ///
    app.delete("/internshalaapp/api/v1/users",userAuthCheck.idCheck,userAuthCheck.userCheck, userController.userDelete)

    // Route For getting The User ///
    app.get("/internshalaapp/api/v1/users/:id",userAuthCheck.idCheck,userAuthCheck.userCheck, userController.getUser)

}