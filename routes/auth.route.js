/*
Post localhost:8888/ecomm/api/v1/auth/signup
*/

const authController=require("../contollers/auth.controller")

module.exports=(app)=>{
    app.post("/ecomm/api/v1/auth/signup",authController.signup)
}