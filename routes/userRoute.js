const express = require("express");
const { getUsers, getUser } = require("../controller/userController");
const {
  verifyToken,
  checkRole,
  checkRoleSuper,
} = require("../middleware/auth");
const router = express.Router();

router.get("/users", verifyToken, getUsers);
router.get("/user", verifyToken, getUser);
// router.delete("/task/:id", deleteTask);
// router.post("/task", createTask);
// router.put("/task/:id", updateTask);

module.exports = router;
