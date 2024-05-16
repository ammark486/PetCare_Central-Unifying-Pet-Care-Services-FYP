const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});



async function login(){
  event.preventDefault();
  let email = document.getElementById('email').value;
  let password = document.getElementById('password').value;
 
    try {

        const object = {
            userName: email,
            password : password
        }

      const response = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(object), //to pass the object
      });
  
     
      const result = await response.json();
      localStorage.setItem('jwt', result.jwt);
      localStorage.setItem('userDetails', JSON.stringify(result.userDetailsDto));
      if(result.jwt){
       if(result.userDetailsDto.role == 'ROLE_ADMIN'){
        window.location.href = 'admindashboard.html';
       }else if(result.userDetailsDto.role == 'ROLE_VET'){

       }else{
        window.location.href = 'home.html';
       }
      }
      console.log("Success:", result);
    } catch (error) {
      alert('Wrong email or password.');
      console.error("Error:", error);
    }

}

async function signUp() {
  event.preventDefault(); 
  let email = document.getElementById('signup-email').value;
  let password = document.getElementById('signup-password').value;
  let confirmPassword = document.getElementById('confirm-password').value;

  // Regular expression for email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Validate if email, password, and confirm password are filled
  if (!email || !password || !confirmPassword) {
    alert("Please fill in all fields.");
    return;
  }

  // Validate email format
  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  // Validate if password and confirm password match
  if (password !== confirmPassword) {
    alert("Password and confirm password do not match.");
    return;
  }
    const object = {
      userName: email,
      password: password
    };

    let response = await fetch("http://localhost:8080/api/sign-up", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(object),
    });

    response = await response.json();
    if (response.status === 200) {
      alert("Signup successful.");
      window.location.href = 'customersignin.html?';
    }else{
      alert(response.message);
    }
}

