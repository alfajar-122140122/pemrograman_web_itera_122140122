/**
 * Main entry point for the application
 * Initializes the habit tracker and book tracker components
 */

import { HabitTracker, BookTracker } from './app.js';

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize the application
    const init = async () => {
        try {
            // Initialize components
            const habitTracker = new HabitTracker();
            const bookTracker = new BookTracker();
            
            console.log('Personal Dashboard initialized successfully!');
        } catch (error) {
            console.error('Error initializing the dashboard:', error);
        }
    };
    
    // Start the application
    init();
});