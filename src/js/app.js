import { isWebP } from './modules/isWebP.js';
import { processForm } from './modules/processForm.js';

isWebP();

const form = document.forms.form;
const postList = document.getElementById('post-list');

processForm(form, postList);

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
