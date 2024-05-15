document.addEventListener('DOMContentLoaded', function () {
    // Get all sidebar list items
    const sidebarItems = document.querySelectorAll('.sidebar-list-item');

    // Add click event listener to each sidebar item
    sidebarItems.forEach(item => {
        item.addEventListener('click', function (event) {
            // Prevent default behavior for all clicks on sidebar items
            event.preventDefault();

            // Toggle the active class for clicked sidebar item
            sidebarItems.forEach(item => {
                item.classList.remove('active');
            });
            this.classList.add('active');

            // Get the target page based on the data attribute
            const targetPage = this.dataset.page;

            // If the clicked item has a dropdown arrow, toggle the dropdown menu
            if (this.querySelector('.dropdown-icon')) {
                const dropdownMenu = this.querySelector('.dropdown-menu');
                dropdownMenu.classList.toggle('show');
            } else {
                // Navigate to the target page
                window.location.href = targetPage;
            }
        });
    });

    // Add click event listener to dropdown arrow icons
    const dropdownIcons = document.querySelectorAll('.dropdown-icon');
    dropdownIcons.forEach(icon => {
        icon.addEventListener('click', function (event) {
            // Prevent default behavior for clicks on dropdown icons
            event.preventDefault();

            // Toggle the dropdown menu associated with the clicked arrow icon
            const dropdownMenu = this.parentElement.nextElementSibling;
            dropdownMenu.classList.toggle('show');
        });
    });

    // Add event listener for when the DOM is loaded to check if the current page matches any sidebar item
    const currentPage = window.location.pathname;
    sidebarItems.forEach(item => {
        const pageLink = item.dataset.page;
        if (currentPage.includes(pageLink)) {
            item.classList.add('active');
        }
    });
});
