const express = require("express");

const taskRoutes = require("./routes/taskRoutes");

const reportRoutes = require("./routes/reportRoutes");

const logger = require("./middleware/logger");

const app = express();

const PORT = 3000;

app.use(express.json());

app.use(logger);

app.get("/", (req, res) => {
  res.send("Taskflow API çalışıyor.");
});

app.use("/tasks", taskRoutes);

app.use("/reports", reportRoutes);

app.listen(PORT, () => {
  console.log(`Sunucu http://localhost:${PORT} adresinde çalışıyor`);
});
