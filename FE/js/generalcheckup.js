document.addEventListener('DOMContentLoaded', function () {
    // Find the "Book Appointment" button by its class
    var bookAppointmentButton = document.querySelector('.btn-pink');

    // Add a click event listener to the button
    bookAppointmentButton.addEventListener('click', function () {
        // Redirect to the "form.html" page
        window.location.href = 'form.html';
    });
});