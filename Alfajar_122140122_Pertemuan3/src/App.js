import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { BookProvider } from './context/BookContext';
import Home from './pages/Home/Home';
import Stats from './pages/Stats/Stats';
import AddBook from './pages/AddBook/AddBook'; // Import halaman tambah buku
import './App.css';

function App() {
  return (
    <BookProvider>
      <Router>
        <div className="app">
          <nav className="app-navbar">
            <div className="navbar-title">Book Manager</div>
            <ul className="navbar-links">
              <li>
                <Link to="/">Beranda</Link>
              </li>
              <li>
                <Link to="/stats">Statistik</Link>
              </li>
            </ul>
          </nav>

          <main className="app-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/stats" element={<Stats />} />
              <Route path="/add-book" element={<AddBook />} /> {/* Rute tersembunyi */}
            </Routes>
          </main>

          <footer className="app-footer">
            <p>Website Manajemen Buku Pribadi &copy; {new Date().getFullYear()}</p>
          </footer>
        </div>
      </Router>
    </BookProvider>
  );
}

export default App;