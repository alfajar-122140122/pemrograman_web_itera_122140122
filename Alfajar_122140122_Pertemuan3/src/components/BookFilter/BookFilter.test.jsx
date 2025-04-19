import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import BookFilter from './BookFilter';
import { BookContext } from '../../context/BookContext'; // Pastikan path ini benar

describe('Komponen BookFilter', () => {
  const mockSetFilter = jest.fn();
  const mockSetSearchTerm = jest.fn();

  const mockContextValue = {
    filter: 'semua',
    setFilter: mockSetFilter,
    searchTerm: '',
    setSearchTerm: mockSetSearchTerm,
  };

  // Fungsi untuk merender komponen dengan context palsu
  const renderComponent = () =>
    render(
      <BookContext.Provider value={mockContextValue}>
        <BookFilter />
      </BookContext.Provider>
    );

  test('menampilkan komponen BookFilter dengan benar', () => {
    renderComponent();

    // Cek apakah input pencarian muncul
    expect(screen.getByPlaceholderText('Cari judul atau penulis...')).toBeInTheDocument();

    // Cek apakah dropdown filter muncul
    expect(screen.getByLabelText('Filter:')).toBeInTheDocument();
  });

  test('memperbarui search term saat mengetik di input pencarian', () => {
    renderComponent();

    const searchInput = screen.getByPlaceholderText('Cari judul atau penulis...');
    fireEvent.change(searchInput, { target: { value: 'React' } });

    // Pastikan setSearchTerm dipanggil dengan nilai yang benar
    expect(mockSetSearchTerm).toHaveBeenCalledWith('React');
  });

  test('memperbarui filter saat memilih opsi baru', () => {
    renderComponent();

    const filterSelect = screen.getByLabelText('Filter:');
    fireEvent.change(filterSelect, { target: { value: 'baca' } });

    // Pastikan setFilter dipanggil dengan nilai yang benar
    expect(mockSetFilter).toHaveBeenCalledWith('baca');
  });
});