# Book Manager

## Deskripsi Aplikasi

Book Manager adalah aplikasi web berbasis React untuk mengelola koleksi buku pribadi. Dengan aplikasi ini, pengguna dapat menambah, mengedit, menghapus, mencari, dan memfilter buku berdasarkan status (Sudah Dimiliki, Sedang Dibaca, Ingin Dibeli). Selain itu, aplikasi juga menampilkan statistik koleksi buku dalam bentuk visual.

---

## Instruksi Instalasi dan Menjalankan

1. **Clone repository ini**
   ```bash
   git clone https://github.com/alfajar-122140122/pemrograman_web_itera_122140122.git
   cd pemrograman_web_itera_122140122/Alfajar_122140122_Pertemuan3
   ```
2. **Install dependencies**
    ```bash
    npm install
    ```
3. **Jalankan aplikasi**
    ```bash
    npm start
    ```
    Buka [http://localhost:3000](http://localhost:3000) di browser Anda.
4. **Jalankan testing**
    ```bash
    npm test
    ```

## Screenshot Antarmuka
Beranda (Daftar Buku)
![Antarmuka Beranda](./Screenshot%20Antarmuka\beranda.png)
Form Tambah/Edit Buku
![Antarmuka Input](./Screenshot%20Antarmuka\inputFOrm.png)
Statistik Koleksi Buku
![Antarmuka Statistik](./Screenshot%20Antarmuka\statistik.png)

## Penjelasan Fitur React yang Digunakan

- **Functional Component & Hooks**  
  Semua komponen dibangun menggunakan React functional component dan memanfaatkan berbagai hooks seperti `useState`, `useEffect`, `useContext`, dan `useMemo` untuk mengelola state, efek samping, context, dan optimasi performa.

- **Context API**  
  Menggunakan Context (`BookContext`) untuk menyimpan dan membagikan state global koleksi buku, filter, dan pencarian ke seluruh komponen aplikasi tanpa perlu prop drilling.

- **Custom Hook**  
  - `useLocalStorage`: Custom hook untuk menyimpan dan mengambil data buku dari localStorage browser, sehingga data tetap tersimpan meskipun halaman di-refresh.
  - `useBookStats`: Custom hook untuk menghitung statistik koleksi buku seperti jumlah total, jumlah berdasarkan status, dan jumlah penulis unik.

- **React Router**  
  Navigasi antar halaman menggunakan `react-router-dom` dengan komponen seperti `<Routes>`, `<Route>`, `<Link>`, dan hook `useNavigate` untuk berpindah halaman secara dinamis.

- **Testing**  
  Pengujian dilakukan menggunakan `@testing-library/react` dan `jest` untuk memastikan setiap komponen, context, dan custom hook berjalan sesuai harapan. Unit test mencakup fungsi utama seperti tambah, hapus, filter, dan statistik buku.

## Hasil Testing

![Hasil Test](Laporan%20Testing/hasilTest.png)

Semua fungsi utama (tambah, hapus, filter, statistik) telah diuji dengan unit test.  
Pengujian dilakukan pada context, custom hook, dan komponen utama.

## Identitas
- Nama  : Alfajar 
- NIM   : 122140122
- Mata Kuliah : Pemrograman Web RB
