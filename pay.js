document.getElementById('payment-form').addEventListener('submit', function(e) {
    e.preventDefault();

    // Get selected plan value
    const selectedPlan = document.querySelector('input[name="plan"]:checked').value;

    // Redirect to the payment page with the selected plan in the URL
    window.location.href = `payment.html?plan=${selectedPlan}`;
});
