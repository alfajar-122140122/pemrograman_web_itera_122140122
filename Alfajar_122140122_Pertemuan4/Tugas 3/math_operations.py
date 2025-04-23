PI = 3.14159

def luas_persegi(sisi):
    """Menghitung luas persegi"""
    return sisi * sisi

def keliling_persegi(sisi):
    """Menghitung keliling persegi"""
    return 4 * sisi

def luas_persegi_panjang(panjang, lebar):
    """Menghitung luas persegi panjang"""
    return panjang * lebar

def keliling_persegi_panjang(panjang, lebar):
    """Menghitung keliling persegi panjang"""
    return 2 * (panjang + lebar)

def luas_lingkaran(radius):
    """Menghitung luas lingkaran"""
    return PI * radius * radius

def keliling_lingkaran(radius):
    """Menghitung keliling lingkaran"""
    return 2 * PI * radius

def celsius_to_fahrenheit(celsius):
    """Mengonversi Celsius ke Fahrenheit"""
    return (celsius * 9/5) + 32

def celsius_to_kelvin(celsius):
    """Mengonversi Celsius ke Kelvin"""
    return celsius + 273.15