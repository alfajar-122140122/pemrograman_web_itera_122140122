import React from 'react';
import { render, act } from '@testing-library/react';
import { BookProvider, BookContext } from './BookContext';
const useLocalStorageMock = require('../hooks/useLocalStorage');

// Mock useLocalStorage
jest.mock('../hooks/useLocalStorage', () => jest.fn());

describe('Fungsi deleteBook pada BookContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('menghapus buku berdasarkan id', () => {
    const books = [
      { id: 1, judul: 'A', penulis: 'X', status: 'baca' },
      { id: 2, judul: 'B', penulis: 'Y', status: 'baca' }
    ];
    const setBooks = jest.fn();
    useLocalStorageMock.mockImplementation(() => [books, setBooks]);
    let contextValue;
    render(
      <BookProvider>
        <BookContext.Consumer>
          {value => {
            contextValue = value;
            return null;
          }}
        </BookContext.Consumer>
      </BookProvider>
    );
    act(() => {
      contextValue.deleteBook(1);
    });
    expect(setBooks).toHaveBeenCalledWith([{ id: 2, judul: 'B', penulis: 'Y', status: 'baca' }]);
  });

  it('tidak melakukan apa-apa jika id tidak ditemukan', () => {
    const books = [
      { id: 1, judul: 'A', penulis: 'X', status: 'baca' }
    ];
    const setBooks = jest.fn();
    useLocalStorageMock.mockImplementation(() => [books, setBooks]);
    let contextValue;
    render(
      <BookProvider>
        <BookContext.Consumer>
          {value => {
            contextValue = value;
            return null;
          }}
        </BookContext.Consumer>
      </BookProvider>
    );
    act(() => {
      contextValue.deleteBook(999);
    });
    expect(setBooks).toHaveBeenCalledWith([{ id: 1, judul: 'A', penulis: 'X', status: 'baca' }]);
  });

  it('menangani kasus books bukan array', () => {
    const setBooks = jest.fn();
    useLocalStorageMock.mockImplementation(() => [null, setBooks]);
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    let contextValue;
    render(
      <BookProvider>
        <BookContext.Consumer>
          {value => {
            contextValue = value;
            return null;
          }}
        </BookContext.Consumer>
      </BookProvider>
    );
    act(() => {
      contextValue.deleteBook(1);
    });
    expect(setBooks).toHaveBeenCalledWith([]);
    consoleErrorSpy.mockRestore();
  });
});