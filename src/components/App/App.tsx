import { useEffect, useState } from 'react'
import SearchBox from "../SearchBox/SearchBox"
import css from "./App.module.css"
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { fetchNotes, type NotesHttpResponse } from '../../services/noteService'
import Pagination from '../Pagination/Pagination'
import NoteList from '../NoteList/NoteList'
import Modal from '../Modal/Modal'
import NoteForm from '../NoteForm/NoteForm'
import {FallingLines} from 'react-loader-spinner'

function App() {

const [currentPage, setCurrentPage] = useState(1);
const [searchText, setSearchText] = useState("")

const handleSearch = (value: string) =>{
  setSearchText(value);
  setCurrentPage(1);
}

const {data, isLoading, isSuccess} = useQuery<NotesHttpResponse>({
  queryKey: ["notes", currentPage, searchText],
  queryFn: ()=> fetchNotes(currentPage, searchText),
  placeholderData: keepPreviousData
});

const notes = data?.notes ?? []
const totalPages = data?.totalPages ?? 0;

const [isModalOpen, setIsModalOpen] = useState(false);
const openModal = () => setIsModalOpen(true);
const closeModal = () => setIsModalOpen(false);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onSearch={handleSearch}/>
        {totalPages>1 && (<Pagination 
                          totalPages={totalPages}
                          currentPage={currentPage}
                          onPageChange={setCurrentPage}

                          />)}
        <button className={css.button} onClick={openModal}>Create note +</button>
      </header>
      {isLoading && (
        <div className={css.loaderWrapper}>
            <FallingLines 
              color="#4fa94d" 
              width="100" 
              visible={true} 
              ariaLabel="falling-circles-loading" 
            />
          </div>
)}
      {data && !isLoading && <NoteList notes={notes}/>}
      {isModalOpen &&(
        <Modal onClose={closeModal}>
          <NoteForm onClose={closeModal} />
        </Modal>
      )}
      {data && !isLoading && notes.length === 0 && (<p>Ooops...there is no such notes</p>)}
    </div>
  )
}

export default App
