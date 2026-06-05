import axios from "axios";
import type { Note } from "../types/note";

axios.defaults.baseURL = "https://notehub-public.goit.study/api";

export const getNotes = async () => {
    const res = await axios.get<Note[]>("/notes");
    return res.data;
};

