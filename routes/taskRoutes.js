const express = require("express");

const validateTask = require("../middleware/validateTask");

const tasks = require("../data/tasks");

const router = express.Router();

let nextId = 2;

router.get("/", (req, res) => {
  const status = req.query.status;
  const priority = req.query.priority;

  const sort = req.query.sort;

  const page = Number(req.query.page);
  const limit = Number(req.query.limit);

  const hasPage = req.query.page !== undefined;

  const hasLimit = req.query.limit !== undefined;

  if ((hasPage && Number.isNaN(page)) || (hasLimit && Number.isNaN(limit))) {
    return res.status(400).json({
      message: "Page ve limit sayı olmalıdır.",
    });
  }

  if ((hasPage && page < 1) || (hasLimit && limit < 1)) {
    return res.status(400).json({
      message: "Page ve limit 1 veya daha büyük olmalı.",
    });
  }

  if (hasPage !== hasLimit) {
    return res.status(400).json({
      message: "Page ve limit birlikte gönderilmelidir.",
    });
  }

  if (sort && sort !== "createdAt") {
    return res.status(400).json({
      message: "Geçersiz sıralama değeri.",
    });
  }

  let filteredTasks = tasks;

  if (status) {
    filteredTasks = filteredTasks.filter((task) => task.status === status);
  }

  if (priority) {
    filteredTasks = filteredTasks.filter((task) => task.priority === priority);
  }

  if ((status || priority) && filteredTasks.length === 0) {
    return res.json({
      message: "Filtreye uygun görev bulunamadı.",
    });
  }

  if (sort === "createdAt") {
    filteredTasks = [...filteredTasks].sort(
      (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
    );
  }

  if (tasks.length === 0) {
    return res.json({
      message: "Henüz görev bulunamadı.",
    });
  }

  if (hasPage && hasLimit) {
    const startIndex = (page - 1) * limit;

    const endIndex = startIndex + limit;

    const paginatedTasks = filteredTasks.slice(startIndex, endIndex);

    return res.json(paginatedTasks);
  }

  res.json(filteredTasks);
});

router.get("/search", (req, res) => {
  const keyword = req.query.keyword;

  if (!keyword) {
    return res.json({
      message: "Arama yapmak için bir kelime girin.",
    });
  }

  const searchedTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(keyword.toLowerCase()),
  );

  if (searchedTasks.length === 0) {
    return res.json({
      message: "Aramaya uygun görev bulunamadı.",
    });
  }

  res.json(searchedTasks);
});

router.get("/assignee/:name", (req, res) => {
  const name = req.params.name;

  const assigneeTasks = tasks.filter(
    (task) => task.assignee.toLowerCase() === name.toLowerCase(),
  );

  if (assigneeTasks.length === 0) {
    return res.json({
      message: "Bu çalışana ait görev bulunamadı.",
    });
  }

  res.json(assigneeTasks);
});

router.get("/:id", (req, res) => {
  const taskId = Number(req.params.id);

  const task = tasks.find((task) => task.id === taskId);

  if (!task) {
    return res.status(404).json({
      message: "Görev bulunamadı.",
    });
  }

  res.json(task);
});

router.post("/", validateTask, (req, res) => {
  const newTask = {
    id: nextId,
    title: req.body.title,
    description: req.body.description,
    assignee: req.body.assignee,
    status: req.body.status,
    priority: req.body.priority,
    createdAt: new Date(),
  };

  tasks.push(newTask);

  nextId = nextId + 1;

  res.status(201).json(newTask);
});

router.put("/:id", validateTask, (req, res) => {
  const taskId = Number(req.params.id);

  const task = tasks.find((task) => task.id === taskId);

  if (!task) {
    return res.status(404).json({
      message: "Görev bulunamadı.",
    });
  }

  task.title = req.body.title;
  task.description = req.body.description;
  task.assignee = req.body.assignee;
  task.status = req.body.status;
  task.priority = req.body.priority;

  res.json(task);
});

router.delete("/:id", (req, res) => {
  const taskId = Number(req.params.id);

  const taskIndex = tasks.findIndex((task) => task.id === taskId);

  if (taskIndex === -1) {
    return res.status(404).json({
      message: "Görev bulunamadı.",
    });
  }

  tasks.splice(taskIndex, 1);

  res.json({
    message: "Görev başarıyla silindi.",
  });
});

module.exports = router;
