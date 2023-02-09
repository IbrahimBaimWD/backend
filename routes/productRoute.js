const express = require("express");
const {
  products,
  createProduct,
  updateProduct,
  uploadProduct,
} = require("../controller/products");
const {
  categories,
  createCategories,
  deleteCategories,
  updateCategories,
} = require("../controller/products/categories");
const { stock, updateStock } = require("../controller/products/stocks");
const {
  createDiscount,
  discount,
  deleteDiscount,
  updateDiscount,
} = require("../controller/products/discount");
const {
  verifyToken,
  checkRole,
  checkRoleSuper,
} = require("../middleware/auth");
const { uploadProfileUser } = require("../middleware/multer");
const router = express.Router();

router.get("/products", verifyToken, products);
router.post("/products", verifyToken, createProduct);
router.put("/products/:id", verifyToken, updateProduct);

//Product Categories
router.get("/products/category", verifyToken, categories);
router.post("/products/category", verifyToken, createCategories);
router.delete("/products/category/:id", verifyToken, deleteCategories);
router.put("/products/category/:id", verifyToken, updateCategories);

//Product Stock
router.get("/products/stock", verifyToken, stock);
router.put("/products/stock/:id", verifyToken, updateStock);

//Product Discount
router.get("/products/discount", verifyToken, discount);
router.post("/products/discount", verifyToken, createDiscount);
router.delete("/products/discount/:id", verifyToken, deleteDiscount);
router.put("/products/discount/:id", verifyToken, updateDiscount);

//Product Images
router.post(
  "/upload/product/:id",
  uploadProfileUser.single("image"),
  uploadProduct
);

module.exports = router;
