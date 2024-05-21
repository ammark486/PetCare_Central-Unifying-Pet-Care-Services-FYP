let permission_label = 'MANAGE_PRODUCT'
let allproductTypes;
let product;
let productId;
let imageUrl;
showProductTypes();


function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function checkProductUpdate() {
  productId = getParameterByName("id");
  if (productId) {
    getProductById(productId);
  }
}

async function getProductById(productId) {
  const token = localStorage.getItem("jwt");
  let response = await fetch(`http://localhost:8080/api/product/${productId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  response = await response.json();

  if (response.status === 403) {
    window.location.href = "customersignin.html";
    alert("Forbidden: You do not have permission to access this resource.");
  }
  if (response.status === 401) {
    window.location.href = "customersignin.html";
  } else if (response.status == 200) {
    product = response.data;
    imageUrl = product.imageUrl;
    updateProductTypeDD(product.productTypeId, product.categoryId);
    updateProductForm();
  } else {
    alert(response.message);
  }
}

function updateProductForm(){
  document.getElementById('productName').value = product.name;
  document.getElementById('productPrice').value = product.price;
  document.getElementById('age').value = product.age;
  document.getElementById('color').value = product.color;
  document.getElementById('productDescription').value = product.description;
  document.getElementById('productIsActive').value = product.isActive;
}

function updateProductTypeDD(productTypeId, categoryId){
  var selectElement = document.getElementById("all-products");
  for (var i = 0; i < selectElement.options.length; i++) {
    if (Number(selectElement.options[i].value) === productTypeId) {
      selectElement.options[i].selected = true;
      break;
    }
  }
  getCategories();
}

function updateCategoryDD(){
  var selectElement = document.getElementById("category-by-product");
  for (var i = 0; i < selectElement.options.length; i++) {
    if (Number(selectElement.options[i].value) === product.categoryId) {
      selectElement.options[i].selected = true;
      break;
    }
  }
}

function createFormField(labelText, fieldName, fieldType) {
  const fieldDiv = document.createElement("div");
  fieldDiv.className = "form-group";

  const label = document.createElement("label");
  label.htmlFor = fieldName;
  label.textContent = labelText;
  fieldDiv.appendChild(label);

  const input = document.createElement("input");
  input.type = fieldType;
  input.className = "form-control";
  input.id = fieldName;
  input.name = fieldName;
  fieldDiv.appendChild(input);

  return fieldDiv;
}

async function addCategory() {
  const categoryName = document.getElementById("category-name").value;
  const productTypeId = document.getElementById("all-products").value;

  const category = {
    name: categoryName,
    productType: {
      id: productTypeId,
    },
  };

  const token = localStorage.getItem("jwt");
  let response = await fetch("http://localhost:8080/api/category", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(category),
  });

  response = await response.json();

  if (response.status === 403) {
    window.location.href = "customersignin.html";
    alert("Forbidden: You do not have permission to access this resource.");
  }
  if (response.status === 401) {
    window.location.href = "customersignin.html";
  } else if (response.status == 200) {
    alert(response.message);
    getCategories();
  } else {
    alert(response.message);
  }
}

async function getCategories() {
  const productTypeId = document.getElementById("all-products").value;
  const token = localStorage.getItem("jwt");
  let response = await fetch(
    `http://localhost:8080/api/category/product-type/${productTypeId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  response = await response.json();

  if (response.status === 403) {
    window.location.href = "customersignin.html";
    alert("Forbidden: You do not have permission to access this resource.");
  }
  if (response.status === 401) {
    window.location.href = "customersignin.html";
  } else if (response.status == 200) {
    const categories = response;
    var data = `<option value="" selected>select category</option>`;
    categories.data.forEach((el) => {
      data += `<option value="${el.id}">${el.name}</option>`;
    });
    document.getElementById("category-by-product").innerHTML = data;
    if(productId){
      updateCategoryDD();
    }
  } else {
    alert(response.message);
  }
}

async function showProductTypes() {
  const token = localStorage.getItem("jwt");
  const response = await fetch(
    "http://localhost:8080/api/product-type-all?isActive=true",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (response.status === 403) {
    window.location.href = "customersignin.html";
    alert("Forbidden: You do not have permission to access this resource.");
  }
  if (response.status === 401) {
    window.location.href = "customersignin.html";
  } else if (response.status == 200) {
    allproductTypes = await response.json();
    var data = `<option value="" selected>Select Product Type</option>`;
    allproductTypes.data.forEach((el) => {
      data += `<option value="${el.id}">${el.name}</option>`;
    });
    document.getElementById("all-products").innerHTML = data;
    checkProductUpdate();
  } else {
    console.error("Error:", response.statusText);
  }
}

async function addProductType() {
  const productTypeName = document.getElementById("productTypeName").value;
  const productType = document.getElementById("productType").value;
  console.log(productType);
  console.log(productTypeName);

  const object = {
    name: productTypeName,
    type: productType,
  };

  const token = localStorage.getItem("jwt");
  const response = await fetch("http://localhost:8080/api/product-type", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(object),
  });

  if (response.status === 403) {
    window.location.href = "customersignin.html";
    alert("Forbidden: You do not have permission to access this resource.");
  }
  if (response.status === 401) {
    window.location.href = "customersignin.html";
  } else if (response.status == 200) {
    const responseData = await response.json();
    showProductTypes();
    alert("Product type added succesfully");
  } else {
    console.error("Error:", response.statusText);
  }
}

async function addProduct() {
  const productDto = {
    id: productId,
    name: document.getElementById("productName").value,
    price: document.getElementById("productPrice").value,
    description: document.getElementById("productDescription").value,
    age: document.getElementById("age").value,
    color: document.getElementById("color").value,
    imageUrl: imageUrl,
    isActive: document.getElementById("productIsActive").value,
    category: {
      id: Number(document.getElementById("category-by-product").value),
    },
  };

  const token = localStorage.getItem("jwt");
  let response = await fetch("http://localhost:8080/api/product", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(productDto),
  });

  response = await response.json();

  if (response.status === 403) {
    window.location.href = "customersignin.html";
    alert("Forbidden: You do not have permission to access this resource.");
  }
  if (response.status === 401) {
    window.location.href = "customersignin.html";
  } else if (response.status == 200) {
    showProductTypes();
    alert(response.message);
    clearProductForm();
  } else {
    console.error("Error:", response.message);
  }
}

function clearProductForm(){

  if(productId){
    window.location.href = 'management.html?id=' + productId;
  }else{
    window.location.href = "management.html";
  }
}

async function handleImageUpload() {
  console.log("uploaded");
  const formData = new FormData();
  const fileInput = document.getElementById("productImage");
  const file = fileInput.files[0];
  formData.append("file", file);
  let response = await fetch("http://localhost:8080/api/file", {
    method: "POST",
    body: formData,
  });
  response = await response.json();
  imageUrl = response.fileName;
}


