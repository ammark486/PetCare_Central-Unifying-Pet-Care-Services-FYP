// -------------------------------PERMISSION-----------------------------------//
  // Add this to your existing JavaScript

  // function handleRoleChange() {
  //   var selectedRole = document.getElementById("role-dropdown").value;
  //   console.log("Selected Role: " + selectedRole);
  //   // You can add more logic based on the selected role if needed
  // }
  

  // function handleRoleChange() {
  //   var selectedRole = document.getElementById("role-dropdown").value;
  //   var adminDetails = document.getElementById("admin-details");
  //   var vetDetails = document.getElementById("vet-details");
  //   var userDetails = document.getElementById("user-details");
  
  //   // Hide all role details
  //   adminDetails.style.display = "none";
  //   vetDetails.style.display = "none";
  //   userDetails.style.display = "none";
  
  //   // Show the selected role details
  //   if (selectedRole === "admin") {
  //     adminDetails.style.display = "block";
  //   } else if (selectedRole === "vet") {
  //     vetDetails.style.display = "block";
  //   } else if (selectedRole === "user") {
  //     userDetails.style.display = "block";
  //   }
  // }

  let name = 'Admin'
  let roles = [];
  let rolePermissions = [];
  let selectedRoleId;
  getAllRoles();

  async function getAllRoles(){
    const token = localStorage.getItem("jwt");
    let response = await fetch(`http://localhost:8080/api/role`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    response = await response.json();

    if (response.status === 403) {
      window.location.href = 'customersignin.html';
      alert("Forbidden: You do not have permission to access this resource.");
    }
    if (response.status === 401) {
        window.location.href = 'customersignin.html';
    } else if (response.status == 200) {
      roles = response.data;
      var data = ``;
      roles.forEach(role => {
        if(role.name == 'ROLE_ADMIN'){
          data+=`<option value="${role.id}" selected>${role.name}</option>`
        }else{
          data+=`<option value="${role.id}">${role.name}</option>`
        }
      });
      document.getElementById("selected-role").innerHTML = data;
      roleName();
    }
  }

  function roleName(){

    selectedRoleId = document.getElementById("selected-role").value;
    var selectedRole = roles.find(role => role.id === Number(selectedRoleId));

    var data = `<h2>${selectedRole.name} Role Details</h2>`
    document.getElementById('role-name').innerHTML = data;
    fetchPermissionsByRole(selectedRoleId)
  }

  async function fetchPermissionsByRole(selectedRoleId){
    const token = localStorage.getItem("jwt");
    let response = await fetch(`http://localhost:8080/api/permission/role/${selectedRoleId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    response = await response.json();

    if (response.status === 403) {
      window.location.href = 'customersignin.html';
      alert("Forbidden: You do not have permission to access this resource.");
    }
    if (response.status === 401) {
        window.location.href = 'customersignin.html';
    } else if (response.status == 200) {
      rolePermissions = response.data;
      var data = ``;
      rolePermissions.forEach(el => {
        data+=`<div>
        <input type="checkbox" id="${el.permission.label}" name="" ${el.active ? 'checked' : ''}>
        <label for="viewmanagement">${el.permission.label}</label>
      </div>`
      });

      document.getElementById("role-permission").innerHTML = data;
    }
  }

  async function savePermissions(){

    var arr = [];

    rolePermissions.forEach(el => {
        arr.push({
            roleId: Number(selectedRoleId),
            permissionId: Number(el.permission.id),
            active: document.getElementById(`${el.permission.label}`).checked
        });
    });
    
    console.log(arr);
    


    const token = localStorage.getItem("jwt");
    let response = await fetch(`http://localhost:8080/api/permission/role`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(arr),
    });
    response = await response.json();

    if (response.status === 403) {
      window.location.href = 'customersignin.html';
      alert("Forbidden: You do not have permission to access this resource.");
    }
    if (response.status === 401) {
        window.location.href = 'customersignin.html';
    } else if (response.status == 200) {
      window.location.href = "permission.html";
    }
  }
  



