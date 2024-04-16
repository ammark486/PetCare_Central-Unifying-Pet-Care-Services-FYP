let allproductTypes;

const productCategories = {
    petfood: ['Dog food', 'Cat food'],
    petaccessories: ['Dog Accessories', 'Cat Accessories'],
    petgroomingsupplies: ['Dog Grooming Supplies', 'Cat Grooming Supplies'],
    cat: ['Persian Cat', 'Bengal', 'Himalayan'],
    dog: ['German Shephard', 'Labrador','Husky']
  };

    
  function createFormField(labelText, fieldName, fieldType) {
    const fieldDiv = document.createElement('div');
    fieldDiv.className = 'form-group';
  
    const label = document.createElement('label');
    label.htmlFor = fieldName;
    label.textContent = labelText;
    fieldDiv.appendChild(label);
  
    const input = document.createElement('input');
    input.type = fieldType;
    input.className = 'form-control';
    input.id = fieldName;
    input.name = fieldName;
    fieldDiv.appendChild(input);
  
    return fieldDiv;
  }


  showProductTypes();

  async function addCategory(){

    const categoryName = document.getElementById('category-name').value;
    const productTypeId = document.getElementById('all-products').value;

    const category = {
      name: categoryName,
      productType : {
        id: productTypeId
      }
    }

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
      alert("Forbidden: You do not have permission to access this resource.");
    }
    if (response.status === 401) {
        window.location.href = 'customersignin.html';
    } else if (response.status == 200) {
      alert(response.message);
      getCategories();
    } else {
     alert(response.message);
    }
  }
  
  async function getCategories() {
    const productTypeId = document.getElementById('all-products').value;
    const token = localStorage.getItem("jwt");
    let response = await fetch(`http://localhost:8080/api/category/product-type/${productTypeId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    response = await response.json();

    if (response.status === 403) {
      alert("Forbidden: You do not have permission to access this resource.");
    }
    if (response.status === 401) {
        window.location.href = 'customersignin.html';
    } else if (response.status == 200) {
      const categories = response;
      var data = ``;
      categories.data.forEach(el => {
        data+= `<option value="${el.id}">${el.name}</option>`  
      });
      document.getElementById('category-by-product').innerHTML = data;
    } else {
     alert(response.message);
    }
    
  }


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
      alert("Forbidden: You do not have permission to access this resource.");
    }
    if (response.status === 401) {
        window.location.href = 'customersignin.html';
    } else if (response.status == 200) {
      allproductTypes = await response.json();
      var data = ``;
      allproductTypes.data.forEach(el => {
        data+= `<option value="${el.id}">${el.name}</option>`  
      });
      document.getElementById('all-products').innerHTML = data;
      getCategories();
    } else {
      console.error("Error:", response.statusText);
    }
  }

  async function addProductType(){
    const productTypeName = document.getElementById('productTypeName').value;
    const productType = document.getElementById('productType').value;
    console.log(productType);
    console.log(productTypeName);

    const object = {
      name: productTypeName,
      type: productType
    } 

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
      alert("Forbidden: You do not have permission to access this resource.");
    }
    if (response.status === 401) {
        window.location.href = 'customersignin.html';
    } else if (response.status == 200) {
      const responseData = await response.json();
      showProductTypes();
      alert("Product type added succesfully");
    } else {
      console.error("Error:", response.statusText);
    }

  }
  