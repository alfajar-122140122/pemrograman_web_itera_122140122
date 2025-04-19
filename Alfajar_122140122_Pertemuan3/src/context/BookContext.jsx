import React, { createContext, useContext, useState, useMemo } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

// Membuat context untuk buku
export const BookContext = createContext();

// Custom hook untuk menggunakan BookContext
export const useBookContext = () => useContext(BookContext);

// Komponen Provider untuk membungkus aplikasi
export const BookProvider = ({ children }) => {
  // State utama menggunakan localStorage
  const [books, setBooks] = useLocalStorage('books', []);
  const [filter, setFilter] = useState('semua');
  const [searchTerm, setSearchTerm] = useState('');

  // Filter dan pencarian buku
  const filteredBooks = useMemo(() => {
    if (!Array.isArray(books)) {
      console.error("Books is not an array:", books);
      return [];
    }
    return books.filter(book => {
      // Validasi objek buku
      if (!book || typeof book.judul !== 'string' || typeof book.penulis !== 'string') {
        console.warn("Objek buku tidak valid:", book);
        return false;
      }

      // Filter berdasarkan status
      const cocokStatus = filter === 'semua' || book.status === filter;

      // Filter berdasarkan pencarian judul atau penulis
      const cocokCari =
        searchTerm === '' ||
        book.judul.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.penulis.toLowerCase().includes(searchTerm.toLowerCase());

      return cocokStatus && cocokCari;
    });
  }, [books, filter, searchTerm]);

  // Fungsi untuk menambah buku baru
  const addBook = (book) => {
    const currentBooks = Array.isArray(books) ? books : [];
    setBooks([
      ...currentBooks,
      {
        id: Date.now(), // ID unik
        ...book,
        lastPageRead: book.lastPageRead || 0,
        totalPages: book.totalPages || 1,
      },
    ]);
  };

  // Fungsi untuk mengupdate data buku
  const updateBook = (id, updatedBook) => {
    const currentBooks = Array.isArray(books) ? books : [];
    setBooks(
      currentBooks.map((book) =>
        book.id === id ? { ...book, ...updatedBook } : book
      )
    );
  };

  // Fungsi untuk menghapus buku berdasarkan id
  const deleteBook = (id) => {
    const currentBooks = Array.isArray(books) ? books : [];
    setBooks(currentBooks.filter(book => book.id !== id));
  };

  // Nilai yang diberikan ke context
  const value = {
    books,
    filteredBooks,
    filter,
    setFilter,
    searchTerm,
    setSearchTerm,
    addBook,
    updateBook,
    deleteBook
  };

  return (
    <BookContext.Provider value={value}>
      {children}
    </BookContext.Provider>
  );
};