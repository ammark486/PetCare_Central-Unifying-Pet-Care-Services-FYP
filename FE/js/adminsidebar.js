// JavaScript for sidebar functionality
document.addEventListener('DOMContentLoaded', function () {
    // Get all sidebar list items
    const sidebarItems = document.querySelectorAll('.sidebar-list-item');

    // Add click event listener to each sidebar item
    sidebarItems.forEach(item => {
        item.addEventListener('click', function () {
            // Get the target page based on the data attribute
            const targetPage = this.dataset.page;

            // Navigate to the target page
            window.location.href = targetPage;
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const sidebarItems = document.querySelectorAll('.sidebar-list-item');

    sidebarItems.forEach(item => {
        item.addEventListener('click', function () {
            // Remove active class from all sidebar items
            sidebarItems.forEach(item => {
                item.classList.remove('active');
            });

            // Add active class to the clicked sidebar item
            this.classList.add('active');

            // Get the target page based on the data attribute
            const targetPage = this.dataset.page;

            // Navigate to the target page
            window.location.href = targetPage;
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




