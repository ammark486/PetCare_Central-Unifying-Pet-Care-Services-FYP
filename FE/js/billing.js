// document.addEventListener("DOMContentLoaded", function () {
//     const form = document.querySelector('.bill-form');
//     const nameInput = document.getElementById('name');
//     const contactNumberInput = document.getElementById('contactNumber');
//     const addressInput = document.getElementById('address');
//     const zipcodeInput = document.getElementById('zipcode');

//     form.addEventListener('submit', function (event) {
//         event.preventDefault();
//         validateForm();
//     });

//     function validateForm() {
//         let isValid = true;

//         // Validate Name
//         if (nameInput.value.trim().length < 3 || nameInput.value.trim().length > 20) {
//             isValid = false;
//             alert('Name must be between 3 and 20 characters.');
//             return;
//         }

//         // Validate Contact Number
//         const contactNumberRegex = /^\+92\d{10}$/;
//         if (!contactNumberRegex.test(contactNumberInput.value.trim())) {
//             isValid = false;
//             alert('Contact number must start with +92 and be exactly 11 digits long.');
//             return;
//         }

       
//         // Validate Address
//         if (addressInput.value.trim() === '') {
//             isValid = false;
//             alert('Please enter your address.');
//             return;
//         }

//         // Validate Zipcode
//         const zipcodeRegex = /^\d{6}$/;
//         if (!zipcodeRegex.test(zipcodeInput.value.trim())) {
//             isValid = false;
//             alert('Zipcode must be exactly 6 digits long.');
//             return;
//         }

//         if (isValid) {
//             alert('Your Order has been booked');
//             // Here you can submit the form data to your server
//         }
//     }
// });

// function validateForm() {
//     // Get form inputs
//     var nameInput = document.getElementById("name");
//     var contactNumberInput = document.getElementById("contactNumber");
//     var addressInput = document.getElementById("address");
//     var zipcodeInput = document.getElementById("zipcode");
    
//     // Regular expressions for validation
//     var nameRegex = /^[A-Za-z\s]{3,20}$/;
//     var contactNumberRegex = /^\+92\d{9}$/;
//     var zipcodeRegex = /^\d{6}$/;
    
//     // Flag to track form validity
//     var isValid = true;

//     // Validate name
//     if (!nameRegex.test(nameInput.value.trim())) {
//         isValid = false;
//         alert("Name must be between 3 and 20 characters long and can only contain letters and spaces.");
//         return;
//     }

//     // Validate contact number
//     if (!contactNumberRegex.test(contactNumberInput.value.trim())) {
//         isValid = false;
//         alert("Contact number must start with +92 and be exactly 12 digits long.");
//         return;
//     }

//     // Validate zipcode
//     if (!zipcodeRegex.test(zipcodeInput.value.trim())) {
//         isValid = false;
//         alert("Zipcode must be exactly 6 digits long.");
//         return;
//     }

//     // If form is valid, submit it
//     if (isValid) {
//         alert("Form submitted successfully!");
//         // You can also submit the form programmatically if needed
//         // document.getElementById("myForm").submit();
//     }
// }
function validateForm() {
    // Get form inputs
    var nameInput = document.getElementById("name");
    var contactNumberInput = document.getElementById("contactNumber");
    var addressInput = document.getElementById("address");
    var zipcodeInput = document.getElementById("zipcode");
    
    // Regular expressions for validation
    var nameRegex = /^[A-Za-z\s]{3,20}$/;
    var contactNumberRegex = /^\+92\d{9}$/;
    var zipcodeRegex = /^\d{6}$/;
    
    // Flag to track form validity
    var isValid = true;

    // Validate name
    if (!nameRegex.test(nameInput.value.trim())) {
        isValid = false;
        alert("Name must be between 3 and 20 characters long and can only contain letters and spaces.");
        return;
    }

    // Validate contact number
    if (!contactNumberRegex.test(contactNumberInput.value.trim())) {
        isValid = false;
        alert("Contact number must start with +92 and be exactly 12 digits long.");
        return;
    }

    // Validate zipcode
    if (!zipcodeRegex.test(zipcodeInput.value.trim())) {
        isValid = false;
        alert("Zipcode must be exactly 6 digits long.");
        return;
    }

    // If form is valid, submit it
    if (isValid) {
        alert("Form submitted successfully!");
        // You can also submit the form programmatically if needed
        // document.getElementById("myForm").submit();
    }
}