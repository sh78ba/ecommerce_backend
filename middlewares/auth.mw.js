// middleware to check for request body

const user_model=require("../models/user.model")

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

module.exports={
    verifySignUpBody:verifySignUpBody
}