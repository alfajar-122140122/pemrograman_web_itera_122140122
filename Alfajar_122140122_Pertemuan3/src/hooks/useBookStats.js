import { useMemo } from 'react';

const useBookStats = (books) => {
  // Menghitung statistik buku menggunakan useMemo untuk optimasi performa
  const stats = useMemo(() => {
    // Default stats
    const result = {
      total: books.length,
      owned: 0,
      reading: 0,
      wishlist: 0,
      authors: new Set(),
    };

    // Hitung buku berdasarkan status
    books.forEach(book => {
      if (book.status === 'milik') {
        result.owned += 1;
      } else if (book.status === 'baca') {
        result.reading += 1;
      } else if (book.status === 'beli') {
        result.wishlist += 1;
      }

      // Tambahkan penulis ke set
      result.authors.add(book.penulis);
    });

    // Jumlah penulis unik
    result.uniqueAuthors = result.authors.size;

    return result;
  }, [books]);

  return stats;
};

export default useBookStats;