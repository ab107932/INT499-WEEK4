import axios from 'axios';

const API_URL = "https://api.themoviedb.org/3";
const API_KEY = "16f9595092feb41846e3e5243cac8fc5";  // Replace with your valid API key

export const fetchMovies = async (searchQuery) => {
  try {
    const url = searchQuery
      ? `${API_URL}/search/movie?api_key=${API_KEY}&query=${searchQuery}&language=en-US&page=1`
      : `${API_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;

    const response = await axios.get(url);
    console.log("API Response:", response.data);  // Log the full API response to inspect it

    if (response.data && response.data.results) {
      return response.data.results; // Return the list of movies
    } else {
      console.log("No movies found in response.");
      return []; // Return an empty array if no results
    }
  } catch (error) {
    console.error("Error fetching movies:", error);
    return []; // Return an empty array if there's an error
  }
};
