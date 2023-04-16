const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const fileChooser = document.querySelector('.img-upload__start input[type=file]');
const previewElement = document.querySelector('.img-upload__preview img');
const previewMiniatureNodeList = document.querySelectorAll('.effects__preview');

fileChooser.addEventListener('change', () => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();
  const isCorrectFileType = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (isCorrectFileType) {
    const imageFromUrl = URL.createObjectURL(file);
    previewMiniatureNodeList.forEach((el) => {
      el.style.backgroundImage = `url(${imageFromUrl})`;
    });
    previewElement.src = imageFromUrl;
  }
});
