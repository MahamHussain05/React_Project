import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
    {
        name :{
            type:String,
            required:true,
        },
    },
    {
        timestamps:true,
    }
);
//model class convert into database collection 

//1)_id 2)name
export default mongoose.model("category" , categorySchema)
