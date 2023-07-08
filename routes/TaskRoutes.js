const express = require("express");
const router = express.Router();

const {
  createTask,
  getTasks,
  deleteTask,
} = require("../controllers/tasksController");

router.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

router.post("/addTask", createTask);
router.get("/", getTasks);
router.delete("/:id", deleteTask);

module.exports = router;
