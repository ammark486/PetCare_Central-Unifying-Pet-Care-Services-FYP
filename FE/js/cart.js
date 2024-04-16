const productsContainer = document.getElementById('products-container');
const cartItemsContainer = document.getElementById('cartItems');
openCartButton();

function getCart() {
  const cartJSON = localStorage.getItem("cart");
  return cartJSON ? JSON.parse(cartJSON) : {};
}

function saveCart(cart) {
  let cartData = [];
  let existCart = getCart();
  
  if (existCart && Array.isArray(existCart)) {
    let existData = existCart.find((c) => c.id == cart.id);
    if (existData) {
      cartData = existCart;
      existData.productType !='animal' ? existData.quantity += 1 : existData.quantity;
    } else {
      cartData = existCart;
      cartData.push(cart);
    }
  } else {
    cartData.push(cart);
  }

  localStorage.setItem("cart", JSON.stringify(cartData));
  // updateCartDisplay();
}


function addToCart(product) {
  const productWithQuantity = { ...product, quantity: 1 };
  saveCart(productWithQuantity);
  updateCart();
  toggleSidebarCart(true);
}

function removeFromCart(productId) {
  let existCart = getCart();
  if (existCart && Array.isArray(existCart)) {
    let updatedCart = existCart.filter((item) => item.id !== productId);
    existCart = updatedCart;
    localStorage.setItem("cart", JSON.stringify(existCart));
  }
  updateCart();
}


function clearCart() {
  localStorage.removeItem("cart");
  updateCart();
}

function updateCart() {
  cartItemsContainer.innerHTML = "";
  Object.values(getCart()).forEach((product) => {
    const cartItem = document.createElement("div");
    cartItem.className =
      "cart-item d-flex justify-content-between align-items-center mb-3";
    cartItem.innerHTML = `
        <div class="d-flex align-items-center product-details">
          <img src="${'http://' + product.imageUrl}" alt="${product.name}" class="cart-item-image mr-3">
          <div class="cart-item-detail">
              <h5 class="cart-item-name">${product.name}</h5>
              <p class="cart-item-price">${product.price}</p>
          </div>
        </div>
        <div class="quantity-controls d-flex align-items-center">
            ${product.productType !== 'animal' ? `
              <button class="btn btn-success btn-sm" onclick="changeProductQuantity('${product.id}', 1)">+</button>
              <span class="quantity mx-2">${product.quantity}</span>
              <button class="btn btn-warning btn-sm" onclick="changeProductQuantity('${product.id}', -1)">-</button>
            ` : ''}
        </div>
    `;
    const removeButton = document.createElement("button");
    removeButton.className = "btn btn-danger btn-block";
    removeButton.textContent = "Remove";
    removeButton.onclick = () => removeFromCart(product.id);

    cartItem.appendChild(removeButton);
    cartItemsContainer.appendChild(cartItem);
  });
  openCartButton();
}




function changeProductQuantity(productId, change) {
  let existCart = getCart();
  if (existCart && Array.isArray(existCart)) {
    let updatedCart = existCart.find((item) => item.id == productId);
    if(change == 1){
      updatedCart.quantity +=1;
    }else{
      updatedCart.quantity != 1 ? updatedCart.quantity -=1 : updatedCart.quantity;
    }

    localStorage.setItem("cart", JSON.stringify(existCart));
    updateCart();
  }
}

function checkout() {
  // Placeholder for checkout functionality
  console.log("Checkout clicked. Implement checkout functionality here.");
  // You might want to clear the cart after checkout or redirect to a checkout page
}

function continueShopping() {
  // Placeholder for continue shopping functionality
  console.log("Continue Shopping clicked. Implement navigation if needed.");
  // This could close the cart sidebar or navigate back to the product listing
  toggleSidebarCart(false);
}

function toggleSidebarCart(fromAddToCart) {
  if(!fromAddToCart){
    const sidebarCart = document.getElementById("sidebarCart");
    sidebarCart.style.right =
      sidebarCart.style.right === "0px" ? "-400px" : "0px";
  }
  const cartFooter = document.querySelector(".cart-footer");
  cartFooter.innerHTML = `
      <div class="d-flex justify-content-center gap-2">
    <button class="btn btn-success" onclick="clearCart()">Clear Cart</button>
    <button class="btn btn-success" onclick="checkout()">Checkout</button>
  </div>
  <div class="d-flex justify-content-center mt-2">
    <button class="btn btn-secondary" onclick="continueShopping()">Continue Shopping</button>
  </div>
`;

updateCart();
}

function closeSidebarCart() {
  const sidebarCart = document.getElementById("sidebarCart");
  sidebarCart.style.right = "-400px";
}

const closeButton = document.querySelector(".cart-header .btn-close");
closeButton.addEventListener("click", function() {
  closeSidebarCart();
});

function openCartButton(){
  document.getElementById('cartCount').innerHTML =   cartCount = Object.values(getCart())
  .reduce((acc, { quantity }) => acc + quantity, 0)
  .toString();;

}

// document.addEventListener("click", function(event) {
//   const sidebarCart = document.getElementById("sidebarCart");
//   const closeButton = document.querySelector(".cart-header .btn-close");
//   const isClickInsideSidebarCart = event.target.closest("#sidebarCart");
//   const isClickOnCloseButton = event.target === closeButton;
//   if (!isClickInsideSidebarCart && !isClickOnCloseButton) {
//     closeSidebarCart();
//   }
// });

// const sidebarCart = document.getElementById("sidebarCart");
// sidebarCart.addEventListener("click", function(event) {
//   event.stopPropagation();
// });


// const closeButton = document.querySelector(".cart-header .btn-close");
// if (closeButton) {
//   closeButton.addEventListener("click", toggleSidebarCart);
// } else {
//   console.error("Close button not found");
// }
// const clearCartButton = document.querySelector(".cart-footer .btn-primary");
// clearCartButton.addEventListener("click", clearCart);

function checkout(){
  const url = `billing.html`;
  window.location.href = url;
}


// window.removeFromCart = removeFromCart;
// window.clearCart = clearCart;
// window.changeProductQuantity = changeProductQuantity;
// window.checkout = checkout;
// window.continueShopping = continueShopping;
