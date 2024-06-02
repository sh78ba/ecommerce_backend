/*
Starting file of the project
*/

const express=require("express");
const mongoose=require("mongoose");
const server_cofig= require("./configs/server.config");
const app=express();
const db_config=require("./configs/db.config")


mongoose.connect(db_config.DB_URL);
const db=mongoose.connection;

db.on("error",()=>{
    console.log("Error while connecting to DB");
})

db.once("open",()=>{
    console.log("Connected to Db");
})

app.listen(server_cofig.PORT,()=>{
    console.log("Server started port: ",server_cofig.PORT);
})
