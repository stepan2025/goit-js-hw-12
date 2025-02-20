import { fetchImages } from './js/pixabay-api.js';
import { renderGallery } from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('#load-more');

let query = '';
let page = 1;
const perPage = 40;
let totalHits = 0;

form.addEventListener('submit', async event => {
  event.preventDefault();
  query = event.target.elements.searchQuery.value.trim();

  if (!query) {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a search query!',
    });
    return;
  }

  page = 1; // Скидаємо сторінку при новому запиті
  gallery.innerHTML = '';
  loadMoreBtn.style.display = 'none'; // Ховаємо кнопку перед новим запитом
  loader.style.display = 'block';

  try {
    const { images, total } = await fetchImages(query, page);
    totalHits = total;
    loader.style.display = 'none';

    if (images.length === 0) {
      iziToast.error({
        title: 'Error',
        message: 'Sorry, no images found. Try again!',
      });
      return;
    }

    renderGallery(images);

    if (totalHits > perPage) {
      loadMoreBtn.style.display = 'block';
    }
  } catch (error) {
    console.error(error);
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again later.',
    });
  }
});

loadMoreBtn.addEventListener('click', async () => {
  page++;
  loadMoreBtn.style.display = 'none';
  loader.style.display = 'block';

  try {
    const { images } = await fetchImages(query, page);
    renderGallery(images, true);
    loader.style.display = 'none';

    // Прокрутка сторінки вниз після завантаження нових зображень
    const { height } = gallery.firstElementChild.getBoundingClientRect();
    window.scrollBy({ top: height * 2, behavior: 'smooth' });

    if (page * perPage >= totalHits) {
      loadMoreBtn.style.display = 'none';
      iziToast.info({
        title: 'End of results',
        message: "We're sorry, but you've reached the end of search results.",
      });
    } else {
      loadMoreBtn.style.display = 'block';
    }
  } catch (error) {
    console.error(error);
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again later.',
    });
  }
});
