let permission_label = 'MANAGE_PRODUCT'
let page = 0;
let size = 10;
let totalPages;
let selectedCategoryId;
let selectedProductTypeId;


showProductTypes();

async function showProductTypes(){
  const token = localStorage.getItem("jwt");
  const response = await fetch("http://localhost:8080/api/product-type-all?isActive=true", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 403) {
    window.location.href = 'customersignin.html';
    alert("Forbidden: You do not have permission to access this resource.");
  }
  if (response.status === 401) {
      window.location.href = 'customersignin.html';
  } else if (response.status == 200) {
    allproductTypes = await response.json();
    var data = `<option value="" selected>Select Product Type</option>`;
    allproductTypes.data.forEach(el => {
      data+= `<option value="${el.id}">${el.name}</option>`  
    });
    document.getElementById('productType').innerHTML = data;
  } else {
    console.error("Error:", response.statusText);
  }
}

async function getCategories() {
  selectedProductTypeId = document.getElementById('productType').value;
  const token = localStorage.getItem("jwt");
  let response = await fetch(`http://localhost:8080/api/category/product-type/${selectedProductTypeId}`, {
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
    const categories = response;
    var data = `<option value="" selected>select category</option>`;
    categories.data.forEach(el => {
      data+= `<option value="${el.id}">${el.name}</option>`  
    });
    document.getElementById('category-by-product').innerHTML = data;
  } else {
   alert(response.message);
  }
  
}

async function getProductsByCategory(){
  selectedCategoryId = document.getElementById('category-by-product').value;
  const token = localStorage.getItem("jwt");
  let response = await fetch(`http://localhost:8080/api/product/categoryId?id=${selectedCategoryId}&isActive=true&page=${page}&size=${size}`, {
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
    const products = response;
    var data = ``;
    if(products.data.content.length > 0){
      totalPages = products.data.totalPages;
      products.data.content.forEach(el => {
        data+= `
        <tr>
        <td>${el.name}</td>
        <td>${el.price}</td>
        <td>${el.description}</td>
        <td><img class="product-image-size" src="${el.imageUrl}"></td>
        <td><button type="button" class="btn btn-secondary mr-2" onClick=editProductData(${el.id})>Edit</button>
        <button type="button" class="btn btn-danger" onClick=deleteProductData(${el.id})>Delete</button></td>
        </tr>`  
      });
      
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

    }else {
      alert("no products found");
    }
    document.getElementById('productTableBody').innerHTML = data;
  } else {
   alert(response.message);
  }
}

function routeToAddScreen(){
  window.location.href = 'management.html';
}

function editProductData(id){
  window.location.href = 'management.html?id=' + id;
}

async function deleteProductData(id){
  const token = localStorage.getItem("jwt");
  let response = await fetch(`http://localhost:8080/api/product/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (response.status === 403) {
    window.location.href = 'customersignin.html';
    alert("Forbidden: You do not have permission to access this resource.");
  }
  if (response.status === 401) {
      window.location.href = 'customersignin.html';
  } else if (response.status == 200) {
    this.getProductsByCategory();
    alert("product deleted successfully");
  }
}

function next(){
  page+=1;
  this.getProductsByCategory();
}

function previous(){
  page-=1;
  this.getProductsByCategory();
}



