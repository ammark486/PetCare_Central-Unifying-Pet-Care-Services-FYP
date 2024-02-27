const productCategories = {
    petfood: ['Dog food', 'Cat food'],
    petaccessories: ['Dog Accessories', 'Cat Accessories'],
    petgroomingsupplies: ['Dog Grooming Supplies', 'Cat Grooming Supplies'],
    cat: ['Persian Cat', 'Bengal', 'Himalayan'],
    dog: ['German Shephard', 'Labrador','Husky']
  };
  
  function updateFormFields() {
    const productType = document.getElementById('productType').value;
    const categorySelect = document.getElementById('category');
    const additionalFieldsDiv = document.getElementById('additionalFields');
  
    // Clear previous options and additional fields
    categorySelect.innerHTML = '';
    additionalFieldsDiv.innerHTML = '';
  
    // Populate category options based on the selected product type
    if (productType in productCategories) {
      const categories = productCategories[productType];
      for (const category of categories) {
        const option = document.createElement('option');
        option.value = category;
        option.text = category;
        categorySelect.appendChild(option);
      }
  
      // Add additional fields for cat and dog categories
      if (productType === 'cat' || productType === 'dog') {
        const colorField = createFormField('Color', 'productColor', 'text');
        const ageField = createFormField('Age', 'productAge', 'text');
        additionalFieldsDiv.appendChild(colorField);
        additionalFieldsDiv.appendChild(ageField);
      }
    }
  }
  
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
  