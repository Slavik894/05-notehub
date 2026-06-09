import { useEffect, useState } from "react"
import{useDebouncedCallback} from "use-debounce"
import css from "./SearchBox.module.css"

export default function SearchBox(){
    const [inputValue, setInputValue] = useState("");

    const handleChange = useDebouncedCallback((e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value), 300);

    return(
        <div className="css.input">
            <input type="text" defaultValue={inputValue} onChange={handleChange}/>
            <p>{inputValue}</p>
        </div>
    )
}