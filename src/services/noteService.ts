import axios from "axios";
import type { Note } from "../types/note";

axios.defaults.baseURL = "https://notehub-public.goit.study/api";

const myToken = import.meta.env.VITE_NOTEHUB_TOKEN

interface NotesHttpResponse{
    notes: Note[];
    page?: number;
    totalPages?: number;
}

export const fetchNotes = async () => {
    const res = await axios.get<NotesHttpResponse>("/notes", {
        params: {
            page: 1,
            perPage: 12
        },
        headers:{
            Authorization: `Bearer ${myToken}`
        }
    });
    return res.data.notes;
};

interface NewNote{
    title: string;
    content: string;
    tag: string
}

export const createNote = async(newNote: NewNote) =>{
    const res = await axios.post<Note>("/notes", newNote, {
        headers:{
            Authorization: `Bearer ${myToken}`
        }
    });
    return res.data;
}

export const deleteNote = async(noteId: string)=>{
    const res = await axios.delete<Note>(`/notes/${noteId}`, {
        headers:{
            Authorization: `Bearer ${myToken}`
        }
    });
    return res.data
}


