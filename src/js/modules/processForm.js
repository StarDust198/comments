import { processField } from './processField.js';

export const processForm = (form) => {
  const errorState = {
    errors: 0,
    name: '',
    text: '',
    date: '',
  };

  form.onsubmit = function (e) {
    e.preventDefault();

    submitForm();
  };

  for (let field of form.elements) {
    if (field.name) {
      field.oninput = () => clearError(field.name);
    }
  }

  form.elements['text'].onkeydown = (e) => {
    if (e.key !== 'Enter' || e.shiftKey) return;
    e.preventDefault();

    submitForm();
  };

  function submitForm() {
    let postData = {};

    for (let field of form.elements) {
      if (field.name) {
        postData[field.name] = processField(field, errorState);
        if (errorState[field.name]) showError(field.name);
      }
    }

    if (errorState.errors === 0) {
      form.dispatchEvent(
        new CustomEvent('addPost', {
          detail: postData,
        })
      );
      form.reset();
      return;
    }

    errorState.errors = 0;
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
