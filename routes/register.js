const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// Path to the user.json file
const usersFilePath = path.join(__dirname, '../data/users.json');

// Middleware to handle registration form submission
router.post('/register', (req, res, next) => {
    const { first_name, last_name, email, password, confirm_password, phone } = req.body;

    // Create a new user object
    const newUser = {
        first_name,
        last_name,
        email,
        password, // In a real app, hash the password before saving
        phone
    };

    // Read the existing users from user.json
    fs.readFile(usersFilePath, 'utf-8', (err, data) => {
        if (err) {
            const err = new Error('Error reading user data');
            err.status = 500;
            return next(err); // Forward to error-handling middleware
        }

        let users = [];
        if (data) {
            users = JSON.parse(data); // Parse existing users
        }

        // Check if user already exists by email
        const existingUser = users.find(user => user.email === email);
        if (existingUser) {
            const err = new Error('User with this email already exists');
            err.status = 400;
            return next(err); // Forward to error-handling middleware
        }

        // Add the new user to the array
        users.push(newUser);

        // Write the updated users array back to user.json
        fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), (writeErr) => {
            if (writeErr) {
                const err = new Error('Error saving user data');
                err.status = 500;
                return next(err); // Forward to error-handling middleware
            }
            // Render the success page with the user's first name
            res.render('register_success', { first_name: first_name });
        });
    });
});

module.exports = router;