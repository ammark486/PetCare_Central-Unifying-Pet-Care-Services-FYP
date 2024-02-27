

function getCart() {
  const cartJSON = localStorage.getItem('cart');
  return cartJSON ? JSON.parse(cartJSON) : {};
}

function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartDisplay();
}

function addToCart(item) {
  const cart = getCart();
  if (cart[item.id]) {
    cart[item.id].quantity += 1;
  } else {
    cart[item.id] = { ...item, quantity: 1 };
  }
  saveCart(cart);
}

function removeFromCart(itemId) {
  const cart = getCart();
  if (cart[itemId].quantity > 1) {
    cart[itemId].quantity -= 1;
  } else {
    delete cart[itemId];
  }
  saveCart(cart);
}

function clearCart() {
  localStorage.removeItem('cart');
  updateCartDisplay();
}
function updateCartDisplay() {
  const cart = getCart();
  const cartItemsContainer = document.getElementById('cartItems');
  cartItemsContainer.innerHTML = '';

  Object.keys(cart).forEach(itemId => {
    const cartItem = cart[itemId];

    const itemContainer = document.createElement('div');
    itemContainer.className = 'cart-item';

    const itemName = document.createElement('span');
    itemName.className = 'item-name';
    itemName.textContent = cartItem.name;

    const itemQuantity = document.createElement('span');
    itemQuantity.className = 'item-quantity';
    itemQuantity.textContent = cartItem.quantity;

    const itemButton = document.createElement('button');
    itemButton.className = 'remove-button';
    itemButton.textContent = 'Remove';
    itemButton.onclick = function() {
      removeFromCart(itemId);
    };

    itemContainer.appendChild(itemName);
    itemContainer.appendChild(itemQuantity);
    itemContainer.appendChild(itemButton);
    cartItemsContainer.appendChild(itemContainer);
  });
}