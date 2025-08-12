// Function to validate the credit card number using a basic format check (Luhn Algorithm)
function validateCardNumber(cardNumber) {
    cardNumber = cardNumber.replace(/\s+/g, ''); // Remove spaces for validation
    const regex = /^[0-9]{13,19}$/; // Basic check for 13-19 digits

    if (!regex.test(cardNumber)) {
        return false;
    }

    // Luhn algorithm to validate the credit card number
    let sum = 0;
    let shouldDouble = false;
    for (let i = cardNumber.length - 1; i >= 0; i--) {
        let digit = parseInt(cardNumber[i]);

        if (shouldDouble) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9; // Subtract 9 if the number is greater than 9
            }
        }

        sum += digit;
        shouldDouble = !shouldDouble;
    }

    return sum % 10 === 0;
}

// Validate expiry date (MM/YY)
function validateExpiryDate(expiryDate) {
    const regex = /^(0[1-9]|1[0-2])\/\d{2}$/; // MM/YY format
    return regex.test(expiryDate);
}

// Validate CVV (3 digits)
function validateCVV(cvv) {
    const regex = /^[0-9]{3}$/;
    return regex.test(cvv);
}

// Enable/Disable Pay Now button based on validation
function togglePayNowButton() {
    const cardNumber = document.getElementById('credit-card').value.trim();
    const expiryDate = document.getElementById('expiry-date').value.trim();
    const cvv = document.getElementById('cvv').value.trim();

    const payNowButton = document.querySelector('.btn-primary');

    // Check if all fields are valid
    if (validateCardNumber(cardNumber) && validateExpiryDate(expiryDate) && validateCVV(cvv)) {
        payNowButton.disabled = false; // Enable button if all fields are valid
    } else {
        payNowButton.disabled = true; // Disable button if any field is invalid
    }
}

// Handle form submission and prevent until validation is successful
document.getElementById('payment-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission until validation is successful

    // Get form values
    const cardNumber = document.getElementById('credit-card').value.trim();
    const expiryDate = document.getElementById('expiry-date').value.trim();
    const cvv = document.getElementById('cvv').value.trim();

    // Clear any previous error messages
    clearErrors();

    let isValid = true;

    // Validate Credit Card
    if (!validateCardNumber(cardNumber)) {
        showError('card-error', 'Invalid credit card number.');
        isValid = false;
    }

    // Validate Expiry Date
    if (!validateExpiryDate(expiryDate)) {
        showError('expiry-error', 'Invalid expiry date. Use MM/YY format.');
        isValid = false;
    }

    // Validate CVV
    if (!validateCVV(cvv)) {
        showError('cvv-error', 'Invalid CVV. Please enter a 3-digit number.');
        isValid = false;
    }

    // If all fields are valid, redirect to main page
    if (isValid) {
        // Redirect to the main page (you can add additional query params if needed)
        window.location.href = 'main.html';
    } else {
        // Show a message when the user tries to submit with invalid details
        alert("Please correct the errors in the form before proceeding.");
    }
});

// Function to show error messages
function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

// Function to clear error messages
function clearErrors() {
    const errorElements = document.querySelectorAll('.error');
    errorElements.forEach(function (error) {
        error.textContent = '';
        error.style.display = 'none';
    });
}

// Show the selected plan in the payment form
const urlParams = new URLSearchParams(window.location.search);
const plan = urlParams.get('plan');
if (plan) {
    document.getElementById('selected-plan').textContent = `You have selected the ${plan} plan. Please enter your payment details below.`;
} else {
    document.getElementById('selected-plan').textContent = 'No plan selected. Please go back to choose a plan.';
}

// Attach event listeners for real-time validation on input changes
document.getElementById('credit-card').addEventListener('input', togglePayNowButton);
document.getElementById('expiry-date').addEventListener('input', togglePayNowButton);
document.getElementById('cvv').addEventListener('input', togglePayNowButton);

// Initialize the button state on page load
togglePayNowButton();
