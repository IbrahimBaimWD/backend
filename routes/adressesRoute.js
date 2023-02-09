const express = require("express");
const {
  getAddresses,
  getAddress,
  deleteAddress,
  createAddress,
  updateAddresses,
  updateAddressesActivated,
} = require("../controller/addressesController");
const { verifyToken, checkRole } = require("../middleware/auth");
const router = express.Router();

router.get("/addresses", getAddresses);
router.get("/addresses/:id", getAddress);
router.delete("/addresses/:id", deleteAddress);
router.post("/addresses", createAddress);
router.put("/addresses/:id", updateAddresses);
router.put(
  "/:profileId/addressActivated/:addressesId",
  updateAddressesActivated
);

module.exports = router;
