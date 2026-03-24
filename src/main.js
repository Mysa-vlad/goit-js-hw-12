import iziToast from "izitoast";
import { getImagesByQuery } from './js/pixabay-api.js';
import { createGallery, clearGallery, showLoader, hideLoader, showLoadMoreButton, hideLoadMoreButton } from './js/render-functions.js';

let currentQuery = "";
let page = 1;
const perPage = 15;

const searchForm = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.load-more');

searchForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const query = event.currentTarget.elements['search-text'].value.trim();

  if (query === "") {
    iziToast.warning({ message: "Please enter a search query!" });
    return;
  }

  currentQuery = query;
  page = 1;         
  clearGallery(); 
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, page);
    
    if (data.hits.length === 0) {
      iziToast.error({ message: 'Sorry, there are no images matching your search query. Please try again!' });
      return;
    }

    createGallery(data.hits); 


    const totalPages = Math.ceil(data.totalHits / perPage);

    if (page >= totalPages) {
      
      hideLoadMoreButton();
      iziToast.info({ message: "We're sorry, but you've reached the end of search results." });
    } else {
      showLoadMoreButton();
    }

  } catch (error) {
    console.error(error);
    iziToast.error({ message: 'An error occurred while fetching images. Please try again later.' });
  } finally {
    hideLoader();
  }
});

loadMoreBtn.addEventListener('click', async () => {
  page += 1; 
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, page);
    
    createGallery(data.hits);
    
  
    smoothScroll();

    const totalPages = Math.ceil(data.totalHits / perPage);

    if (page >= totalPages) {
      hideLoadMoreButton();
      iziToast.info({ message: "We're sorry, but you've reached the end of search results." });
    } else {
      showLoadMoreButton();
    }
  } catch (error) {
    console.error(error);
    iziToast.error({ message: 'Failed to load more images. Check your connection.' });
  } finally {
    hideLoader();
  }
});

function smoothScroll() {
  const card = document.querySelector('.gallery-item');
  if (card) {
    const cardHeight = card.getBoundingClientRect().height;
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth', 
    });
  }
}