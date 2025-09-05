import React, { ChangeEvent, Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from 'react'
import FormTextInput from '../input/FormTextInput'
import { FaSearch, FaTimes } from 'react-icons/fa'

type Props = {
    setValue: (s: string) => void,
    value: string
}

const QueryInputText = ({setValue, value}: Props) => {

    const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);
    const [input, setInput] = useState(value);

    useEffect(() => {
        setInput(value);
    }, [value])

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
                className='input !rounded-l-[5px] !rounded-r-[0px] sm:w-[400px] !border-r-0'
                value={input}
                onChange={onChange}
            />
            <button className='px-[15px] bg-background border-1 border-accent border-l-0 rounded-r-[5px] cursor-pointer' onClick={clear}>
                {input.length > 0 ? <FaTimes /> : <FaSearch />}
            </button>  
        </div>
    )
}

export default QueryInputText