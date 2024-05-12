function fetchToken() {
    const storedJwt = localStorage.getItem('jwt');
    
    if(!storedJwt)
    {
        window.location.href = 'customersignin.html';
    }
}

fetchToken();