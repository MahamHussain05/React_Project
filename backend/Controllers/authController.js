import { comparePassword, hashPassword } from "../Helpers/authhelper.js";
import userModel from "../Models/userModel.js";
import jwt from "jsonwebtoken"
//Register
export const registerController =async (req,res)=>{
  try{
    const {name,email,password,address,phone} =req.body;
    //validation
    if(!name) 
        return res.send({error:"Name is required"});
    if(!email) 
        return res.send({error:"Email is required"});
    if(!password) 
        return res.send({error:"Password is required"});
    if(!address) 
        return res.send({error:"Address is required"});
    if(!phone) 
        return res.send({error:"Contact is required"});
   //check if user already exists
   const existingUser = await userModel.findOne({email});
   if(existingUser)
    {
        return res.status(200).send({
            success:true,
            message:"Already registered , please login",
        });
    }
    //hash the password
    const hashedPassword =await hashPassword(password);
    //save new user
    const user =await new userModel({
        name, email, password:hashedPassword, address, phone 
    }).save();
    res.status(201).send({
        success:true,
        message:"User Registered Successfully",
        user,
    });

  } 
  catch(error)
  {
    console.error(error);
    res.status(500).send({
        success:false,
        message:"Error in registration",
        error,
    });
  } 
};

//Login
export const LoginController = async (req,res)=>{
try{
const {email , password} =req.body;
//validation
if(!email || !password)
{
  return res.status(404).send({
    success:false,
    message:"Invalid email and password"
  });
}
//check user
const user = await userModel.findOne({email});
if(!user)
    {
        return res.status(404).send({
            success:false,
            message:"Email is not registered",
        });
    }

    //match the password
    const match =await comparePassword(password , user.password);
    if(!match)
        {
            return res.status(200).send({
                success:false,
                message:"Invalid Password"
            });
        }
        //token
const token = jwt.sign({_id: user._id} , process.env.JWT_SECRET,
            {
                expiresIn:"1d",
            }
        );
        res.status(200).send({
            success:true,
            message:"Login successfully",
            user:{
                name:user.name,
                email:user.email,
                phone: user.phone,
                address:user.address,
                //role checking the role is user or admin
                role:user.role,
             },
             token,
        });
    }
        catch(error)
        {
            res.status(500).send({
                success:false,
                message:"Error in login",
                error,
            });
        }

}

//testing Controller

export const testController =(req,res)=>{
    res.send("Protected Route");
};
export default registerController;