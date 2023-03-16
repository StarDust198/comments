import userImage from '../../assets/user.svg';
import heartImage from '../../assets/heart.svg';
import trashImage from '../../assets/trash.svg';

export const Post = ({ text, name, date }) => {
  const newPost = document.createElement('li');
  newPost.classList.add(
    'post',
    'card',
    'animate__animated',
    'animate__fadeInDown'
  );

  newPost.innerHTML = `
		${userImage}
		<h3 class="post-name">${name}</h3>

    <div class="post-actions">
      <button class="post-btn" data-action="like">
				${heartImage}
      </button>
      <button class="post-btn" data-action="delete">
				${trashImage}
      </button>
    </div>

		<hr class="hr" />

		<p class="post-text">
			${text.split('\n').join('<br/>')}
		</p>
		<div class="post-date">${date}</div>
	`;

  return newPost;
};
