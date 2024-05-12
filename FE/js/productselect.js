
let foodProductType;
let accessoriesProductType;
let groomingProductType;


document.getElementById('petFoodCard').addEventListener('click', function() {
    showProducts(foodProductType)
});

document.getElementById('petAccessoriesCard').addEventListener('click', function() {
    showProducts(accessoriesProductType)
});

document.getElementById('groomingSuppliesCard').addEventListener('click', function() {
    showProducts(groomingProductType)
});

async function getFoodProductTypes() {
    try {
        
        const url = new URL("http://localhost:8080/api/product-type?isActive=true&type=food");
  
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
  
        const productTypes = await response.json();
        foodProductType = productTypes.data[0].id;
  
    } catch (error) {
        console.error("Error:", error);
    }
  }

  async function getAccessoriesProductTypes() {
    try {
        
        const url = new URL("http://localhost:8080/api/product-type?isActive=true&type=accessories");
  
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
  
        const productTypes = await response.json();
        accessoriesProductType = productTypes.data[0].id;
  
    } catch (error) {
        console.error("Error:", error);
    }
  }

  async function getGroomingProductTypes() {
    try {
        
        const url = new URL("http://localhost:8080/api/product-type?isActive=true&type=grooming");
  
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
  
        const productTypes = await response.json();
        groomingProductType = productTypes.data[0].id;
  
    } catch (error) {
        console.error("Error:", error);
    }
  }

  getFoodProductTypes();
  getAccessoriesProductTypes();
  getGroomingProductTypes();

  function showProducts(productTypeId){
    console.log(productTypeId);
    const url = `product.html?productTypeId=${productTypeId}`;
    window.location.href = url;
  }