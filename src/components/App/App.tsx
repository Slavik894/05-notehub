import { useState } from 'react'
import SearchBox from "../SearchBox/SearchBox"
import css from "./App.module.css"
import { useQuery } from '@tanstack/react-query'
import { getNotes } from '../../services/noteService'

function App() {
const {data, isLoading} = useQuery({
  queryKey: ["notes"],
  queryFn: getNotes,
});

const [isModalOpen, setIsModalOpen] = useState(false);
const openModal = () => setIsModalOpen(true);
const closeModal = () => setIsModalOpen(false);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox/>
      </header>
    </div>
  )
}

export default App
