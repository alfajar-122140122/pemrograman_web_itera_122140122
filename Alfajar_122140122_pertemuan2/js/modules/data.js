/**
 * Data management for the application
 * Handles localStorage operations
 */

import { getCurrentWeekDates } from './utils.js';

// Define storage keys
const HABITS_STORAGE_KEY = 'personalDashboard_habits';
const BOOKS_STORAGE_KEY = 'personalDashboard_books';

// Habit class for managing habit data
export class Habit {
    constructor(id, title, completed = {}) {
        this.id = id;
        this.title = title;
        this.completed = completed; // Object with date keys and boolean values
        this.createdAt = new Date().toISOString();
    }

    toggleDay(date) {
        // Toggle completion status for a specific day
        this.completed[date] = !this.completed[date];
        return this.completed[date];
    }

    isCompletedOnDay(date) {
        return Boolean(this.completed[date]);
    }

    getCompletionRate() {
        const week = getCurrentWeekDates();
        let completed = 0;
        
        week.days.forEach(day => {
            if (this.completed[day]) {
                completed++;
            }
        });
        
        return {
            completed,
            total: week.days.length,
            percentage: Math.round((completed / week.days.length) * 100)
        };
    }
}

// Book class for managing book data
export class Book {
    constructor(id, title, author, totalPages, currentPage = 0) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.totalPages = parseInt(totalPages);
        this.currentPage = parseInt(currentPage);
        this.createdAt = new Date().toISOString();
        this.lastUpdated = new Date().toISOString();
    }

    updateProgress(currentPage) {
        this.currentPage = parseInt(currentPage);
        this.lastUpdated = new Date().toISOString();
    }

    getProgress() {
        return {
            current: this.currentPage,
            total: this.totalPages,
            percentage: Math.round((this.currentPage / this.totalPages) * 100)
        };
    }

    isCompleted() {
        return this.currentPage >= this.totalPages;
    }
}

// Data manager for storing and retrieving data
export class DataManager {
    // Get all habits
    static getHabits() {
        const habits = JSON.parse(localStorage.getItem(HABITS_STORAGE_KEY) || '[]');
        return habits.map(h => Object.assign(new Habit(h.id, h.title), h));
    }

    // Save all habits
    static saveHabits(habits) {
        localStorage.setItem(HABITS_STORAGE_KEY, JSON.stringify(habits));
    }

    // Add a new habit
    static addHabit(habit) {
        const habits = this.getHabits();
        habits.push(habit);
        this.saveHabits(habits);
        return habit;
    }

    // Update an existing habit
    static updateHabit(habit) {
        const habits = this.getHabits();
        const index = habits.findIndex(h => h.id === habit.id);
        if (index !== -1) {
            habits[index] = habit;
            this.saveHabits(habits);
            return true;
        }
        return false;
    }

    // Delete a habit
    static deleteHabit(id) {
        let habits = this.getHabits();
        habits = habits.filter(h => h.id !== id);
        this.saveHabits(habits);
    }

    // Get all books
    static getBooks() {
        const books = JSON.parse(localStorage.getItem(BOOKS_STORAGE_KEY) || '[]');
        return books.map(b => Object.assign(new Book(b.id, b.title, b.author, b.totalPages, b.currentPage), b));
    }

    // Save all books
    static saveBooks(books) {
        localStorage.setItem(BOOKS_STORAGE_KEY, JSON.stringify(books));
    }

    // Add a new book
    static addBook(book) {
        const books = this.getBooks();
        books.push(book);
        this.saveBooks(books);
        return book;
    }

    // Update an existing book
    static updateBook(book) {
        const books = this.getBooks();
        const index = books.findIndex(b => b.id === book.id);
        if (index !== -1) {
            books[index] = book;
            this.saveBooks(books);
            return true;
        }
        return false;
    }

    // Delete a book
    static deleteBook(id) {
        let books = this.getBooks();
        books = books.filter(b => b.id !== id);
        this.saveBooks(books);
    }
}