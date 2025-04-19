import React from 'react';
import { useBookContext } from '../../context/BookContext';
import useBookStats from '../../hooks/useBookStats';
import './Stats.css';

const Stats = () => {
  const { books } = useBookContext();
  const stats = useBookStats(books);

  return (
    <div className="stats-container">
      <h1 className="stats-title">Statistik Koleksi Buku</h1>
      
      <div className="stats-cards">
        <div className="stat-card">
          <h3>Total Buku</h3>
          <p className="stat-value">{stats.total}</p>
        </div>
        
        <div className="stat-card">
          <h3>Sudah Dimiliki</h3>
          <p className="stat-value">{stats.owned}</p>
        </div>
        
        <div className="stat-card">
          <h3>Sedang Dibaca</h3>
          <p className="stat-value">{stats.reading}</p>
        </div>
        
        <div className="stat-card">
          <h3>Ingin Dibeli</h3>
          <p className="stat-value">{stats.wishlist}</p>
        </div>
        
        <div className="stat-card">
          <h3>Jumlah Penulis</h3>
          <p className="stat-value">{stats.uniqueAuthors}</p>
        </div>
      </div>
      
      {stats.total > 0 ? (
        <div className="stats-chart">
          <h2 className="chart-title">Distribusi Status Buku</h2>
          <div className="chart-container">
            <div 
              className="chart-bar owned-bar" 
              style={{ width: `${(stats.owned / stats.total) * 100}%` }}
            >
              {stats.owned > 0 && (
                <span className="chart-label">
                  {Math.round((stats.owned / stats.total) * 100)}% Dimiliki
                </span>
              )}
            </div>
            <div 
              className="chart-bar reading-bar" 
              style={{ width: `${(stats.reading / stats.total) * 100}%` }}
            >
              {stats.reading > 0 && (
                <span className="chart-label">
                  {Math.round((stats.reading / stats.total) * 100)}% Dibaca
                </span>
              )}
            </div>
            <div 
              className="chart-bar wishlist-bar" 
              style={{ width: `${(stats.wishlist / stats.total) * 100}%` }}
            >
              {stats.wishlist > 0 && (
                <span className="chart-label">
                  {Math.round((stats.wishlist / stats.total) * 100)}% Wishlist
                </span>
              )}
            </div>
          </div>
        </div>
      ) : (
        <p className="no-data-message">
          Belum ada data buku yang tersedia untuk ditampilkan dalam grafik.
        </p>
      )}
    </div>
  );
};

export default Stats;