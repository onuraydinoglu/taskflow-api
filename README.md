# TASKFLOW

TaskFlow, Node.js ve Express.js kullanılarak geliştirilmiş bir görev ve proje yönetim sistemi REST API projesidir.

Bu proje, Node.js Backend Programlama eğitimi kapsamında bitirme projesi olarak hazırlanmıştır.

Sistem; ekip içerisindeki görevlerin oluşturulmasını, çalışanlara atanmasını, görev durumlarının takip edilmesini ve görevlerin yönetilmesini sağlar.

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

Projede ayrıca eğitim kapsamının üzerine ek olarak gelişmiş API özellikleri de uygulanmıştır.

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
