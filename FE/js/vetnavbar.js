document.addEventListener('DOMContentLoaded', function () {
    // Function to handle navigation
    function navigateToPage(page) {
        window.location.href = page;
    }

    // Get the navigation links
    const myAppointmentLink = document.querySelector('.nav-link[href="#myappointment"]');
    const appointmentHistoryLink = document.querySelector('.nav-link[href="#appointmenthistory"]');
    const consultationHoursLink = document.querySelector('.nav-link[href="#consultationhours"]');

    // Add click event listeners
    myAppointmentLink.addEventListener('click', function () {
        navigateToPage('vetmyappointment.html');
    });

    appointmentHistoryLink.addEventListener('click', function () {
        navigateToPage('vetappointmenthistory.html');
    });

    consultationHoursLink.addEventListener('click', function () {
        navigateToPage('vetconsultanthours.html');
    });
});