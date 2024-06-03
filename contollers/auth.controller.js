/*
Controller to register a user
*/ 

const bcrypt=require("bcryptjs")
const user_model=require("../models/user.model")

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