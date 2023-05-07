/// Requiring The Functions For Handeling The Controller Actions----->
const { signUp } = require("../service/userService");

/// Controller For Handeling Signup Request Of User---------->
exports.postSignup = async (req, res) => {
  try {
    const response = await signUp(req, res);
    res.send({ data: response, status: 200, success: true });
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
};
