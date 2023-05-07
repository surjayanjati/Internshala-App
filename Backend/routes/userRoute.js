/// Requiring The user Controller --------------------->
const userController=require("../controller/userController");





/// Defining The Routes Related To User Controller------>
module.exports=(app)=>{
    app.post("/internshalaapp/api/v1/users",userController.postSignup);
}