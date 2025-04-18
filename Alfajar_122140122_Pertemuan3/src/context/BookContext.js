import React, { createContext, useContext, useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

// Buat context
const BookContext = createContext();

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
    return books.filter(book => {
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
    setBooks([
      ...books,
      {
        id: Date.now(),
        ...book,
        lastPageRead: book.lastPageRead || 0,
        totalPages: book.totalPages || 0,
      },
    ]);
  };

  const updateBook = (id, updatedBook) => {
    setBooks(
      books.map((book) =>
        book.id === id ? { ...book, ...updatedBook } : book
      )
    );
  };

  const deleteBook = (id) => {
    setBooks(books.filter(book => book.id !== id));
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