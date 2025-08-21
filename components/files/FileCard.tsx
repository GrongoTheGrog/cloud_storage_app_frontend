import { formatSize, getIcon } from '@/lib/FileFunctions'
import { Folder, Item } from '@/types/Entities'
import React, { ReactNode, use, useMemo } from 'react'
import { IconType } from 'react-icons'
import { FaBusinessTime, FaClock, FaFile, FaFileImage, FaFilePdf, FaFolder } from 'react-icons/fa6'
import UserImage from '../user/UserImage'
import { formatDateHour } from '@/lib/time'
import Link from 'next/link'
import Tags from './Tags'



const FileCard = ({item, selected, onClick}: {item: Item, selected?: boolean, onClick: (item: Item) => void}) => {

    const selectedClass = selected ? "!border-foreground" : "";
    
    const Icon = item.type == "FILE" ? getIcon(item!.fileType) : FaFolder; 

    const date = useMemo(() => {
        return formatDateHour(item.updated_at);
    }, [item]);

    const size = useMemo(() => {
        return formatSize(item.size);
    }, [item])

    const link = `/${item.type.toLowerCase()}s/${item.id}`

    return (
        <div 
        className={`w-full flex sm:flex-col bg-border border-[2px] sm:border-[3px] border-background px-[10px] py-[8px] rounded-[5px] gap-[10px] items-center box-border ${selectedClass}`} onClick={() => onClick(item)}>
            <Icon className='size-[35px] sm:hidden'/>
            <div className='flex flex-col justify-around w-full'>
                <div className='flex items-center gap-4'>
                    <Icon className='size-[34px] hidden sm:block'/>
                    <div className='flex sm:flex-col justify-between w-full'>
                        <Link className='font-16-bold hover:underline cursor-pointer overflow-ellipsis line-clamp-1 break-all' href={link} onClick={(e) => e.stopPropagation()}>
                            {item.name}
                        </Link>

                        <span className='font-14-regular'>
                            {size}
                        </span>
                    </div>
                </div>
                

                <div className='flex sm:flex-col sm:gap-1 sm:items-start sm:mt-2 w-full gap-8 items-center'>
                    <div className='flex gap-2 items-center'>
                        <UserImage src={item.owner.picture} width={24} height={24}/>

                        <span className='line-clamp-1 overflow-ellipsis'>
                            {item.owner.username}
                        </span>
                    </div>

                    <span className='flex items-center gap-2'>
                        <FaClock className='size-[14px]'/>

                        <span>
                            {date}
                        </span>
                    </span>
                </div>

                <Tags tagJoins={item.tagJoins} className='!hidden sm:flex'/>
            </div>
        </div>
    )
}

export default FileCard