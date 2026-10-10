// Express paketini bu dosyada kullanıma alır.
const express = require("express");

// Görev listesini data klasöründeki dosyadan alır.
const tasks = require("../data/tasks");

// Raporlama adreslerini tanımlayacağımız yönlendiriciyi oluşturur.
const router = express.Router();

// Tamamlanan görevlerin sayısını hesaplar.
router.get("/completed", (req, res) => {
  // Status değeri completed olan görevleri filtreler.
  const completedTasks = tasks.filter((task) => task.status === "completed");
  // Tamamlanan görev sayısını cevap olarak gönderir.
  res.json({
    completed: completedTasks.lenth,
  });
});

// Bekleyen görevlerin sayısını hesaplar.
router.get("/pending", (req, res) => {
  // Status değeri pending olan görevleri filtreler.
  const pendingTasks = tasks.filter((task) => task.status === "pending");

  // Bekleyen görev sayısını cevap olarak gönderir.
  res.json({
    pending: pendingTasks.length,
  });
});

// Genel görev özetini oluşturur.
router.get("/summary", (req, res) => {
  // Status değeri completed olan görevlerin sayısını hesaplar.
  const completedCount = tasks.filter(
    (task) => task.status === "completed",
  ).length;

  // Status değeri pending olan görevlerin sayısını hesaplar.
  const pendingCount = tasks.filter((task) => task.status === "pending").length;

  // Toplam, tamamlanan ve bekleyen görev sayılarını cevap olarak gönderir.
  res.json({
    total: tasks.length,
    completed: completedCount,
    pending: pendingCount,
  });
});

// Raporlama yönlendiricisini başka dosyalarda kullanabilmek için dışa aktarır.
module.exports = router;
