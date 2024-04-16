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
            colDiv.className = 'col-md-4 mb-4';
        
            const card = document.createElement('div');
            card.className = 'card';
        
            const img = document.createElement('img');
            img.src = 'http://'+ product.imageUrl;
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

            button.addEventListener('click', function() {
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
     alert('No products found');
    }

}


function next(){
    page+=1;
    selectCategory(selectedCategoryId);
}

function previous(){
    page-=1;
    selectCategory(selectedCategoryId);
}


// function addToCart(product) {
//     if (product) {
//       cart[product.id].quantity += 1; // Increment quantity if product already in cart
//     } else {
//       cart[product.id] = { ...product, quantity: 1 }; // Add product with quantity 1 if not in cart
//     }
//     updateCart();
//     toggleSidebarCart();
//   }

//   function removeFromCart(productId) {
//     if (cart[productId] && cart[productId].quantity > 1) {
//       cart[productId].quantity -= 1; // Decrement quantity if more than 1
//     } else {
//       delete cart[productId]; // Remove product from cart if quantity is 1
//     }
//     updateCart();
//   }

  
//   function clearCart() {
//     cart = {};
//     updateCart();
//   }
//   function updateCart() {
//     cartItemsContainer.innerHTML = '';
//     Object.values(cart).forEach(product => {
//       const cartItem = document.createElement('div');
//       cartItem.className = 'cart-item d-flex justify-content-between align-items-center mb-3';
//       cartItem.innerHTML = `
//           <div class="d-flex align-items-center">
//             <img src="${product.image}" alt="${product.name}" class="cart-item-image mr-3">
//             <div class="cart-item-detail">
//                 <h5 class="cart-item-name">${product.name}</h5>
//                 <p class="cart-item-price">${product.price}</p>
//             </div>
//           </div>
//           <div class="quantity-controls d-flex align-items-center">
//               <button class="btn btn-success btn-sm" onclick="changeProductQuantity('${product.id}', 1)">+</button>
//               <span class="quantity mx-2">${product.quantity}</span>
//               <button class="btn btn-warning btn-sm" onclick="changeProductQuantity('${product.id}', -1)">-</button>
//           </div>
//       `;
//       const removeButton = document.createElement('button');
//       removeButton.className = 'btn btn-danger btn-block mt-2';
//       removeButton.textContent = 'Remove';
//       removeButton.onclick = () => removeFromCart(product.id);
      
//       cartItem.appendChild(removeButton);
//       cartItemsContainer.appendChild(cartItem);
//     });
//     cartCount.textContent = Object.values(cart).reduce((acc, { quantity }) => acc + quantity, 0).toString();
//   }
  
  

//   function changeProductQuantity(productId, change) {
//     if (change === 1) {
//       addToCart(cart[productId]); // Reuse addToCart for increment
//     } else if (change === -1) {
//       removeFromCart(productId); // Reuse removeFromCart for decrement
//     }
//   }


//   function checkout() {
//     // Placeholder for checkout functionality
//     console.log('Checkout clicked. Implement checkout functionality here.');
//     // You might want to clear the cart after checkout or redirect to a checkout page
//   }
  
//   function continueShopping() {
//     // Placeholder for continue shopping functionality
//     console.log('Continue Shopping clicked. Implement navigation if needed.');
//     // This could close the cart sidebar or navigate back to the product listing
//     toggleSidebarCart();
//   }


// function toggleSidebarCart() {
//   const sidebarCart = document.getElementById('sidebarCart');
//         sidebarCart.style.right = sidebarCart.style.right === '0px' ? '-400px' : '0px';
//         const cartFooter = document.querySelector('.cart-footer');
//         cartFooter.innerHTML = `
//         <div class="d-flex justify-content-center gap-2">
//       <button class="btn btn-success" onclick="clearCart()">Clear Cart</button>
//       <button class="btn btn-success" onclick="checkout()">Checkout</button>
//     </div>
//     <div class="d-flex justify-content-center mt-2">
//       <button class="btn btn-secondary" onclick="continueShopping()">Continue Shopping</button>
//     </div>
//   `;
// }
//     const closeButton = document.querySelector('.cart-header .btn-close');
//     if (closeButton) {
//       closeButton.addEventListener('click', toggleSidebarCart);
//     } else {
//       console.error('Close button not found');
//     }
//   const clearCartButton = document.querySelector('.cart-footer .btn-primary');
//   clearCartButton.addEventListener('click', clearCart);




//   window.removeFromCart = removeFromCart;
//   window.clearCart = clearCart;
//   window.changeProductQuantity = changeProductQuantity;
//   window.checkout = checkout;
//   window.continueShopping = continueShopping;


