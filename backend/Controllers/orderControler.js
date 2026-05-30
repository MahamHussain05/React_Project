import  orderModel from "../Models/orderModel.js"
import cartModel from "../Models/cartModel.js" // Assuming you have a Cart model

// Place an order
export const placeOrder = async (req, res) => {
  try {
    const userId = req.user._id; // assuming auth middleware adds req.user
    const { address, paymentMethod } = req.body;

    // Fetch user's cart
    const cart = await cartModel.findOne({ user: userId }).populate("items.product");
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ success: false, message: "Cart is empty" });
    }

    // Prepare order items
    const orderItems = cart.items.map((item) => ({
      product: item.product._id,
      quantity: item.quantity,
      price: item.product.price,
    }));

    const totalPrice = orderItems.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );

    // Create order
    const order = new orderModel({
      user: userId,
      items: orderItems,
      totalPrice,
      address,
      paymentMethod,
    });

    await order.save();

    // Clear cart
    cart.items = [];
    await cart.save();

    res.json({ success: true, message: "Order placed successfully", order });
  } catch (error) {
    console.error("Place order error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get user's orders
export const getOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ user: req.user._id }).populate("items.product");
    res.json({ success: true, orders });
  } catch (error) {
    console.error("Get orders error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
