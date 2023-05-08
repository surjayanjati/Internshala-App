/// Requiring The user Controller --------------------->
const userController=require("../controller/userController");





/// Defining The Routes Related To User Controller------>
module.exports=(app)=>{

    // Route For Handeling The User Signup Request//
    app.post("/internshalaapp/api/v1/users",userController.postSignup);

    // Route For Handeling The User OTP Send Request//
    app.post("/internshalaapp/api/v1/users/otpsend",userController.postOtpSend);
}