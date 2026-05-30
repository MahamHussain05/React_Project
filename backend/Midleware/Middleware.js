
import JWT from "jsonwebtoken"
import userModel from "../Models/userModel.js";
//protected Routes 
export const requireSignIn = async (req, res, next) => {
    try {
      // Check if Authorization header exists and contains Bearer token
      const token = req.headers.authorization?.split(" ")[1]; // Split to get token after 'Bearer'
  
      if (!token) {
        return res.status(401).send({
          success: false,
          message: "Authorization token is missing!",
        });
      }
  
      // Verify token
      const decoded = JWT.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // Attach decoded user info to the request
      next();
    } catch (error) {
      console.log(error);
      return res.status(401).send({
        success: false,
        message: "Invalid or expired token!",
      });
    }
  };
  
//admin access
export const isAdmin =async(req, res, next)=>{
    try{
        const user = await userModel.findById(req.user._id);
        if(user.role !==1)
            {
                return res.status(401).send({
                    success:false,
                    message:"UnAuthorized Access",
                });
            }
            else{
                next();
            }
    } catch(error)
    {
        console.log(error);
        res.status(401).send({
            success:false,
            error,
            message:"Error in admin middleware"
        });
    }
};
export default  requireSignIn
