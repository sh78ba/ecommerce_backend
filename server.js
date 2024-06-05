/*
Starting file of the project
*/

const express=require("express");
const mongoose=require("mongoose");
const server_cofig= require("./configs/server.config");
const app=express();
const db_config=require("./configs/db.config")
const user_model=require("./models/user.model");
const bcrypt=require("bcryptjs");

app.use(express.json())

mongoose.connect(db_config.DB_URL);
const db=mongoose.connection;

db.on("error",()=>{
    console.log("Error while connecting to DB");
})

db.once("open",()=>{
    console.log("Connected to Db");
    init();
})


async function init(){
    let user=await user_model.findOne({userId:"admin"})
    if(user){
        console.log("Admin already present");
        return;
    }
    try{
        user=await user_model.create({
            name:"Admin",
            userId:"admin",
            email:"admin@gmail.com",
            userType:"ADMIN",
            password:bcrypt.hashSync("Welcome1",8)
        })
        console.log("Admin Created",user);
    }catch(err){
        console.log("Error while creating admin",err)
    }
}

// stitch the route to the server
require("./routes/auth.route")(app);

require("./routes/category.routes")(app);



app.listen(server_cofig.PORT,()=>{
    console.log("Server started port: ",server_cofig.PORT);
})

