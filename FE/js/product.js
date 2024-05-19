let productTypeId;
let page = 0;
let size = 10;
let totalPages;
let selectedCategoryId;

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
    selectCategory(categories.data[0].id);
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
      const productsContainer = document.getElementById('products-container');
      productsContainer.innerHTML = '';

      totalPages = products.data.totalPages;
      products.data.content.forEach(product => {
          const colDiv = document.createElement('div');
          colDiv.className = 'col-md-4 mb-4 cursor-pointer';
          colDiv.addEventListener('click', function() {
              // Redirect to product-view.html when clicking on the product
              window.location.href = `product-view.html?productId=${product.id}`;
          });

          const card = document.createElement('div');
          card.className = 'card';

          const img = document.createElement('img');
          img.src = product.imageUrl;
          img.className = 'card-img-top';
          img.alt = product.name;

          const cardBody = document.createElement('div');
          cardBody.className = 'card-body';

          const title = document.createElement('h2');
          title.className = 'card-title';
          title.textContent = product.name;

          const text = document.createElement('p');
          text.className = 'card-text';
          text.textContent = product.price;

          const button = document.createElement('a');
          button.className = 'btn btn-purple';
          button.textContent = 'Add to Cart';

          button.addEventListener('click', function(event) {
              event.stopPropagation(); // Prevents the click event from propagating to the colDiv
              addToCart(product);
          });


          cardBody.appendChild(title);
          cardBody.appendChild(text);
          cardBody.appendChild(button);
          card.appendChild(img);
          card.appendChild(cardBody);
          colDiv.appendChild(card);
          productsContainer.appendChild(colDiv);
      });

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


