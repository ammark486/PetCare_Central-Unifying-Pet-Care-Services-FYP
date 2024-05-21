let productTypeId;
let page = 0;
let size = 10;
let totalPages;
let selectedCategoryId;
let allProducts;

function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

async function getProductTypeCategories(){
    productTypeId = getQueryParam('productTypeId');
    getProductTypeById();
    const url = new URL("http://localhost:8080/api/category/product-type/" + productTypeId);

    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    const categories = await response.json();
    var data = '';
    categories.data.forEach(category => {
        data += `<li><a class="dropdown-item" href="#" onclick="selectCategory(${category.id})">${category.name}</a></li>`
    });
  
    if(JSON.parse(localStorage.getItem("category_id"))){
      selectCategory(JSON.parse(localStorage.getItem("category_id")));
      localStorage.removeItem("category_id");
    }else{
      selectCategory(categories.data[0].id);
    }


    document.getElementById("categories-dropdown").innerHTML = data;
    console.log(categories);
}

getProductTypeCategories();

async function selectCategory(categoryId){
  selectedCategoryId = categoryId;
  const url = new URL(`http://localhost:8080/api/product/categoryId?id=${categoryId}&isActive=true&page=${page}&size=${size}`);

  const response = await fetch(url, {
      method: "GET",
      headers: {
          "Content-Type": "application/json",
      },
  });

  const products = await response.json();

  if(products.data.content.length > 0){

      totalPages = products.data.totalPages;
      allProducts = products.data.content;
      var data = ``;
      products.data.content.forEach(product => {
        data+= `<div class="card cursor-pointer mt-4" style="width: 18rem; margin-left: 4%;">
        <hr style="color: #0040ff;
        height: 2.5px;;">

        <img onclick="routeToProductView(${product.id})" style="min-height: 210px !important;
        max-height: 210px !important;" class="card-img-top" src="${product.imageUrl}" alt="Card image cap">
        <hr style="color: #0040ff;
        height: 2.5px;">

        <div class="card-body">
          <h5 class="card-title">${product.price} Rs</h5>
          <p class="card-text">${product.description}</p>
          <button class="btn btn-primary" style="background-color: #fc5185" onclick="addToCart(${product.id})">Add to Cart</button>
        </div>
      </div>`
      });

      document.getElementById('products-container').innerHTML = data;

      // Clear previous pagination
      document.getElementById('pagination-row').innerHTML = '';
      // Add pagination
      var paginationDom = `<nav aria-label="Page navigation example">
        <ul class="pagination pagination-alignment">
          <li class="page-item ${page === 0 ? 'disabled' : ''}">
            <a class="page-link" href="#" tabindex="-1" onClick=previous()>Previous</a>
          </li>
          <li class="page-item ${page === totalPages -1 ? 'disabled' : ''}">
            <a class="page-link" href="#" onClick=next()>Next</a>
          </li>
        </ul>
      </nav>`;

      document.getElementById('pagination-row').innerHTML = paginationDom;
  } else {
      alert('No products found');
  }
}


async function getProductTypeById(){
    let response = await fetch(`http://localhost:8080/api/product-type/${productTypeId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  response = await response.json();
  var data = ``;
  if (response.type.toLowerCase() === "food") {
    data += `<h2 style="color: white; margin-top: 20px;">Elevate your pet's happiness with Petcare Central's quality food specially designed to keep them healthy and full of life.</h2>`;
  } else if (response.type.toLowerCase() === "accessories") {
    data += `<h2 style="color: white; margin-top: 20px;">Elevate your pet's style and comfort with our curated collection of accessories at Petcare Central.</h2>`;
  } else if (response.type.toLowerCase() === "grooming") {
    data += `<h2 style="color: white; margin-top: 20px;">Make grooming fun with our special tools at Petcare Central. Keep your pet clean and happy with our gentle products!</h2>`;
  } else {
    data += `<h2 style="color: white; margin-top: 20px;">Adopt a Pet Now</h2>`;
  }
  
  document.getElementById('type-text').innerHTML = data;
}


function next(){
    page+=1;
    selectCategory(selectedCategoryId);
}

function previous(){
    page-=1;
    selectCategory(selectedCategoryId);
}

function routeToProductView(productId){
  localStorage.setItem("category_id", JSON.stringify(selectedCategoryId));
  window.location.href = `product-view.html?productId=${productId}`;
}

function getProductDetails(productId) {
  return allProducts.find(p => p.id === productId);
}


