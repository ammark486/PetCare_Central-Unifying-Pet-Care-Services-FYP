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

function routeToVetProfile(){
  window.location.href = 'vet-profile.html';
}
