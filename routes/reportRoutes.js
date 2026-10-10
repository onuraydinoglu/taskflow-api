const express = require("express");

const tasks = require("../data/tasks");

const router = express.Router();

router.get("/completed", (req, res) => {
  const completedTasks = tasks.filter((task) => task.status === "completed");
  res.json({
    completed: completedTasks.length,
  });
});

router.get("/pending", (req, res) => {
  const pendingTasks = tasks.filter((task) => task.status === "pending");

  res.json({
    pending: pendingTasks.length,
  });
});

router.get("/summary", (req, res) => {
  const completedCount = tasks.filter(
    (task) => task.status === "completed",
  ).length;

  const pendingCount = tasks.filter((task) => task.status === "pending").length;

  res.json({
    total: tasks.length,
    completed: completedCount,
    pending: pendingCount,
  });
});

module.exports = router;
