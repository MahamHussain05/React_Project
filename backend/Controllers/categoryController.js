import categoryModel from "../Models/categoryModel.js";
//Add Category 
export const addCategoryController = async (req , res)=>{
    try{
        const {name} = req.body;
        //validation
        if(!name) return res.send({error: "category Name is Required"});

        //add category
        const addCategory = await new categoryModel({
            name,
        }).save();
        //true condition
        res.status(201).send({
            success:true,
            message:"Category Added Successfully",
            addCategory,
        });
    }
    catch(error){
        console.error(error);
        //false condition 
        res.status(500).send({
            success:false,
            message:"Category Insertion has been failed",
            error,

        });
    }
};

//get All Category 
export const getAllCategoryController = async (req,res)=>{
    try{
        const findcategory = await categoryModel.find({});
        //true //200
        res.status(200).send({
            success:true,
            message:"All Category fetching Successfully",
            findcategory,
        });
    }
    catch(error)
    {  //false //500
        res.status(500).send({
            success:false,
            message:"Error in Fetching categories",
            error,
        });
    }
};


export default addCategoryController;