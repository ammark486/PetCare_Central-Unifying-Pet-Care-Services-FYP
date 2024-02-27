
document.addEventListener('DOMContentLoaded', function() {
    var navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(function(link) {
        link.addEventListener('click', function(event) {
            event.preventDefault();

            var sectionIds = {
                'Home': 'home.html#home',
                'About': 'home.html#about',
                'Services': 'home.html#services',
                'Blog': 'home.html#blog',
                'Contact': '#contact',
                
            };

            var selectedSectionId = sectionIds[link.innerHTML];

            if (selectedSectionId) {
                window.location.href = selectedSectionId;
            }
        });
    });
});



document.addEventListener('DOMContentLoaded', function() {
    var dropdownButton = document.querySelector('.nav-item .nav-link');
    var serviceLinks = document.querySelectorAll('.dropdown-menu a');

    function navigateToPage(page) {
        var pageMapping = {
            'Vaccination': 'vaccination.html',
            'Surgeries': 'surgeries.html',
            'Dental Care': 'dentalcare.html',
            'Pet Grooming': 'petgrooming.html',
            'General Treatment': 'generaltreatment.html',
            'Diagnostic tests': 'diagnostictest.html',
            'General Checkup &amp; Consultation': 'generalcheckup&consultation.html',
            'Services': '#servicesid'  // Add this line to scroll to the services section
        };

        if (pageMapping[page]) {
            if (page === 'Services') {
                // Scroll to the "servicesid" section
                document.querySelector(pageMapping[page]).scrollIntoView({
                    behavior: 'smooth'
                });
            } else {
                window.location.href = pageMapping[page];
            }
        }
    }

    serviceLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            serviceLinks.forEach(function(innerLink) {
                innerLink.classList.remove('active');
            });

            link.classList.add('active');
            dropdownButton.innerHTML = link.innerHTML;

            // Navigate to the selected page
            navigateToPage(link.innerHTML);
        });
    });

    // Handle click on the main "Services" link
    dropdownButton.addEventListener('click', function() {
        // Scroll to the "servicesid" section
        document.querySelector('#servicesid').scrollIntoView({
            behavior: 'smooth'
        });
    });
});





// //nav hide  
// let navBar = document.querySelectorAll(".nav-link");
// let navCollapse = document.querySelector(".navbar-collapse.collapse");
// navBar.forEach(function(a){
//     a.addEventListener("click", function(){
//         navCollapse.classList.remove("show");
//     })
// })


//     //Get the dropdown button and menu
//     document.addEventListener('DOMContentLoaded', function() {
//         var dropdownButton = document.querySelector('.nav-item .nav-link');
//         var dropdownMenu = document.querySelector('.dropdown-menu');
        
//         var serviceLinks = document.querySelectorAll('.dropdown-menu a');
    
//         serviceLinks.forEach(function(link) {
//             link.addEventListener('click', function() {
//                 serviceLinks.forEach(function(innerLink) {
//                     innerLink.classList.remove('active');
//                 });
    
//                 link.classList.add('active');
    
//                 dropdownButton.innerHTML = link.innerHTML;
    
//                 // Use absolute paths based on your project structure
//                 if (link.innerHTML === 'Vaccination') {
//                     window.location.href = 'vaccination.html';
//                 }
//                 if (link.innerHTML === 'Surgeries') {
//                     window.location.href = 'surgeries.html';
//                 }
//                 if (link.innerHTML === 'Dental Care') {
//                     window.location.href = 'dentalcare.html';
//                 }
//                 if (link.innerHTML === 'Pet Grooming') {
//                     window.location.href = 'petgrooming.html';
//                 }
//                 if (link.innerHTML === 'General Treatment') {
//                     window.location.href = 'generaltreatment.html';
//                 }
//                 if (link.innerHTML === 'Diagnostic tests') {
//                     window.location.href = 'diagnostictest.html';
//                 }
//                 if (link.innerHTML === 'General Checkup &amp; Consultation') {
//                     window.location.href = 'generalcheckup&consultation.html'; 
//                 }  
//                 // Add similar conditions for other pages
//             });
//         });
    


        






