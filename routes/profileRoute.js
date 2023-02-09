const express = require("express");
const {
  getProfiles,
  getProfile,
  deleteProfile,
  createProfile,
  updateProfile,
} = require("../controller/profileController");
const {
  verifyToken,
  checkRole,
  checkRoleSuper,
} = require("../middleware/auth");
const router = express.Router();

router.get("/profile", verifyToken, checkRole, getProfiles);
router.get("/profile/:id", verifyToken, checkRoleSuper, getProfile);
router.delete("/profile/:id", deleteProfile);
router.post("/profile", verifyToken, createProfile);
router.put("/profile/:id", verifyToken, updateProfile);

module.exports = router;
