/**
 * Main application logic
 * Defines the HabitTracker and BookTracker classes
 */

import { DataManager, Habit, Book } from './modules/data.js';
import { generateId, getCurrentWeekDates, getDayName, debounce } from './modules/utils.js';

// Habit Tracker Class
export class HabitTracker {
    constructor() {
        this.habits = [];
        this.weekDates = getCurrentWeekDates();
        this.habitsList = document.getElementById('habits-list');
        this.habitInput = document.getElementById('habit-input');
        this.addHabitBtn = document.getElementById('add-habit-btn');

        this.init();
    }

    // Initialize the habit tracker
    init() {
        this.loadHabits();
        this.renderHabits();
        this.setupEventListeners();
    }

    // Load habits from storage
    loadHabits() {
        this.habits = DataManager.getHabits();
    }

    // Setup event listeners
    setupEventListeners() {
        this.addHabitBtn.addEventListener('click', () => this.addHabit());
        this.habitInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addHabit();
        });

        // Event delegation for habit list actions
        this.habitsList.addEventListener('click', (e) => {
            const target = e.target;
            
            // Handling SVG and path elements inside buttons
            const button = target.closest('button');
            if (!button) {
                // If not a button or inside a button, check if it's a habit day
                if (target.classList.contains('habit-day') || target.closest('.habit-day')) {
                    const dayElement = target.classList.contains('habit-day') ? target : target.closest('.habit-day');
                    const habitId = dayElement.closest('.habit-item').dataset.id;
                    const date = dayElement.dataset.date;
                    this.toggleHabitDay(habitId, date);
                }
                return;
            }
            
            const habitItem = button.closest('.habit-item');
            if (!habitItem) return;
            
            const habitId = habitItem.dataset.id;
            
            // Handle delete button
            if (button.classList.contains('delete-habit')) {
                this.deleteHabit(habitId);
            }
            
            // Handle edit button
            if (button.classList.contains('edit-habit')) {
                this.editHabit(habitId);
            }
            
            // Handle day toggle (in case the click is on the check/circle inside)
            if (button.closest('.habit-day')) {
                const date = button.closest('.habit-day').dataset.date;
                this.toggleHabitDay(habitId, date);
            }
        });
    }

    // Add a new habit
    addHabit() {
        const title = this.habitInput.value.trim();
        if (!title) return;

        const habit = new Habit(generateId(), title);
        DataManager.addHabit(habit);
        this.habits.push(habit);
        this.renderHabits();
        this.habitInput.value = '';
    }

    // Toggle completion of a habit for a specific day
    toggleHabitDay(habitId, date) {
        const habit = this.habits.find(h => h.id === habitId);
        if (!habit) return;

        habit.toggleDay(date);
        DataManager.updateHabit(habit);
        this.renderHabits();
    }

    // Delete a habit
    deleteHabit(habitId) {
        // Hapus habit dari data
        this.habits = this.habits.filter(h => h.id !== habitId);
        DataManager.deleteHabit(habitId);

        // Hapus elemen dari DOM
        const habitItem = document.querySelector(`[data-id="${habitId}"]`);
        if (habitItem) {
            habitItem.remove();
        }
    }

    // Edit a habit
    editHabit(habitId) {
        const habit = this.habits.find(h => h.id === habitId);
        if (!habit) return;

        const habitItem = document.querySelector(`[data-id="${habitId}"]`);
        const habitTitleElement = habitItem.querySelector('h3');

        // Ganti teks habit dengan input field
        const inputField = document.createElement('input');
        inputField.type = 'text';
        inputField.value = habit.title;
        inputField.className = 'border rounded p-2 w-full';
        habitTitleElement.replaceWith(inputField);

        // Fokus pada input field
        inputField.focus();

        // Simpan perubahan saat input kehilangan fokus
        inputField.addEventListener('blur', () => {
            const newTitle = inputField.value.trim();
            if (newTitle) {
                habit.title = newTitle;
                DataManager.updateHabit(habit);

                // Kembalikan input menjadi teks
                const updatedTitle = document.createElement('h3');
                updatedTitle.className = 'font-medium';
                updatedTitle.textContent = newTitle;
                inputField.replaceWith(updatedTitle);
            } else {
                // Jika kosong, kembalikan ke teks sebelumnya
                inputField.replaceWith(habitTitleElement);
            }
        });
    }

    // Render all habits
    renderHabits() {
        this.habitsList.innerHTML = '';

        if (this.habits.length === 0) {
            this.habitsList.innerHTML = `
                <div class="text-gray-500 text-center py-6">
                    Belum ada habit yang ditambahkan. Tambahkan habit untuk mulai tracking!
                </div>
            `;
            return;
        }

        this.habits.forEach(habit => {
            const habitElement = document.createElement('div');
            habitElement.className = 'habit-item bg-gray-50 p-4 rounded-lg border border-gray-200';
            habitElement.dataset.id = habit.id;

            const completion = habit.getCompletionRate();
            
            habitElement.innerHTML = `
                <div class="flex justify-between items-center mb-3">
                    <h3 class="font-medium">${habit.title}</h3>
                    <div>
                        <button class="edit-habit text-indigo-600 mr-2 hover:text-indigo-800">
                            Edit
                        </button>
                        <button class="delete-habit text-red-600 hover:text-red-800">
                            Delete
                        </button>
                    </div>
                </div>
                
                <div class="grid grid-cols-7 gap-1 mb-3">
                    ${this.weekDates.days.map(date => {
                        const isCompleted = habit.isCompletedOnDay(date);
                        return `
                            <div 
                                class="habit-day ${isCompleted ? 'completed' : ''} text-center p-2 rounded-md text-sm flex flex-col items-center"
                                data-date="${date}"
                            >
                                <span class="text-xs">${getDayName(date)}</span>
                                <span class="mt-1">
                                    ${isCompleted ? '✓' : '○'}
                                </span>
                            </div>
                        `;
                    }).join('')}
                </div>
                
                <div class="text-sm text-gray-600 flex justify-between mb-1">
                    <span>Weekly progress: ${completion.completed}/${completion.total} days</span>
                    <span>${completion.percentage}%</span>
                </div>
                
                <div class="progress-bar">
                    <div class="progress-bar-fill" style="width: ${completion.percentage}%"></div>
                </div>
            `;

            this.habitsList.appendChild(habitElement);
        });
    }
}

// Book Tracker Class
export class BookTracker {
    constructor() {
        this.books = [];
        this.booksList = document.getElementById('books-list');
        this.bookForm = document.getElementById('book-form');
        this.bookTitle = document.getElementById('book-title');
        this.bookAuthor = document.getElementById('book-author');
        this.bookPages = document.getElementById('book-pages');
        this.bookCurrentPage = document.getElementById('book-current-page');
        
        this.init();
    }

    // Initialize the book tracker
    init() {
        this.loadBooks();
        this.renderBooks();
        this.setupEventListeners();
    }

    // Load books from storage
    loadBooks() {
        this.books = DataManager.getBooks();
    }

    // Setup event listeners
    setupEventListeners() {
        this.bookForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.addBook();
        });

        // Event delegation for book list actions
        this.booksList.addEventListener('click', (e) => {
            const button = e.target.closest('button');
            if (!button) return;

            const bookId = button.closest('.book-item').dataset.id;

            if (button.classList.contains('edit-book')) {
                this.editBook(bookId);
            } else if (button.classList.contains('delete-book')) {
                this.deleteBook(bookId);
            }
        });

        // Add input validation for current page vs total pages
        this.bookCurrentPage.addEventListener('input', () => {
            const currentPage = parseInt(this.bookCurrentPage.value) || 0;
            const totalPages = parseInt(this.bookPages.value) || 1;
            
            if (currentPage > totalPages) {
                this.bookCurrentPage.value = totalPages;
            }
        });

        this.bookPages.addEventListener('input', () => {
            const currentPage = parseInt(this.bookCurrentPage.value) || 0;
            const totalPages = parseInt(this.bookPages.value) || 1;
            
            if (currentPage > totalPages) {
                this.bookCurrentPage.value = totalPages;
            }
        });
    }

    // Add a new book
    addBook() {
        const title = this.bookTitle.value.trim();
        const author = this.bookAuthor.value.trim();
        const totalPages = parseInt(this.bookPages.value);
        const currentPage = parseInt(this.bookCurrentPage.value);
        
        if (!title || !author || isNaN(totalPages) || totalPages <= 0) {
            alert('Masukkan data buku yang valid.');
            return;
        }
        
        const book = new Book(generateId(), title, author, totalPages, currentPage);
        DataManager.addBook(book);
        this.books.push(book);
        this.renderBooks();
        
        // Reset form
        this.bookForm.reset();
    }

    // Delete a book
    deleteBook(bookId) {
        // Hapus buku dari data
        this.books = this.books.filter(b => b.id !== bookId);
        DataManager.deleteBook(bookId);

        // Hapus elemen dari DOM
        const bookItem = document.querySelector(`[data-id="${bookId}"]`);
        if (bookItem) {
            bookItem.remove();
        }
    }

    // Edit a book
    editBook(bookId) {
        const book = this.books.find(b => b.id === bookId);
        if (!book) return;

        const bookItem = document.querySelector(`[data-id="${bookId}"]`);
        const bookTitleElement = bookItem.querySelector('h3');
        const bookAuthorElement = bookItem.querySelector('.text-sm');

        // Ganti teks judul dan penulis dengan input field
        const titleInput = document.createElement('input');
        titleInput.type = 'text';
        titleInput.value = book.title;
        titleInput.className = 'border rounded p-2 w-full';

        const authorInput = document.createElement('input');
        authorInput.type = 'text';
        authorInput.value = book.author;
        authorInput.className = 'border rounded p-2 w-full mt-2';

        bookTitleElement.replaceWith(titleInput);
        bookAuthorElement.replaceWith(authorInput);

        // Fokus pada input field
        titleInput.focus();

        // Simpan perubahan saat input kehilangan fokus
        const saveChanges = () => {
            const newTitle = titleInput.value.trim();
            const newAuthor = authorInput.value.trim();

            if (newTitle && newAuthor) {
                book.title = newTitle;
                book.author = newAuthor;
                DataManager.updateBook(book);

                // Kembalikan input menjadi teks
                const updatedTitle = document.createElement('h3');
                updatedTitle.className = 'font-medium';
                updatedTitle.textContent = newTitle;

                const updatedAuthor = document.createElement('p');
                updatedAuthor.className = 'text-sm text-gray-600';
                updatedAuthor.textContent = `oleh ${newAuthor}`;

                titleInput.replaceWith(updatedTitle);
                authorInput.replaceWith(updatedAuthor);
            }
        };

        titleInput.addEventListener('blur', saveChanges);
        authorInput.addEventListener('blur', saveChanges);
    }

    // Update book reading progress
    updateBookProgress(bookId) {
        const book = this.books.find(b => b.id === bookId);
        if (!book) return;

        const newPage = prompt(`Perbarui halaman terakhir yang dibaca (1-${book.totalPages}):`, book.currentPage);
        const currentPage = parseInt(newPage);
        
        if (isNaN(currentPage) || currentPage < 0 || currentPage > book.totalPages) {
            alert(`Masukkan nomor halaman yang valid antara 0 dan ${book.totalPages}.`);
            return;
        }
        
        book.updateProgress(currentPage);
        DataManager.updateBook(book);
        this.renderBooks();
    }

    // Render all books
    renderBooks() {
        this.booksList.innerHTML = '';

        if (this.books.length === 0) {
            this.booksList.innerHTML = `
                <div class="text-gray-500 text-center py-6">
                    Belum ada buku yang ditambahkan. Tambahkan buku untuk mulai tracking!
                </div>
            `;
            return;
        }

        this.books.forEach(book => {
            const bookElement = document.createElement('div');
            bookElement.className = 'book-item bg-gray-50 p-4 rounded-lg border border-gray-200';
            bookElement.dataset.id = book.id;

            const progress = book.getProgress();
            const isCompleted = book.isCompleted();
            
            bookElement.innerHTML = `
                <div class="flex justify-between items-start mb-3">
                    <div>
                        <h3 class="font-medium">${book.title}</h3>
                        <p class="text-sm text-gray-600">oleh ${book.author}</p>
                    </div>
                    <div>
                        <button class="edit-book text-indigo-600 mr-2 hover:text-indigo-800">
                            Edit
                        </button>
                        <button class="delete-book text-red-600 hover:text-red-800">
                            Hapus
                        </button>
                    </div>
                </div>
                
                <div class="text-sm text-gray-600 flex justify-between mb-1">
                    <span>Progres: ${progress.current}/${progress.total} halaman</span>
                    <span>${progress.percentage}%</span>
                </div>
                
                <div class="progress-bar mb-3">
                    <div class="progress-bar-fill" style="width: ${progress.percentage}%"></div>
                </div>
                
                <div class="flex justify-between items-center">
                    <div>
                        ${isCompleted ? 
                            `<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                Selesai
                            </span>` : 
                            `<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                Dalam Proses
                            </span>`
                        }
                    </div>
                    <button class="update-progress text-sm text-indigo-600 hover:text-indigo-800">
                        Perbarui Progres
                    </button>
                </div>
            `;

            this.booksList.appendChild(bookElement);
        });
    }
}