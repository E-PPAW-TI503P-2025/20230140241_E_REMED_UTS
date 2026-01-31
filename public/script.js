const API_URL = 'http://localhost:3000/api';
let currentRole = 'public';
let userCoords = { lat: null, lon: null };

// Init
document.addEventListener('DOMContentLoaded', () => {
    fetchBooks();
});

// Toast Implementation
function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    let icon = 'ℹ️';
    if (type === 'success') icon = '✅';
    if (type === 'error') icon = '❌';

    toast.innerHTML = `<span class="toast-icon">${icon}</span> ${message}`;

    container.appendChild(toast);

    // Trigger animation
    setTimeout(() => toast.classList.add('show'), 10);

    // Remote after 3s
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 400); // Wait for transition
    }, 3000);
}

// Role Management
function changeRole(role) {
    currentRole = role;
    document.getElementById('current-role-display').textContent = `Role: ${role.charAt(0).toUpperCase() + role.slice(1)}`;

    document.getElementById('admin-section').classList.add('hidden');
    document.getElementById('user-section').classList.add('hidden');

    if (role === 'admin') {
        document.getElementById('admin-section').classList.remove('hidden');
        showToast('Switched to Admin Mode', 'info');
    } else if (role === 'user') {
        document.getElementById('user-section').classList.remove('hidden');
        getLocation();
        showToast('Switched to User Mode', 'info');
    }

    fetchBooks(); // Refresh list to show appropriate buttons
}

// Get Location
function getLocation() {
    const status = document.getElementById('user-location-status');
    if (!navigator.geolocation) {
        status.textContent = "Geolocation is not supported by your browser";
        showToast('Geolocation not supported', 'error');
        return;
    }

    status.textContent = "Locating...";
    navigator.geolocation.getCurrentPosition((position) => {
        userCoords.lat = position.coords.latitude;
        userCoords.lon = position.coords.longitude;
        status.textContent = `Location locked: ${userCoords.lat.toFixed(4)}, ${userCoords.lon.toFixed(4)}`;
        showToast('Location locked successfully', 'success');
    }, () => {
        status.textContent = "Unable to retrieve your location";
        showToast('Unable to retrieve location', 'error');
    });
}

// Fetch Books
async function fetchBooks() {
    try {
        const res = await fetch(`${API_URL}/books`);
        const books = await res.json();
        renderBooks(books);
    } catch (err) {
        console.error(err);
        showToast('Failed to fetch books', 'error');
    }
}

// Render Books
function renderBooks(books) {
    const list = document.getElementById('book-list');
    list.innerHTML = '';

    books.forEach(book => {
        const div = document.createElement('div');
        div.className = 'book-card';

        let actionButtons = '';
        if (currentRole === 'admin') {
            actionButtons = `
                <div style="display:flex; justify-content: space-between; border-top: 1px solid #eee; padding-top: 10px;">
                    <button class="btn-delete" onclick="deleteBook(${book.id})">Delete</button>
                    <button class="btn-edit" onclick="openEditModal(${book.id}, '${book.title}', '${book.author}', ${book.stock})">Edit</button>
                </div>
            `;
        } else if (currentRole === 'user') {
            actionButtons = `<button class="btn-borrow" onclick="borrowBook(${book.id})">Borrow</button>`;
        }

        div.innerHTML = `
            <h4>${book.title}</h4>
            <p>Author: ${book.author}</p>
            <p>Stock: <strong>${book.stock}</strong></p>
            ${actionButtons}
        `;
        list.appendChild(div);
    });
}

// Add Book (Admin)
document.getElementById('add-book-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    if (currentRole !== 'admin') return;

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const stock = document.getElementById('stock').value;

    try {
        const res = await fetch(`${API_URL}/books`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-user-role': 'admin'
            },
            body: JSON.stringify({ title, author, stock })
        });

        if (res.ok) {
            showToast('Book added successfully!', 'success');
            fetchBooks();
            e.target.reset();
        } else {
            const data = await res.json();
            showToast(data.message || 'Error adding book', 'error');
        }
    } catch (err) {
        showToast('Request failed', 'error');
    }
});

// Delete Book (Admin)
async function deleteBook(id) {
    if (!confirm('Are you sure you want to delete this book?')) return;

    try {
        const res = await fetch(`${API_URL}/books/${id}`, {
            method: 'DELETE',
            headers: { 'x-user-role': 'admin' }
        });

        if (res.ok) {
            fetchBooks();
            showToast('Book deleted', 'success');
        } else {
            showToast('Failed to delete book', 'error');
        }
    } catch (err) {
        showToast('Error deleting book', 'error');
    }
}

// Borrow Book (User)
async function borrowBook(id) {
    if (!userCoords.lat) {
        showToast('Location not found yet. Please allow location access.', 'error');
        getLocation();
        return;
    }

    try {
        const res = await fetch(`${API_URL}/borrow`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-user-role': 'user',
                'x-user-id': '999' // Hardcoded ID for simulation
            },
            body: JSON.stringify({
                bookId: id,
                latitude: userCoords.lat,
                longitude: userCoords.lon
            })
        });

        const data = await res.json();
        if (res.ok) {
            showToast(data.message, 'success');
            fetchBooks();
        } else {
            showToast(data.message, 'error');
        }
    } catch (err) {
        showToast('Borrow failed', 'error');
    }
}

// Update Book (Admin)
function openEditModal(id, title, author, stock) {
    document.getElementById('edit-id').value = id;
    document.getElementById('edit-title').value = title;
    document.getElementById('edit-author').value = author;
    document.getElementById('edit-stock').value = stock;

    document.getElementById('edit-modal').classList.remove('hidden');
}

function closeEditModal() {
    document.getElementById('edit-modal').classList.add('hidden');
}

document.getElementById('edit-book-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('edit-id').value;
    const title = document.getElementById('edit-title').value;
    const author = document.getElementById('edit-author').value;
    const stock = document.getElementById('edit-stock').value;

    try {
        const res = await fetch(`${API_URL}/books/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'x-user-role': 'admin'
            },
            body: JSON.stringify({ title, author, stock })
        });

        if (res.ok) {
            showToast('Book updated successfully!', 'success');
            fetchBooks();
            closeEditModal();
        } else {
            showToast('Failed to update book', 'error');
        }
    } catch (err) {
        showToast('Request failed', 'error');
    }
});
