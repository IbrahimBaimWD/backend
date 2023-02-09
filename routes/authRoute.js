const express = require("express");
const { register, login, keeplogin } = require("../controller/auth");
const { verifyToken } = require("../middleware/auth");
const router = express.Router();

router.post("/auth/register", register);
router.post("/auth/login", login);
router.get("/auth/keeplogin", verifyToken, keeplogin);
module.exports = router;
