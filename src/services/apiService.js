import axios from "axios";

const BASE_URL = "https://pixabay.com/api/";
const API_KEY = "20731872-71a610166f6b50a9cc8e22574";
const perPage = 12;

const fetchHits = ({ searchQuery = "", currentPage = 1 }) => {
  return axios
    .get(
      `${BASE_URL}?q=${searchQuery}&page=${currentPage}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}`
    )
    .then((response) => response.data.hits);
};

export default { fetchHits };
