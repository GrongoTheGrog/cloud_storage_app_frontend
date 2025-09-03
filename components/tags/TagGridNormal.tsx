import { isColorDark } from '@/lib/FileFunctions';
import { Tag } from '@/types/Entities'
import React from 'react'
import { FaTimes } from 'react-icons/fa';
import Loading from '../ui/Loading';

type Props = {
    selected: Set<number> | undefined;
    userTags: Tag[] | undefined | null
}

const TagGridNormal = ({selected, userTags}: Props) => {

    if (!userTags) return <span>Loading</span>


    if (!selected || selected.size === 0){
        return (
            <div className='flex flex-col items-center gap-2 font-14-medium leading-[16px] text-center mt-[30px]'>
                <FaTimes size={20}/>
                No tags bound to the current item
            </div>
        )
    }



    return (
        <div className='flex flex-wrap gap-3 gap-y-2'>
            {   
                userTags.map(tag => {
                    if (!selected.has(tag.id)) return null;

                    const isDark = isColorDark(tag.hex_color);
                    return (
                        <div key={tag.id} className={`px-[8px] rounded-[5px] w-fit font-bold text-[12px] py-[1px] border-1`} style={{color: tag.hex_color}}>
                            {tag.name}
                        </div>
                    )
                })
            }
            
        </div>
    )
}

export default TagGridNormal