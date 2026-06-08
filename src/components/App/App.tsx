import { useState } from 'react'
import SearchBox from "../SearchBox/SearchBox"
import css from "./App.module.css"
import { useQuery } from '@tanstack/react-query'
import { fetchNotes } from '../../services/noteService'
import Pagination from '../Pagination/Pagination'
import NoteList from '../NoteList/NoteList'
import type { Note } from '../../types/note'
import Modal from '../Modal/Modal'
import NoteForm from '../NoteForm/NoteForm'



function App() {
const {data, isLoading} = useQuery<Note[]>({
  queryKey: ["notes"],
  queryFn: fetchNotes,
});

const totalPages = data?.total_pages ?? 0;

const [isModalOpen, setIsModalOpen] = useState(false);
const openModal = () => setIsModalOpen(true);
const closeModal = () => setIsModalOpen(false);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox/>
        {totalPages>1 && (<Pagination />)}
        <button className='css.button' onClick={openModal}>Create note +</button>
      </header>
      {data && !isLoading && <NoteList notes={data}/>}
      {isModalOpen &&(
        <Modal onClose={closeModal}>
          <NoteForm onClose={closeModal} />
        </Modal>
      )}
    </div>
  )
}

export default App
