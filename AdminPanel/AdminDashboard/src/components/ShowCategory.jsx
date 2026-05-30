import axios from "axios"
import { useEffect, useState } from "react"
function ShowCategory()
{
  const [categories , setCategories] =useState([]); // store fetched categories
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
    return(
    <>
    <table className="table col-md-8">
        <thead>   
           
                <tr>
                    <th> Category Id</th>
                    <th>Category Name</th>
                </tr>
          
        </thead>
        <tbody>
             {/* when data in different keys and values // map  */}
             {categories.map((c) => (
            <tr key={c._id} value={c._id}>
              <td>{c._id}</td>
              <td>{c.name}</td>
              
              
            </tr>
          ))}
        </tbody>
    </table>
    </>
    );
}
export default ShowCategory