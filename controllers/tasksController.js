const Task = require("../models/TaskModel");

const getTasks = async (req, res) => {
  try {
    const task = await Task.find();
    res.status(200).json({
      success: true,
      data: task,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    const userId = req?.params?.id;
    const task = await Task.findByIdAndDelete(userId);

    if (!task) {
      throw new Error("Task not found");
    }
    res.status(200).json({
      success: true,
      data: task,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json({
      success: true,
      data: task,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

const updateTask = async (req, res) => {
  try {
    const userId = req?.params?.id;
    const task = await Task.findByIdAndUpdate(userId, {
      completed: true,
      completedAt: Date.now(),
    });
    res.status(201).json({
      success: true,
      data: task,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

module.exports = {
  getTasks,
  createTask,
  deleteTask,
  updateTask,
};
