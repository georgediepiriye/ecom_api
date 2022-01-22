const mongoose = require("mongoose")

const cartSchema = new mongoose.Schema(
    {
        userId:{type:String, required:true,unique:true},
        products:[
            {
                productId:{type:Number},
                quantity:{type:Number,default:1}
            }
        ],
 
       
    },
    {timestamps:true}
)

module.exports = mongoose.model("User",cartSchema)