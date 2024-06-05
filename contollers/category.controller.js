/*
POST /ecomm/api/v1/categories

*/
const category_model=require("../models/category.model")

exports.createNewCategory=async(req,res)=>{
    //read req body


    //create category object
    const cat_data={
        name:req.body.name,
        description:req.body.description
    }

    //insert into mongodb
    try{
        const category= await category_model.create(cat_data)
        return res.status(201).send(category)
    }catch(err){
        console.log("error while creating the category",err)
        return res.status(500).send({
            message:"error while creating the category"
        })
    }


    //return the response of the created category

}