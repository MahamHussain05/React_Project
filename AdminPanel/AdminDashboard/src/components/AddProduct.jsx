import { useState , useEffect } from "react"
import axios from "axios"
function AddProduct()
{
    const [name , setName] =useState("");
    const [price , setPrice] =useState("");
    const [description , setDescription] =useState("");
    //select in dropdown 
    const [category , setCategory] =useState("");
    const [file , setFile] =useState(null);
    //fetch All ctaegories 
    const [categories , setCategories] =useState([]); // store fetched categories
    //fetch category in dropdown 
    useEffect(() => {
        const fetchCategories = async () => {
          try {
            const res = await axios.get(
              "http://localhost:5000/api/showcategory",
              {
                headers: { "Cache-Control": "no-cache" },
              }
            );
            // Check if backend returns { category: [...] }
             if (res.data?.findcategory) {
               setCategories(res.data.findcategory);
           } else if (Array.isArray(res.data)) {
               // in case backend returns array directly
               setCategories(res.data);
            } else {
             console.warn("Unexpected response format:", res.data);
               setCategories([]);
           }
           }
           catch (error) {
            console.error("Error fetching categories:", error);
          }
        };
        fetchCategories();
      }, []);
      //add product
      const addProduct = async (e)=>{
        e.preventDefault();
        try{
    const formData = new FormData();
    formData.append("name" , name);
    formData.append("price" , price);
    formData.append("description" , description);
    formData.append("category" ,  category);
    formData.append("file" , file);
    const response = await axios.post(
        "http://localhost:5000/api/addproduct",
        formData,
        {
            headers: { "Cache-Control": "no-cache" },
        }
    );
    alert("Product Added Successfully");
    console.log("Product Added" , response.data);
    //Reset form
    setName("");
    setPrice("");
    setDescription("");
    setCategory("");
    setFile(null);
        }
        catch(error){
                   console.error("Product not added" , error.response?.data|| error.message)
        }
      }
    return<>
    <form className="container col-8" onSubmit={addProduct} encType="multipart/form-data">
        <h1>Add Product</h1>
        <input placeholder="Enter Product Name"
         className="form-control mb-3" value={name} onChange={(e)=>setName(e.target.value)} />
        <input placeholder="Enter Product Price"
         className="form-control mb-3"  value={price} onChange={(e)=>setPrice(e.target.value)}/>
        <input placeholder="Enter Product Description"
         className="form-control mb-3" value={description} onChange={(e)=>setDescription(e.target.value)}/>
        <input placeholder="Upload File" type="file" 
        className="form-control mb-3"   onChange={(e)=>setFile(e.target.files[0])}/>
        <select className="form-select mb-3" value={category} onChange={(e)=>setCategory(e.target.value)}>
            <option>Select Category</option>
            {categories.map((c)=>
            <option key={c._id} value={c._id}>

          {c.name}
            </option>
             
            )}
        </select>
        <button type="submit" className="btn btn-dark">Add Product</button>
    </form>
    </>
}
export default AddProduct