import React, { Dispatch, SetStateAction } from 'react'

import MainButton from '@/components/buttons/MainButton';
import FileGrid from '@/components/files/FileGrid';
import ItemHeader from '@/components/files/ItemHeader';
import QueryInputText from '@/components/files/QueryInputText';
import RightBar from '@/components/files/RightBar';
import { useToast } from '@/hooks/contextHooks';
import useCreateFolder, {useCreateFolderPopup} from '@/hooks/fileHooks/file/useCreateFolder';
import useDeleteFile, { useDeletePopup } from '@/hooks/fileHooks/file/useDeleteFile';
import usePostFile from '@/hooks/fileHooks/file/usePostFile';
import useRenameFile, { useRenameFilePopup } from '@/hooks/fileHooks/file/useRenameFile';
import usePopup from '@/hooks/usePopup';
import { Item } from '@/types/Entities';
import { throwAxiosError } from '@/utils/forms';
import { ChangeEvent, use, useCallback, useEffect, useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { FaFilter, FaFolderPlus, FaTrash, FaUpload } from 'react-icons/fa6';
import { useFilter } from '@/context/FilterContext';
import FilterDisplay from '../ui/FilterDisplay';
import { useItem } from '@/app/(items)/layout';

type Props = {
    rightBar?: boolean;
    createItems?: boolean;
    updateItems?: boolean;
}

const FolderComponent = ({rightBar = false, createItems = false, updateItems = false}: Props) => {

    const {item} = useItem();

    const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set());
    const [items, setItems] = useState<Item[]>(item?.storedFiles || []);
    const [filteredItems, setFilteredItems] = useState<Item[]>([]);

    
    const {filter, setShowFilter, filterObject, dispatchFilter} = useFilter();

    const toast = useToast();
    const popup = usePopup();

    const postFile = usePostFile();

    const deleteFiles = useDeleteFile();
    const deleteFilesPopup = useDeletePopup();
    
    const renameItemPopup = useRenameFilePopup();

    const createFolder = useCreateFolder();
    const createFolderPopup = useCreateFolderPopup();

    const deleteFileAction = useCallback(() => {
        deleteFiles(selectedItems)
        .then(() => {
            const selected = selectedItems.values().toArray();
            setItems(prev => {
                return prev.filter(item => !selected.includes(item.id))
            })
            setSelectedItems(new Set<number>());
        }).catch(err => {
            throwAxiosError(err, toast);
        })
    }, [selectedItems])

    useEffect(() => {
        setFilteredItems(filter(items));
    }, [filterObject, items])


    const createFolderAction = useCallback((folderName: string) => {
        const parentId = item?.id || null;
        createFolder(folderName, parentId)
        .then((folder: Item) => {
            setItems(prev => [...prev, folder])
        }) 
        .catch(err => throwAxiosError(err, toast));

    }, [popup, item])

    const postFileAction = (e: ChangeEvent<HTMLInputElement>) => {
        if (!item) return;
        postFile(e.target.files, item.id ? item.id.toString() : "root")
            .then(file => {
                if (file){
                    setItems(prev => [...prev, file])
                }
            }
        )
    }

    useEffect(() => {
        setItems(item?.storedFiles || []);
    }, [item?.storedFiles])

    return (
        <section className='flex flex-col px-[20px] sm:flex-row max-w-[1400px] mx-auto gap-[40px] pb-[500px]'>
            <section className='flex-1 mx-auto'>
                <div className='flex flex-col gap-1'>

                    <ItemHeader/>
                    
                    <div className="static flex gap-2 justify-between items-baseline bg-background p-2 rounded-[20px] mt-2">

                        {createItems && <div className='flex gap-2 sm:flex-row flex-col w-fit'>
                            <label htmlFor='file' className='button !border-1 h-full text-center !py-[3px] flex gap-2 items-center justify-center !text-[14px]'>
                                Upload file 
                                <FaUpload/>
                            </label>
                            <input id='file' type="file" hidden onChange={postFileAction} />

                            <MainButton size='SMALL' onClick={() => createFolderPopup(createFolderAction)}>
                                <span>Add folder</span>
                                <FaFolderPlus/>
                            </MainButton>
                        </div>}
                        

                        {updateItems && <div className='flex flex-col gap-2 sm:flex-row'>
                            {selectedItems.size > 0 && 
                            <MainButton submit={false} className='h-fit' onClick={() => deleteFilesPopup(deleteFileAction)} size='SMALL' centered color='RED' background>
                                <span>Delete file{selectedItems.size > 1 ? "s" : ""}</span> 
                                <FaTrash/>
                            </MainButton>}

                            {selectedItems.size === 1 &&
                            <MainButton submit={false} centered size='SMALL' onClick={() => renameItemPopup(selectedItems.values().toArray()[0])}>
                                <span>Rename file</span>
                                <FaEdit/>
                            </MainButton>
                            }
                        </div>}

                    </div>

                    <div className='mt-[20px] flex justify-between w-full mx-auto gap-6'>
                        <QueryInputText value={filterObject.name || ""} setValue={(s: string) => {
                            if (!dispatchFilter) return;
                            dispatchFilter({type: "SET_NAME", payload: s})
                        }}/>


                        <div className='flex items-center gap-8'>

                            <button className='cursor-pointer' onClick={() => {
                                setShowFilter && setShowFilter(true) 
                            }}>
                                <FaFilter className='size-[20px]'/>
                            </button>
                        </div>

                        
                    </div>

                    <FilterDisplay/>

                    <FileGrid 
                        selected={selectedItems} 
                        setSelected={setSelectedItems} 
                        items={filteredItems} 
                        className='mb-[50px]'
                        />
                </div>
            </section>

            {rightBar && <RightBar/>}

        </section>
    )
}

export default FolderComponent;