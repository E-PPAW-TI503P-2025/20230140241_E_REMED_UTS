#Database
<img width="1920" height="1020" alt="image" src="https://github.com/user-attachments/assets/df69fa02-34c0-4201-94f3-4ba1f378850d" />
#Tampilan Web Admin
<img width="1920" height="1020" alt="image" src="https://github.com/user-attachments/assets/57cc5176-a76e-4981-93eb-c161943e01b0" />
#Validasi Harus Terisi
<img width="1920" height="1020" alt="image" src="https://github.com/user-attachments/assets/1873e52d-5be5-4cd1-9970-5d34ec035d65" />
<img width="1920" height="1020" alt="image" src="https://github.com/user-attachments/assets/0dc2a978-1043-4f33-b713-421008e41961" />
<img width="1920" height="1020" alt="image" src="https://github.com/user-attachments/assets/6514cb46-e9a4-4e8f-92d8-25854d970dec" />


#Tampilan Web user
<img width="1920" height="1020" alt="image" src="https://github.com/user-attachments/assets/8053bca9-bfb7-4a91-9e9c-b2ffb500e4b2" />
#POST Buku
<img width="1600" height="1000" alt="image" src="https://github.com/user-attachments/assets/22564aa9-d050-439a-83be-4475db8b73bb" />
#GET Buku
<img width="1600" height="1000" alt="image" src="https://github.com/user-attachments/assets/584eca1b-1e08-49ff-b678-33fffdd24598" />

# Panduan Menjalankan Aplikasi Library System

Berikut adalah langkah-langkah lengkap untuk menginstal dan menjalankan aplikasi ini di komputer Anda.

## 📋 Persyaratan Sistem
Pastikan Anda sudah menginstal:
1.  **Node.js** (Versi 16 atau lebih baru)
2.  **MySQL** (Bisa menggunakan XAMPP atau instalasi MySQL terpisah)
3.  **Git** (Opsional, untuk clone repository)

---

## 🚀 Langkah Instalasi & Setup

### 1. Persiapkan Folder Project
Buka terminal (Command Prompt / PowerShell / VS Code Terminal) di dalam folder project ini.

### 2. Install Dependencies
Jalankan perintah berikut untuk mengunduh semua library yang dibutuhkan:
```bash
npm install
```

### 3. Konfigurasi Database
1.  Pastikan MySQL server Anda sudah menyala (jika pakai XAMPP, nyalakan module **Apache** dan **MySQL**).
2.  Buat file `.env` (jika belum ada) dan sesuaikan dengan konfigurasi MySQL Anda.
    *   Jika menggunakan XAMPP default, password biasanya kosong.
    *   Isi file `.env`:
    ```env
    DB_USERNAME=root
    DB_PASSWORD=
    DB_NAME=library_system_development
    DB_HOST=127.0.0.1
    PORT=3000
    ```

### 4. Setup Database (Migrasi & Seeding)
Jalankan perintah berikut secara berurutan untuk membuat database, tabel, dan data awal:

```bash
# Membuat Database
npx sequelize-cli db:create

# Membuat Tabel (Migrasi)
npx sequelize-cli db:migrate

# Mengisi Data Awal (Dummy Data)
npx sequelize-cli db:seed:all
```

---

## ▶️ Menjalankan Aplikasi

### Mode Development (Disarankan)
Gunakan perintah ini agar server otomatis restart jika ada perubahan kode:
```bash
npm run dev
```

### Mode Production
```bash
npm start
```

Jika berhasil, akan muncul pesan:
> *Server is running on port 3000*
> *Database Connected...*

---

## 🌐 Cara Menggunakan Aplikasi

1.  Buka browser (Chrome/Edge/Firefox).
2.  Kunjungi alamat: **[http://localhost:3000](http://localhost:3000)**

### Fitur-Fitur:
*   **Ganti Role (Pojok Kanan Atas)**:
    *   **Public**: Hanya melihat daftar buku.
    *   **Admin**: Bisa menambah buku baru (**Add Book**) dan menghapus buku (**Delete**).
    *   **User**: Bisa meminjam buku (**Borrow**). Saat meminjam, browser akan meminta izin lokasi (Geolocation) untuk mencatat posisi peminjaman.

---

## ❓ Troubleshooting (Masalah Umum)

*   **Error: "Access denied for user 'root'"**: Cek file `.env`, pastikan password database benar.
*   **Error: "Unknown database"**: Jalankan `npx sequelize-cli db:create` terlebih dahulu.
*   **Tampilan Web tidak berubah**: Coba refresh browser atau restart server (`Ctrl + C`, lalu `npm run dev`).


