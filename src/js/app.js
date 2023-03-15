import { isWebP } from './modules/isWebP.js';
import { processForm } from './modules/processForm.js';
import { postListClicks } from './modules/postListClicks.js';

isWebP();

const form = document.forms.form;
const postList = document.getElementById('post-list');

processForm(form, postList);
postListClicks(postList);
