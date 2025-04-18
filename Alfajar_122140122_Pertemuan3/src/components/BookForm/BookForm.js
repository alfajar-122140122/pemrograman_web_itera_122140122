import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useBookContext } from '../../context/BookContext';
import { useNavigate } from 'react-router-dom';
import './BookForm.css';

const BookForm = ({ bookToEdit, onCancel }) => {
  const { addBook, updateBook } = useBookContext();
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  // State untuk form
  const [formData, setFormData] = useState({
    judul: '',
    penulis: '',
    status: 'milik',
    tahunTerbit: '',
    deskripsi: '',
    photo: '',
    lastPageRead: 0, // Halaman terakhir yang dibaca
    totalPages: 0 // Total halaman buku
  });

  // Isi form jika dalam mode edit
  useEffect(() => {
    if (bookToEdit) {
      setFormData({ ...bookToEdit });
    }
  }, [bookToEdit]);

  // Handler untuk perubahan input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handler untuk input foto
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setFormData({ ...formData, photo: reader.result }); // Simpan foto dalam format Base64
      reader.readAsDataURL(file);
    }
  };

  // Handler untuk submit form
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validasi form
    if (!formData.judul.trim() || !formData.penulis.trim()) {
      setError('Judul dan penulis harus diisi!');
      return;
    }

    try {
      if (bookToEdit) {
        // Mode edit
        updateBook(bookToEdit.id, formData);
        setSuccessMessage('Buku berhasil diperbarui!');
      } else {
        // Mode tambah baru
        addBook(formData);
        setSuccessMessage('Buku berhasil ditambahkan!');
      }

      // Reset form setelah submit
      setFormData({
        judul: '',
        penulis: '',
        status: 'milik',
        tahunTerbit: '',
        deskripsi: '',
        photo: '',
        lastPageRead: 0,
        totalPages: 0
      });
      setError('');

      // Tutup form jika dalam mode edit
      if (onCancel) {
        onCancel();
      }

      // Redirect ke beranda setelah 2 detik
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (err) {
      setError('Terjadi kesalahan saat menyimpan buku.');
      console.error(err);
    }
  };

  return (
    <div className="book-form-container">
      <h2>{bookToEdit ? 'Edit Buku' : 'Tambah Buku Baru'}</h2>

      {error && <div className="error-message">{error}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="judul">Judul Buku</label>
          <input
            type="text"
            id="judul"
            name="judul"
            value={formData.judul}
            onChange={handleChange}
            placeholder="Masukkan judul buku"
          />
        </div>

        <div className="form-group">
          <label htmlFor="penulis">Penulis</label>
          <input
            type="text"
            id="penulis"
            name="penulis"
            value={formData.penulis}
            onChange={handleChange}
            placeholder="Masukkan nama penulis"
          />
        </div>

        <div className="form-group">
          <label htmlFor="status">Status Buku</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="milik">Sudah Dimiliki</option>
            <option value="baca">Sedang Dibaca</option>
            <option value="beli">Ingin Dibeli</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="tahunTerbit">Tahun Terbit (Opsional)</label>
          <input
            type="number"
            id="tahunTerbit"
            name="tahunTerbit"
            value={formData.tahunTerbit}
            onChange={handleChange}
            placeholder="Tahun terbit buku"
          />
        </div>

        <div className="form-group">
          <label htmlFor="deskripsi">Deskripsi (Opsional)</label>
          <textarea
            id="deskripsi"
            name="deskripsi"
            value={formData.deskripsi}
            onChange={handleChange}
            placeholder="Tambahkan deskripsi buku"
            rows="3"
          />
        </div>

        <div className="form-group">
          <label htmlFor="photo">Foto Buku (Opsional)</label>
          <input
            type="file"
            id="photo"
            name="photo"
            accept="image/*"
            onChange={handlePhotoChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="lastPageRead">Halaman Terakhir Dibaca</label>
          <input
            type="number"
            id="lastPageRead"
            name="lastPageRead"
            value={formData.lastPageRead}
            onChange={handleChange}
            placeholder="Masukkan halaman terakhir yang dibaca"
            min="0"
          />
        </div>

        <div className="form-group">
          <label htmlFor="totalPages">Total Halaman Buku</label>
          <input
            type="number"
            id="totalPages"
            name="totalPages"
            value={formData.totalPages}
            onChange={handleChange}
            placeholder="Masukkan total halaman buku"
            min="1"
          />
        </div>

        <div className="form-buttons">
          <button type="submit" className="btn-submit">
            {bookToEdit ? 'Simpan Perubahan' : 'Tambah Buku'}
          </button>

          {bookToEdit && (
            <button
              type="button"
              className="btn-cancel"
              onClick={onCancel}
            >
              Batal
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

BookForm.propTypes = {
  bookToEdit: PropTypes.shape({
    id: PropTypes.number,
    judul: PropTypes.string,
    penulis: PropTypes.string,
    status: PropTypes.string,
    tahunTerbit: PropTypes.string,
    deskripsi: PropTypes.string,
    photo: PropTypes.string,
    lastPageRead: PropTypes.number, // Halaman terakhir yang dibaca
    totalPages: PropTypes.number // Total halaman buku
  }),
  onCancel: PropTypes.func
};

export default BookForm;