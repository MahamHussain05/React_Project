import { Link , useNavigate }  from "react-router-dom"
import {useEffect} from "react";

function Header()
{
  const navigate = useNavigate();
  useEffect(()=>{
    const token= localStorage.getItem("token");
  }, []);
  const handleLogout = async =>{
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  }
    return<>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">Navbar</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#">Home</a>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/register">Register</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/login">Login</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/shop">Shop</Link>
        </li>
  
         <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/cart">Cart</Link>
        </li>
  
 
        
      </ul>
          <button onClick={handleLogout} className="nav-link active" aria-current="page" to="/logout">Logout</button>
        
     
    </div>
  </div>
</nav>
    </>
}
export default Header