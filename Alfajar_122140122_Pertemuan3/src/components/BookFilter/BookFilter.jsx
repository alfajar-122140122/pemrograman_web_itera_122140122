import React from 'react';
import { useBookContext } from '../../context/BookContext';
import './BookFilter.css';

const BookFilter = () => {
  const { filter, setFilter, searchTerm, setSearchTerm } = useBookContext();

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="book-filter">
      <div className="search-container">
        <input
          type="text"
          placeholder="Cari judul atau penulis..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>
      
      <div className="filter-container">
        <label htmlFor="filter-select">Filter: </label>
        <select
          id="filter-select"
          value={filter}
          onChange={handleFilterChange}
          className="filter-select"
        >
          <option value="semua">Semua Buku</option>
          <option value="milik">Sudah Dimiliki</option>
          <option value="baca">Sedang Dibaca</option>
          <option value="beli">Ingin Dibeli</option>
        </select>
      </div>
    </div>
  );
};

export default BookFilter;