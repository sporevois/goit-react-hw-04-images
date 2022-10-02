import axios from "axios";

axios.defaults.baseURL = "https://pixabay.com/api/";
const API_KEY = "29184365-ad7d7355f63935605b47c8dfc";
const BASE_FILTERS = 'image_type=photo&orientation=horizontal&per_page=12';

export const fetchImages = async (searchQuery, page) => {
  const response = await axios.get(`?q=${searchQuery}&page=${page}&key=${API_KEY}&${BASE_FILTERS}`);
  return response.data;
};



