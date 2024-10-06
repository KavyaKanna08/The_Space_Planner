const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// JWT secret key (Keep this safe!)
const JWT_SECRET = 'your_jwt_secret_key';

// Initialize the app
const app = express();

// Middleware for parsing form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Fake in-memory user database (replace with real DB like MongoDB later)
const users = [
    {
        email: '221fa04632@gmail.com',
        password: 'Kavya@0806' // 'password123' hashed
    }
];

// Route to serve login page
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/login.html'));
});

// POST route for login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Find user by email
    const user = users.find(u => u.email === email);
    if (!user) {
        return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Compare entered password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: '1h' });
    return res.json({ message: 'Login successful', token });
});

// Home route (redirects after login)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
