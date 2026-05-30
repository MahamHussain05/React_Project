import { useState } from "react"
import axios from "axios"
function Login()
{ const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");
    const [redirectTo , setRedirectTo] =useState(null);
    // const [redirectTo , setRedirectTo] = useState(null);
    //create login function
    const loginUser =async (e)=>{
        e.preventDefault();
        try{
            const response = await axios.post("http://localhost:5000/api/login" , {email , password});
            alert("Login Successfully");
            console.log("User login Successfully " , response.data);
                //check role
        const role = response.data.user.role;
        const token = response.data.token;
        //store token
        localStorage.setItem("token" , token);
        sessionStorage.setItem("token" , token);
        sessionStorage.setItem("role" , role);
        //redirect based on role
        if(token)
            {
            setRedirectTo("/cart")
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
        <h1>Login Form</h1>
        <input placeholder="Enter Your Email" className="mb-3 form-control" value={email} 
        onChange={(e)=>setEmail(e.target.value)}/>
        <input placeholder="Enter Your Password" className="mb-3 form-control" value={password}
        onChange={(e)=>setPassword(e.target.value)} type="password"/>
        <button type="submit" className="btn btn-dark">Submit</button>
    </form>
    </>
}
export default Login