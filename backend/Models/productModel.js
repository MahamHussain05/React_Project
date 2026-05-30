import mongoose from "mongoose";
const productSchema = new mongoose.Schema(
    {
        name :{
            type:String,
            required:true,
        },
        price :{
            type:String,
            required:true,
        },
        file :{
            type:String,
            required:true,
        },
        description :{
            type:String,
            required:true,
        },
        category :{
            //foreign key 
            type: mongoose.Schema.Types.ObjectId,
            //name of parent collection 
            ref:"category",
            required:true,
        }, },
    {
        timestamps:true,
    }
);
//model class convert into database collection 
export default mongoose.model("product" , productSchema)
