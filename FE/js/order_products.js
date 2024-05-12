let masterId;

getOrderProductByMasterOrderId();

function getQueryParam(masterId) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(masterId);
}

async function getOrderProductByMasterOrderId(){
    masterId = getQueryParam('masterId');
    const token = localStorage.getItem("jwt");
    let response = await fetch(`http://localhost:8080/api/order-products/${masterId}`, {
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
      const orderProducts = response;
      var data = ``;
      if(orderProducts.data.length > 0){
        totalPages = orderProducts.data.totalPages;
        orderProducts.data.forEach(el => {
          data+= `
          <tr>
          <td>${el.name}</td>
          <td><img class="product-image-size" src="${el.imageUrl}"></td>
          <td>${el.price}</td>
          <td>${el.count}</td>
          <td>${el.category}</td>
          <td>${el.productType}</td>
          </tr>`  
        });
      console.log(response);
      document.getElementById('OrderProductTable').innerHTML = data;
    }
  } else {
    document.getElementById('OrderProductTable').innerHTML = '';
    alert(response.message);
   }
}