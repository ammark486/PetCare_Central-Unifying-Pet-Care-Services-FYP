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
      
      console.log(result);
      localStorage.setItem('jwt', result.jwt);
      if(result.jwt){
        window.location.href = 'home.html';
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
  if(password == confirmPassword){
    try {

      const object = {
        userName: email,
        password : password
      }
  
    const response = await fetch("http://localhost:8080/api/sign-up", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(object),
    });
  
    const result = await response.json();
    if(result.status == 200){
      alert("signup successfully");
      window.location.href = 'customersignin.html?';
    }
  } catch (error) {
    alert(error);
  }
  }else {
    alert("password not matched");
  }

}