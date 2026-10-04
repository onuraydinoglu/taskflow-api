// Kurulu Express paketini bu dosyada kullanıma alır.
const express = require("express");

// Görev listesini data klasöründeki dosyadan alır.
const tasks = require("../data/tasks");

// Görevlerle ilgili adresleri tanımlayacağımız yönlendiriciyi oluşturur.
const router = express.Router();

// Listede 1 numaralı örnek görev olduğu için yeni numaraları 2'den başlatır.
let nextId = 2;

// Görev listeleme isteğine şimdilik boş bir liste gönderir.
router.get("/", (req, res) => {
  res.json(tasks);
});

// Adreste gönderilen numaraya göre belirli bir görevi getirir.
router.get("/:id", (req, res) => {
  // Adresten gelen id değerini sayıya çevirir.
  const taskId = Number(req.params.id);

  // Görevler arasında id değeri eşleşen görevi bulur.
  const task = tasks.find((task) => task.id === taskId);

  // Görev bulunamadıysa 404 durum koduyla hata mesajı gönderir.
  if (!task) {
    return res.status(404).json({
      message: "Görev bulunamadı.",
    });
  }

  // Bulunan görevi cevap olarak gönderir.
  res.json(task);
});

router.post("/", (req, res) => {
  // İsteğin gövdesindeki bilgileri yeni görev nesnesine yerleştirir.
  const newTask = {
    id: nextId,
    title: req.body.title,
    description: req.body.description,
    assignee: req.body.assignee,
    status: req.body.status,
    priority: req.body.priority,
  };

  // Yeni görevi listenin sonuna ekler.
  tasks.push(newTask);

  // Bir sonraki görev için numarayı bir artırır.
  nextId = nextId + 1;

  // 201 durum koduyla görevin oluşturulduğunu bildirir.
  res.status(201).json(newTask);
});

// Adreste gönderilen numaraya göre belirli bir görevi günceller.
router.put("/:id", (req, res) => {
  // Adresten gelen id değerini sayıya çevirir.
  const taskId = Number(req.params.id);

  // Görevler arasında id değeri eşleşen görevi bulur.
  const task = tasks.find((task) => task.id === taskId);

  // Görev bulunamadıysa 404 durum koduyla hata mesajı gönderir.
  if (!task) {
    return res.status(404).json({
      message: "Görev bulunamadı.",
    });
  }

  // Görevin bilgilerini isteğin gövdesinden gelen yeni bilgilerle değiştirir.
  task.title = req.body.title;
  task.description = req.body.description;
  task.assignee = req.body.assignee;
  task.status = req.body.status;
  task.priority = req.body.priority;

  // Güncellenen görevi cevap olarak gönderir.
  res.json(task);
});

// Adreste gönderilen numaraya göre belirli bir görevi siler.
router.delete("/:id", (req, res) => {
  // Adresten gelen id değerini sayıya çevirir.
  const taskId = Number(req.params.id);

  // Görevler arasında id değeri eşleşen görevin sırasını bulur.
  const taskIndex = tasks.findIndex((task) => task.id === taskId);

  // Görev bulunamadıysa 404 durum koduyla hata mesajı gönderir.
  if (taskIndex === -1) {
    return res.status(404).json({
      message: "Görev bulunamadı.",
    });
  }

  // Bulunan görevi görev listesinden siler.
  tasks.splice(taskIndex, 1);

  // Görevin başarıyla silindiğini bildirir.
  res.json({
    message: "Görev başarıyla silindi.",
  });
});

// Yönlendiriciyi başka dosyalarda kullanabilmek için dışa aktarır.
module.exports = router;
