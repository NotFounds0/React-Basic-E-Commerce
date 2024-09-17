const ProductSchema = require("../Models/Products");
const express = require("express");
const router = express.Router();

router.post("/create", async (req, res) => {
  try {
    const createProduct = new ProductSchema(req.body);
    await createProduct.save();
    res.status(200).json("Product Created");
  } catch (error) {
    res.status(400).json(error);
  }
});
router.get("/get", async (req, res) => {
  try {
    const getProduct = await ProductSchema.find();
    res.status(200).json(getProduct);
  } catch (error) {
    res.status(400).json(error);
  }
});
router.get("/get/:id", async (req, res) => {
  try {
    const getProductID = await ProductSchema.findById(req.params.id);
    res.status(200).json(getProductID);
    if (!getProductID) {
      res.status(404).json("Product not found");
    }
  } catch (error) {
    res.status(400).json(error);
  }
});
router.put("/update/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const updateData = req.body;

    const updatedProduct = await ProductSchema.findByIdAndUpdate(
      productId,
      updateData,
      { new: true, runValidators: true }
    );
    res.status(200).json("Product Updated");
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(400).json(error);
  }
});
router.delete("/delete/:id", async (req, res) => {
  try {
    await ProductSchema.findByIdAndDelete(req.params.id);
    res.status(200).json("Product Deleted");
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
