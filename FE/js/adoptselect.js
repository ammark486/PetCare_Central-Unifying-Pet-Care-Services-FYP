// document.addEventListener('DOMContentLoaded', function () {
//     const adoptSelectButton = document.getElementById('adoptselectbutton');
//     const dropdownOptions = document.querySelectorAll('.dropdown-menu a');

//     dropdownOptions.forEach(function (option) {
//       option.addEventListener('click', function () {
//         // Check the selected option and redirect accordingly
//         if (option.textContent.toLowerCase() === 'dog') {
//           window.location.href = 'dog.html';
//         } else if (option.textContent.toLowerCase() === 'cat') {
//           window.location.href = 'cat.html';
//         }
//         // Add more conditions for other options as needed
//       });
//     });
//   });

async function getAnimalProductTypes() {
  try {
      
      const url = new URL("http://localhost:8080/api/product-type?isActive=true&type=animal");

      const response = await fetch(url, {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
          },
      });

      const productTypes = await response.json();
      console.log(productTypes);

      var data = ``;

      productTypes.data.forEach(productType => {
          data += `<a class="dropdown-item" onClick="showProducts(${productType.id})">${productType.name}</a>`
      });
      document.getElementById("type_animal").innerHTML = data;

  } catch (error) {
      console.error("Error:", error);
  }
}

getAnimalProductTypes();

function showProducts(productTypeId){
  console.log(productTypeId);
  const url = `product.html?productTypeId=${productTypeId}`;
  window.location.href = url;
}