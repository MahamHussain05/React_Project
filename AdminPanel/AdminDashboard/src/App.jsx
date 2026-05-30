
import './App.css'
import AddCategory from './components/AddCategory.jsx'
import ShowCategory from './components/ShowCategory.jsx'
import Navbar from './components/navbar.jsx'
import {Routes , Route} from "react-router-dom"
import AddProduct from './components/AddProduct.jsx'
import ShowProduct from './components/ShowProduct.jsx'
import UpdateProduct from './components/UpdateProduct.jsx'
import Login from './components/Adminlogin.jsx'
import ProtectedRoute from './ProtectedRoute.jsx'
function App() {
 

  return (
    <>

    <Routes>
      {/* public routing */}
      <Route path="/login" element={<Login></Login>} > </Route>



      <Route path="/dashboard"
       element={<ProtectedRoute requiredRole={1}>
        <Navbar/>
       </ProtectedRoute>
      }>

    <Route path="add-category" element={<AddCategory></AddCategory>}></Route>
    <Route path="add-product" element={<AddProduct></AddProduct>}></Route>
    <Route path="show-category" element={<ShowCategory></ShowCategory>}></Route>
    <Route path="show-product" element={<ShowProduct></ShowProduct>}></Route>
    <Route path="update-product/:id" element={<UpdateProduct></UpdateProduct>}></Route>
      </Route>
    </Routes>
    </>
  )
}

export default App
