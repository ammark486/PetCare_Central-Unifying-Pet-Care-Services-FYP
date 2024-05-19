getAllVets();

async function getAllVets(){
    let response = await fetch(`http://localhost:8080/api/user/role?role=ROLE_VET`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
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
        let data = ``;
        response.data.forEach(el => {
            data += `
            <div class="row mb-4">
            <div class="col-md-4">
                <div class="vet-profile-box">
                    <div class="d-flex align-items-center justify-content-center">
                        <div class="vet-profile-pic-wrapper border rounded">
                            <img src="./images/vet1-profile-pic.jpg" class="img-fluid vet-profile-pic" alt="Vet 1 Profile Picture">
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-8 cursor-pointer" onclick=selectVet(${el.id})>
                <div class="vet-details-box border p-3">
                    <h2 class="vet-name color-black">${el.fullName}</h2>
                    <p class="vet-location"><strong>Location:</strong> Defence, KHI</p>
                    <p class="vet-bio">${el.bio}</p>
                </div>
            </div>
        </div>
            `
        });

        document.getElementById("vets-data").innerHTML = data;
    }
  }

  function selectVet(id){
    window.location.href = `form.html?id=${id}`;
  }