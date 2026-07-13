import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote } from "../../services/noteService";
import type { Note } from "../../types/note";
import css from "./NoteList.module.css";

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();

  // 1. Мутація видалення тепер живе всередині списку
  const deleteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      // 2. Інвалідація кешу після успішного видалення
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
    onError: (error) => {
      console.error("Error deleting note:", error);
    },
  });

  if (!notes || notes.length === 0) return null;

  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li className={css.listItem} key={note.id}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>
            <button
              className={css.button}
              // 3. Викликаємо мутацію прямо тут, передаючи ID нотатки
              onClick={() => deleteMutation.mutate(note.id)}
              // Блокуємо кнопку саме цієї нотатки, яка зараз видаляється
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? "Deleting..." : "Delete"}
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
