
import mongoose from "mongoose";

const ListSchema = mongoose.Schema({
    id:{
        type:Number,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    discription:{
        type:String,
        maxLengh:500
    },
    price:{
        type:Number,
        required:true,
    },
})

const Lists = mongoose.model('Lists',ListSchema)
export default Lists