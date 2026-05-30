import { useState } from "react"
import axios from "axios"

function AddCategory()
{
    const [name , setName] = useState("");
    const addCategory = async (e)=>{
        e.preventDefault();
        try{
            const response = await axios.post(
                "http://localhost:5000/api/addcategory",
                {
                    name,
                }
            );
            alert("Category added");
            console.log("Category added" , response.data);
        }
        catch(error)
        {
            console.error(
                "Category is not added",
                error.response?.data ||error.message
            );
        }
    };
    return<>
    <form className="container col-8" onSubmit={addCategory}>
        <h1>Add Category</h1>
        <input placeholder="Enter Category Name" 
        className="form-control mb-3" value={name} onChange={(e)=>setName(e.target.value)}/>
        <button type="submit" className="btn btn-dark">Add Category</button>
    </form>
    </>
}
export default AddCategory