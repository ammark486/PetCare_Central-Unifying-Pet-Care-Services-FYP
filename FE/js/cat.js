
document.addEventListener('DOMContentLoaded', () => {
    const products = [
      {
        name: "Birbo Cat Food | All Variants & Flavors",
        price: "Rs 1,899 - Rs 1,949",
        image: "images/product/pic.jpg", // Include correct file extension
        
        
      },
      {
        name: "Bonacibo Adult Cat Food",
        price: "Rs 3,599",
        image: "images/product/pic1.jpg", // Include correct file extension
        
      },
      {
        name: "Bonacibo Kitten Food",
        price: "Rs 2,799",
        image: "images/product/pic2.jpg", // Include correct file extension
        
      },
      {
        name: "Bonacibo Kitten Food",
        price: "Rs 2,799",
        image: "images/product/pic2.jpg", // Include correct file extension
        
      },
      {
        name: "Bonacibo Kitten Food",
        price: "Rs 2,799",
        image: "images/product/pic2.jpg", // Include correct file extension
        
      },
      {
        name: "Bonacibo Kitten Food",
        price: "Rs 2,799",
        image: "images/product/pic2.jpg", // Include correct file extension
        
      },
      // ... more products
    ];
  
    const productsContainer = document.getElementById('products-container');
  
    products.forEach(product => {
      const colDiv = document.createElement('div');
      colDiv.className = 'col-md-4 mb-4';
  
      const card = document.createElement('div');
      card.className = 'card';
  
      const img = document.createElement('img');
      img.src = product.image; // The src attribute is set to the image path
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
  
      const button = document.createElement('button');
      button.className = 'btn btn-purple';
      button.textContent = 'Add to Cart';
      button.onclick = function() {
        addToCart({ name: product.name, price: product.price });
      };
  
  
      cardBody.appendChild(title);
      cardBody.appendChild(text);
      cardBody.appendChild(button);
      card.appendChild(img);
      card.appendChild(cardBody);
      colDiv.appendChild(card);
      productsContainer.appendChild(colDiv);
      
    });
  
  });

  // cart.js
  document.addEventListener('DOMContentLoaded', initCart);

function initCart() {
  updateCartUI();
}

function toggleCart() {
  document.getElementById('sidebarCart').classList.toggle('active');
}

function addToCart(item) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.push(item);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartUI();
}

function updateCartUI() {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  let cartItemsContainer = document.querySelector('.cart-items');
  cartItemsContainer.innerHTML = '';
  let total = 0;
  cart.forEach(item => {
    let itemElement = document.createElement('div');
    itemElement.innerHTML = '{item.name} - {item.price}';
    cartItemsContainer.appendChild(itemElement);
    total += parseFloat(item.price.replace(/[^0-9.-]+/g,""));
  });
  document.getElementById('cartTotal').textContent = total.toFixed(2);
}

function checkout() {
  // Implement checkout functionality
  alert('Checkout functionality not implemented.');
}


  