import axios from 'axios';
import type { Note, CreateNoteData } from '@/types/note';

const API_BASE_URL = 'https://notehub-public.goit.study/api';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    'Content-Type': 'application/json',
  },
});

export interface UpdateNoteParams {
  id: string;
  data: Partial<CreateNoteData>;
}

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
  tag?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  params: FetchNotesParams = {}
): Promise<FetchNotesResponse> => {
  const { page = 1, perPage = 12, search, tag } = params;
  const queryParams = new URLSearchParams({
    page: String(page),
    perPage: String(perPage),
  });

  if (search?.trim()) {
    queryParams.append('search', search.trim());
  }

  if (tag) {
    queryParams.append('tag', tag);
  }

  const { data } = await apiClient.get<FetchNotesResponse>(
    `/notes?${queryParams.toString()}`
  );
  return data;
};

export const fetchNoteById = async (noteId: string): Promise<Note> => {
  const { data } = await apiClient.get<Note>(`/notes/${noteId}`);
  return data;
};

export const createNote = async (noteData: CreateNoteData): Promise<Note> => {
  const { data } = await apiClient.post<Note>('/notes', noteData);
  return data;
};

export const updateNote = async ({
  id,
  data: noteData,
}: UpdateNoteParams): Promise<Note> => {
  const { data } = await apiClient.patch<Note>(`/notes/${id}`, noteData);
  return data;
};

export const deleteNote = async (noteId: string): Promise<Note> => {
  const { data } = await apiClient.delete<Note>(`/notes/${noteId}`);
  return data;
};

export default apiClient;
