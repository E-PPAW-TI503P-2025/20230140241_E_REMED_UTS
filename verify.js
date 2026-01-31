const axios = require('axios');

const BASE_URL = 'http://localhost:3000/api';

async function verify() {
    try {
        console.log('--- START VERIFICATION ---');

        console.log('\n[1] TEST: Create Book (Admin)');
        const bookRes = await axios.post(`${BASE_URL}/books`, {
            title: 'The Great Gatsby',
            author: 'F. Scott Fitzgerald',
            stock: 5
        }, {
            headers: { 'x-user-role': 'admin' }
        });
        console.log('Status:', bookRes.status); // 201
        console.log('Book ID:', bookRes.data.id);
        const bookId = bookRes.data.id;

        console.log('\n[2] TEST: Get All Books (Public)');
        const getAllRes = await axios.get(`${BASE_URL}/books`);
        console.log('Status:', getAllRes.status); // 200
        console.log('Count:', getAllRes.data.length);

        console.log('\n[3] TEST: Borrow Book (User)');
        const borrowRes = await axios.post(`${BASE_URL}/borrow`, {
            bookId: bookId,
            latitude: -6.2,
            longitude: 106.8
        }, {
            headers: {
                'x-user-role': 'user',
                'x-user-id': '101'
            }
        });
        console.log('Status:', borrowRes.status); // 200
        console.log('Message:', borrowRes.data.message);

        console.log('\n[4] TEST: Verify Stock Decrement (Public)');
        const getBookRes = await axios.get(`${BASE_URL}/books/${bookId}`);
        console.log('Stock (Should be 4):', getBookRes.data.stock);

        console.log('\n[5] TEST: Delete Book (Admin)');
        const deleteRes = await axios.delete(`${BASE_URL}/books/${bookId}`, {
            headers: { 'x-user-role': 'admin' }
        });
        console.log('Status:', deleteRes.status); // 200
        console.log('Message:', deleteRes.data.message);

        console.log('\n--- VERIFICATION COMPLETE ---');
    } catch (error) {
        console.error('VERIFICATION FAILED');
        if (error.response) {
            console.error('Status:', error.response.status);
            console.error('Data:', error.response.data);
        } else {
            console.error(error.message);
        }
    }
}

verify();
