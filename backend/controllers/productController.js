import Product from "../models/Product.js";

export const getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

export const createProduct = async (req, res) => {
  try {
    const { name, price, description, image } = req.body;
    if (!name || price == null) {
      return res.status(400).json({ message: "name and price are required" });
    }
    const product = new Product({ name, price, description, image });
    await product.save();
    return res.json({ message: "Product created", product });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
