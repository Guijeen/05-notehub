import { useState } from "react";
import "./App.module.css";
import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import fetchMovies from "../../services/movieService";
import type { Movie } from "../../types/movie";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import Pagination from "../Pagination/Pagination";

function App() {
  const notify = () => toast("No movies found for your request");
  const [isSelectMovie, setSelectMovie] = useState<Movie | null>(null);
  const closeModale = () => setSelectMovie(null);

  const [queryMovies, setqueryMovies] = useState("");

  const [page, setPage] = useState(1);

  const { data, isFetching, isError } = useQuery({
    queryKey: ["movies", queryMovies, page],
    queryFn: () => fetchMovies(queryMovies, page),
    enabled: queryMovies != "",
  });

  useEffect(() => {
    if (data && data.results.length === 0) {
      notify();
    }
  }, [data]);

  const totalPages: number = data?.totalPages || 0;
  const movieResults = data?.results || [];

  return (
    <>
      <SearchBar onSubmit={setqueryMovies} page={setPage} />
      {totalPages > 1 && (
        <Pagination
          pageCount={totalPages}
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          onPageChange={({ selected }) => setPage(selected + 1)}
          forcePage={page - 1}
          nextLabel="→"
          previousLabel="←"
        />
      )}
      <MovieGrid movies={movieResults} onSelect={setSelectMovie} />
      {isFetching && <Loader />}
      {isError && <ErrorMessage />}
      <Toaster />
      {isSelectMovie && (
        <MovieModal onClose={closeModale} movie={isSelectMovie} />
      )}
    </>
  );
}

export default App;
