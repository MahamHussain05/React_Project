import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Shop() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/showproduct",
          { headers: { "Cache-Control": "no-cache" } }
        );

        if (res.data?.products) {
          setProducts(res.data.products);
        } else if (Array.isArray(res.data)) {
          setProducts(res.data);
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.error("Error fetching products", error);
      }
    };

    fetchProducts();
  }, []);

  // Add to cart
// Shop.jsx

const AddtoCart = async (product) => {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("You're not logged in!");
    navigate("/login");
    return;
  }

  try {
    await axios.post(
      "http://localhost:5000/api/addcart",
      {
        productId: product._id,
        quantity: 1,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Product added to cart!");
    navigate("/cart");
  } catch (error) {
    console.error("Error adding to cart:", error.response?.data);
    alert(error.response?.data?.message || "Failed to add product to cart");
  }
};



  return (
    <div className="row">
      {products.map((p) => (
        <div className="col-md-4" key={p._id}>
          <div className="card" style={{ width: "20rem" }}>
            <img
              src={`http://localhost:5000/${p.file}`}
              width="300"
              height="200"
              className="card-img-top"
              alt={p.name}
            />

            <div className="card-body">
              <h5 className="card-title">{p.name}</h5>
              <p className="card-text">{p.description}</p>
              <p className="card-text">
                <strong>Price:</strong> {p.price}
              </p>

              <button
                onClick={() => AddtoCart(p)}
                className="btn btn-primary"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Shop;
