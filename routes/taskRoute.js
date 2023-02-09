const express = require("express");
const {
  getTasks,
  getTask,
  deleteTask,
  createTask,
  updateTask,
} = require("../controller/taskController");
const { verifyToken, checkRole } = require("../middleware/auth");
const router = express.Router();

router.get("/task", verifyToken, checkRole, getTasks);
router.get("/task/:id", verifyToken, getTask);
router.delete("/task/:id", deleteTask);
router.post("/task", createTask);
router.put("/task/:id", updateTask);

module.exports = router;
