import { useState } from "react"
import axios from "axios"

function Register()
{
    const [name , setName] =useState("");
    const [email , setEmail] =useState("");
    const [password , setPassword] =useState("");
    const [phone , setPhone] =useState("");
    const [address , setAddress] =useState("");
    //create a function add new user 
    const CreateUser =async (e)=>{
        e.preventDefault();
        try{
            const response = await axios.post(
            "http://localhost:5000/api/register",
            {
                name, email, password, address, phone,
            }
         );
         alert("Account has been Registered Successfully");
         console.log("User Registered" , response.data)
        }
        catch(error) {
    console.error("Registration failed: " ,
        error.response ?.data ||error.message
    ); 
    } 
   };
     return<>
    <form onSubmit={CreateUser} className="container col-md-8">
        <h1> Register Form</h1>
        <input placeholder="Enter Your Name" className="mb-3 form-control" 
        value={name}  onChange={(e)=>setName(e.target.value)}/>
        <input placeholder="Enter Your Email" className="mb-3 form-control" 
        value={email} onChange={(e)=>setEmail(e.target.value)}/>
        <input placeholder="Enter Your Password" className="mb-3 form-control" type="password"
         value={password} onChange={(e)=>setPassword(e.target.value)}/>
        <input placeholder="Enter Your Address" className="mb-3 form-control" 
        value={address} onChange={(e)=>setAddress(e.target.value)}/>
        <input placeholder="Enter Your Contact" className="mb-3 form-control" 
        value={phone} onChange={(e)=>setPhone(e.target.value)}/>
        <button type="submit" className="btn btn-dark">Submit</button>
    </form>
    </>
}
export default Register