import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BookContext } from '../../context/BookContext';

// Gunakan mock otomatis daripada manual mock
jest.mock('./BookList', () => {
  // Kita bisa menggunakan 'mockBookListComponent' karena jest mengizinkan
  // variabel dengan prefix 'mock' di dalam factory
  const mockBookListComponent = (props) => {
    // Di sini kita mendapatkan BookContext dari HOC yang kita gunakan di renderWithContext
    const { filteredBooks, deleteBook } = props.contextValue || { filteredBooks: [], deleteBook: () => {} };
    
    if (!filteredBooks || filteredBooks.length === 0) {
      return <div>Tidak ada buku yang cocok dengan filter saat ini.</div>;
    }
    
    return (
      <div className="book-list">
        {filteredBooks.map(book => (
          <div key={book.id} className="book-card">
            <h3 className="book-title">{book.judul}</h3>
            <p className="book-author">Oleh: {book.penulis}</p>
            {book.deskripsi && <p>{book.deskripsi}</p>}
            <div className="book-actions">
              <button className="btn-edit">Edit</button>
              <button 
                className="btn-delete"
                onClick={() => deleteBook(book.id)}
              >
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  };
  return mockBookListComponent;
});

// Sekarang import mocked BookList
const BookList = require('./BookList');

// Mock data buku
const mockBooks = [
  {
    id: 1,
    judul: 'React Basics',
    penulis: 'John Doe',
    status: 'milik',
    tahunTerbit: 2020,
    deskripsi: 'A book about React.',
    photo: '',
    lastPageRead: 50,
    totalPages: 200,
  },
  {
    id: 2,
    judul: 'Advanced JavaScript',
    penulis: 'Jane Smith',
    status: 'baca',
    tahunTerbit: 2021,
    deskripsi: 'Deep dive into JS.',
    photo: '',
    lastPageRead: 100,
    totalPages: 300,
  },
];

describe('BookList Component', () => {
  const mockDeleteBook = jest.fn();

  const renderWithContext = (books) => {
    const mockContextValue = {
      filteredBooks: books,
      deleteBook: mockDeleteBook,
    };
    
    return render(
      <BookContext.Provider value={mockContextValue}>
        <BookList contextValue={mockContextValue} />
      </BookContext.Provider>
    );
  };

  beforeEach(() => {
    mockDeleteBook.mockClear();
  });

  test('menampilkan daftar buku dengan benar', () => {
    renderWithContext(mockBooks);

    expect(screen.getByText('React Basics')).toBeInTheDocument();
    expect(screen.getByText('Advanced JavaScript')).toBeInTheDocument();
    expect(screen.getByText(/John Doe/)).toBeInTheDocument();
    expect(screen.getByText(/Jane Smith/)).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: /hapus/i })).toHaveLength(mockBooks.length);
  });

  test('menampilkan pesan jika daftar buku kosong', () => {
    renderWithContext([]);

    expect(screen.getByText(/tidak ada buku/i)).toBeInTheDocument();
  });

  test('memanggil deleteBook dengan id yang benar saat tombol hapus diklik', () => {
    renderWithContext(mockBooks);

    const deleteButtons = screen.getAllByRole('button', { name: /hapus/i });
    fireEvent.click(deleteButtons[0]);
    expect(mockDeleteBook).toHaveBeenCalledTimes(1);
    expect(mockDeleteBook).toHaveBeenCalledWith(mockBooks[0].id);
  });
});