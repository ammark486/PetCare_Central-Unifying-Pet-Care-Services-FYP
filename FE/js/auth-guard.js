function checkPermissions() {
    const storedJwt = localStorage.getItem('jwt');
    var userDetails = JSON.parse(localStorage.getItem("userDetails"));
    
    if(!storedJwt)
    {  
        window.location.href = 'customersignin.html';
    }else if(storedJwt && !userDetails.permissions.includes(permission_label)){
        window.location.href = 'home.html';
    }
}

checkPermissions();