
const axios = require('axios');

const BASE_URL = 'http://localhost:5000';

async function getAllBooks() {
    const response = await axios.get(`${BASE_URL}/`);
    console.log(response.data);
}

async function getBooksByISBN(isbn) {
    const response = await axios.get(
        `${BASE_URL}/isbn/${encodeURIComponent(isbn)}`
    );
    console.log(response.data);
}

async function getBooksByAuthor(author) {
    const response = await axios.get(
        `${BASE_URL}/author/${encodeURIComponent(author)}`
    );
    console.log(response.data);
}

async function getBooksByTitle(title) {
    const response = await axios.get(
        `${BASE_URL}/title/${encodeURIComponent(title)}`
    );
    console.log(response.data);
}

async function main() {
    try {
        const action = process.argv[2];

        if (action === 'all') {
            await getAllBooks();
        } else if (action === 'isbn' && process.argv[3]) {
            await getBooksByISBN(process.argv[3]);
        } else if (action === 'author' && process.argv[3]) {
            await getBooksByAuthor(process.argv.slice(3).join(' '));
        } else if (action === 'title' && process.argv[3]) {
            await getBooksByTitle(process.argv.slice(3).join(' '));
        } else {
            console.log('Usage: node general.js all');
            console.log('node general.js isbn 1');
            console.log('node general.js author "Chinua Achebe"');
            console.log('node general.js title "Pride and Prejudice"');
        }
    } catch (error) {
        console.log('Request failed:', error.message);
    }
}

main();
