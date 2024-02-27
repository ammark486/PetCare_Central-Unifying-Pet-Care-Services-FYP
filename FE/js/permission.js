// -------------------------------PERMISSION-----------------------------------//
  // Add this to your existing JavaScript

  function handleRoleChange() {
    var selectedRole = document.getElementById("role-dropdown").value;
    console.log("Selected Role: " + selectedRole);
    // You can add more logic based on the selected role if needed
  }
  

  function handleRoleChange() {
    var selectedRole = document.getElementById("role-dropdown").value;
    var adminDetails = document.getElementById("admin-details");
    var vetDetails = document.getElementById("vet-details");
    var userDetails = document.getElementById("user-details");
  
    // Hide all role details
    adminDetails.style.display = "none";
    vetDetails.style.display = "none";
    userDetails.style.display = "none";
  
    // Show the selected role details
    if (selectedRole === "admin") {
      adminDetails.style.display = "block";
    } else if (selectedRole === "vet") {
      vetDetails.style.display = "block";
    } else if (selectedRole === "user") {
      userDetails.style.display = "block";
    }
  }
  



