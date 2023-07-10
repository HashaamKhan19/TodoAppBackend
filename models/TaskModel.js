const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  completedAt: {
    type: Date,
    default: null,
  },
});

module.exports = mongoose.model("Task", taskSchema);
