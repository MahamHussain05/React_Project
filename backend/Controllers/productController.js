import multer from "multer"
import path from "path"
import productModel from "../Models/productModel.js";
import fs from "fs"
//multer
//store uploaded file in this folder // using multer
const storage = multer.diskStorage({
    destination: function (req,file , cb)
    {
        cb(null, "uploads/") // directory to store uploaded files
     },
     filename: function (req, file,cb)
     {
        cb(null , Date.now() + path.extname(file.originalname)); // unique filename
     },
});
//create function of add product 
export const addProductController = async (req,res)=>{
    try{
        const {name , price , description , category} = req.body;
        const file = req.file ? req.file.path:null;
        //validation
        if(!name) return res.status(400).send({error:"Product Name is required"});
        if(!price) return res.status(400).send({error:"Product Price is required"});
        if(!description) return res.status(400).send({error:"Product Description is required"});
        if(!file) return res.status(400).send({error:"Product file is required"});
        if(!category) return res.status(400).send({error:"Category is required"});
     const product = new productModel
     ({
        name, price, description, file, category,
     });
     await product.save();
     res.status(201).send({
        success:true,
        message:"Product Added Successfully",
        product,
     });
    }
    catch(error)
    {  console.error(error);
        res.status(500).send({
            success:false,
            message:"Product Insertion failed",
            error,
        }); } };

        //get all product 
        export const getAllProductController = async(req ,res)=>{
         //true
         try{
            //category name // category collection
            //product // product collection
            //join // populate 
        
       const products = await productModel.find().populate("category" , "name");
            res.status(200).send({
               success:true,
               message:"All products fetched successfully",
               products,
            });
         }
         //false
         catch(error)
         {
            res.status(500).send({
            success:false,
            message:"Error fetching products",
            error,
            });
         }
        };
        //show product by Id
        export const getProductByIdController = async (req,res) =>{
         try{
            const product = await productModel.findById(req.params.id).populate("category" , "name");
            if(!product)
               {
                  return res.status(404).send({
                     success:false, 
                     message:"Product not found"
                  })
               }
               res.status(200).send({
                  success:true,
                  message:"Product fetched successfully",
                  product,
               });
         }
         catch(error){
            res.status(500).send({
               success:false,
               message:"Error fetching product",
               error:error.message,
            });

         }
        }
        //update product 
        export const updateProductController = async (req,res)=>{
         try{   const {id} = req.params;
                  const {name, price , description, category} = req.body;
                  let updatedata = {name , price , description , category};
                  //if new file is uploaded
                  if(req.file)
                     {
                        const newFilePath = req.file.path;
                     
                     //delete old file from server
                     const oldProduct = await productModel.findById(id)
                     if(oldProduct?.file && fs.existsSync(oldProduct.file))
                        {
                                fs.unlinkSync(oldProduct.file);
                        }
                        updatedata.file = newFilePath;
                     }
                     const updatedProduct = await productModel.findByIdAndUpdate(
                        id,
                        updatedata,
                        {
                           new:true,
                        }
                     );
                     if(!updatedProduct)
                        {
                           return res.status(404).send({
                              success:false,
                              message:"Product not found"
                           })
                        }
                        res.status(202).send({
                           success:true,
                           message:"Product updated successfully"
                        });
         }
         catch(error){
      res.status(500).send({
         success:false,
         message:"Error updating product"
      })

        }
        
      }
export const upload = multer({storage});