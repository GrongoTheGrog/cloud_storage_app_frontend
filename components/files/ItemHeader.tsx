import React, { Dispatch, SetStateAction, useCallback } from 'react'
import Link from 'next/link'
import { FaCalendar, FaDatabase, FaFile, FaFolder, FaTrash, FaUser } from 'react-icons/fa6'
import { Item } from '@/types/Entities'
import { useMemo } from 'react'
import { formatSize } from '@/lib/FileFunctions'
import TextSk from '../skelletons/TextSk'
import { IconType } from 'react-icons'
import { formatDateHour } from '@/lib/time'
import UserImage from '../user/UserImage'
import useRenameFile, { useRenameFilePopup } from '@/hooks/fileHooks/file/useRenameFile'
import { throwAxiosError } from '@/utils/forms'
import { useToast } from '@/hooks/contextHooks'
import MainButton from '../buttons/MainButton'
import useDeleteFile, { useDeletePopup } from '@/hooks/fileHooks/file/useDeleteFile'
import { useRouter } from 'next/navigation'
import { FaEdit } from 'react-icons/fa'

type Props = {
    item: Item | undefined | null,
    setItem: Dispatch<SetStateAction<Item | undefined>>
}

const ItemHeader = (props: Props) => {

    const {item, setItem} = props;
    const toast = useToast();
    const router = useRouter();

    const deleteFile = useDeleteFile();
    const deleteFilePopup = useDeletePopup()

    const rename = useRenameFile();
    const renamePopup = useRenameFilePopup();

    

    const renameAction = useCallback((newName: string) => {
        rename(item?.id, newName)
        .then(() => {
            setItem(prev => {
                console.log(prev)
                if (prev){
                    return {...prev, name: newName};
                }
                return prev;
            })
        })
        .catch(err => {
            throwAxiosError(err, toast)
            console.error(err);
        })
   }, [item, setItem])

   const deleteAction = useCallback(() => {
        if (!item) return;
        deleteFile(new Set([item?.id]))
        .then(() => router.back())
        .catch(err => {
            throwAxiosError(err, toast);
        });
   }, [item])

    const folders = useMemo(() => {
        const folders = [];
        let current = item;
        let i = 0;
        while(current && current.id && i < 3){
            folders.unshift(current);
            current = current.folder;
            i++
        }
        return folders;
    }, [item])

    const size = useMemo(() => {
        return formatSize(item?.size);
    }, [item])

    return (
        <div className='flex flex-col gap-4'>
            <div className='flex flex-col-reverse sm:flex-row gap-y-[15px] justify-between'>
                <div className='flex sm:gap-[30px] gap-[15px] items-center text-[18px] sm:text-[25px font-bold] font-medium'>
                    <Link href={"/folders/root"}>
                        <FaFolder className='size-[25px] sm:size-[25px]'/>
                    </Link>

                    {folders.length < 3 ? null : 
                    <Link href={"/folders/root"}>
                        /...
                    </Link>}

                    {folders.map(item => 
                        <Link href={"/" + item.type.toLocaleLowerCase() + "s/" + item.id.toString()} key={item.id} className='fo'>
                            /{item.name}
                        </Link>
                    )}
                </div>    

                {item?.id && <div className='flex gap-3'>
                    <MainButton size='SMALL' className='!min-w-0' color='RED' background onClick={() => deleteFilePopup(deleteAction)}>
                        <FaTrash/>
                    </MainButton>

                    <MainButton size='SMALL' className='!min-w-0' onClick={() => renamePopup(renameAction)}>
                        <FaEdit/>
                    </MainButton>
                </div>}
            </div>
            

            <div className='flex flex-col justify-between sm:flex-row rounded-[10px] border-accent border-0 sm:border-1 px-[30px] py-[10px] gap-y-[10px]'>
                <div className='flex flex-col'>
                    <span className='hidden sm:block'>name:</span>
                    <TextSk text={item?.name} className='text-[28px] font-bold'/>
                </div>

                <div className='flex mt-[10px] sm:mt-0 flex-col sm:flex-row gap-x-[15px] sm:gap-x-[40px] gap-y-[4px] w-full sm:w-fit sm:gap-y-[20px] items-center text-[15px]'>
                    <div className='metadata-info'>
                        <span className='flex items-center gap-2'><FaDatabase size={14}/> size:</span>
                        <TextSk text={formatSize(item?.size)}/>
                    </div>

                    {item?.type == "FOLDER" && <div className='metadata-info'>
                        <span className='flex items-center gap-2'><FaFolder size={14}/> items:</span>
                        <TextSk text={item?.storedFiles?.length || "0"}/>
                    </div>}

                    {item?.type == "FILE" && <div className='metadata-info'>
                        <span className='flex items-center gap-2'><FaFile size={14}/> type:</span>
                        <TextSk text={item.fileType}/>
                    </div>}

                    {(item != null && !item.name) && <div className='metadata-info'>
                        <span className='flex items-center gap-2'><FaCalendar size={14}/> Last modified:</span>
                        <TextSk text={formatDateHour(item?.updated_at)}/>
                    </div>}

                    <div className='metadata-info'>
                        <span className='flex items-center gap-2'><FaUser size={14}/> owner:</span>
                        <div className='flex gap-2 items-center'>
                            <UserImage src={item?.owner.picture} width={15} height={15} className='min-w-[20px]'/> 
                            <TextSk text={item?.owner.username}/>
                        </div>
                    </div>

                </div>
                
            </div>
        </div>
    )
}

export default ItemHeader;