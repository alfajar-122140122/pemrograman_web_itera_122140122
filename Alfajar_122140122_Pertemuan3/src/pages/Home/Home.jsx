import React from 'react';
import { useNavigate } from 'react-router-dom';
import BookList from '../../components/BookList/BookList';
import BookFilter from '../../components/BookFilter/BookFilter';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="home-header">
        <h1>Manajemen Buku Pribadi</h1>
        <button
          className="add-book-button"
          onClick={() => navigate('/add-book')} // Navigasi ke halaman tambah buku
        >
          Tambah Buku Baru
        </button>
      </div>

      <div className="filter-section">
        <BookFilter />
      </div>

      <div className="list-section">
        <BookList />
      </div>
    </div>
  );
};

export default Home;