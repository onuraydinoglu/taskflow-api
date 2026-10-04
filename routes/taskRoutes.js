// Kurulu Express paketini bu dosyada kullanıma alır.
const express = require("express");

// Görevlerle ilgili adresleri tanımlayacağımız yönlendiriciyi oluşturur.
const router = express.Router();

// Görev listeleme isteğine şimdilik boş bir liste gönderir.
router.get("/", (req, res) => {
  res.json([]);
});

// Yönlendiriciyi başka dosyalarda kullanabilmek için dışa aktarır.
module.exports = router;
