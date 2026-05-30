import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Cart() {
  const [cart, setCart] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
const goToOrderPage = () => {
  navigate("/order", { state: { cart, grandTotal } });
};
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/getcart", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.data.success) {
          setCart(res.data.cart.items || []);
        }
      } catch (error) {
        console.error("Error fetching cart", error);
      }
    };

    fetchCart();
  }, [token]);

  const deleteItem = async (productId) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/cart/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCart((prev) =>
        prev.filter((item) => item.product._id !== productId)
      );
    } catch (error) {
      console.error("Delete cart error", error);
    }
  };
  const editQuantity = async (productId, newQuantity) => {
    if (newQuantity < 0) return; // prevent negative quantities

    try {
      const res = await axios.put(
        "http://localhost:5000/api/editcart",
        { productId, quantity: newQuantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update local cart state
      setCart(res.data.cart.items);

    } catch (error) {
      console.error("Edit cart error", error.response?.data);
      alert(error.response?.data?.message || "Failed to update cart");
    }
  };
  const grandTotal = cart.reduce(
    (total, item) => total + item.quantity * item.product.price,
    0
  );

  return (
    <div className="container mt-4">
      <div className="row">

        {/* LEFT COLUMN - CART TABLE */}
        <div className="col-md-8">
          <h2>My Cart</h2>

          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Product Id</th>
                <th>Name</th>
                <th>Price</th>
                <th>Image</th>
                <th>Qty</th>
                <th>Total</th>
                <th colSpan="2">Action</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((p) => (
                <tr key={p._id}>
                  <td>{p.product._id}</td>
                  <td>{p.product.name}</td>
                  <td>{p.product.price}</td>
                  <td>
                    <img
                      src={`http://localhost:5000/${p.product.file}`}
                      width="80"
                      height="80"
                      alt={p.product.name}
                    />
                  </td>
                  <td>{p.quantity}</td>
                  <td>{p.quantity * p.product.price}</td>
                  <td>
                     <div className="d-flex align-items-center gap-2">
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() =>
                          editQuantity(p.product._id, p.quantity - 1)
                        }
                      >
                        -
                      </button>
                      <span>{p.quantity}</span>
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() =>
                          editQuantity(p.product._id, p.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>
                    </td>
                  <td>
                    <button
                      onClick={() => editQuantity(p.product._id, p.quantity)}
                      className="btn btn-primary btn-sm"
                    >
                      Update
                    </button></td>
                  <td><button
                      onClick={() => deleteItem(p.product._id)}
                      className="btn btn-danger btn-sm"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* RIGHT COLUMN - ORDER SUMMARY */}
        <div className="col-md-4">
          <div className="card p-3">
            <h4>Order Summary</h4>
            <hr />
            <p>
              Grand Total: <strong>₹ {grandTotal}</strong>
            </p>
            <button className="btn btn-success w-100" onClick={goToOrderPage}>
              Place Order
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Cart;
