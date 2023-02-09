const express = require("express");
const {
  getBranchs,
  getBranch,
  createBranch,
} = require("../controller/branchController");
const { verifyToken, checkRole } = require("../middleware/auth");
const router = express.Router();

router.get("/branch", verifyToken, getBranchs);
router.get("/branch/:id", verifyToken, getBranch);
// router.delete("/addresses/:id", deleteAddress);
router.post("/branch", verifyToken, createBranch);
// router.put("/addresses/:id", updateAddresses);
// router.put(
//   "/:profileId/addressActivated/:addressesId",
//   updateAddressesActivated
// );

module.exports = router;
