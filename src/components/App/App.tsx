import { useState } from 'react'
import SearchBox from "../SearchBox/SearchBox"
import css from "./App.module.css"

function App() {

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox/>
      </header>
    </div>
  )
}

export default App
