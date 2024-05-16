let productId;

getProductById();

function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

async function getProductById(){
    productId = getQueryParam("productId");
    let response = await fetch(`http://localhost:8080/api/product/${productId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  response = await response.json();
  var name = `<div class="label-text">Name</div>
  <div class="mt-3">${response.data.name}</div>`;
  document.getElementById('product-name').innerHTML = name;

  var price = `<div class="label-text">Price</div>
  <div class="mt-3">${response.data.price}</div>`;
  document.getElementById('product-price').innerHTML = price;

  if(response.data.productType=='animal'){
    var age = `<div class="label-text">Age</div>
    <div class="mt-3">${response.data.age}</div>`;
    document.getElementById('product-age').innerHTML = age;

    var color = `<div class="label-text">Color</div>
    <div class="mt-3">${response.data.color}</div>`;
    document.getElementById('product-color').innerHTML = color;
  }

  var description = `<div class="label-text">Description</div>
  <div class="mt-3">${response.data.description}</div>`;
  document.getElementById('product-description').innerHTML = description;

  var image = `<div class="label-text">Image</div>
  <div class="mt-3"><img src="${response.data.imageUrl}"></div>`

  document.getElementById('product-image').innerHTML = image;

}