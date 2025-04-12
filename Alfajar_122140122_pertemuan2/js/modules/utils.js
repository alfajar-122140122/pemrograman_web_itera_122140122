/**
 * Utility functions for the application
 */

// Generate a unique ID
export const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
};

// Format date to YYYY-MM-DD
export const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

// Get the current date
export const getCurrentDate = () => {
    return formatDate(new Date());
};

// Get start and end of current week (Sunday to Saturday)
export const getCurrentWeekDates = () => {
    const now = new Date();
    const currentDay = now.getDay(); // 0 = Sunday, 6 = Saturday
    
    const startDate = new Date(now);
    startDate.setDate(now.getDate() - currentDay); // Go back to Sunday
    
    const endDate = new Date(now);
    endDate.setDate(now.getDate() + (6 - currentDay)); // Go forward to Saturday
    
    return {
        start: formatDate(startDate),
        end: formatDate(endDate),
        days: Array(7).fill().map((_, i) => {
            const day = new Date(startDate);
            day.setDate(startDate.getDate() + i);
            return formatDate(day);
        })
    };
};

// Get day of the week name (short version)
export const getDayName = (dateStr, short = true) => {
    const date = new Date(dateStr);
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const longDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return short ? days[date.getDay()] : longDays[date.getDay()];
};

// Calculate percentage
export const calculatePercentage = (current, total) => {
    if (total === 0) return 0;
    return Math.round((current / total) * 100);
};

// Create a debounce function for performance
export const debounce = (func, delay = 300) => {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), delay);
    };
};