import { processField } from './processField.js';

export const processForm = (form, postList) => {
  const errorState = {
    errors: 0,
    name: '',
    text: '',
    date: '',
  };

  form.onsubmit = function (e) {
    e.preventDefault();

    let postData = {};
    for (let field of this) {
      if (field.name) {
        postData[field.name] = processField(field, errorState);
        if (errorState[field.name]) showError(field.name);
      }
    }

    if (errorState.errors === 0) {
      this.dispatchEvent(
        new CustomEvent('addPost', {
          detail: postData,
        })
      );
      this.reset();
      return;
    }

    errorState.errors = 0;
  };

  for (let field of form.elements) {
    if (field.name) {
      field.oninput = () => clearError(field.name);
    }
  }

  function showError(fieldName) {
    const errorElem = form.elements[fieldName];
    const errorMessage = errorElem.nextElementSibling;
    errorElem.classList.add('form-error');
    errorMessage.textContent = errorState[fieldName];
    errorState[fieldName] = '';
  }

  function clearError(fieldName) {
    const errorElem = form.elements[fieldName];
    const errorMessage = errorElem.nextElementSibling;
    errorElem.classList.remove('form-error');
    errorMessage.textContent = '';
  }
};
