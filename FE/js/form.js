
document.addEventListener('DOMContentLoaded', function() {
    var form = document.querySelector('form');

    form.addEventListener('submit', function(event) {
        // Prevent the default form submit action
        event.preventDefault();

        // Perform validation checks
        var name = document.getElementById('name').value;
        var contactNumber = document.getElementById('contactNumber').value;
        var service = document.getElementById('service').value;
        var species = document.getElementById('species').value;
        var date = document.getElementById('date').value;

        // Validation for the name
        var nameRegex = /^[a-zA-Z]{1,12}$/; // Regex for alphabets only, up to 12 characters
        if (!nameRegex.test(name)) {
            alert('Please enter a valid name with alphabets only, up to 12 characters.');
            return false;
        }

        // Validate the contact number
        var contactRegex = /^\+92[0-9]{10}$/; // Regex for a valid Pakistani phone number starting with +92
        if (!contactRegex.test(contactNumber)) {
            alert('Please enter a valid Pakistani contact number starting with +92.');
            return false;
        }

        if (service === 'Select') {
            alert('Please select a service.');
            return false;
        }

        if (species === 'Select') {
            alert('Please select a species.');
            return false;
        }

        // Validation for the date
        var selectedDate = new Date(date);
        var currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0); // Set current date to midnight for accurate comparison

        if (selectedDate < currentDate) {
            alert('Please choose a date that is today or a future date.');
            return false;
        }

        // If all validations pass, submit the form
        form.submit();
    });
});

function updateTimeSlots() {
    var selectedVeterinarian = document.getElementById("vets").value;
    var timeSlotsContainer = document.getElementById("timeSlotsContainer");
    var timeSlotsSelect = document.getElementById("timeSlots");

    // Clear previous options
    timeSlotsSelect.innerHTML = '<option selected>Select Veterinarian first</option>';

    if (selectedVeterinarian !== "Select") {
        // Show time slots container
        timeSlotsContainer.style.display = "block";

        // Add time slots based on the selected veterinarian
        if (selectedVeterinarian === "vet1") {
            // Add time slots for vet1
            addTimeSlots(["9:00 AM", "11:00 AM", "2:00 PM"]);
        } else if (selectedVeterinarian === "vet2") {
            // Add time slots for vet2
            addTimeSlots(["10:00 AM", "1:00 PM", "3:00 PM"]);
        }
        // Add more conditions for other veterinarians if needed
    } else {
        // Hide time slots container if "Select" is chosen
        timeSlotsContainer.style.display = "none";
    }
}

function addTimeSlots(slots) {
    var timeSlotsSelect = document.getElementById("timeSlots");
    for (var i = 0; i < slots.length; i++) {
        var option = document.createElement("option");
        option.value = slots[i];
        option.text = slots[i];
        timeSlotsSelect.add(option);
    }
}


