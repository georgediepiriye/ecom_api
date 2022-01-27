const express = require("express")
const app = express()
const mongoose = require("mongoose")
require("dotenv").config()
const morgan = require('morgan')
const userRouter = require("./routes/user")
const authRouter = require("./routes/auth")
const productRouter = require("./routes/product")
const cartRouter = require("./routes/cart")



app.use(express.json())


//middleware for logging
app.use(morgan('dev'))

//routes
app.use("/api/v1/auth",authRouter);
app.use("/api/v1/users",userRouter);
app.use("/api/v1/products",productRouter);
app.use("/api/v1/carts",cartRouter);



mongoose
.connect(process.env.MONGO_URL)
.then(()=>console.log("Connected to Database"))
.catch((err)=>{
    console.log(err)
})

app.listen(process.env.PORT,()=>{
    console.log("server running...")
})