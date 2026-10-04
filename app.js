// Express paketini projeye dahil eder.
const express = require("express");

// Express uygulamasını oluşturur.
const app = express();

// Sunucunun çalışacağı portu belirler.
const PORT = 3000;

// Gelen isteklerdeki JSON verilerini okuyabilmezi sağlar.
app.use(express.json());

// Ana adrese gelen GET isteklerini karşılar.
// req: Gelen isteğin bilgilerini tutar.
// res: İsteğe cevap göndermek için kullanılır.
app.get("/", (req, res) => {
  // Tarayıcıya veya Postman'e bir cevap gönderir.
  res.send("Taskflow API çalışıyor.");
});

// Sunucuyu belirtilen portta başlatır.
app.listen(PORT, () => {
  // Sunucu çalışmaya başladığında terminale bilgi yazar.
  console.log(`Sunucu http://localhost:${PORT} adresinde çalışıyor`);
});
