const validateTask = (req, res, next) => {
  const { title, description, priority, assignee } = req.body;

  if (!title || !description || !priority || !assignee) {
    return res.status(400).json({
      message: "Title, description, priority ve assignee alanları zorunludur.",
    });
  }

  const validPriorities = ["low", "medium", "high"];

  if (!validPriorities.includes(priority)) {
    return res.status(400).json({
      message: "Priority low, medium veya high olmalıdır.",
    });
  }

  next();
};

module.exports = validateTask;
