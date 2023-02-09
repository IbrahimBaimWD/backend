const express = require("express");
const {
  listCarts,
  orderCarts,
  createCart,
  statusCart,
  statusCarts,
  deleteCart,
  deleteCarts,
} = require("../controller/cartController");
const {
  verifyToken,
  checkRole,
  checkRoleSuper,
} = require("../middleware/auth");
const router = express.Router();

router.get("/cart/list", verifyToken, listCarts);
router.get("/cart/order", verifyToken, orderCarts);
router.post("/cart/create", verifyToken, createCart);
router.delete("/cart/delete/:id", verifyToken, deleteCart);
router.delete("/cart/delete", verifyToken, deleteCarts);
router.put("/cart/status", verifyToken, statusCart);
router.put("/cart/status/all", verifyToken, statusCarts);
//router.post("/product/category", verifyToken, createProductCategory);
// router.post(
//   "/upload/product/:id",
//   uploadProfileUser.single("image"),
//   uploadProduct
// );

module.exports = router;
