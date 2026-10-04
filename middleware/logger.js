// API'ye gelen isteklerin bilgilerini terminale yazdırır.
const logger = (req, res, next) => {
  // İsteğin yapıldığı zamanı oluşturur.
  const time = new Date().toLocaleString("tr-TR");

  // İsteğin metodunu, adresini ve zamanını terminale yazdırır.
  console.log(`${req.method} ${req.originalUrl} - ${time}`);

  // İsteğin bir sonraki işleme devam etmesini sağlar.
  next();
};

// Logger middleware'ini başka dosyalarda kullanabilmek için dışa aktarır.
module.exports = logger;
