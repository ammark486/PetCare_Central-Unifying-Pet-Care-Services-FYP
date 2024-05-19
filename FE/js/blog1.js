document.addEventListener('DOMContentLoaded', function() {
    // Get all the "Read More" buttons
    const readMoreButtons = document.querySelectorAll('a.btn.btn-primary');

    // Add click event listener to each button
    readMoreButtons.forEach(button => {
      button.addEventListener('click', function(event) {
        // Prevent the default action (i.e., following the link)
        event.preventDefault();

        // Get the value of the data-page attribute
        const pageNumber = button.getAttribute('data-page');

        // Redirect the user to the corresponding page
        if (pageNumber === '2') {
          window.location.href = 'blog2.html';
        } else if (pageNumber === '3') {
          window.location.href = 'blog3.html';
        }
      });
    });
  });