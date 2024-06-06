let rating;
let modalSlectedVet;

getAllVets();

async function getAllVets() {
  let response = await fetch(
    `http://localhost:8080/api/user/role?role=ROLE_VET`,
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
    let data = ``;
    response.data.forEach(async (el) => {
        const starRating = createStarRating(el.rating); // Use localRate instead of rate
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
                <div class="col-md-8 border">
                    <div class="vet-details-box p-3 cursor-pointer" onclick=selectVet(${el.id})>
                        <h2 class="vet-name color-black">${el.fullName}</h2>
                        <span class="star">${starRating}</span>
                        <p class="rating-value"></p>
                        <p class="vet-location"><strong>Location:</strong> Defence, KHI</p>
                        <p class="vet-bio">${el.bio}</p>
                        <p class="vet-location"><strong>Consultation Days:</strong> ${el.availableDays}</p>
                        <p class="vet-location"><strong>Charges:</strong> Surgery (Rs 5000), Vaccination (Rs 500), Pet Grooming (Rs 1000), General Treatment (Rs 1000), General Checkup (Rs 500), Dentalcare (Rs 2000), Diagnostic Test (Rs 500 - Rs 5000)</p>
                    </div>
                    <button style="margin-left: 2%;" type="button" class="btn btn-success mb-2 view-feedback-btn" data-toggle="modal" data-target="#viewFeedbackModal" onclick="openViewFeedackModal(${el.id})">View Feedbacks</button>
                    <button style="margin-left: 2%;" type="button" class="btn btn-secondary mb-2 add-feedback-btn" data-toggle="modal" data-target="#writeFeedbackModal" onclick="openWriteFeedbackModal(${el.id})">Write Feedback</button>
                </div>
            </div>`;
    });
    

    document.getElementById("vets-data").innerHTML = data;
  }
}

function selectVet(id) {
  window.location.href = `form.html?id=${id}`;
}

function openWriteFeedbackModal(vetId) {
  modalSlectedVet = vetId;
  document.querySelectorAll(".add-feedback-btn").forEach((button) => {
    button.addEventListener("click", function () {
      const modalId = this.getAttribute("data-target");
      const modal = document.querySelector(modalId);
      if (modal) {
        $(modal).modal("show"); // Using jQuery to show the modal
      }
    });
  });
}

function openViewFeedackModal(vetId) {
  const modal = document.querySelector("#viewFeedbackModal");
  if (modal) {
    $(modal).modal("show");
    populateFeedbacks(vetId); // Using jQuery to show the modal
  }
}

function rate(rate) {
  rating = rate;
}

async function submitFeedback() {
  const feedBack = document.getElementById("feedback-comment").value;

  const category = {
    vet: {
      id: modalSlectedVet,
    },
    feedbackText: feedBack,
    ratingValue: rating,
  };

  const token = localStorage.getItem("jwt");
  let response = await fetch("http://localhost:8080/api/feedback", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(category),
  });

  response = await response.json();

  if (response.status === 403) {
    window.location.href = "customersignin.html";
    alert("Forbidden: You do not have permission to access this resource.");
  }
  if (response.status === 401) {
    window.location.href = "customersignin.html";
  } else if (response.status == 200) {
    alert(response.message);
    getAllVets();
  } else {
    alert(response.message);
  }

  closeWriteFeedbackModal();
}

function closeWriteFeedbackModal() {
  $("#writeFeedbackModal").modal("hide");
}

function closeViewFeedbackModal() {
  $("#viewFeedbackModal").modal("hide");
}

async function populateFeedbacks(vetId) {
  const feedbacksContainer = document.querySelector(
    "#viewFeedbackModal .modal-body"
  );
  feedbacksContainer.innerHTML = ""; // Clear previous feedbacks

  let response = await fetch(
    `http://localhost:8080/api/vet-feedback/${vetId}`,
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
    // Populate feedbacks in the modal
    response.data.forEach((feedback) => {
      const starRating = "★".repeat(feedback.ratingValue.toFixed(0)); // Create star rating from user's rating
      const feedbackHTML = `
            <div class="mb-3">
                <div><i class="fa fa-user" aria-hidden="true"></i>
                <span class="star">${starRating}</span></div>
                <p>${feedback.feedbackText}</p>
            </div>
        `;
      feedbacksContainer.innerHTML += feedbackHTML;
    });
  }
}

async function getVetAvgRating(vetId) {
    try {
        let response = await fetch(
            `http://localhost:8080/api/avg-rating/${vetId}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        response = await response.json();
        if(response.status === 200){
            response.data;
        }
    } catch (error) {
        console.error("Error fetching average rating:", error);
        return null;
    }
}

function createStarRating(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars += '<span class="star filled">★</span>';
      } else {
        stars += '<span class="star" style="color: grey !important">★</span>';
      }
    }
    return stars;
  }

