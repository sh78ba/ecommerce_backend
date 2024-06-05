// middleware to check for request body

const user_model=require("../models/user.model")
const jwt=require("jsonwebtoken")
const auth_config=require("../configs/auth.config")
const verifySignUpBody=async (req,res,next)=>{
    
    try{
        //check for name
        if(!req.body.name){
            return res.status(400).send({
                message:"Failed ! Name was not provided in request body"
            })
        }
      
        //check for email

        if(!req.body.email){
            return res.status(400).send({
                message:"Failed ! Email was not provided in request body"
            })
        }


        //check for userId
        if(!req.body.userId){
            return res.status(400).send({
                message:"Failed ! userId was not provided in request body"
            })
        }

        //check if the user with the same userId is already present

        const user=await user_model.findOne({userId:req.body.userId})
        if(user){
            return res.status(400).send({
                message:"Failed ! User with same userId is already present"
            })
        }

        next();

    }
    catch(err){
        console.log("Error while validating the request object",err)
        res.status(500).send({
            message:"Error while validating the request body"
        })
    }
}

const verifySignInBody=async(req,res,next)=>{
if(!req.body.userId){
    return res.status(400).send({
        message:"User Id is  not provided"
    })
}

if(!req.body.password){
    return res.status(400).send({
        message:"Password is  not provided"
    })
}
next();

}

const verifyToken=(req,res,next)=>{
    //check if token is present in the header
    const token=req.header("x-access-token")

    if(!token){
        return res.status(403).send({
            message:"No token found:UnAuthorized"
        })
    }
     //if it's valid token
   jwt.verify(token,auth_config.secret,async(err,decoded)=>{
    if(err){
        return res.status(401).send({
            message:"UnAuthorized!!"
        })
    }
    const user=await user_model.findOne({userId:decoded.id})
    if(!user){
        return res.status(400).send({
            message:"UnAuthorized, the user for this token doesn't exists"
        })
    }
    ///set the user info in the req body
    req.user=user

    next()
   })
  
    //move to next step   
}

const isAdmin=(req,res,next)=>{
    const user=req.user
    if(user&&user.userType=="ADMIN"){
        next()
    }else{
        return res.status(403).send({
            message:"Only ADMIN users are allowed to access this end point"
        })
    }
}

module.exports={
    verifySignUpBody:verifySignUpBody,
    verifySignInBody:verifySignInBody,
    verifyToken:verifyToken,
    isAdmin:isAdmin
}