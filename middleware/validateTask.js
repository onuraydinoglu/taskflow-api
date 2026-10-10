// Görev ekleme ve güncelleme isteklerinde gelen verileri doğrular.
const validateTask = (req, res, next) => {
  // İstek gövdesinden doğrulanacak görev bilgilerini alır.
  const { title, description, priority, assignee } = req.body;

  // Zorunlu alanlardan biri eksikse hata mesajı gönderir.
  if (!title || !description || !priority || !assignee) {
    return res.status(400).json({
      message: "Title, description, priority ve assignee alanları zorunludur.",
    });
  }

  // Geçerli öncelik değerlerini tanımlar.
  const validPriorities = ["low", "medium", "high"];

  // Priority geçerli değerlerden biri değilse hata mesajı gönderir.
  if (!validPriorities.includes(priority)) {
    return res.status(400).json({
      message: "Priority low, medium veya high olmalıdır.",
    });
  }

  // Tüm kontroller başarılıysa isteğin bir sonraki işleme devam etmesini sağlar.
  next();
};

// Validation middleware'ini başka dosyalarda kullanabilmek için dışa aktarır.
module.exports = validateTask;
