import axios from 'axios';

const API_KEY = '36675717-03e407770521c85c00994a8a5';
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchImages(query, page) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: 40,
        page,
      },
    });

    return { images: response.data.hits, total: response.data.totalHits };
  } catch (error) {
    console.error('Error fetching images:', error);
    return { images: [], total: 0 };
  }
}
