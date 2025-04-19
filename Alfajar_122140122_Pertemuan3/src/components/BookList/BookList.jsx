import React, { useState } from 'react';
import { useBookContext } from '../../context/BookContext';
import BookForm from '../BookForm/BookForm';
import './BookList.css';

const BookList = () => {
  const { filteredBooks, deleteBook } = useBookContext();
  const [editingBook, setEditingBook] = useState(null);

  const handleEdit = (book) => {
    setEditingBook(book);
  };

  const handleCancelEdit = () => {
    setEditingBook(null);
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'milik':
        return 'Sudah Dimiliki';
      case 'baca':
        return 'Sedang Dibaca';
      case 'beli':
        return 'Ingin Dibeli';
      default:
        return status;
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'milik':
        return 'status-owned';
      case 'baca':
        return 'status-reading';
      case 'beli':
        return 'status-wishlist';
      default:
        return '';
    }
  };

  if (editingBook) {
    return <BookForm bookToEdit={editingBook} onCancel={handleCancelEdit} />;
  }

  if (filteredBooks.length === 0) {
    return (
      <div className="empty-book-list">
        <p>Tidak ada buku yang ditemukan. Silakan tambahkan buku baru atau ubah filter pencarian.</p>
      </div>
    );
  }

  return (
    <div className="book-list">
      {filteredBooks.map((book) => {
        const progress =
          book.totalPages > 0
            ? Math.min((book.lastPageRead / book.totalPages) * 100, 100)
            : 0; // Hitung progress membaca

        return (
          <div key={book.id} className="book-card">
            <div className="book-header">
              <h3 className="book-title">{book.judul}</h3>
              <span className={`book-status ${getStatusClass(book.status)}`}>
                {getStatusLabel(book.status)}
              </span>
            </div>

            {book.photo && (
              <img src={book.photo} alt={book.judul} className="book-photo" />
            )}

            <p className="book-author">Oleh: {book.penulis}</p>

            {book.tahunTerbit && (
              <p className="book-year">Tahun Terbit: {book.tahunTerbit}</p>
            )}

            {book.deskripsi && (
              <p className="book-description">{book.deskripsi}</p>
            )}

            {/* Tampilkan progress bar jika status "Sedang Dibaca" */}
            {book.status === 'baca' && (
              <div className="progress-container">
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <p>{progress.toFixed(0)}% Selesai</p>
              </div>
            )}

            <div className="book-actions">
              <button
                className="btn-edit"
                onClick={() => handleEdit(book)}
              >
                Edit
              </button>
              <button
                className="btn-delete"
                onClick={() => deleteBook(book.id)}
              >
                Hapus
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BookList;