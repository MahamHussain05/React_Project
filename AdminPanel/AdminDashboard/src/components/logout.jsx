import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout()
{
    const navigate =useNavigate();
    useEffect(()=>{
        localStorage.clear();
        sessionStorage.clear();
        //redirect to login
        navigate("/login");
    },
[])
return null;
}
export default Logout;