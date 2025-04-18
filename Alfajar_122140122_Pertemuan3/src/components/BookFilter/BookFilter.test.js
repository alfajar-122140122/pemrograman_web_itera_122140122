import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import BookFilter from './BookFilter';
import { BookContext } from '../../context/BookContext'; // Pastikan path ini benar

describe('BookFilter Component', () => {
  const mockSetFilter = jest.fn();
  const mockSetSearchTerm = jest.fn();

  const mockContextValue = {
    filter: 'semua',
    setFilter: mockSetFilter,
    searchTerm: '',
    setSearchTerm: mockSetSearchTerm,
  };

  const renderComponent = () =>
    render(
      <BookContext.Provider value={mockContextValue}>
        <BookFilter />
      </BookContext.Provider>
    );

  test('renders the BookFilter component correctly', () => {
    renderComponent();

    // Periksa apakah input pencarian dirender
    expect(screen.getByPlaceholderText('Cari judul atau penulis...')).toBeInTheDocument();

    // Periksa apakah dropdown filter dirender
    expect(screen.getByLabelText('Filter:')).toBeInTheDocument();
  });

  test('updates search term when typing in the search input', () => {
    renderComponent();

    const searchInput = screen.getByPlaceholderText('Cari judul atau penulis...');
    fireEvent.change(searchInput, { target: { value: 'React' } });

    // Pastikan setSearchTerm dipanggil dengan nilai yang benar
    expect(mockSetSearchTerm).toHaveBeenCalledWith('React');
  });

  test('updates filter when selecting a new option', () => {
    renderComponent();

    const filterSelect = screen.getByLabelText('Filter:');
    fireEvent.change(filterSelect, { target: { value: 'baca' } });

    // Pastikan setFilter dipanggil dengan nilai yang benar
    expect(mockSetFilter).toHaveBeenCalledWith('baca');
  });
});