// Node js - 



// Implement a GET API in Node.js that takes two numbers as parameters, adds them, and sends the result. Create validations around input parameters to accept numeric values. Additionally, incorporate authentication using middleware.
const express = require('express');
const app = express();
const port = 4000;

const authenticate = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        if (token === 'mysecrettoken') {
            next();
        } else {
            return res.status(403).json({ message: 'Forbidden: Invalid token' });
        }
    } else {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }
}

const validateNumbers = (req, res, next) => {
    const { num1, num2 } = req.query;
    if (!num1 || !num2) {
        return res.status(400).json({ message: 'Missing numbers in query params' });
    }
    if (isNaN(num1) || isNaN(num2)) {
        return res.status(400).json({ message: 'Both parameters must be a number' });
    }
    next();
};

app.get('/add', authenticate, validateNumbers, (req, res) => {
    const { num1, num2 } = req.query;
    const result = parseFloat(num1) + parseFloat(num2);
    res.json({ result })
})

app.listen(port, () => {
    console.log(`Server is running on ${port}`)
})