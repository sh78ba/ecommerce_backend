/*
Controller to register a user
*/ 

const bcrypt=require("bcryptjs")
const user_model=require("../models/user.model")
const secret=require("../configs/auth.config")
const jwt=require("jsonwebtoken")

exports.signup=async(req,res)=>{
    //read the request bidy
    const request_body=req.body

    //insert the data in Users collection in MongoDb
    const userObj={
        name:request_body.name,
        userId:request_body.userId,
        email:request_body.email,
        userType:request_body.userType,
        password:bcrypt.hashSync(request_body.password,8)
    }

    try{
        const user_created=await user_model.create(userObj);
        
        const res_obj={
            name:user_created.name,
            userId:user_created.userId,
            email:user_created.email,
            userType:user_created.userType,
            createdAt:user_created.createdAt,
            updatedAt:user_created.updatedAt
        }

        res.status(201).send(res_obj)


    }catch(err){
        console.log("Error while registering user",err)
        res.status(500).send({
            message:"Some error occured while registering the user"
        })
    }

    //return the response back to user
}


exports.signin=async(req,res)=>{
//check if userid is present
const user=await user_model.findOne({userId:req.body.userId})
if(user==null){
return res.status(400).send({
    message:"User Id passed is not a valid user id"
})
}

//check if password is correct
const isPasswordValid=bcrypt.compareSync(req.body.password,user.password)
if(!isPasswordValid){
    res.status(401).send({
        message:"Wrong password passed"
    })
}

//using jwt create access token with given TTL and return
const token=jwt.sign({id:user.userId},secret.secret,{
    expiresIn:120
})

res.status(200).send({
    name : user.name,
    userId : user.userId,
    email:user.email,
    userType:user.userType,
    accessToken: token
})

}