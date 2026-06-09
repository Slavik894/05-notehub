import { useEffect, useState } from "react"
import{useDebouncedCallback} from "use-debounce"
import css from "./SearchBox.module.css"

interface SearchBoxProps{
    onSearch: (value: string)=> void;
}

export default function SearchBox({onSearch}: SearchBoxProps){
    const [inputValue, setInputValue] = useState("");

    const handleChange = useDebouncedCallback((e: React.ChangeEvent<HTMLInputElement>) => {setInputValue(e.target.value); onSearch(e.target.value);}, 300);

    return(
        <div>
            <input type="text" defaultValue={inputValue} onChange={handleChange} className={css.input}/>
        </div>
    )
}