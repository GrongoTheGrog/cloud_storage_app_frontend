


import React, { Dispatch, ReactNode, SetStateAction, useState } from 'react'
import { FaCheck } from 'react-icons/fa6';

const CheckBoxContent = ({children, setSelected, value, preSelected}: {children: ReactNode, setSelected: Dispatch<SetStateAction<Set<any>>>, value: any, preSelected: boolean}) => {

    const [isSelected, setIsSelected] = useState(preSelected);

    const click = () => {
        setSelected(prev => {
            if (isSelected){
                prev.delete(value);
            }else{
                prev.add(value);
            }

            return new Set(prev);
        });
        setIsSelected(prev => !prev);
    }

    return (
        <div className='flex gap-3 items-center'>
            <div className={`flex text-white justify-center items-center cursor-pointer w-[18px] aspect-square border-1 border-accent rounded-[5px] ${isSelected && "bg-accent"}`} onClick={click}>
                {isSelected && <FaCheck size={12}/>}
            </div>
            
            {children}  
        </div>
    )
}

export default CheckBoxContent