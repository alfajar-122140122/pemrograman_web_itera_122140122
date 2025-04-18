import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import BookList from './BookList';
import { BookContext } from '../../context/BookContext';

// Mock react-router-dom globally for this test file
jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn(),
}));

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
        <BookList />
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