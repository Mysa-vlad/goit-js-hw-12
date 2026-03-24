import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import { getImagesByQuery } from './js/pixabay-api.js';
import { createGallery, clearGallery, showLoader, hideLoader, showLoadMoreButton, hideLoadMoreButton } from './js/render-functions.js';

const searchForm = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.load-more');

searchForm.addEventListener('submit', handleSearch);

async function handleSearch(event) {
  event.preventDefault();

  const query = event.currentTarget.elements['search-text'].value.trim();

  if (query === "") {
    iziToast.warning({
      message: 'Please enter a search query!',
      position: 'topRight'
    });
    return;
  }

  clearGallery();
  showLoader();

  try {
    const data = await getImagesByQuery(query);

    if (data.hits.length === 0) {
      iziToast.error({
        message: 'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight'
      });
      return;
    }

    createGallery(data.hits);
    showLoadMoreButton(); 
    
  } catch (error) {
    console.error(error);
    iziToast.error({
      message: 'Something went wrong. Please try again later.',
      position: 'topRight'
    });
  } finally {
    hideLoader();
    event.target.reset();
  }
}

// ======================================================//

loadMoreBtn.addEventListener('click', loadMoreFo);

async function loadMoreFo(event) {
  
}