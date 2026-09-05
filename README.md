# 🌿 Jejak Pamulihan Memories — Tutorial Terstruktur & Panduan Lengkap

Selamat datang di repository resmi **Jejak Pamulihan Memories**! Website ini dibuat khusus untuk mengabadikan seluruh momen indah, tawa, perjuangan, struktur pengurus, galeri foto, dan kata-kata khas kenangan selama masa **Kuliah Kerja Nyata (KKN) Desa Pamulihan**.

Website ini dibangun menggunakan **HTML5, CSS3, dan Vanilla JavaScript (Pure Static)** tanpa *framework* atau *build tools* rumit, sehingga **100% Siap Diunggah & Dipublikasikan Gratis di GitHub Pages**!

---

## 📁 Structure Berkas Proyek

```
Jejak Pamulihan/
├── index.html                # Berkas utama struktur tampilan website
├── style.css                 # Berkas desain, tema Emerald-Gold, & animasi
├── script.js                 # Berkas logika interaktif (Lightbox, Quote Carousel, Wall)
├── README.md                 # Berkas panduan & tutorial ini
└── images/                   # Folder media & foto
    ├── Struktur Pengurus/    # Foto profil 14 pengurus KKN (Kordes, Sekre, Benda, dll)
    └── Selama KKN/           # 75+ foto dokumentasi kegiatan KKN Pamulihan
```

---

## 🚀 Bagian 1: Cara Membuka & Menguji Web di Komputer (Lokal)

1. Buka folder `Jejak Pamulihan` di komputer Anda.
2. Klik dua kali (*double click*) pada berkas **`index.html`**.
3. Website akan otomatis terbuka di browser favorit Anda (Google Chrome, Edge, Firefox, Safari).
4. *(Opsional)* Jika Anda menggunakan **VS Code**, Anda bisa mengeklik tombol **"Go Live"** (Live Server extension) di pojok kanan bawah untuk pratinjau yang langsung memperbarui tampilan saat ada berkas yang diubah.

---

## 📝 Bagian 2: Cara Mengubah & Menyesuaikan Konten Web

### A. Mengubah / Menambah Kata-Kata Kenangan KKN
Kata-kata kenangan berada di dua lokasi:

1. **Pada Berkas `index.html`** (Baris ± 150-240):
   - Cari bagian `<div class="quotes-grid">`.
   - Ubah teks di dalam tag `<p class="quote-card-text">"Kata-kata Anda di sini..."</p>`.
   - Ubah pembuat kata-kata di tag `<span>— Nama Divisi/Anggota</span>`.

2. **Pada Berkas `script.js`** (Baris ± 100-140):
   - Cari daftar `const quotesList = [ ... ];`.
   - Anda bisa menambahkan quote baru dengan format:
     ```javascript
     {
       text: '"Kata-kata kenangan baru kalian di sini!"',
       author: '<i class="fa-solid fa-heart"></i> Divisi / Nama Anggota'
     },
     ```

### B. Mengubah / Menambah Foto Struktur Pengurus
- Foto pengurus disimpan di folder **`images/Struktur Pengurus/`**.
- Jika ingin mengganti foto, pastikan nama berkasnya sesuai dengan yang ada di `index.html` (misal: `Kordes.jpeg`, `Bendahara.jpeg`, `Sekretaris 1.jpeg`).
- Jika ingin menambah anggota baru, buka `index.html` pada bagian `<div class="team-grid">`, lalu duplikasi salah satu elemen `<div class="glass-card team-card">...</div>`.

### C. Menambah Foto ke Galeri Dokumentasi
- Masukkan foto baru ke dalam folder **`images/Selama KKN/`**.
- Buka `index.html` pada bagian `<div class="gallery-grid" id="gallery-grid">`.
- Tambahkan elemen foto baru dengan menyalin format berikut:
  ```html
  <div class="gallery-item" data-category="proker"> <!-- Pilihan kategori: proker, posko, desa, pelepasan -->
    <img src="images/Selama KKN/NAMA_FOTO_ANDA.jpg" alt="Judul Foto" loading="lazy">
    <div class="gallery-item-overlay">
      <div class="gallery-item-info">
        <div class="gallery-item-title">Judul Momen</div>
        <div class="gallery-item-sub">Kategori Momen</div>
      </div>
    </div>
  </div>
  ```

---

## 🌐 Bagian 3: Tutorial Terstruktur Step-by-Step Upload ke GitHub Pages (Hosting Gratis)

Berikut adalah panduan lengkap dari nol agar website **Jejak Pamulihan Memories** Anda bisa diakses oleh seluruh anggota KKN dan warga via link internet (contoh: `https://username.github.io/Jejak-Pamulihan/`):

### 📌 Langkah 1: Buat Akun & Repository GitHub Baru
1. Buka situs [GitHub.com](https://github.com/) dan pastikan Anda sudah **Sign In** (atau daftar akun baru gratis).
2. Klik tombol hijau **"New"** atau tanda tambah **"+"** di kanan atas -> pilih **"New repository"**.
3. Isikan data repository:
   - **Repository name**: `Jejak-Pamulihan` (atau nama lain tanpa spasi).
   - **Description**: `Website Kenangan KKN Desa Pamulihan`.
   - **Public / Private**: Pilih **Public** (wajib Public agar fitur GitHub Pages bisa aktif gratis).
   - Centang opsi *"Add a README file"* (opsional).
4. Klik tombol hijau **"Create repository"**.

### 📌 Langkah 2: Upload Seluruh Berkas Web ke GitHub
1. Di halaman repository GitHub yang baru saja dibuat, klik tombol **"Add file"** di kanan atas -> pilih **"Upload files"**.
2. Buka folder `Jejak Pamulihan` di komputer Anda.
3. Select / Pilih seluruh berkas dan folder:
   - `index.html`
   - `style.css`
   - `script.js`
   - `README.md`
   - Folder `images/` (beserta isinya `Struktur Pengurus` dan `Selama KKN`)
4. **Drag & Drop** (Tarik dan Lepas) seluruh berkas tersebut ke kotak upload di browser GitHub.
5. Tunggu proses upload semua foto dan berkas selesai (pastikan indikator berjalan hingga tuntas).
6. Di bagian bawah ("Commit changes"), tuliskan pesan misal: `Upload awal website Jejak Pamulihan Memories`.
7. Klik tombol hijau **"Commit changes"**.

### 📌 Langkah 3: Aktifkan Fitur GitHub Pages
1. Masih di halaman repository GitHub Anda, klik menu **"Settings"** (tab bergambar roda gigi di atas).
2. Di menu navigasi sebelah kiri, cari dan klik **"Pages"** (di bawah kelompok *Code and automation*).
3. Pada bagian **Build and deployment**:
   - **Source**: Pilih `Deploy from a branch`.
   - **Branch**: Ubah dari `None` menjadi **`main`** (atau `master`), dan biarkan folder tetap **`/(root)`**.
4. Klik tombol **"Save"**.

### 📌 Langkah 4: Website Anda Sudah Live! 🎉
1. Tunggu sekitar 1–3 menit agar GitHub memproses server web Anda.
2. Refresh halaman Settings -> Pages tersebut.
3. Di bagian atas akan muncul kotak berwarna hijau bertuliskan:
   > **"Your site is live at https://username.github.io/Jejak-Pamulihan/"**
4. Klik link tersebut, dan **Website Jejak Pamulihan Memories** Anda kini resmi online di seluruh dunia!
5. Bagikan link ini ke grup WhatsApp teman-teman KKN dan DPL Anda!

---

## ✨ Fitur Unggulan Website

- 💎 **Tema Elegan & Profesional**: Kombinasi warna Emerald Green, Warm Gold, dan Glassmorphism yang mewah.
- 📱 **Responsif Sepenuhnya**: Tampil indah di Smartphone (HP), Tablet, maupun PC / Laptop.
- 💬 **Kata-Kata Kenangan KKN**: Generator quote interaktif dengan tombol acak (*shuffle*) & salin quote.
- 🖼️ **Galeri Lightbox & Filter**: Pratinjau foto resolusi tinggi dengan filter kategori momen.
- 👥 **Profil Pengurus**: Tampilan visual 14 pengurus KKN beserta jabatan & quote impian.
- 📖 **Memory Wall**: Buku tamu interaktif tempat anggota bisa menuliskan kesan pesan (tersimpan otomatis di browser).
- 🎵 **Audio Player Ambient**: Musik pemanis latar belakang yang estetik.

---

*Dibuat dengan ❤️ untuk mengenang masa pengabdian KKN Desa Pamulihan.*
