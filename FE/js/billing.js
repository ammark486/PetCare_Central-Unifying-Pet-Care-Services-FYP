let permission_label = 'BILLING';

let cities = [
  "Karachi",
  "Lahore",
  "Faisalabad",
  "Rawalpindi",
  "Multan",
  "Hyderabad",
  "Gujranwala",
  "Peshawar",
  "Quetta",
  "Islamabad",
  "Sargodha",
  "Sialkot",
  "Bahawalpur",
  "Sukkur",
  "Jhang",
  "Sheikhupura",
  "Larkana",
  "Gujrat",
  "Mardan",
  "Kasur",
  "Rahim Yar Khan",
  "Sahiwal",
  "Okara",
  "Wah",
  "Dera Ghazi Khan",
  "Mirpur Khas",
  "Nawabshah",
  "Mingora",
  "Chiniot",
  "Kamoke",
  "Mandi Burewala",
  "Jhelum",
  "Sadiqabad",
  "Jacobabad",
  "Shikarpur",
  "Khanewal",
  "Hafizabad",
  "Kohat",
  "Muzaffargarh",
  "Khanpur",
  "Gojra",
  "Bahawalnagar",
  "Muridke",
  "Pak Pattan",
  "Abottabad",
  "Tando Adam",
  "Jaranwala",
  "Khairpur",
  "Chishtian Mandi",
  "Daska",
  "Dadu",
  "Mandi Bahauddin",
  "Ahmadpur East",
  "Kamalia",
  "Khuzdar",
  "Vihari",
  "Dera Ismail Khan",
  "Wazirabad",
  "Nowshera",
];

addCities();

function addCities() {
  let cityOptions = '<option value="" disabled selected>Select a city</option>'; // Empty option as the first option

  cities.forEach((c) => {
    cityOptions += `<option class="option" value="${c}">${c}</option>`;
  });
  document.getElementById("city").innerHTML = cityOptions;
}

async function orderForm() {
  if (validateFormData()) {
    let productIds = {};

    const cartJSON = JSON.parse(localStorage.getItem("cart"));
    cartJSON.forEach((cart) => {
      const id = cart.id;
      const quantity = cart.quantity;
      productIds[id] = quantity;
    });

    const object = {
      userName: document.getElementById("name").value,
      phoneNumber: document.getElementById("contactNumber").value,
      address: document.getElementById("address").value,
      city: document.getElementById("city").value,
      zipCode: document.getElementById("zipcode").value,
      notes: document.getElementById("orderNotes").value,
      productIds: productIds,
    };

    const token = localStorage.getItem("jwt");
    const response = await fetch("http://localhost:8080/api/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(object),
    });

    if (response.status === 403) {
      alert("Forbidden: You do not have permission to access this resource.");
    }
    if (response.status === 401) {
        window.location.href = 'customersignin.html';
    } else if (response.status == 200) {
      const responseData = await response.json();
      alert("Your order has been placed successfully");
      localStorage.removeItem("cart");
      window.location.href = 'home.html';
    } else {
      console.error("Error:", response.statusText);
    }
  }
}

function validateFormData() {
  var nameInput = document.getElementById("name");
  var contactNumberInput = document.getElementById("contactNumber");
  var addressInput = document.getElementById("address");
  var zipcodeInput = document.getElementById("zipcode");
  var city = document.getElementById("city").value;

  // Regular expressions for validation
  var nameRegex = /^[A-Za-z\s]{3,20}$/;
  var contactNumberRegex = /^0\d{10}$/;
  var zipcodeRegex = /^\d{6}$/;

  // Flag to track form validity
  var isValid = true;

  // Validate name
  if (!nameRegex.test(nameInput.value.trim())) {
    isValid = false;
    alert(
      "Name must be between 3 and 20 characters long and can only contain letters and spaces."
    );
    return;
  }

  // Validate contact number
  if (!contactNumberRegex.test(contactNumberInput.value.trim())) {
    isValid = false;
    alert("Contact number must start with 0 and be exactly 11 digits long.");
    return;
  }

  if (!city.trim()) {
    isValid = false;
    alert("Please select city.");
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
    return isValid;
    // alert("Form submitted successfully!");
    // You can also submit the form programmatically if needed
    // document.getElementById("myForm").submit();
  }
}
