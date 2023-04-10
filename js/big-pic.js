const bigPicPreview = document.querySelector('.big-picture__preview');
const commentsContainer = bigPicPreview.querySelector('.social__comments');
const commentTemplate = commentsContainer.querySelector('.social__comment');
const bigPictureImage = bigPicPreview.querySelector('.big-picture__img img');
const likesCount = bigPicPreview.querySelector('.likes-count');
const commentsCount = bigPicPreview.querySelector('.comments-count');
const socialCaption = bigPicPreview.querySelector('.social__caption');

const renderComment = (({ avatar, name, message }) => {
  const comment = commentTemplate.cloneNode(true);
  comment.querySelector('.social__picture').src = avatar;
  comment.querySelector('.social__picture').alt = name;
  comment.querySelector('.social__text').textContent = message;

  return comment;
});

const createComments = (comments) => {
  commentsContainer.append(...comments.map(renderComment));
};

const renderBigPicture = ({ url, description, likes, comments }) => {
  bigPictureImage.src = url;
  bigPictureImage.alt = description;
  likesCount.textContent = likes;
  commentsCount.textContent = comments.length;
  socialCaption.textContent = description;

  commentsContainer.innerHTML = '';
  createComments(comments);
};

export { renderBigPicture, bigPictureImage, likesCount, socialCaption };
