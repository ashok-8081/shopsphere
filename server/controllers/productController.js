import Product from "../models/productModel.js";

// @desc GET all prod
// @route GET /api/products
// @access Public

const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find({}); // find all product
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public

const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin

const createProduct = async (req, res, next) => {
  try {
    const { name, price, description, image, brand, category, countInStock } =
      req.body;

    const product = await Product.create({
      name,
      price,
      description,
      image,
      brand,
      category,
      countInStock,
      user: req.user._id,
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
};
export { getProducts, getProductById, createProduct };
