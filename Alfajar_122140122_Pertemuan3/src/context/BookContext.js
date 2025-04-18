import React, { createContext, useContext, useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

// Buat context
export const BookContext = createContext(); // <-- FIX: Added export here

// Custom hook untuk menggunakan BookContext
export const useBookContext = () => {
  return useContext(BookContext);
};

// Provider component
export const BookProvider = ({ children }) => {
  // Gunakan custom hook useLocalStorage
  const [books, setBooks] = useLocalStorage('books', []);
  const [filter, setFilter] = useState('semua');
  const [searchTerm, setSearchTerm] = useState('');

  // Filter dan pencarian buku
  const filteredBooks = React.useMemo(() => {
    // Pastikan books adalah array sebelum memfilter
    if (!Array.isArray(books)) {
      console.error("Books is not an array:", books);
      return [];
    }
    return books.filter(book => {
      // Pastikan book adalah objek yang valid
      if (!book || typeof book.judul !== 'string' || typeof book.penulis !== 'string') {
        console.warn("Invalid book object found:", book);
        return false;
      }

      // Filter berdasarkan status
      const matchStatus = filter === 'semua' || book.status === filter;

      // Filter berdasarkan pencarian (judul atau penulis)
      const matchSearch =
        searchTerm === '' ||
        book.judul.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.penulis.toLowerCase().includes(searchTerm.toLowerCase());

      return matchStatus && matchSearch;
    });
  }, [books, filter, searchTerm]);

  // Fungsi CRUD
  const addBook = (book) => {
    // Pastikan books adalah array sebelum menambahkan
    const currentBooks = Array.isArray(books) ? books : [];
    setBooks([
      ...currentBooks,
      {
        id: Date.now(), // Gunakan timestamp unik sebagai ID
        ...book,
        lastPageRead: book.lastPageRead || 0,
        totalPages: book.totalPages || 1, // Default total halaman ke 1 jika tidak ada
      },
    ]);
  };

  const updateBook = (id, updatedBook) => {
    // Pastikan books adalah array sebelum update
    const currentBooks = Array.isArray(books) ? books : [];
    setBooks(
      currentBooks.map((book) =>
        book.id === id ? { ...book, ...updatedBook } : book
      )
    );
  };

  const deleteBook = (id) => {
    // Pastikan books adalah array sebelum delete
    const currentBooks = Array.isArray(books) ? books : [];
    setBooks(currentBooks.filter(book => book.id !== id));
  };

  // Nilai yang akan disediakan ke context
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