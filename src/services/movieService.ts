import type { Movie } from "../types/movie";
import axios from "axios";

const myKey = import.meta.env.VITE_TMDB_TOKEN;

interface ResponseProps {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

interface fetchResponse {
  results: Movie[];
  totalPages: number;
}

async function fetchMovies(
  search: string,
  page: number = 1,
): Promise<fetchResponse> {
  console.log(search);

  const response = await axios.get<ResponseProps>(
    "https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US",
    {
      headers: {
        Authorization: `Bearer ${myKey}`,
      },
      params: {
        query: search,
        page: page,
      },
    },
  );

  return {
    results: response.data.results,
    totalPages: response.data.total_pages,
  };
}

export default fetchMovies;
