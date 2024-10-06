document.getElementById('register-form').addEventListener('submit', function (event) {
    // Prevent form submission until all validations pass
    event.preventDefault();

    // Fetch form values
    const firstName = document.getElementById('first-name').value.trim();
    const lastName = document.getElementById('last-name').value.trim();
    const email = document.getElementById('register-email').value.trim();
    const phone = document.getElementById('register-phone').value.trim();
    const password = document.getElementById('register-password').value.trim();
    const termsAccepted = document.getElementById('terms').checked;

    // Validation flags
    let isValid = true;

    // Clear any previous error messages
    clearErrors();

    // 1. First Name Validation (Only letters allowed)
    if (!/^[a-zA-Z]+$/.test(firstName)) {
        showError('first-name', 'First Name can only contain alphabetic characters.');
        isValid = false;
    }

    // 2. Last Name Validation (Only letters allowed)
    if (!/^[a-zA-Z]+$/.test(lastName)) {
        showError('last-name', 'Last Name can only contain alphabetic characters.');
        isValid = false;
    }

    // 3. Email Validation (Should follow a valid email format)
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showError('register-email', 'Please enter a valid email address.');
        isValid = false;
    }

    // 4. Phone Number Validation (Only numbers allowed, 10 digits)
    if (!/^\d{10}$/.test(phone)) {
        showError('register-phone', 'Phone number must be a 10-digit number.');
        isValid = false;
    }

    // 5. Password Strength Validation (At least one uppercase, lowercase, number, and special character, minimum 8 characters)
    const passwordStrengthRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!passwordStrengthRegex.test(password)) {
        showError('register-password', 'Password must be at least 8 characters long and include uppercase, lowercase, numbers, and special characters.');
        isValid = false;
    }

    // 6. Terms and Conditions Validation
    if (!termsAccepted) {
        alert('You must accept the terms and conditions to proceed.');
        isValid = false;
    }

    // If all validations pass, submit the form or store the data
    if (isValid) {
        // Store the user data in localStorage (You can modify this logic as needed)
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const newUser = {
            firstName,
            lastName,
            email,
            phone,
            password, // Password should ideally be hashed before storing in production
        };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        // Redirect or show success message
        alert('Registration successful! Redirecting to login page...');
        window.location.href = 'login.html'; // Change this URL if needed
    }
});

// Helper function to show error messages
function showError(inputId, message) {
    const inputElement = document.getElementById(inputId);
    const errorElement = document.createElement('span');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    inputElement.insertAdjacentElement('afterend', errorElement);
}

// Helper function to clear previous error messages
function clearErrors() {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(error => error.remove());
}
