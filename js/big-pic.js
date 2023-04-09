const bigPicPreview = document.querySelector('.big-picture__preview');
const commentsContainer = bigPicPreview.querySelector('.social__comments');
const commentTemplate = commentsContainer.querySelector('.social__comment');

const renderComment = (({ avatar, name, message }) => {
  const comment = commentTemplate.cloneNode(true);
  comment.querySelector('.social__picture').src = avatar;
  comment.querySelector('.social__picture').alt = name;
  comment.querySelector('.social__text').textContent = message;

  return comment;
});

const createCommentsList = (comments) => {
  const commentsListFragment = document.createDocumentFragment();

  comments.forEach((comment) => {
    commentsListFragment.append(renderComment(comment));
  });
  commentsContainer.append(commentsListFragment);
};

const renderBigPicture = ({ url, description, likes, comments }) => {
  bigPicPreview.querySelector('.big-picture__img img').src = url;
  bigPicPreview.querySelector('.big-picture__img img').alt = description;
  bigPicPreview.querySelector('.likes-count').textContent = likes;
  bigPicPreview.querySelector('.comments-count').textContent = comments.length;
  bigPicPreview.querySelector('.social__caption').textContent = description;

  commentsContainer.innerHTML = '';
  createCommentsList(comments);
};

export { renderBigPicture };
