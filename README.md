# TASKFLOW

TaskFlow, Node.js ve Express.js kullanılarak geliştirilmiş bir görev ve proje yönetim sistemi REST API projesidir.

Bu proje, Node.js Backend Programlama eğitimi kapsamında bitirme projesi olarak hazırlanmıştır.

Sistem; ekip içerisindeki görevlerin oluşturulmasını, çalışanlara atanmasını, görev durumlarının takip edilmesini, önceliklendirilmesini ve yönetilmesini sağlar.

---

## Projenin Amacı

TaskFlow projesinin amacı, bir yazılım şirketindeki ekip görevlerinin REST API üzerinden yönetilmesini sağlamaktır.

Sistem temel olarak aşağıdaki işlemleri destekler:

- Görev oluşturma
- Görevleri listeleme
- Görev detayını görüntüleme
- Görev güncelleme
- Görev silme
- Görevleri çalışanlara atama
- Görev durumlarını takip etme
- Görev önceliklerini yönetme

Projede ayrıca temel gereksinimlere ek olarak gelişmiş API özellikleri de uygulanmıştır.

---

## Kullanılan Teknolojiler

- Node.js
- Express.js
- JavaScript
- REST API
- Postman
- Git
- GitHub

---

## Kurulum

Projeyi kendi bilgisayarınızda çalıştırmak için aşağıdaki adımları takip edebilirsiniz.

### 1. Projeyi İndirin

Projeyi GitHub üzerinden klonlayın:

```bash
git clone https://github.com/onuraydinoglu/taskflow-api.git
```

### 2. Proje Klasörüne Girin

```bash
cd taskflow-api
```

### 3. Bağımlılıkları Yükleyin

```bash
npm install
```

Bu komut, `package.json` dosyasında bulunan gerekli bağımlılıkları yükler.

### 4. Sunucuyu Başlatın

```bash
node app.js
```

Sunucu başarılı şekilde başladığında terminalde aşağıdaki mesaj görüntülenir:

```text
Sunucu http://localhost:3000 adresinde çalışıyor
```

API'nin temel adresi:

```text
http://localhost:3000
```

Ana adresi kontrol etmek için:

```http
GET http://localhost:3000/
```

Başarılı durumda:

```text
Taskflow API çalışıyor.
```

cevabı alınır.

---

## Proje Yapısı

```text
taskflow-api/
│
├── data/
│   └── tasks.js
│
├── middleware/
│   ├── logger.js
│   └── validateTask.js
│
├── routes/
│   ├── taskRoutes.js
│   └── reportRoutes.js
│
├── app.js
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

### Klasörlerin Açıklaması

#### data/

Görev verilerinin tutulduğu klasördür.

- `tasks.js`: Sistemde kullanılan görev verilerini içerir.

#### middleware/

API istekleri sırasında çalışan middleware dosyalarını içerir.

- `logger.js`: Gelen API isteklerinin method, endpoint ve zaman bilgilerini konsola yazar.
- `validateTask.js`: Görev oluşturma ve güncelleme işlemlerinde gelen verileri doğrular.

#### routes/

API endpointlerinin tanımlandığı dosyaları içerir.

- `taskRoutes.js`: Görev yönetimi ile ilgili endpointleri içerir.
- `reportRoutes.js`: Raporlama işlemleri ile ilgili endpointleri içerir.

#### app.js

Express uygulamasının başlangıç dosyasıdır. Route ve middleware yapıları bu dosyada uygulamaya bağlanır.

---

# API Endpointleri

## Görevleri Listeleme

Sistemde bulunan tüm görevleri listeler.

```http
GET /tasks
```

Örnek:

```text
http://localhost:3000/tasks
```

---

## Görev Detayı

Belirli bir görevi ID değerine göre getirir.

```http
GET /tasks/:id
```

Örnek:

```text
http://localhost:3000/tasks/1
```

Görev bulunamazsa `404 Not Found` durum kodu döndürülür.

---

## Yeni Görev Oluşturma

Yeni bir görev oluşturur.

```http
POST /tasks
```

Örnek istek gövdesi:

```json
{
  "title": "Backend API geliştir",
  "description": "Görev yönetimi endpointlerini oluştur",
  "assignee": "Onur",
  "status": "pending",
  "priority": "high"
}
```

Yeni görev oluşturulduğunda sisteme otomatik olarak `id` ve `createdAt` değerleri eklenir.

Başarılı oluşturma işleminde:

```text
201 Created
```

durum kodu döndürülür.

---

## Görev Güncelleme

Belirli bir görevin bilgilerini günceller.

```http
PUT /tasks/:id
```

Örnek:

```text
http://localhost:3000/tasks/1
```

Örnek istek gövdesi:

```json
{
  "title": "Backend API geliştir",
  "description": "Görev yönetimi endpointlerini tamamla",
  "assignee": "Onur",
  "status": "completed",
  "priority": "high"
}
```

Görev bulunamazsa `404 Not Found` durum kodu döndürülür.

---

## Görev Silme

Belirli bir görevi sistemden siler.

```http
DELETE /tasks/:id
```

Örnek:

```text
http://localhost:3000/tasks/1
```

Görev başarıyla silindiğinde bilgi mesajı döndürülür.

---

# Logger Middleware

Projede tüm API isteklerini takip etmek için bir logger middleware kullanılmaktadır.

Logger aşağıdaki bilgileri konsola yazar:

- HTTP methodu
- Endpoint
- İstek zamanı

Örnek:

```text
GET /tasks - 10.10.2026 13:30:15
POST /tasks - 10.10.2026 13:31:22
DELETE /tasks/5 - 10.10.2026 13:32:40
```

---

# Gelişmiş API Özellikleri

Projenin temel CRUD işlemlerine ek olarak gelişmiş API özellikleri de geliştirilmiştir.

## Duruma Göre Filtreleme

Bekleyen görevler:

```http
GET /tasks?status=pending
```

Tamamlanan görevler:

```http
GET /tasks?status=completed
```

---

## Önceliğe Göre Filtreleme

Yüksek öncelikli görevler:

```http
GET /tasks?priority=high
```

Orta öncelikli görevler:

```http
GET /tasks?priority=medium
```

Düşük öncelikli görevler:

```http
GET /tasks?priority=low
```

---

## Birden Fazla Filtre Kullanımı

Durum ve öncelik filtreleri birlikte kullanılabilir.

```http
GET /tasks?status=pending&priority=high
```

---

## Görev Arama

Görev başlıklarında anahtar kelimeye göre arama yapılabilir.

```http
GET /tasks/search?keyword=backend
```

Arama işlemi büyük ve küçük harf duyarsızdır.

---

## Çalışana Göre Görev Listeleme

Belirli bir çalışana atanmış görevleri listeler.

```http
GET /tasks/assignee/:name
```

Örnek:

```http
GET /tasks/assignee/Onur
```

---

## Sayfalama

Görevler `page` ve `limit` query parametreleri kullanılarak sayfalanabilir.

```http
GET /tasks?page=1&limit=10
```

Örnek:

```http
GET /tasks?page=2&limit=5
```

`page` ve `limit` değerlerinin birlikte gönderilmesi gerekir.

Geçersiz değerlerde API `400 Bad Request` durum kodu döndürür.

---

## Sıralama

Görevler oluşturulma tarihine göre sıralanabilir.

```http
GET /tasks?sort=createdAt
```

Filtreleme ve sıralama birlikte kullanılabilir.

```http
GET /tasks?status=pending&sort=createdAt
```

---

# Validation Middleware

Görev oluşturma ve güncelleme işlemlerinde gelen veriler validation middleware tarafından kontrol edilir.

Doğrulanan alanlar:

- `title`
- `description`
- `priority`
- `assignee`

Bu alanlardan biri eksik olduğunda API:

```text
400 Bad Request
```

durum kodu döndürür.

Geçerli `priority` değerleri:

```text
low
medium
high
```

Geçersiz bir priority değeri gönderildiğinde istek reddedilir.

Örnek geçersiz değer:

```json
{
  "title": "Yeni görev",
  "description": "Görev açıklaması",
  "assignee": "Onur",
  "priority": "urgent"
}
```

---

# Raporlama Servisleri

Projede görev durumlarıyla ilgili temel raporlama servisleri bulunmaktadır.

## Tamamlanan Görev Sayısı

```http
GET /reports/completed
```

Örnek cevap:

```json
{
  "completed": 10
}
```

---

## Bekleyen Görev Sayısı

```http
GET /reports/pending
```

Örnek cevap:

```json
{
  "pending": 10
}
```

---

## Genel Sistem Özeti

```http
GET /reports/summary
```

Örnek cevap:

```json
{
  "total": 20,
  "completed": 10,
  "pending": 10
}
```

Rapor değerleri sistemde bulunan mevcut görev verilerine göre dinamik olarak hesaplanır.

---

# Veri Yapısı

Sistemde kullanılan bir görev aşağıdaki yapıya sahiptir:

```json
{
  "id": 1,
  "title": "Giriş sayfasını hazırla",
  "description": "E-Posta ve şifre alanlarını ekle",
  "assignee": "Onur",
  "status": "pending",
  "priority": "high",
  "createdAt": "2026-01-05T10:00:00.000Z"
}
```

Alanların açıklaması:

| Alan | Açıklama |
|---|---|
| `id` | Görevin benzersiz kimlik numarası |
| `title` | Görev başlığı |
| `description` | Görev açıklaması |
| `assignee` | Görevin atandığı çalışan |
| `status` | Görevin mevcut durumu |
| `priority` | Görevin öncelik seviyesi |
| `createdAt` | Görevin oluşturulma tarihi |

---

# ID Oluşturma

Yeni görevlerin ID değerleri elle verilmemektedir.

Sistem, mevcut görevler içerisindeki en büyük ID değerini bulur ve yeni görev için bir sonraki ID değerini otomatik olarak oluşturur.

Bu sayede mevcut görev sayısı değişse bile yeni görevlerde ID çakışması yaşanması önlenir.

---

# Veri Saklama

Bu projede bir veritabanı kullanılmamaktadır.

Görevler `data/tasks.js` dosyasında bulunan JavaScript dizisi içerisinde tutulmaktadır.

Bu nedenle uygulama çalışırken yapılan:

- Görev ekleme
- Görev güncelleme
- Görev silme

işlemleri sunucu yeniden başlatıldığında kalıcı olarak saklanmaz.

Sunucu yeniden başlatıldığında `tasks.js` dosyasındaki başlangıç verileri tekrar yüklenir.

---

# HTTP Durum Kodları

Projede kullanılan temel HTTP durum kodları:

| Kod | Açıklama |
|---|---|
| `200` | İstek başarıyla gerçekleştirildi |
| `201` | Yeni görev başarıyla oluşturuldu |
| `400` | Geçersiz veya eksik veri gönderildi |
| `404` | İstenen görev bulunamadı |

---

# Postman Testleri

API endpointleri Postman üzerinden test edilmiştir.

Temel CRUD işlemleri için aşağıdaki testler gerçekleştirilmiştir:

- Görev ekleme
- Görev listeleme
- Görev detayı görüntüleme
- Görev güncelleme
- Görev silme

Ayrıca aşağıdaki gelişmiş özellikler de Postman üzerinden test edilmiştir:

- Duruma göre filtreleme
- Önceliğe göre filtreleme
- Birden fazla filtre kullanımı
- Görev arama
- Çalışana göre görev listeleme
- Sayfalama
- Sıralama
- Validation
- Raporlama

---

# Örnek API Adresleri

## CRUD

```text
GET    http://localhost:3000/tasks
GET    http://localhost:3000/tasks/1
POST   http://localhost:3000/tasks
PUT    http://localhost:3000/tasks/1
DELETE http://localhost:3000/tasks/1
```

## Filtreleme

```text
GET http://localhost:3000/tasks?status=pending
GET http://localhost:3000/tasks?status=completed
GET http://localhost:3000/tasks?priority=high
GET http://localhost:3000/tasks?status=pending&priority=high
```

## Arama

```text
GET http://localhost:3000/tasks/search?keyword=backend
```

## Çalışana Göre Listeleme

```text
GET http://localhost:3000/tasks/assignee/Onur
```

## Sayfalama

```text
GET http://localhost:3000/tasks?page=1&limit=5
```

## Sıralama

```text
GET http://localhost:3000/tasks?sort=createdAt
```

## Raporlama

```text
GET http://localhost:3000/reports/completed
GET http://localhost:3000/reports/pending
GET http://localhost:3000/reports/summary
```

---

# Proje Kapsamı

Projenin zorunlu bölümünde aşağıdaki özellikler geliştirilmiştir:

- Node.js ve Express.js backend yapısı
- REST API
- Routing yapısı
- Görev CRUD işlemleri
- Logger middleware
- Postman ile temel CRUD testleri

Bunlara ek olarak aşağıdaki isteğe bağlı özellikler de uygulanmıştır:

- Duruma göre filtreleme
- Önceliğe göre filtreleme
- Görev arama
- Çalışana göre görev listeleme
- Sayfalama
- Sıralama
- Validation middleware
- Raporlama servisleri
