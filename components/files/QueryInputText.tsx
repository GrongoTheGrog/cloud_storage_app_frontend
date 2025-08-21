import React, { ChangeEvent, Dispatch, SetStateAction, useCallback, useRef, useState } from 'react'
import FormTextInput from '../input/FormTextInput'
import { FaSearch, FaTimes } from 'react-icons/fa'

type Props = {
    setValue: Dispatch<SetStateAction<string>>
}

const QueryInputText = ({setValue}: Props) => {

    const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);
    const [input, setInput] = useState("");

    const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
        if (timeout.current){
            clearTimeout(timeout.current);
        }
        
        timeout.current = setTimeout(() => {
            setValue(e.target.value);
        }, 250)
    }, []);

    const clear = () => {
        setInput("");
        setValue("");
    }

    return (
        <div className='flex g-0'>
            <input
                placeholder='Search file name'
                className='input !rounded-l-[100px] sm:w-[400px] !rounded-r-0'
                value={input}
                onChange={onChange}
            />
            <button className='px-[15px] bg-border rounded-r-[100px] cursor-pointer' onClick={clear}>
                {input.length > 0 ? <FaTimes /> : <FaSearch />}
            </button>  
        </div>
    )
}

export default QueryInputText