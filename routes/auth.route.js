/*
Post localhost:8888/ecomm/api/v1/auth/signup
*/

const authController=require("../contollers/auth.controller")
const authMw=require("../middlewares/auth.mw")

module.exports=(app)=>{
    app.post("/ecomm/api/v1/auth/signup",[authMw.verifySignUpBody],authController.signup)
}

module.exports=(app)=>{
    app.post("/ecomm/api/v1/auth/signin",authController.signin)
}