# Sistem Manajemen Mata Kuliah ITERA

Aplikasi RESTful API untuk mengelola data mata kuliah Program Studi Teknik Informatika Institut Teknologi Sumatera.

## Fitur Utama

- Operasi CRUD lengkap untuk data mata kuliah
- Validasi data otomatis
- Response dalam format JSON
- Penanganan error yang baik
- Dokumentasi API lengkap

## Teknologi yang Digunakan

- Python 3.8+
- Framework Pyramid
- SQLAlchemy ORM
- PostgreSQL Database
- Alembic (migrasi database)

## Instalasi

1. Clone repository dan masuk ke direktori proyek:
```powershell
cd manajemen_matakuliah
```

2. Buat dan aktifkan virtual environment:
```powershell
python -m venv venv
.\venv\Scripts\Activate.ps1
```

3. Upgrade tools dan install dependencies:
```powershell
python -m pip install --upgrade pip setuptools
pip install -e ".[testing]"
```

4. Setup database:
```powershell
# Generate migrasi database
alembic -c development.ini revision --autogenerate -m "init"

# Terapkan migrasi
alembic -c development.ini upgrade head

# Isi data awal
initialize_db development.ini
```

## Menjalankan Aplikasi

1. Jalankan server development:
```powershell
pserve development.ini --reload
```

2. Akses API melalui: `http://localhost:6543`

## Dokumentasi API

### 1. GET /api/matakuliah
Mengambil semua data mata kuliah.

**Response (200 OK)**
```json
{
    "matakuliah": [
        {
            "id": 1,
            "kode_matkul": "IF1121",
            "nama_matkul": "Algoritma dan Pemrograman I",
            "sks": 3,
            "semester": 1
        }
    ]
}
```

### 2. GET /api/matakuliah/{id}
Mengambil data mata kuliah berdasarkan ID.

### 3. POST /api/matakuliah
Menambah mata kuliah baru.

**Request Body**
```json
{
    "kode_matkul": "IF1121",
    "nama_matkul": "Algoritma dan Pemrograman I",
    "sks": 3,
    "semester": 1
}
```

### 4. PUT /api/matakuliah/{id}
Memperbarui data mata kuliah.

### 5. DELETE /api/matakuliah/{id}
Menghapus data mata kuliah.

## Testing

Menjalankan unit test:
```powershell
pytest
```

## Model Data

### Mata Kuliah
| Field | Tipe | Keterangan |
|-------|------|------------|
| id | Integer | Kunci primer |
| kode_matkul | Text | Kode mata kuliah (unik) |
| nama_matkul | Text | Nama mata kuliah |
| sks | Integer | Jumlah SKS (1-4) |
| semester | Integer | Semester (1-8) |

## Pengembang

- Nama: Alfajar 
- NIM: 122140122
- Kelas: RB
- Mata Kuliah: Pemrograman Web

## Lisensi

Hak Cipta © 2024 Institut Teknologi Sumatera.  
Dikembangkan untuk Tugas Praktikum Pemrograman Web.