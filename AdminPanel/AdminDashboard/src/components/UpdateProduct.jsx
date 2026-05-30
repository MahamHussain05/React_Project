import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"

function UpdateProduct()
{//update product by id //get id by URL
    const {id} =useParams();
    //direct to page 
    const navigate = useNavigate();
    const API = "http://localhost:5000/api";
     const [name , setName] =useState("");
    const [price , setPrice] =useState("");
    const [description , setDescription] =useState("");
    const [category , setCategory] =useState(""); // single category // jis row p click karengy 
    const [file , setFile] =useState(null);
    const [oldFile , setOldFile] =useState(""); //store old image
    const [categories , setCategories] =useState([]); // fetch all categories
    const [loading , setLoading] =useState("");
    const [error , setError] = useState("");
    //fetch categories
    useEffect(() => {
        const fetchCategories = async () => {
          try {
            const res = await axios.get(`${API}/showcategory`,
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
      //fetch single product
      useEffect(()=>{
        const fetchProduct = async ()=>{
            try{
                const res = await axios.get(`${API}/getproduct/${id}`,

                )
                const p =res.data.product;
                //data show in update form
                setName(p.name);
                setPrice(p.price);
                setDescription(p.description);
                setCategory(p.category?._id || "");
                setOldFile(p.file);

            }
            catch(err)
            {
                setError("Failed to load product");
            }
            finally{
                  setLoading(false);
            }
        };
        fetchProduct();
      }, [id])
      //update product
      const updateData =async (e)=>{
        e.preventDefault();
        try{
            const formData = new FormData();
            formData.append("name" , name);
            formData.append("price" , price);
            formData.append("description" , description);
            formData.append("category" , category);
            if(file) formData.append("file" , file);
            await axios.put(`${API}/updateproduct/${id}` , formData , {
                headers: {"Content-Type": "multipart/form-data"},
            });
            alert("Product updated successfully");
            navigate("show-product");
        }
        catch(err)
        {   alert("Failed to update product");
        console.error(err);

        }
      }
    return<>
   
    <form className="container col-md-8" encType="multipart/form-data" onSubmit={updateData}>
    <h1>Update Product</h1>
        <input placeholder="Product Name" className="form-control mb-3" value={name}  onChange={(e)=>setName(e.target.value)}/>
        <input placeholder="Product Price" className="form-control mb-3" value={price} onChange={(e)=>setPrice(e.target.value)}/>
        <input placeholder="Product Description" className="form-control mb-3" value={description} onChange={(e)=>setDescription(e.target.value)}/>
        <input placeholder="Product File" className="form-control mb-3" type="file" onChange={(e)=>setFile(e.target.files[0])}/>
        <img src={`http://localhost:5000/${oldFile}`} width="100" className="mb-3"/>
        <select className="form-select mb-3" value={category}
         onChange={(e)=>setCategory(e.target.value)} > 
        
            <option value="" disabled>Select Category</option>
            {categories.map((c)=>
            <option key={c._id} value={c._id}>

          {c.name}
            </option>
             
            )}
        </select>
        <button className="btn btn-primary" type="submit"> Update Record</button>
    </form>
    </>
}

export default UpdateProduct