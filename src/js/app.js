import { isWebP } from './modules/isWebP.js';
import { processForm } from './modules/processForm.js';
import { postListClicks } from './modules/postListClicks.js';
import { Post } from './modules/Post.js';

isWebP();

const form = document.forms.form;
const postList = document.getElementById('post-list');

processForm(form);
postListClicks(postList);

form.addEventListener('addPost', (e) => {
  postList.prepend(Post(e.detail));
});
