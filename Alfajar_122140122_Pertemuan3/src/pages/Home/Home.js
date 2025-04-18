import React, { useState } from 'react';
import BookForm from '../../components/BookForm/BookForm';
import BookList from '../../components/BookList/BookList';
import BookFilter from '../../components/BookFilter/BookFilter';
import './Home.css';

const Home = () => {
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div className="home-container">
      <div className="home-header">
        <h1>Manajemen Buku Pribadi</h1>
        <button 
          className="add-book-button"
          onClick={toggleForm}
        >
          {showForm ? 'Tutup Form' : 'Tambah Buku Baru'}
        </button>
      </div>

      {showForm && <BookForm />}

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