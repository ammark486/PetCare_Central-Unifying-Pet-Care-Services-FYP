let user;
let vetId;
let availableDays = [];
const days = [
  "SUNDAY",
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
];

getVet();

async function getVet() {
  vetId = getQueryParam("id");
  let response = await fetch(`http://localhost:8080/api/user/${vetId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  response = await response.json();

  if (response.status === 403) {
    window.location.href = "customersignin.html";
    alert("Forbidden: You do not have permission to access this resource.");
  }
  if (response.status === 401) {
    window.location.href = "customersignin.html";
  } else if (response.status == 200) {
    user = response.data;
    availableDays = user.availableDays.split(",");
  }
}

function getQueryParam(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

function getSelectedDate() {
  const dateInput = document.getElementById("date").value;
  const checkDay = new Date(dateInput);
  var currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  if (checkDay < currentDate) {
    document.getElementById("date").value = "";
    alert("Please choose a date that is today or a future date.");
    return false;
  } else if (availableDays.includes(days[checkDay.getDay()])) {
    getAvailableSlotes(dateInput);
  } else {
    document.getElementById("date").value = "";
    alert("Select only " + availableDays);
  }
}

async function getAvailableSlotes(date) {
  let response = await fetch(
    `http://localhost:8080/api/availableslots?date=${date}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  response = await response.json();

  if (response.status === 403) {
    window.location.href = "customersignin.html";
    alert("Forbidden: You do not have permission to access this resource.");
  }
  if (response.status === 401) {
    window.location.href = "customersignin.html";
  } else if (response.status == 200) {
    var data = `<option value="select" selected>Select</option>`;
    response.data.forEach((el) => {
      data += `<option value="${el.id}" >${el.name}</option>`;
    });

    document.getElementById("slot").innerHTML = data;
  }
}

async function bookAppointment() {
  // Perform validation checks
  var name = document.getElementById("name").value;
  var contactNumber = document.getElementById("contactNumber").value;
  var service = document.getElementById("service").value;
  var species = document.getElementById("species").value;
  var date = document.getElementById("date").value;
  var slot = document.getElementById("slot").value;
  var additionalNote = document.getElementById("additionalNote").value;

  const checkDay = new Date(date);
  console.log(checkDay.getDay());

  // Validation for the name
  var nameRegex = /^[a-zA-Z ]{1,12}$/; // Regex for alphabets only, up to 12 characters
  if (!nameRegex.test(name)) {
    alert(
      "Please enter a valid name with alphabets only, up to 12 characters."
    );
    return false;
  }

  // Validate the contact number
  var contactRegex = /^\+92[0-9]{10}$/; // Regex for a valid Pakistani phone number starting with +92
  if (!contactRegex.test(contactNumber)) {
    alert("Please enter a valid Pakistani contact number starting with +92.");
    return false;
  }

  if (service === "Select") {
    alert("Please select a service.");
    return false;
  }

  if (species === "Select") {
    alert("Please select a species.");
    return false;
  }

  if (date === "") {
    alert("Please select a date.");
    return false;
  }

  if (slot === "Select") {
    alert("Please select a slot.");
    return false;
  }

  const appointment = {
    userName: name,
    phoneNumber: contactNumber,
    service: service,
    specie: species,
    date: date,
    additionalNotes: additionalNote,
    vet: {
        id: vetId
    },
    availableSlots: {
        id: slot
    }
  }

  const token = localStorage.getItem("jwt");
  let response = await fetch(
    `http://localhost:8080/api/appointment`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(appointment)
    }
  );

  response = await response.json();

  if (response.status === 403) {
    window.location.href = "customersignin.html";
    alert("Forbidden: You do not have permission to access this resource.");
  }
  if (response.status === 401) {
    window.location.href = "customersignin.html";
  } else if (response.status == 200) {
    alert("Appointment form has been submitted successfully");
    window.location.href = "home.html";
  }
}
