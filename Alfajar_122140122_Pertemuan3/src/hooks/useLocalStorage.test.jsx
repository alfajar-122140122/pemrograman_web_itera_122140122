import { renderHook, act } from '@testing-library/react';
import useLocalStorage from './useLocalStorage';

// Mock localStorage
const localStorageMock = (() => {
    let store = {};
    return {
        getItem: jest.fn(key => store[key] || null),
        setItem: jest.fn((key, value) => {
            store[key] = value;
        }),
        removeItem: jest.fn(key => {
            delete store[key];
        }),
        clear: jest.fn(() => {
            store = {};
        })
    };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('Hook useLocalStorage', () => {
    beforeEach(() => {
        localStorage.clear();
        jest.clearAllMocks();
    });

    test('menggunakan nilai awal ketika localStorage kosong', () => {
        const { result } = renderHook(() => useLocalStorage('testKey', 'nilaiAwal'));
        expect(result.current[0]).toBe('nilaiAwal');
        expect(localStorage.setItem).toHaveBeenCalledWith('testKey', JSON.stringify('nilaiAwal'));
    });

    test('mengambil nilai dari localStorage', () => {
        localStorage.getItem.mockReturnValueOnce(JSON.stringify('nilaiTersimpan'));
        const { result } = renderHook(() => useLocalStorage('testKey', 'nilaiAwal'));
        expect(result.current[0]).toBe('nilaiTersimpan');
    });

    test('memperbarui localStorage ketika state berubah', () => {
        const { result } = renderHook(() => useLocalStorage('testKey', 'nilaiAwal'));
        
        act(() => {
            result.current[1]('nilaiBaru');
        });
        
        expect(result.current[0]).toBe('nilaiBaru');
        expect(localStorage.setItem).toHaveBeenCalledWith('testKey', JSON.stringify('nilaiBaru'));
    });

    test('mendukung objek kompleks', () => {
        const objekAwal = { tes: 'nilai', jumlah: 0 };
        const { result } = renderHook(() => useLocalStorage('objectKey', objekAwal));
        
        expect(result.current[0]).toEqual(objekAwal);
        
        const objekBaru = { tes: 'update', jumlah: 1 };
        act(() => {
            result.current[1](objekBaru);
        });
        
        expect(result.current[0]).toEqual(objekBaru);
        expect(localStorage.setItem).toHaveBeenCalledWith('objectKey', JSON.stringify(objekBaru));
    });

    test('menangani error localStorage saat mengambil data', () => {
        console.error = jest.fn();
        localStorage.getItem.mockImplementationOnce(() => {
            throw new Error('getItem error');
        });
        
        const { result } = renderHook(() => useLocalStorage('errorKey', 'fallback'));
        
        expect(result.current[0]).toBe('fallback');
        expect(console.error).toHaveBeenCalled();
    });

    test('menangani error localStorage saat menyimpan data', () => {
        console.error = jest.fn();
        localStorage.setItem.mockImplementationOnce(() => {
            throw new Error('setItem error');
        });
        
        const { result } = renderHook(() => useLocalStorage('errorKey', 'awal'));
        
        act(() => {
            result.current[1]('akanError');
        });
        
        expect(console.error).toHaveBeenCalled();
    });
    
    test('menggunakan fungsi untuk memperbarui nilai', () => {
        const { result } = renderHook(() => useLocalStorage('countKey', 0));
        
        act(() => {
            result.current[1](prevValue => prevValue + 1);
        });
        
        expect(result.current[0]).toBe(1);
        expect(localStorage.setItem).toHaveBeenCalledWith('countKey', JSON.stringify(1));
    });
});