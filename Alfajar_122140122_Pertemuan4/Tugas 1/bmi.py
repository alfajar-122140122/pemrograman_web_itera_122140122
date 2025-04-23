berat_badan = input("Masukkan berat badan (kg): ")
tinggi_badan = input("Masukkan tinggi badan (m): ")

BMI = float(berat_badan) / (float(tinggi_badan) * float(tinggi_badan))

if BMI < 18.5:
    print("BMI Anda: ", BMI, "\nKategori: Berat Badan kurang")
elif 18.5 <= BMI < 25:
    print("BMI Anda: ", BMI, "\nKategori: Berat Badan normal")
elif 25 <= BMI < 30:
    print("BMI Anda: ", BMI, "\nKategori: Berat Badan berlebih")
elif BMI >= 30:
    print("BMI Anda: ", BMI, "\nKategori: Obesitas")
else:
    print("Input tidak valid")
