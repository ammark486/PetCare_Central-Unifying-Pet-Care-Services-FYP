const products = [
    { 
      name: 'Dog Food 1', 
      price: 10, 
      description: 'Lorem ipsum dolor sit amet', 
      image: 'dogfood1.jpg', 
      type: 'petfood', 
      category: 'dogfood' 
    },
    { 
      name: 'Dog Food 2', 
      price: 15, 
      description: 'Lorem ipsum dolor sit amet', 
      image: 'dogfood2.jpg', 
      type: 'petfood', 
      category: 'dogfood' 
    },
    { 
      name: 'Cat Food 1', 
      price: 8, 
      description: 'Lorem ipsum dolor sit amet', 
      image: 'catfood1.jpg', 
      type: 'petfood', 
      category: 'catfood' 
    },
    { 
      name: 'Cat Food 2', 
      price: 12, 
      description: 'Lorem ipsum dolor sit amet', 
      image: 'catfood2.jpg', 
      type: 'petfood', 
      category: 'catfood' 
    },
    { 
      name: 'Dog Accessories 1', 
      price: 20, 
      description: 'Lorem ipsum dolor sit amet', 
      image: 'dogaccessories1.jpg', 
      type: 'petaccessories', 
      category: 'dogaccessories' 
    },
    { 
      name: 'Dog Accessories 2', 
      price: 25, 
      description: 'Lorem ipsum dolor sit amet', 
      image: 'dogaccessories2.jpg', 
      type: 'petaccessories', 
      category: 'dogaccessories' 
    },
    { 
      name: 'Cat Accessories 1', 
      price: 18, 
      description: 'Lorem ipsum dolor sit amet', 
      image: 'cataccessories1.jpg', 
      type: 'petaccessories', 
      category: 'cataccessories' 
    },
    { 
      name: 'Cat Accessories 2', 
      price: 22, 
      description: 'Lorem ipsum dolor sit amet', 
      image: 'cataccessories2.jpg', 
      type: 'petaccessories', 
      category: 'cataccessories' 
    },
    { 
      name: 'Dog Grooming Supplies 1', 
      price: 30, 
      description: 'Lorem ipsum dolor sit amet', 
      image: 'doggroomingsupplies1.jpg', 
      type: 'petgroomingsupplies', 
      category: 'doggroomingsupplies' 
    },
    { 
      name: 'Dog Grooming Supplies 2', 
      price: 35, 
      description: 'Lorem ipsum dolor sit amet', 
      image: 'doggroomingsupplies2.jpg', 
      type: 'petgroomingsupplies', 
      category: 'doggroomingsupplies' 
    },
    { 
      name: 'Cat Grooming Supplies 1', 
      price: 28, 
      description: 'Lorem ipsum dolor sit amet', 
      image: 'catgroomingsupplies1.jpg', 
      type: 'petgroomingsupplies', 
      category: 'catgroomingsupplies' 
    },
    { 
      name: 'Cat Grooming Supplies 2', 
      price: 32, 
      description: 'Lorem ipsum dolor sit amet', 
      image: 'catgroomingsupplies2.jpg', 
      type: 'petgroomingsupplies', 
      category: 'catgroomingsupplies' 
    },
    { 
      name: 'Tom', 
      price: 10, 
      description: 'Lorem ipsum dolor sit amet', 
      image: 'dogfood1.jpg', 
      type: 'cat', 
      category: 'Persian Cat', 
      color: 'White', 
      age: 3 
    }
];

const productTypeSelect = document.getElementById('productType');
const categorySelect = document.getElementById('category');
const productTableBody = document.getElementById('productTableBody');

// Populate the category select options based on the selected product type
function populateCategories() {
    const productType = productTypeSelect.value;

    // Clear previous options
    categorySelect.innerHTML = '<option value="">Select Category</option>';

    // Find unique categories for the selected product type
    const categories = [...new Set(products.filter(product => product.type === productType).map(product => product.category))];

    // Create and append option elements
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.text = category;
        categorySelect.appendChild(option);
    });
}

// Populate the product table based on the selected product type and category
function populateProductTable() {
    const productType = productTypeSelect.value;
    const category = categorySelect.value;

    // Clear previous table rows
    productTableBody.innerHTML = '';

    // Filter products based on the selected product type and category
    const filteredProducts = products.filter(product => {
        if (productType && product.category) {
            return product.type === productType && product.category === category;
        } else if (productType) {
            return product.type === productType;
        } else if (category) {
            return product.category === category;
        } else {
            return true;
        }
    });

    // Create and append table rows
    filteredProducts.forEach(product => {
        const row = document.createElement('tr');

        const nameCell = document.createElement('td');
        nameCell.textContent = product.name;
        row.appendChild(nameCell);

        const priceCell = document.createElement('td');
        priceCell.textContent = product.price;
        row.appendChild(priceCell);

        const descriptionCell = document.createElement('td');
        descriptionCell.textContent = product.description;
        row.appendChild(descriptionCell);

        // Add Age and Color columns only for Dog and Cat products
        if (productType === 'dog' || productType === 'cat') {
            const ageCell = document.createElement('td');
            ageCell.textContent = product.age || ''; // Check if age property exists
            row.appendChild(ageCell);

            const colorCell = document.createElement('td');
            colorCell.textContent = product.color || ''; // Check if color property exists
            row.appendChild(colorCell);
        }

        const imageCell = document.createElement('td');
        const image = document.createElement('img');
        image.src = product.image;
        image.alt = product.name;
        imageCell.appendChild(image);
        row.appendChild(imageCell);

        // Actions column with Edit and Delete buttons
        const actionsCell = document.createElement('td');
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.classList.add('btn', 'btn-primary', 'mr-2');
        editButton.addEventListener('click', () => {
            // Add your edit functionality here
            console.log('Edit button clicked for product:', product.name);
        });
        actionsCell.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('btn', 'btn-danger');
        deleteButton.addEventListener('click', () => {
            // Add your delete functionality here
            console.log('Delete button clicked for product:', product.name);
        });
        actionsCell.appendChild(deleteButton);

        row.appendChild(actionsCell);

        productTableBody.appendChild(row);
    });
}

// Event listeners
productTypeSelect.addEventListener('change', () => {
    populateCategories();
    populateProductTable(); // Update table based on the new product type
});
categorySelect.addEventListener('change', populateProductTable);

// Initial population of category select options and product table
populateCategories();
populateProductTable();
