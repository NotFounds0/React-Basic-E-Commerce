# E-Ticaret Web Uygulaması (MERN Stack)

Bu projede MERN (MongoDB, Express, React, Node.js) Stack kullanarak geliştirilmiş bir e-ticaret platformu yer almaktadır. Kullanıcılar ürünleri görüntüleyebilir, sepete ekleyebilir ve alışveriş yapabilir. Admin paneli sayesinde ürün ve kullanıcı yönetimi yapılabilmektedir.

## Kullanılan Teknolojiler

- **MongoDB**: Veritabanı yönetimi
- **Express**: Backend geliştirme için Node.js framework
- **React**: Kullanıcı arayüzü
- **Redux**: Uygulama durumu yönetimi
- **JWT (JSON Web Token)**: Kullanıcı kimlik doğrulama
- **TailwindCSS**: Stil ve tasarım yönetimi
- **AOS (Animate on Scroll)**: Sayfa kaydırıldıkça animasyonlar eklemek için
- **SweetAlert**: Güzel ve özelleştirilebilir uyarılar
- **Toastify**: Bildirim mesajları

## Proje Özellikleri

### Kullanıcı Özellikleri:
- **Kayıt ve Giriş**: Kullanıcılar hesap oluşturup giriş yapabilirler.
- **Profil Sayfası**: Kullanıcılar profil bilgilerini görüntüleyip güncelleyebilirler.
- **Ürün İnceleme ve Sepete Ekleme**: Kullanıcılar ürünleri inceleyip, sepetlerine ekleyebilir ve çıkarabilirler.

### Admin Özellikleri:
- **Ürün Yönetimi**: Admin, yeni ürün ekleyebilir, var olan ürünleri düzenleyebilir ve silebilir.
- **Kullanıcı Yönetimi**: Admin, kullanıcıları görüntüleyebilir, düzenleyebilir ve silebilir.

## Kurulum

Projeyi yerel makinenizde çalıştırmak için aşağıdaki adımları izleyin:

1. **Depoyu klonlayın**:
   ```bash
   git clone https://github.com/kullanici_adi/proje_adi.git
   cd proje_adi
   ```

2. **Backend bağımlılıklarını yükleyin**:
   ```bash
   cd api
   npm install
   ```

3. **Frontend bağımlılıklarını yükleyin**:
   ```bash
   cd client
   npm install
   ```

4. **Ortam Değişkenlerini Ayarlayın**:
   Backend klasöründe `.env` dosyası oluşturun ve gerekli ortam değişkenlerini girin:
   ```env
   MONGO_URI=YOUR_MONGO_DB_URI
   JWT_SECRET=YOUR_SECRET_KEY
   ```

5. **Uygulamayı Çalıştırın**:
   - Backend: `npm run server`
   - Frontend: `npm start`

## Kullanım

- Kullanıcı kaydı ve giriş işlemlerini tamamladıktan sonra ürünleri görüntüleyebilir ve sepete ekleyebilirsiniz.
- Admin paneline giriş yaptıktan sonra ürün ve kullanıcı yönetimi yapabilirsiniz.

## Katkıda Bulunma

Katkıda bulunmak isterseniz, pull request göndererek veya star'layarak ya da issue oluşturarak projeye katkı sağlayabilirsiniz.

## Ekran Görüntüleri


![ana](https://github.com/user-attachments/assets/b8af8a86-6da0-490a-878a-aded3c33d561)
![pd](https://github.com/user-attachments/assets/1fba90f3-50f4-48db-bd38-249b392c137c)
![sepet](https://github.com/user-attachments/assets/2e35c68d-3dd9-4419-937e-2933c306269a)
![Screenshot_30](https://github.com/user-attachments/assets/09ed26ef-7a34-4692-b066-760a9ee19400)
![Screenshot_29](https://github.com/user-attachments/assets/eb13adc3-0146-474e-9e92-6f3e46e575ae)
![Screenshot_28](https://github.com/user-attachments/assets/19467c5f-6eed-483e-9459-08d460420fd7)
![Screenshot_27](https://github.com/user-attachments/assets/e6a2bfd5-4479-4055-b20f-0915c40742c8)
![Screenshot_26](https://github.com/user-attachments/assets/c55e7504-610f-4163-ad29-1fffd738f146)
![Screenshot_25](https://github.com/user-attachments/assets/095bf12b-9e8e-4b90-b7fd-27adc0a5d6d2)
