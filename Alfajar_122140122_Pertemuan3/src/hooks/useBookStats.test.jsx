import { renderHook } from '@testing-library/react';
import useBookStats from './useBookStats';

describe('Hook useBookStats', () => {
  test('mengembalikan statistik yang benar untuk array buku kosong', () => {
    const { result } = renderHook(() => useBookStats([]));
    
    expect(result.current).toEqual({
      total: 0,
      owned: 0,
      reading: 0,
      wishlist: 0,
      authors: expect.any(Set),
      uniqueAuthors: 0
    });
  });

  test('menghitung statistik dengan benar untuk buku dengan status berbeda', () => {
    const books = [
      { id: 1, judul: 'Buku 1', penulis: 'Penulis A', status: 'milik' },
      { id: 2, judul: 'Buku 2', penulis: 'Penulis B', status: 'baca' },
      { id: 3, judul: 'Buku 3', penulis: 'Penulis C', status: 'beli' },
      { id: 4, judul: 'Buku 4', penulis: 'Penulis A', status: 'milik' }
    ];

    const { result } = renderHook(() => useBookStats(books));
    
    expect(result.current).toEqual({
      total: 4,
      owned: 2,
      reading: 1,
      wishlist: 1,
      authors: expect.any(Set),
      uniqueAuthors: 3
    });

    // Pastikan set penulis berisi penulis yang benar
    expect(result.current.authors.has('Penulis A')).toBe(true);
    expect(result.current.authors.has('Penulis B')).toBe(true);
    expect(result.current.authors.has('Penulis C')).toBe(true);
  });

  test('menangani buku dengan status tidak dikenal', () => {
    const books = [
      { id: 1, judul: 'Buku 1', penulis: 'Penulis A', status: 'milik' },
      { id: 2, judul: 'Buku 2', penulis: 'Penulis B', status: 'unknown' }
    ];

    const { result } = renderHook(() => useBookStats(books));
    
    expect(result.current).toEqual({
      total: 2,
      owned: 1,
      reading: 0,
      wishlist: 0,
      authors: expect.any(Set),
      uniqueAuthors: 2
    });
  });

  test('menghitung ulang statistik saat array buku berubah', () => {
    const initialBooks = [
      { id: 1, judul: 'Buku 1', penulis: 'Penulis A', status: 'milik' }
    ];

    const { result, rerender } = renderHook((props) => useBookStats(props), {
      initialProps: initialBooks
    });
    
    expect(result.current.total).toBe(1);
    expect(result.current.owned).toBe(1);

    // Tambah buku baru
    const updatedBooks = [
      ...initialBooks,
      { id: 2, judul: 'Buku 2', penulis: 'Penulis B', status: 'baca' }
    ];
    
    rerender(updatedBooks);
    
    expect(result.current.total).toBe(2);
    expect(result.current.owned).toBe(1);
    expect(result.current.reading).toBe(1);
    expect(result.current.uniqueAuthors).toBe(2);
  });

  test('menghitung penulis unik dengan benar meskipun ada duplikat', () => {
    const books = [
      { id: 1, judul: 'Buku 1', penulis: 'Penulis A', status: 'milik' },
      { id: 2, judul: 'Buku 2', penulis: 'Penulis A', status: 'baca' },
      { id: 3, judul: 'Buku 3', penulis: 'Penulis A', status: 'beli' }
    ];

    const { result } = renderHook(() => useBookStats(books));
    
    expect(result.current.uniqueAuthors).toBe(1);
    expect(result.current.authors.size).toBe(1);
  });
});