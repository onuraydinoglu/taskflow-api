// Express paketini projeye dahil eder.
const express = require("express");

// Görev adreslerini tanımladığımız dosyayı kullanıma alır.
const taskRoutes = require("./routes/taskRoutes");

// Logger middleware'ini kullanıma alır.
const logger = require("./middleware/logger");

// Express uygulamasını oluşturur.
const app = express();

// Sunucunun çalışacağı portu belirler.
const PORT = 3000;

// Gelen isteklerdeki JSON verilerini okuyabilmezi sağlar.
app.use(express.json());

// Tüm API isteklerini logger middleware'inden geçirir.
app.use(logger);

// Ana adrese gelen GET isteklerini karşılar.
// req: Gelen isteğin bilgilerini tutar.
// res: İsteğe cevap göndermek için kullanılır.
app.get("/", (req, res) => {
  // Tarayıcıya veya Postman'e bir cevap gönderir.
  res.send("Taskflow API çalışıyor.");
});

// /tasks ile başlayan istekleri görev yönlendiricisine gönderir.
app.use("/tasks", taskRoutes);

// Sunucuyu belirtilen portta başlatır.
app.listen(PORT, () => {
  // Sunucu çalışmaya başladığında terminale bilgi yazar.
  console.log(`Sunucu http://localhost:${PORT} adresinde çalışıyor`);
});
