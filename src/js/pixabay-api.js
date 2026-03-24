import axios from 'axios';

const API_KEY = '55080821-ae3987ed548899e0d87a95a06'; 
const BASE_URL = 'https://pixabay.com/api/';

export async function getImagesByQuery(query, page) {
  const searchParams = new URLSearchParams({
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    page: page,
    per_page: 15,
  });
  const res = await axios.get(`${BASE_URL}?${searchParams}`);
  return res.data;
}