let permission_label = 'ORDER'
let page = 0;
let size = 10;
let totalPages;
let orderStatus = false;

getMasterOrders();


async function getMasterOrders() {
    orderStatus = document.getElementById('order-status').value;
    const token = localStorage.getItem("jwt");
    let response = await fetch(`http://localhost:8080/api/master-order?page=${page}&size=${size}&status=${orderStatus}`, {
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
      const masterOrders = response;
      var data = ``;
      if(masterOrders.data.content.length > 0){
        totalPages = masterOrders.data.totalPages;
        masterOrders.data.content.forEach(el => {
          data+= `
          <tr>
          <td><a href="order_products.html?masterId=${el.id}">${el.id}</a></td>
          <td>${el.userName}</td>
          <td>${el.phoneNumber}</td>
          <td>${el.address}</td>
          <td>${el.city}</td>
          <td>${el.notes}</td>
          <td>${el.zipCode}</td>
          <td>${el.totalAmount}</td>
          <td>${el.orderDate}</td>
          <td>
          <button onClick=completeOrder(${el.id}) style="font-size: 10px" type="button" class="btn ${el.status ? 'btn-success' : 'btn-danger'}">
            ${el.status ? 'Completed' : 'In Progress'}
          </button>
        </td>        
          </tr>`  
        });
      console.log(response);
      document.getElementById('masterOrderTable').innerHTML = data;
      document.getElementById('pagination-row').innerHTML = '';
      var paginationDom = `<nav aria-label="Page navigation example">
      <ul class="pagination pagination-alignment">
        <li class="page-item ${page === 0 ? 'disabled' : ''}">
          <a class="page-link" href="#" tabindex="-1" onClick=previous()>Previous</a>
        </li>
        <li class="page-item ${page === totalPages -1 ? 'disabled' : ''}">
          <a class="page-link" href="#" onClick=next()>Next</a>
        </li>
      </ul>
    </nav>`

    document.getElementById('pagination-row').innerHTML = paginationDom;
    }
  } else {
    document.getElementById('masterOrderTable').innerHTML = '';
    document.getElementById('pagination-row').innerHTML = '';
    alert(response.message);
   }
}

async function completeOrder(id){
    if(orderStatus == "false"){
        const token = localStorage.getItem("jwt");
        let response = await fetch(`http://localhost:8080/api/order/${id}`, {
          method: "PUT",
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
            getMasterOrders();
        } else {
         alert(response.message);
        }
    }
}

function next(){
    page+=1;
    this.getMasterOrders();
  }
  
  function previous(){
    page-=1;
    this.getMasterOrders();
  }