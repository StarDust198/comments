import { isWebP } from './modules/isWebP.js';
import { addNewPost } from './modules/addNewPost.js';
import { processField } from './modules/processField.js';

isWebP();

const form = document.forms.form;
const postList = document.getElementById('post-list');

const errorState = {
  errors: 0,
  name: '',
  text: '',
  date: '',
};

form.addEventListener('submit', function (e) {
  e.preventDefault();

  let postData = {};
  for (let field of this) {
    if (field.name) {
      postData[field.name] = processField(field, errorState);
      if (errorState[field.name]) showError(field.name);
    }
  }

  if (errorState.errors === 0) {
    addNewPost(postData, postList);
    this.reset();
    return;
  }

  errorState.errors = 0;
});

for (let field of form.elements) {
  if (field.name) {
    field.oninput = () => clearError(field.name);
  }
}

function showError(elem) {
  const errorElem = form.elements[elem];
  const errorMessage = errorElem.nextElementSibling;
  errorElem.classList.add('form-error');
  errorMessage.textContent = errorState[elem];
  errorState[elem] = '';
}

function clearError(elem) {
  const errorElem = form.elements[elem];
  const errorMessage = errorElem.nextElementSibling;
  errorElem.classList.remove('form-error');
  errorMessage.textContent = '';
}

postList.addEventListener('click', (e) => {
  const tgt = e.target.closest('.post-btn');
  if (!tgt) return;

  switch (tgt.dataset.action) {
    case 'like':
      const innerSvg = tgt.querySelector('svg');
      const fill = innerSvg.getAttribute('fill');
      innerSvg.setAttribute('fill', fill === 'none' ? '#7653fc' : 'none');
      break;
    case 'delete':
      const post = e.target.closest('.post');
      post.classList.add('animate__fadeOut');
      post.onanimationend = () => post.remove();
      break;
    default:
      throw new Error('Неизвестное действие');
  }
});
