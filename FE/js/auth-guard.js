function checkPermissions() {
    const storedJwt = localStorage.getItem('jwt');
    var userDetails = JSON.parse(localStorage.getItem("userDetails"));
    
    if(!storedJwt || storedJwt && !userDetails.permissions.includes(permission_label))
    {   
        alert("Access Denied");
        window.location.href = 'home.html';
    }
}

checkPermissions();