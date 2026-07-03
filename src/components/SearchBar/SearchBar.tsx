import styles from "./SearchBar.module.css";
import toast, { Toaster } from "react-hot-toast";

interface SearchBarProps {
  onSubmit: (query: string) => void;
  page: (page: number) => void;
}

export default function SearchBar({ onSubmit, page }: SearchBarProps) {
  const handleSearch = (formData: FormData) => {
    const searchQuery = (formData.get("query") as string).trim();
    if (searchQuery) {
      onSubmit(searchQuery);
      page(1);
      return;
    }
    const notify = () => toast("Please enter your search query", {});
    notify();
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <a
          className={styles.link}
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by TMDB
        </a>
        <form className={styles.form} action={handleSearch}>
          <input
            className={styles.input}
            type="text"
            name="query"
            autoComplete="off"
            placeholder="Search movies..."
            autoFocus
          />
          <button className={styles.button} type="submit">
            Search
          </button>
        </form>
        <Toaster />
      </div>
    </header>
  );
}
