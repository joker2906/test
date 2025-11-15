import Order from "../models/Order.js";

export const createOrder = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { items, total, shippingDetails } = req.body;
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "items are required" });
    }
    if (typeof total !== "number") {
      return res.status(400).json({ message: "total must be a number" });
    }
    const order = new Order({ user: userId, items, total, shippingDetails });
    await order.save();
    return res.json({ message: "Order created", order });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const getMyOrders = async (req, res) => {
  try {
    const userId = req.user?.id;
    const orders = await Order.find({ user: userId }).sort({ createdAt: -1 });
    return res.json(orders);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const markOrderPaid = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { id } = req.params;
    const { paymentId } = req.body;

    const order = await Order.findOne({ _id: id, user: userId });
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.payment = {
      ...(order.payment || {}),
      paymentId: paymentId || order.payment?.paymentId,
      paid: true,
      paidAt: new Date(),
    };
    order.status = "paid";
    await order.save();

    return res.json({ message: "Order marked as paid", order });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
