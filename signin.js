document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("sign-in-form");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const emailError = document.getElementById("email-error");
    const passwordError = document.getElementById("password-error");

    // Function to validate email
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email pattern
        return emailRegex.test(email);
    };

    // Function to validate the form inputs
    const validateInputs = () => {
        let isValid = true;

        // Email validation
        const emailValue = emailInput.value.trim();
        if (!emailValue) {
            emailError.textContent = "Email is required.";
            isValid = false;
        } else if (!validateEmail(emailValue)) {
            emailError.textContent = "Please enter a valid email address (e.g., user@example.com).";
            isValid = false;
        } else {
            emailError.textContent = ""; // Clear error
        }

        // Password validation
        const passwordValue = passwordInput.value.trim();
        if (!passwordValue) {
            passwordError.textContent = "Password is required.";
            isValid = false;
        } else if (passwordValue.length < 6) {
            passwordError.textContent = "Password must be at least 6 characters long.";
            isValid = false;
        } else {
            passwordError.textContent = ""; // Clear error
        }

        return isValid;
    };

    // Handle form submission
    form.addEventListener("submit", (e) => {
        e.preventDefault(); // Prevent default form submission

        if (validateInputs()) {
            form.reset(); // Reset form fields
            emailError.textContent = ""; // Clear error messages
            passwordError.textContent = "";
            location.href = "./main.html"; // Redirect to the main page
        } else {
            alert("please enter the credentials");
        }
    });

    // Real-time validation on input changes
    emailInput.addEventListener("input", validateInputs);
    passwordInput.addEventListener("input", validateInputs);
});
