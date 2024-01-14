import { Router } from "express";
import {
  createNewProductService,
  deleteSingleProduct,
  getAllProductsService,
  getSingleProductService,
  updateProductService,
} from "../services/productService.js";
import verifyAuthToken from "../middlewares/authmiddleware.js";
import {
  allowAdminAccessOnly,
  allowAdminAndClientAccess,
} from "../middlewares/accessControlMiddleware.js";

const router = Router();

// Create Product
// Admin Access
router.post(
  "/create-product",
  verifyAuthToken,
  allowAdminAccessOnly,
  async (req, res) => {
    try {
      const { name, description, price, intendedGender } = req.body;
      // Validate input
      if (!name || !description || !price || !intendedGender) {
        return res.status(400).json({
          success: false,
          message: "Please provide all the details about the product.",
        });
      }
      const newProduct = createNewProductService(
        name,
        description,
        price,
        intendedGender
      );
      return res.status(201).json({
        success: true,
        product: newProduct,
        message: "Product created successfully.",
      });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  }
);

// Read All Products
// Admin and Client Access
router.get(
  "/products",
  verifyAuthToken,
  allowAdminAndClientAccess,
  async (req, res) => {
    try {
      const products = await getAllProductsService();
      return res.status(200).json({ success: true, products });
    } catch (error) {
      console.error(error.message);
      return res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  }
);

// Read Single Product by ID
// Admin and Client Access
router.get(
  "/products/:productId",
  verifyAuthToken,
  allowAdminAndClientAccess,
  async (req, res) => {
    const { productId } = req.params;
    try {
      const product = await getSingleProductService(productId);
      if (!product) {
        return res
          .status(404)
          .json({ success: false, message: "Product not found." });
      }
      return res.status(200).json({ success: true, product: product });
    } catch (error) {
      console.error(error.message);
      return res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  }
);

// Update Product by ID
// Admin Access
router.put(
  "/update-product/:productId",
  verifyAuthToken,
  allowAdminAccessOnly,
  async (req, res) => {
    try {
      const { productId } = req.params;
      const { name, description, price, intendedGender } = req.body;
      // Validate input
      if (!name || !description || !price || !intendedGender) {
        return res.status(400).json({
          success: false,

          message: "Please provide all the details about the product.",
        });
      }
      const product = await getSingleProductService(productId);
      if (!product) {
        return res
          .status(404)
          .json({ success: false, message: "Product not found." });
      }
      const updatedProduct = await updateProductService(
        productId,
        name,
        description,
        price,
        intendedGender
      );
      return res.status(200).json({
        success: true,

        product: updatedProduct,
        message: "Product updated successfully.",
      });
    } catch (error) {
      console.error(error.message);
      return res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  }
);

// Delete Product by ID
// Admin Access
router.delete(
  "/delete-product/:productId",
  verifyAuthToken,
  allowAdminAccessOnly,
  async (req, res) => {
    try {
      const { productId } = req.params;
      const product = await getSingleProductService(productId);
      if (!product) {
        return res
          .status(404)
          .json({ success: false, message: "Product not found." });
      }
      const deletedProduct = await deleteSingleProduct(productId);
      return res.status(200).json({
        success: true,
        product: deletedProduct,
        message: "Product deleted successfully.",
      });
    } catch (error) {
      console.error(error.message);
      return res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  }
);

export default router;
