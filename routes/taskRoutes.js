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

// Yönlendiriciyi başka dosyalarda kullanabilmek için dışa aktarır.
module.exports = router;
