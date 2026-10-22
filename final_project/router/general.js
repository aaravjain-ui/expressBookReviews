
const express = require('express');
const books = require('./booksdb.js');
const { isValid, users } = require('./auth_users.js');

const public_users = express.Router();

public_users.post('/register', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    if (isValid(username)) {
        return res.status(409).json({ message: 'Username already exists' });
    }

    users.push({ username, password });
    return res.status(201).json({ message: 'User successfully registered' });
});

public_users.get('/', (req, res) => {
    return res.status(200).json(books);
});

public_users.get('/isbn/:isbn', (req, res) => {
    const book = books[req.params.isbn];

    if (!book) {
        return res.status(404).json({ message: 'Book not found' });
    }

    return res.status(200).json(book);
});

public_users.get('/author/:author', (req, res) => {
    const author = req.params.author.toLowerCase();

    const result = Object.entries(books)
        .filter(([id, book]) => book.author.toLowerCase() === author)
        .reduce((acc, [id, book]) => {
            acc[id] = book;
            return acc;
        }, {});

    return res.status(200).json(result);
});

public_users.get('/title/:title', (req, res) => {
    const title = req.params.title.toLowerCase();

    const result = Object.entries(books)
        .filter(([id, book]) => book.title.toLowerCase().includes(title))
        .reduce((acc, [id, book]) => {
            acc[id] = book;
            return acc;
        }, {});

    return res.status(200).json(result);
});

public_users.get('/review/:isbn', (req, res) => {
    const book = books[req.params.isbn];

    if (!book) {
        return res.status(404).json({ message: 'Book not found' });
    }

    return res.status(200).json(book.reviews);
});

module.exports.general = public_users;

