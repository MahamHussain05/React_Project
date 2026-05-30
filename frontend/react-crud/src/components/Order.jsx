import { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

function OrderPage() {
  const location = useLocation();
  const { cart, grandTotal } = location.state || { cart: [], grandTotal: 0 };

  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const token = localStorage.getItem("token");

  const placeOrder = async () => {
    if (!address) return alert("Please enter delivery address");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/place",
        { address, paymentMethod },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        alert("Order placed successfully!");
      }
    } catch (error) {
      console.error("Place order error:", error.response?.data);
      alert(error.response?.data?.message || "Failed to place order");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Place Order</h2>
      <div className="mb-3">
        <label className="form-label">Delivery Address</label>
        <textarea
          className="form-control"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Payment Method</label>
        <select
          className="form-select"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option value="COD">Cash on Delivery</option>
          <option value="Online">Online Payment</option>
        </select>
      </div>
      <p>
        <strong>Grand Total: ₹{grandTotal}</strong>
      </p>
      <button className="btn btn-success" onClick={placeOrder}>
        Place Order
      </button>
    </div>
  );
}

export default OrderPage;
