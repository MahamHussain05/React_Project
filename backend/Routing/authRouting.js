import express from "express";
import {registerController , LoginController, testController} from "../Controllers/authController.js";
import {requireSignIn,  isAdmin } from "../Midleware/Middleware.js";
import {addCategoryController , getAllCategoryController} from "../Controllers/categoryController.js"
import { addProductController , upload , getAllProductController , getProductByIdController , updateProductController}
 from "../Controllers/productController.js";
import {AddtoCartController, GetUserCartController , DeleteCartItemController, EditCartController } from "../Controllers/cartController.js"
import {placeOrder , getOrders} from "../Controllers/orderControler.js"
//route object 
const router = express.Router();

//routing
//Register // POST MEthod
router.post("/register" , registerController);

//login Routing 
router.post("/login" , LoginController)
//test routing 

router.get("/test" , requireSignIn , isAdmin , testController)

//category routing
router.post("/addcategory" , addCategoryController)
router.get("/showcategory" , getAllCategoryController)
//product routing
//get product 
router.get("/showproduct" , getAllProductController)
//add product
router.post("/addproduct" ,  upload.single("file") ,addProductController);
//get product by Id
router.get("/getproduct/:id" , getProductByIdController)
//update product 
router.put("/updateproduct/:id" , upload.single("file") , updateProductController)

//cart routing 
router.post("/addcart" , requireSignIn , AddtoCartController )
// get cart
router.get("/getcart" , requireSignIn , GetUserCartController )
//delete cart

router.delete("/cart/:productId",requireSignIn,DeleteCartItemController)
//update cart
router.put("/editcart",requireSignIn,EditCartController)
// order routing 
router.post("/place", requireSignIn, placeOrder);
router.get("/showorder", requireSignIn, getOrders);
export default router;

