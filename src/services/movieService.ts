import type { Movie } from "../types/movie";
import axios from "axios";

const myKey = import.meta.env.VITE_TMDB_TOKEN;

interface ResponseProps {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

async function fetchMovies(search: string): Promise<Movie[]> {
  const response = await axios.get<ResponseProps>(
    "https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1",
    {
      headers: {
        Authorization: `Bearer ${myKey}`,
      },
      params: {
        query: search,
      },
    },
  );

  return response.data.results;
}

export default fetchMovies;
