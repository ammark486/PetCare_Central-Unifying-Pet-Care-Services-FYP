let appointmentType;
getAppointments("TODAY");
async function getAppointments(type) {
  appointmentType = type;
  if(appointmentType == 'TODAY'){
    var header = `<h2>Today Appointment</h2>`;
    document.getElementById('appointment-header').innerHTML = header;

  }else if(appointmentType == 'UPCOMING'){
    var header = `<h2>Upcoming Appointment</h2>`;
    document.getElementById('appointment-header').innerHTML = header;
  }else if(appointmentType == 'HISTORY'){
    var header = `<h2>Appointment History</h2>`;
    document.getElementById('appointment-header').innerHTML = header;
  }

  const token = localStorage.getItem("jwt");
  let response = await fetch(
    `http://localhost:8080/api/appointment?type=${type}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
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
    var data = ``;
    response.data.forEach((el) => {
      data += `<tr>
          <td>${el.userName}</td>
          <td>${el.email}</td>
          <td>${el.specie}</td>
          <td>${el.service}</td>
          <td>${el.date}</td>
          <td>${el.availableSlots.name}</td>
          <td>
            <button onClick="completeAppoinment(${el.id}, '${
        el.status ? "Completed" : "In Progress"
      }')" style="font-size: 10px" type="button" class="btn ${
        el.status ? "btn-success" : "btn-danger"
      }">
              ${el.status ? "Completed" : "In Progress"}
            </button>
          </td>
        </tr>`;
    });

    document.getElementById("appointment-table").innerHTML = data;
  }else {
    document.getElementById("appointment-table").innerHTML = ''
    alert(response.message);
}
}

async function completeAppoinment(id, status) {
  if (status == "In Progress") {
    const token = localStorage.getItem("jwt");
    let response = await fetch(`http://localhost:8080/api/appointment/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
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
      getAppointments(appointmentType);
    }
  }
}

function setActiveLink(clickedId) {
    // Get all elements with the class 'nav-link'
    const links = document.querySelectorAll('.nav-link');
    
    // Loop through all links and remove the 'active' class
    links.forEach(link => {
      link.classList.remove('active');
    });
  
    // Add the 'active' class to the clicked link
    document.getElementById(clickedId).classList.add('active');
  }
