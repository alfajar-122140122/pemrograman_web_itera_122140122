"""
Buatlah program pengelolaan data nilai mahasiswa:
Buat list berisi minimal 5 dictionary data mahasiswa (nama, nim, nilai_uts, nilai_uas, nilai_tugas)
Hitung nilai akhir setiap mahasiswa dengan rumus: (30% UTS + 40% UAS + 30% Tugas)
Tentukan grade setiap mahasiswa berdasarkan nilai akhir:
A: nilai akhir 80 atau lebih
B: nilai akhir 70 sampai 79
C: nilai akhir 60 sampai 69
D: nilai akhir 50 sampai 59
E: nilai akhir kurang dari 50
Tampilkan data mahasiswa lengkap dengan nilai akhir dan grade dalam format tabel
Tampilkan mahasiswa dengan nilai tertinggi dan terendah
"""
# Library untuk manipulasi data, dalam konteks ini untuk memuat data dalam format tabel
import pandas as pd

# Fungsi untuk menghitung nilai akhir
def nilai_akhir(nilai_uts, nilai_uas, nilai_tugas):
    return (0.3 * nilai_uts) + (0.4 * nilai_uas) + (0.3 * nilai_tugas)

# Fungsi untuk menentukan grade berdasarkan nilai akhir
def grade(nilai_akhir):
    if nilai_akhir >= 80:
        return "A"
    elif 70 <= nilai_akhir < 80:
        return "B"
    elif 60 <= nilai_akhir < 70:
        return "C"
    elif 50 <= nilai_akhir < 60:
        return "D"
    else:
        return "E"


# List yang berisi data mahasiswa
mahasiswa_list = [
    {"nama": "Aba", "nim": "133140001", "nilai_uts": 85, "nilai_uas": 90, "nilai_tugas": 80},
    {"nama": "Abi", "nim": "133140002", "nilai_uts": 75, "nilai_uas": 80, "nilai_tugas": 70},
    {"nama": "Abu", "nim": "133140003", "nilai_uts": 65, "nilai_uas": 70, "nilai_tugas": 60},
    {"nama": "Bob", "nim": "133140004", "nilai_uts": 55, "nilai_uas": 60, "nilai_tugas": 50},
    {"nama": "Nop", "nim": "133140005", "nilai_uts": 45, "nilai_uas": 50, "nilai_tugas": 40},
    {"nama": "Putri", "nim": "133140006", "nilai_uts": 95, "nilai_uas": 100, "nilai_tugas": 90},
    {"nama": "Udin", "nim": "133140007", "nilai_uts": 85, "nilai_uas": 80, "nilai_tugas": 75},
    {"nama": "Putra", "nim": "133140008", "nilai_uts": 75, "nilai_uas": 70, "nilai_tugas": 65},
    {"nama": "Siti", "nim": "133140009", "nilai_uts": 65, "nilai_uas": 60, "nilai_tugas": 55},
    {"nama": "Sari", "nim": "133140010", "nilai_uts": 55, "nilai_uas": 50, "nilai_tugas": 45}
]

# Kovert list ke DataFrame
df = pd.DataFrame(mahasiswa_list)

# Menambhakan kolom nilai akhir dan grade ke DataFrame
df["nilai_akhir"] = df.apply(lambda row: nilai_akhir(row["nilai_uts"], row["nilai_uas"], row["nilai_tugas"]), axis=1)

# Menambahkan kolom grade ke DataFrame
df["grade"] = df["nilai_akhir"].apply(grade)

# Display the DataFrame in a table format
print(df)

# Display the student with the highest and lowest final score
nilai_tertinggi = df.loc[df["nilai_akhir"].idxmax()]
nilai_terendah = df.loc[df["nilai_akhir"].idxmin()]

# Print Mahasiswa dengan nilai tertinggi
print("\nMahasiswa dengan nilai tertinggi:")
print(nilai_tertinggi[["nama", "nim", "nilai_akhir", "grade"]])

# Print Mahasiswa dengan nilai terendah
print("\nMahasiswa dengan nilai terendah:")
print(nilai_terendah[["nama", "nim", "nilai_akhir", "grade"]])