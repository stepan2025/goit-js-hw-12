import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let lightbox = new SimpleLightbox('.gallery a');

export function renderGallery(images, append = false) {
  const gallery = document.querySelector('.gallery');

  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
    <a href="${largeImageURL}" class="gallery-item">
      <img src="${webformatURL}" alt="${tags}" />
      <div class="info">
        <p>Likes ${likes}</p>
        <p>Views ${views}</p>
        <p>Comments ${comments}</p>
        <p>Downloads ${downloads}</p>
      </div>
    </a>`
    )
    .join('');

  if (append) {
    gallery.insertAdjacentHTML('beforeend', markup);
  } else {
    gallery.innerHTML = markup;
  }

  lightbox.refresh();
}
