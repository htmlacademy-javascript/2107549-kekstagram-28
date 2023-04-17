const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const fileChooserElement = document.querySelector('.img-upload__start input[type=file]');
const previewElement = document.querySelector('.img-upload__preview img');
const previewMiniatureNodeListElement = document.querySelectorAll('.effects__preview');

fileChooserElement.addEventListener('change', () => {
  const file = fileChooserElement.files[0];
  const fileName = file.name.toLowerCase();
  const isCorrectFileType = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (isCorrectFileType) {
    const imageFromUrl = URL.createObjectURL(file);
    previewMiniatureNodeListElement.forEach((el) => {
      el.style.backgroundImage = `url(${imageFromUrl})`;
    });
    previewElement.src = imageFromUrl;
  }
});
