
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
  
      const button = document.createElement('a');
      button.className = 'btn btn-purple';
      button.textContent = product.sale ? 'Select Options' : 'Add to Cart';
  
  
      cardBody.appendChild(title);
      cardBody.appendChild(text);
      cardBody.appendChild(button);
      card.appendChild(img);
      card.appendChild(cardBody);
      colDiv.appendChild(card);
      productsContainer.appendChild(colDiv);
    });
  });
  

