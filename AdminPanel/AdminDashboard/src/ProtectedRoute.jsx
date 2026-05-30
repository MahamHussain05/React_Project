import { Navigate } from "react-router-dom";

export default function ProtectedRoute({children , requiredRole})
{
  const token = sessionStorage.getItem("token");
  const role =sessionStorage.getItem("role");
    // if not login
  if(!token)
    {
        return <Navigate to="/login" replace/>;
    }
    //if role is not admin
    if(requiredRole && Number(role) !== requiredRole)
        {
            return <Navigate to="/unauthorized" replace/>;
        }
        return children;
}