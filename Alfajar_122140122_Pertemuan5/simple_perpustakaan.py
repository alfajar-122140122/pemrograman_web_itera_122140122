from abc import ABC, abstractmethod

class ItemPerpustakaan(ABC):
    """Kelas abstrak dasar untuk semua item perpustakaan."""
    
    def __init__(self, judul, id_item):
        self._judul = judul
        self._id_item = id_item

    @abstractmethod
    def tampilkan_info(self):
        """Mengembalikan informasi item dalam bentuk string."""
        pass

    @property
    def judul(self):
        return self._judul

    @property
    def id_item(self):
        return self._id_item


class Buku(ItemPerpustakaan):
    """Merepresentasikan sebuah buku dalam perpustakaan."""
    
    def __init__(self, judul, id_item, penulis):
        super().__init__(judul, id_item)
        self._penulis = penulis

    def tampilkan_info(self):
        return f"Buku: '{self._judul}' karya {self._penulis} (ID: {self._id_item})"


class Majalah(ItemPerpustakaan):
    """Merepresentasikan sebuah majalah dalam perpustakaan."""
    
    def __init__(self, judul, id_item, nomor_edisi):
        super().__init__(judul, id_item)
        self._nomor_edisi = nomor_edisi

    def tampilkan_info(self):
        return f"Majalah: '{self._judul}', Edisi {self._nomor_edisi} (ID: {self._id_item})"


class Perpustakaan:
    """Mengelola koleksi item perpustakaan."""
    
    def __init__(self, nama="Perpustakaan"):
        self._item = []
        self._nama = nama

    def tambah_item(self, item):
        """Menambahkan item ke koleksi perpustakaan."""
        if not isinstance(item, ItemPerpustakaan):
            raise TypeError("Hanya objek ItemPerpustakaan yang dapat ditambahkan ke perpustakaan")
        self._item.append(item)
        
    def tampilkan_item(self):
        """Menampilkan semua item dalam perpustakaan."""
        print(f"\n{'-'*60}")
        print(f"Inventaris {self._nama}:")
        print(f"{'-'*60}")
        if not self._item:
            print("Tidak ada item dalam perpustakaan.")
        else:
            for i, item in enumerate(self._item, 1):
                print(f"{i}. {item.tampilkan_info()}")
        print(f"{'-'*60}\n")

    def cari_item(self, kata_kunci):
        """Mencari item berdasarkan judul atau ID."""
        kata_kunci_str = str(kata_kunci).lower()
        
        item_ditemukan = [
            item for item in self._item 
            if (isinstance(kata_kunci, str) and kata_kunci_str in item.judul.lower())
            or kata_kunci_str == str(item.id_item)
        ]
        
        return item_ditemukan


def tampilkan_hasil_pencarian(kata_kunci, hasil):
    """Format dan tampilkan hasil pencarian."""
    print(f"\n{'-'*60}")
    print(f"Hasil pencarian untuk '{kata_kunci}':")
    print(f"{'-'*60}")
    
    if not hasil:
        print("Tidak ada item yang cocok dengan pencarian Anda.")
    else:
        for i, item in enumerate(hasil, 1):
            print(f"{i}. {item.tampilkan_info()}")
    
    print(f"{'-'*60}\n")


def main():
    # Buat perpustakaan dan item
    perpustakaan = Perpustakaan("Perpustakaan Kampus")
    
    # Buku-buku
    buku1 = Buku("Pemrograman Python", 101, "John Doe")
    buku2 = Buku("Ilmu Data", 102, "Jane Smith")
    buku3 = Buku("Python untuk Analisis Data", 103, "Wes McKinney")
    buku4 = Buku("Algoritma dan Struktur Data", 104, "Robert Sedgewick")
    buku5 = Buku("Kecerdasan Buatan", 105, "Stuart Russell")
    buku6 = Buku("Pengembangan Web dengan Django", 106, "Adrian Holovaty")
    buku7 = Buku("Database MySQL", 107, "Michael Widenius")
    buku8 = Buku("Jaringan Komputer", 108, "Andrew Tanenbaum")
    buku9 = Buku("Cyber Security", 109, "Bruce Schneier")
    buku10 = Buku("Machine Learning untuk Pemula", 110, "Aurelien Geron")
    
    # Majalah-majalah
    majalah1 = Majalah("Tech Monthly", 201, "Januari 2023")
    majalah2 = Majalah("Science Weekly", 202, "Februari 2023")
    majalah3 = Majalah("Info Komputer", 203, "Maret 2023")
    majalah4 = Majalah("Dunia Programming", 204, "April 2023")
    majalah5 = Majalah("Teknologi Terkini", 205, "Mei 2023")
    majalah6 = Majalah("Digital Magazine", 206, "Juni 2023")
    majalah7 = Majalah("Python Today", 207, "Juli 2023")
    majalah8 = Majalah("Cloud Computing", 208, "Agustus 2023")
    majalah9 = Majalah("Data Science Weekly", 209, "September 2023")
    majalah10 = Majalah("IoT Magazine", 210, "Oktober 2023")
    
    # Tambahkan semua item ke perpustakaan
    semua_item = [
        buku1, buku2, buku3, buku4, buku5, 
        buku6, buku7, buku8, buku9, buku10,
        majalah1, majalah2, majalah3, majalah4, majalah5,
        majalah6, majalah7, majalah8, majalah9, majalah10
    ]
    
    for item in semua_item:
        perpustakaan.tambah_item(item)
    
    # Tampilkan semua item
    perpustakaan.tampilkan_item()
    
    # Contoh pencarian
    print("Melakukan pencarian:")
    
    # Cari item berdasarkan judul
    cari_judul = "Python"
    hasil = perpustakaan.cari_item(cari_judul)
    tampilkan_hasil_pencarian(cari_judul, hasil)
    
    # Cari item berdasarkan ID
    cari_id = 201
    hasil = perpustakaan.cari_item(cari_id)
    tampilkan_hasil_pencarian(cari_id, hasil)


if __name__ == "__main__":
    main()