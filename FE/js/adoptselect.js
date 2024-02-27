document.addEventListener('DOMContentLoaded', function () {
    const adoptSelectButton = document.getElementById('adoptselectbutton');
    const dropdownOptions = document.querySelectorAll('.dropdown-menu a');

    dropdownOptions.forEach(function (option) {
      option.addEventListener('click', function () {
        // Check the selected option and redirect accordingly
        if (option.textContent.toLowerCase() === 'dog') {
          window.location.href = 'dog.html';
        } else if (option.textContent.toLowerCase() === 'cat') {
          window.location.href = 'cat.html';
        }
        // Add more conditions for other options as needed
      });
    });
  });