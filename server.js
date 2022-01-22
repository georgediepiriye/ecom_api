const express = require("express")
const app = express()
const mongoose = require("mongoose")
require("dotenv").config()
const morgan = require('morgan')
const userRouter = require("./routes/user")

//middleware for logging
app.use(morgan('dev'))

app.use("/api/v1/users",userRouter);

app.use(express.json())


mongoose
.connect(process.env.MONGO_URL)
.then(()=>console.log("Connected to Database"))
.catch((err)=>{
    console.log(err)
})

app.listen(process.env.PORT,()=>{
    console.log("server running...")
})