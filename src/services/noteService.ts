import axios from "axios";
import type { Note, NoteTag } from "../types/note";

const notehubApi = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
});

notehubApi.interceptors.request.use((config) => {
  const token = import.meta.env.VITE_NOTEHUB_TOKEN;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}
export interface FetchNotesParams {
  page: number;
  perPage: number;
  search?: string;
}

export interface CreateNotePayload {
  title: string;
  content: string;
  tag: NoteTag;
}

export const fetchNotes = async ({
  page,
  perPage,
  search,
}: FetchNotesParams): Promise<FetchNotesResponse> => {
  const response = await notehubApi.get<FetchNotesResponse>("/notes", {
    params: { page, perPage, search: search || undefined },
  });
  return response.data;
};

export const createNote = async (payload: CreateNotePayload): Promise<Note> => {
  const response = await notehubApi.post<Note>("/notes", payload);
  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response = await notehubApi.delete<Note>(`/notes/${id}`);
  return response.data;
};
