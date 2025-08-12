document.getElementById('signupForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission to handle validation

    // Clear any previous error messages
    clearErrors();

    // Get the form elements
    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    let isValid = true;

    // Full Name validation: Check if it is not empty
    if (fullName === '') {
        showError('fullName', 'Full Name is required.');
        isValid = false;
    }

    // Email validation: Check if it is a valid email
    if (email === '') {
        showError('email', 'Email Address is required.');
        isValid = false;
    } else if (!isValidEmail(email)) {
        showError('email', 'Please enter a valid email address.');
        isValid = false;
    }

    // Password validation: Check if it meets minimum length and strength requirements
    if (password === '') {
        showError('password', 'Password is required.');
        isValid = false;
    } else if (password.length < 6) {
        showError('password', 'Password must be at least 6 characters long.');
        isValid = false;
    } else if (!isStrongPassword(password)) {
        showError(
            'password',
            'Password must include uppercase letters, lowercase letters, numbers, and special characters.'
        );
        isValid = false;
    }

    // If all validations pass, redirect to another page
    if (isValid) {
        console.log('Form Validated! Redirecting...');
         window.location.href = 'select.html'; // Replace with the target URL
    }
});

// Function to check if an email is valid
function isValidEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailPattern.test(email);
}

// Function to check if a password is strong
function isStrongPassword(password) {
    // Check for at least one uppercase letter, one lowercase letter, one digit, and one special character
    const strongPasswordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{6,}$/;
    return strongPasswordPattern.test(password);
}

// Function to display error messages
function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorMessage = document.createElement('span');
    errorMessage.classList.add('error');
    errorMessage.textContent = message;
    field.parentElement.appendChild(errorMessage); // Append error message below the field
}

// Function to clear previous error messages
function clearErrors() {
    const errors = document.querySelectorAll('.error');
    errors.forEach(error => error.remove());
}
