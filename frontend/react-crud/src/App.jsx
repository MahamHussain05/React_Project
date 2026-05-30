import Header from "./components/Header.jsx"
import Login from "./components/Login.jsx"
import Register from "./components/Register.jsx"
import {Routes , Route} from "react-router-dom"
import Shop from "./components/shop.jsx"
import Cart from "./components/Cart.jsx"
import OrderPage from "./components/Order.jsx"

function App() {


  return (
    <>
     <Header></Header>
     <Routes>
      <Route path="/register" element={<Register></Register>} >
</Route>
      <Route path="/login" element={<Login></Login>}> 
      </Route>
      <Route path="/shop" element={<Shop></Shop>}></Route>
      <Route path="/cart" element={<Cart></Cart>}></Route>
      <Route path="/order" element={<OrderPage></OrderPage>}></Route>
     </Routes>
     {/* <Register></Register>
     <Login></Login> */}
    </>
  )
}

export default App
