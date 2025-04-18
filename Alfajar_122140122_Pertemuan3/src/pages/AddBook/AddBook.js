import React from 'react';
import { useNavigate } from 'react-router-dom';
import BookForm from '../../components/BookForm/BookForm';
import './AddBook.css';

const AddBook = () => {
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate('/'); // Kembali ke halaman beranda
  };

  const handleSuccess = () => {
    navigate('/'); // Kembali ke halaman beranda setelah berhasil menambahkan buku
  };

  return (
    <BookForm onCancel={handleCancel} onSuccess={handleSuccess} />
  );
};

export default AddBook;