import math_operations as mo

from math_operations import (
    luas_persegi,
    keliling_persegi,
    luas_persegi_panjang,
    keliling_persegi_panjang,
    luas_lingkaran,
    keliling_lingkaran,
    celsius_to_fahrenheit,
    celsius_to_kelvin
)

from math_operations import PI

# Menghitung luas dan keliling lingkaran
radius = 5
luas_lingkaran = luas_lingkaran(radius)
keliling_lingkaran = keliling_lingkaran(radius)

# Menghitung luas dan keliling persegi
sisi = 4
luas_persegi = luas_persegi(sisi)
keliling_persegi = keliling_persegi(sisi)

# Menghitung luas dan keliling persegi panjang
panjang = 4
lebar = 6
luas_persegi_panjang = mo.luas_persegi_panjang(panjang, lebar)
keliling_persegi_panjang = mo.keliling_persegi_panjang(panjang, lebar)

# Mengonversi suhu Celsius ke Fahrenheit
celcius = 25
celsius_to_fahrenheit = mo.celsius_to_fahrenheit(celcius)

# Mengonversi suhu Celsius ke Kelvin
celsius_to_kelvin = mo.celsius_to_kelvin(celcius)


# Menampilkan hasil perhitungan
print(f"Konstanta PI: {PI}")

print("=" * 40)
# Menampilkan hasil perhitungan Lingkaran
print(f"Radius Lingkaran: {radius}")
print(f"Luas Lingkaran: {luas_lingkaran}")
print(f"Keliling Lingkaran: {keliling_lingkaran}")

print("=" * 40)
# Menampilkan hasil perhitungan Persegi
print(f"Sisi Persegi: {sisi}")
print(f"Luas Persegi: {luas_persegi}")
print(f"Keliling Persegi: {keliling_persegi}")

print("=" * 40)
# Menampilkan hasil perhitungan Persegi Panjang
print(f"Panjang Persegi Panjang: {panjang}")
print(f"Lebar Persegi Panjang: {lebar}")
print(f"Luas Persegi Panjang: {luas_persegi_panjang}")
print(f"Keliling Persegi Panjang: {keliling_persegi_panjang}")

print("=" * 40)
# Menampilkan hasil konversi suhu
print(f"Suhu Celsius: {celcius}")
print(f"Konversi Celsius ke Fahrenheit: {celsius_to_fahrenheit}")
print(f"Konversi Celsius ke Kelvin: {celsius_to_kelvin}")