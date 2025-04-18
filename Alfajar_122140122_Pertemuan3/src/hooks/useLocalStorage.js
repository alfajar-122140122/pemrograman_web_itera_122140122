import { useState, useEffect } from 'react';

const useLocalStorage = (key, initialValue) => {
  // Fungsi untuk mendapatkan nilai dari localStorage
  const getStoredValue = () => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("Error getting data from localStorage:", error);
      return initialValue;
    }
  };

  // State untuk menyimpan nilai
  const [value, setValue] = useState(getStoredValue);

  // Update localStorage ketika nilai state berubah
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error saving data to localStorage:", error);
    }
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;