import { useState } from "react"
import axios from "axios"
import { Navigate } from "react-router-dom";
function Login()
{ const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");
     const [redirectTo , setRedirectTo] = useState(null);
    //create login function
    const loginUser =async (e)=>{
        e.preventDefault();
        try{
            const response = await axios.post("http://localhost:5000/api/login" , {email , password});
           // alert("Login Successfully");
            console.log("User login Successfully " , response.data);
         //check role
        const role = response.data.user.role;
        const token = response.data.token;
        //store token
        localStorage.setItem("token" , token);
        sessionStorage.setItem("token" , token);
        sessionStorage.setItem("role" , role);
        //redirect based on role
        if(Number(role)===1)
            {
                   setRedirectTo("/dashboard");
            }
            else{
               alert("access denied");
            }
        }
            catch(error)
            {
                console.error("login failed" , error.response?.data || error.message);
            }
        }
   if(redirectTo) return <Navigate to={redirectTo}/>
    return<>
    <form onSubmit={loginUser} className="container col-md-8">
        <h1>Admin Login </h1>
        <input placeholder="Enter Your Email" className="mb-3 form-control" value={email} 
        onChange={(e)=>setEmail(e.target.value)}/>
        <input placeholder="Enter Your Password" className="mb-3 form-control" value={password}
        onChange={(e)=>setPassword(e.target.value)}/>
        <button type="submit" className="btn btn-dark">Submit</button>
    </form>
    </>
}
export default Login