// Fetch and display registered users on the dashboard
window.onload = function () {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const tbody = document.querySelector('#user-table tbody');

    if (users.length > 0) {
        // Create rows for each user dynamically
        tbody.innerHTML = users.map(user => `
            <tr>
                <td>${user.firstName}</td>
                <td>${user.lastName}</td>
                <td>${user.email}</td>
                <td>${user.phone}</td>
            </tr>
        `).join('');
    } else {
        // If no users, show a message
        tbody.innerHTML = `<tr><td colspan="4">No registered users found.</td></tr>`;
    }
};
// Handle registration form submission
document.getElementById('register-form')?.addEventListener('submit', function (event) {
    event.preventDefault();
    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const email = document.getElementById('register-email').value;
    const phone = document.getElementById('register-phone').value;
    const password = document.getElementById('register-password').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.find(user => user.email === email)) {
        alert('User already exists');
    } else {
        users.push({ firstName, lastName, email, phone, password });
        localStorage.setItem('users', JSON.stringify(users));

        // Store the first name in localStorage for the success page
        localStorage.setItem('firstName', firstName);

        alert('Registration successful');
        window.location.href = 'registration-success.html'; // Redirect to success page
    }
});
        document.getElementById('login-form').addEventListener('submit', function(event) {
            event.preventDefault();
            
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const user = users.find(u => u.email === email && u.password === password);
            
            if (user) {
                localStorage.setItem('loggedInUser', user.firstName); // Store logged in user info
                alert('Login successful');
                window.location.href = 'login-successful.html'; // Redirect to login success page
            } else {
                document.getElementById('error-message').textContent = 'Invalid email or password';
                document.getElementById('error-message').style.display = 'block';
            }
        });

// Popup functions
function showPopup() {
    document.getElementById('popup').style.display = 'flex';
}

function closePopup() {
    document.getElementById('popup').style.display = 'none';
}

function redirectToLogin() {
    closePopup();
    window.location.href = 'login.html';
}

function redirectToRegister() {
    closePopup();
    window.location.href = 'register.html';
}
// Function to open the popup
function openPopup() {
    document.getElementById("popup").style.display = "block";
}

// Function to close the popup
function closePopup() {
    document.getElementById("popup").style.display = "none";
}

// Function to redirect to the booking page (modify the URL as needed)
function redirectToBookNow() {
    window.location.href = "booking.html"; // Change to your booking page URL
}

const form = document.querySelector('.booking-form');
form.addEventListener('submit', function(event) {
    alert('confirmation');
    window.location.href = 'confirmation.html'; 
    
});
