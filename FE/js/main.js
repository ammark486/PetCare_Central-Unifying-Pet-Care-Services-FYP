/*----------------------------Home page js------------------------------------------- */

/*---------------------------- Header Scroll ------------------------------------------- */
let nav = document.querySelector(".navbar");
window.onscroll = function () {
  if (document.documentElement.scrollTop > 100) {
    nav.classList.add("header-scrolled");
  } else {
    nav.classList.remove("header-scrolled");
  }
};
/*---------------------------- Banner connectivity  ------------------------------------------- */
document.addEventListener("DOMContentLoaded", function () {
  // Function to handle navigation
  function navigateToPage(page) {
    window.location.href = page;
  }

  // Get the button elements
  const petSuppliesBtn = document.querySelector(".main-btn.fill-btn");
  const adoptPetBtn = document.querySelector(".main-btn.ms-3");

  // Add click event listeners
  petSuppliesBtn.addEventListener("click", function () {
    navigateToPage("productselect.html");
  });

  adoptPetBtn.addEventListener("click", function () {
    navigateToPage("adoptselect.html");
  });
});

/*---------------------------- Services(Read More button connectivity) ------------------------------------------- */
document.addEventListener("DOMContentLoaded", function () {
  var dropdownButton = document.querySelector(".nav-item .nav-link");
  var serviceLinks = document.querySelectorAll(".dropdown-menu a");
  var readMoreButtons = document.querySelectorAll(
    ".services_wrapper .main-btn"
  );

  function navigateToSection(sectionId) {
    document.querySelector(sectionId).scrollIntoView({
      behavior: "smooth",
    });
  }

  function navigateToServicePage(servicePage) {
    // Use absolute paths based on your project structure
    window.location.href = servicePage;
  }

  serviceLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      serviceLinks.forEach(function (innerLink) {
        innerLink.classList.remove("active");
      });

      link.classList.add("active");
      dropdownButton.innerHTML = link.innerHTML;

      // Use absolute paths based on your project structure
      navigateToSection(link.getAttribute("data-section"));
    });
  });

  readMoreButtons.forEach(function (button, index) {
    button.addEventListener("click", function () {
      // Define corresponding service pages
      var servicePages = [
        "vaccination.html",
        "petgrooming.html",
        "surgeries.html",
        "diagnostictest.html",
        "generalcheckup&consultation.html",
        "dentalcare.html",
        "generaltreatment.html",
        // Add more service pages as needed
      ];

      // Navigate to the corresponding service page
      navigateToServicePage(servicePages[index]);
    });
  });

  // Handle click on the main "Services" link
  dropdownButton.addEventListener("click", function () {
    // Scroll to the "servicesid" section
    navigateToSection("#servicesid");
  });
});


// BLOG SECTION(READ MORE BUTTON) ////
/*---------------------------- Blogs(Read More button connectivity) ------------------------------------------- */

  // Function to redirect to different blog pages
  function redirectToBlogPage(pageNumber) {
    // Define the URLs for each blog page
    const blogPages = {
      1: "blog1.html",
      2: "blog2.html",
      3: "blog3.html"
    };

    // Get the URL for the selected blog page
    const selectedPage = blogPages[pageNumber];

    // Redirect to the selected blog page
    window.location.href = selectedPage;
  }

  // Attach click event listeners to the "Read More" buttons
  document.querySelectorAll('.main-btn').forEach(button => {
    button.addEventListener('click', function() {
      // Get the data-page attribute value from the button
      const pageNumber = parseInt(this.getAttribute('data-page'));

      // Redirect to the corresponding blog page
      redirectToBlogPage(pageNumber);
    });
  });

//vet consultation hour
function editConsultationHours() {
  // Add functionality for the edit button here
  alert("Edit My Consultation Hours clicked!");
  // You can replace the alert with your actual code to edit consultation hours
}


// console.log(parseJwt('eyJhbGciOiJIUzI1NiJ9.eyJQRVJNSVNTSU9OUyI6W10sIlJPTEVTIjpbIkNVU1RPTUVSIl0sInN1YiI6InJvbGVAZ21haWwuY29tIiwiaWF0IjoxNzE1NzIwMzI1LCJleHAiOjE3MTYwODAzMjV9.hKmL1CzRtFoyN4yzMSbJukdD5px_Vt7Ngo9qwGC-P2U'))

function parseJwt (token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}
