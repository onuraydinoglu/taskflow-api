// Görevleri tutan listeyi oluşturur.
const tasks = [
  {
    id: 1,
    title: "Giriş sayfasını hazırla",
    description: "E-Posta ve şifre alanlarını ekle",
    assignee: "Onur",
    status: "pedding",
    priority: "high",
  },
];

// Görev listesini diğer dosyalarda kullanabilmek için dışa aktarır.
module.exports = tasks;
