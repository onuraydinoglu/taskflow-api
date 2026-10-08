// Görevleri tutan listeyi oluşturur.
const tasks = [
  {
    id: 1,
    title: "Giriş sayfasını hazırla",
    description: "E-Posta ve şifre alanlarını ekle",
    assignee: "Onur",
    status: "pending",
    priority: "high",
    createdAt: new Date("2026"),
  },
];

// Görev listesini diğer dosyalarda kullanabilmek için dışa aktarır.
module.exports = tasks;
