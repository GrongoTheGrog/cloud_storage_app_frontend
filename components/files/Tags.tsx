import { TagJoin } from '@/types/Entities';
import React from 'react'
import { isColorDark } from '@/lib/FileFunctions';
import { FaPlus } from 'react-icons/fa6';

const Tags = ({tagJoins, className}: {tagJoins: TagJoin[] | null | undefined, className?: string}) => {


    return (
        <div className={'flex gap-3 text-[14px] ' + className}>
            {tagJoins && tagJoins.map(tagJoin => {
                const isDark = isColorDark(tagJoin.tag.hex_color);
                return (
                    <div style={{
                        backgroundColor: `#${tagJoin.tag.hex_color}`
                    }} className={`py-[2px] px-[12px] h-fit font-14-regular rounded-[5px] ${isDark ? "text-background" : "text-foreground"}`} key={tagJoin.id}>
                        {tagJoin.tag.name}
                    </div>
                )
            })}
            <div className='flex gap-[6px] h-fit font-medium items-center justify-center rounded-[5px] py-[2px] px-[12px] hover:bg-foreground hover:text-background transition-all duration-200 cursor-pointer'>
                <FaPlus className='size-[16px]'/> Add tag
            </div>
        </div>
    )
}

export default Tags