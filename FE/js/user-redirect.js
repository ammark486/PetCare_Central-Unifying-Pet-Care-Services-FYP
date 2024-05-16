loginStatus();

function loginStatus(){
    const token = localStorage.getItem("jwt");
    var userDetails = JSON.parse(localStorage.getItem("userDetails"));
    var data = ``;
    var userRedirection = ``;
    if(!token){
        data += `<button type="button" class="btn btn-light" onClick=logInOrOut()>Login</button>`
    }else{
        data += `<button type="button" class="btn btn-light" onClick=logInOrOut()>Logout</button>`
    }

    if(userDetails && userDetails.role == 'ROLE_ADMIN'){
        userRedirection+= `<button type="button" class="btn btn-light" onClick=adminPanelRoute()>Admin Panel</button>`
    }

    document.getElementById('login-status').innerHTML = data;
    document.getElementById('redirect-admin-panel').innerHTML = userRedirection;
}

function adminPanelRoute(){
    window.location.href = 'admindashboard.html'
}

function logInOrOut(){
    localStorage.removeItem("jwt");
    localStorage.removeItem("userDetails");
    localStorage.removeItem("cart");
    window.location.href = 'customersignin.html';
}

function redirectToCustomerPanel(){
    window.location.href = 'home.html';
}