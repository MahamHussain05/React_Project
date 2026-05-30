import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom";
function ShowProduct()
{  // fetch product 
    const [product , setProducts] =useState([]);
    //navigate page
    const navigate = useNavigate();
    //show product function 
   //show table with data using useEffect()
    useEffect(()=>{
        const fetchProducts = async() =>{
            try{
                const res = await axios.get(
                    "http://localhost:5000/api/showproduct",
                    {
                       headers :{"Cache-Control" : "no-cache"}
                    }
                );
                if(res.data?.products)
                {
                    setProducts(res.data.products)
                }
                else if(Array.isArray(res.data))
                    {
                        setProducts(res.data)
                    }
                    else{
                        console.warn("unexpected response formate" , res.data);
                        setProducts([]);
                    }
            }
            catch(error){
                console.error("Error Fectching Products" , error);
            }
        };
        fetchProducts();
    },[]);
//update data function 
const UpdateData =(id) =>{
    navigate(`/dashboard/update-product/${id}`)
    
}
 return<>
    <table className="table colm-md-6">
        <thead>
        <tr>
            <th>Product Id</th>
            <th>Product Name</th>
            <th>Product Price</th>
            <th>Product Description</th>
            <th>Product File</th>
            <th>Category Name</th>
            <th>Action</th>
            </tr>
        </thead>
        <tbody>
            {/* //diff //keys and value data so we used map */}
       {product.map((p)=>
            <tr key={p._id}>
                <td>{p._id}</td>
             <td>{p.name}</td>
             <td>{p.price}</td>
             <td>{p.description}</td>
             <td> 
     <img src={`http://localhost:5000/${p.file}`}
               width={'200px'}
               height={'200px'}
             /> </td>
             <td>{p.category.name}</td>
             <td><button 
             className="btn btn-primary"
              onClick={()=>UpdateData(p._id)}> 
              Update</button></td>
             <td><button 
             className="btn btn-danger"> Delete</button></td>
            </tr>
       )}
        </tbody>
    
    </table>
    
    
    
    </>
}

export default ShowProduct