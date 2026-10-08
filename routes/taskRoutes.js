// Kurulu Express paketini bu dosyada kullanıma alır.
const express = require("express");

// Görev listesini data klasöründeki dosyadan alır.
const tasks = require("../data/tasks");

// Görevlerle ilgili adresleri tanımlayacağımız yönlendiriciyi oluşturur.
const router = express.Router();

// Listede 1 numaralı örnek görev olduğu için yeni numaraları 2'den başlatır.
let nextId = 2;

// Görevleri listeler ve istenirse duruma göre filtreler.
router.get("/", (req, res) => {
  // Adresten gönderilen status ve priority değerlerini alır.
  const status = req.query.status;
  const priority = req.query.priority;

  // Adresten gönderilen sayfa numarası ve sayfa başına görev sayısını alır.
  const page = Number(req.query.page);
  const limit = Number(req.query.limit);

  // Page değerinin gönderilip gönderilmediğini kontrol eder.
  const hasPage = req.query.page !== undefined;

  // Limit değerinin gönderilip gönderilmediğini kontrol eder.
  const hasLimit = req.query.limit !== undefined;

  // Page veya limit sayı değilse hata mesajı gönderir.
  if ((hasPage && Number.isNaN(page)) || (hasLimit && Number.isNaN(limit))) {
    return res.status(400).json({
      message: "Page ve limit sayı olmalıdır.",
    });
  }

  // Page veya limit geçersizse hata mesajı gönderir.
  if ((hasPage && page < 1) || (hasLimit && limit < 1)) {
    return res.status(400).json({
      message: "Page ve limit 1 veya daha büyük olmalı.",
    });
  }

  // Page veya limit değerlerinden yalnızca biri gönderildiyse hata mesajı gönderir.
  if (hasPage !== hasLimit) {
    return res.status(400).json({
      message: "Page ve limit birlikte gönderilmelidir.",
    });
  }

  // Filtreleme işlemlerinde kullanılmak üzere görev listesini başlangıç değeri olarak alır.
  let filteredTasks = tasks;

  // Status gönderildiyse sadece o duruma sahip görevleri filtreler.
  if (status) {
    filteredTasks = filteredTasks.filter((task) => task.status === status);
  }

  // Priority gönderildiyse sadece o önceliğe sahip görevleri filtreler.
  if (priority) {
    filteredTasks = filteredTasks.filter((task) => task.priority === priority);
  }

  // Filtre gönderildiği halde uygun görev bulunamadıysa bilgi mesajı gönderir.
  if ((status || priority) && filteredTasks.length === 0) {
    return res.json({
      message: "Filtreye uygun görev bulunamadı.",
    });
  }

  {
    /*   if (status) {
    // Status gönderildiyse sadece o duruma sahip görevleri filtreler.
    const filteredTasks = tasks.filter((task) => task.status === status);

    // Filtre sonucunda görev bulunamadıysa bilgi mesajı gönderir.
    if (filteredTasks.length === 0) {
      return res.json({
        message: "Filtreye uygun görev bulunamadı.",
      });
    }

    return res.json(filteredTasks);
  }

  // Priority gönderildiyse sadece o önceliğe sahip görevleri filtreler.
  if (priority) {
    const filteredTasks = tasks.filter((task) => task.priority === priority);

    // Filtre sonucunda görev bulunamadıysa bilgi mesajı gönderir.
    if (filteredTasks.length === 0) {
      return res.json({
        message: "Filtreye uygun görev bulunamadı.",
      });
    }

    return res.json(filteredTasks);
  } */
  }

  // Görev listesi boşsa bilgi mesajı gönderir.
  if (tasks.length === 0) {
    return res.json({
      message: "Henüz görev bulunamadı.",
    });
  }

  // Page ve limit birlikte gönderildiyse sayfalanmış görevleri gönderir.
  if (hasPage && hasLimit) {
    // İstenen sayfada hangi görevden başlanacağını hesaplar.
    const startIndex = (page - 1) * limit;

    // İstenen sayfanın biteceği görev sırasını hesaplar.
    const endIndex = startIndex + limit;

    // Hesaplanan başlangıç ve bitiş sırasına göre görevleri sayfalar.
    const paginatedTasks = filteredTasks.slice(startIndex, endIndex);

    // Sayfalanmış görevleri cevap olarak gönderir.
    return res.json(paginatedTasks);
  }

  // Filtreleme sonucunda kalan görevleri gönderir.
  res.json(filteredTasks);
});

// Görevleri başlıklarında geçen anahtar kelimeye göre arar.
router.get("/search", (req, res) => {
  // Adresten gönderilen keyword değerini alır.
  const keyword = req.query.keyword;

  // Aranacak kelime gönderilmediyse bilgi mesajı gönderir.
  if (!keyword) {
    return res.json({
      message: "Arama yapmak için bir kelime girin.",
    });
  }

  // Görevlerin başlığında anahtar kelime geçen görevleri filtreler.
  const searchedTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(keyword.toLowerCase()),
  );

  // Arama sonucunda görev bulunamadıysa bilgi mesajı gönderir.
  if (searchedTasks.length === 0) {
    return res.json({
      message: "Aramaya uygun görev bulunamadı.",
    });
  }

  // Arama sonucunda bulunan görevleri gönderir.
  res.json(searchedTasks);
});

// Adreste gönderilen çalışan adına göre görevleri listeler.
router.get("/assignee/:name", (req, res) => {
  // Adresten gönderilen çalışan adını alır.
  const name = req.params.name;

  // Çalışan adı eşleşen görevleri filtreler.
  const assigneeTasks = tasks.filter(
    (task) => task.assignee.toLowerCase() === name.toLowerCase(),
  );

  // Çalışana ait görev bulunamadıysa bilgi mesajı gönderir.
  if (assigneeTasks.length === 0) {
    return res.json({
      message: "Bu çalışana ait görev bulunamadı.",
    });
  }

  // Çalışana ait bulunan görevleri cevap olarak gönderir.
  res.json(assigneeTasks);
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
