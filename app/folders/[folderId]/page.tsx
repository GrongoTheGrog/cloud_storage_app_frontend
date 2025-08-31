"use client"

import MainButton from '@/components/buttons/MainButton';
import FileGrid from '@/components/files/FileGrid';
import ItemHeader from '@/components/files/ItemHeader';
import QueryInputText from '@/components/files/QueryInputText';
import RightBar from '@/components/files/RightBar';
import Tags from '@/components/files/Tags';
import Loading from '@/components/ui/Loading';
import { useToast } from '@/hooks/contextHooks';
import useCreateFolder, { useCreateFolderPopup } from '@/hooks/fileHooks/useCreateFolder';
import useDeleteFile, { useDeletePopup } from '@/hooks/fileHooks/useDeleteFile';
import useFetchFolder from '@/hooks/fileHooks/useFetchFolder';
import usePostFile from '@/hooks/fileHooks/usePostFile';
import useRenameFile, { useRenameFilePopup } from '@/hooks/fileHooks/useRenameFile';
import usePopup from '@/hooks/usePopup';
import { Folder, Item } from '@/types/Entities';
import { throwAxiosError } from '@/utils/forms';
import Link from 'next/link';
import { ChangeEvent, use, useCallback, useEffect, useMemo, useState } from 'react';
import { FaEdit, FaSearch } from 'react-icons/fa';
import { FaFilter, FaFolder, FaFolderPlus, FaFolderTree, FaPlus, FaTrash, FaUpload } from 'react-icons/fa6';


const page = ({params}: {params: Promise<{folderId: string}>}) => {

    const {folderId} = use(params);
    const [folder, setFolder] = useState<Folder>();
    const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set());
    const [queryInput, setQueryInput] = useState("");
    const [items, setItems] = useState<Item[]>([]);

    const toast = useToast();
    const popup = usePopup();

    const fetchFolder = useFetchFolder();
    const postFile = usePostFile();

    const deleteFiles = useDeleteFile();
    const deleteFilesPopup = useDeletePopup();
    
    const renameItem = useRenameFile();
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

    const renameFileAction = useCallback((newName: string) => {
        const id = selectedItems.values().toArray()[0];

        renameItem(id, newName)
        .then(() => {
            setItems(prev => {
                return prev.map(item => {
                    if (item.id === id){
                        item.name = newName;
                    }

                    return item;
                })
            })
        })
        .catch(err => {
            throwAxiosError(err, toast);
        })

    }, [selectedItems, toast, popup])

    const createFolderAction = useCallback((folderName: string) => {
        console.log(folder?.id);
        const parentId = folder?.id || null;
        createFolder(folderName, parentId)
        .then((folder: Item) => {
            setItems(prev => [...prev, folder])
        }) 
        .catch(err => throwAxiosError(err, toast));

    }, [popup, folder])



    // POST FILE

    const postFileAction = (e: ChangeEvent<HTMLInputElement>) => {
        postFile(e.target.files, folderId)
            .then(file => {
                if (file){
                    setItems(prev => [...prev, file])
                }
            }
        )
    }

    useEffect(() => {
        const fetch = async () => {
            const folder = await fetchFolder(folderId);
            setFolder(folder);
        }
        fetch();
    }, []);

    useEffect(() => {
        if (folder?.storedFiles){
            setItems(folder.storedFiles.filter(item => item.name.includes(queryInput)));
        }
    }, [queryInput, folder])


    return (
        <section className='flex flex-col px-[20px] sm:flex-row max-w-[1200px] mx-auto gap-[20px] pb-[500px]'>
            <section className='flex-1 mx-auto'>
                <div className='flex flex-col gap-1'>

                    <ItemHeader item={folder} setItem={setFolder}/>
                    
                    <div className="static flex gap-2 justify-between items-baseline bg-background p-2 rounded-[20px] mt-2">

                        <div className='flex gap-2 sm:flex-row flex-col w-fit'>
                            <label htmlFor='file' className='button !border-1 h-full text-center !py-[3px] flex gap-2 items-center justify-center !text-[14px]'>
                                Upload file 
                                <FaUpload/>
                            </label>
                            <input id='file' type="file" hidden onChange={postFileAction} />

                            <MainButton size='SMALL' onClick={() => createFolderPopup(createFolderAction)}>
                                <span>Add folder</span>
                                <FaFolderPlus/>
                            </MainButton>
                        </div>
                        

                        <div className='flex flex-col gap-2 sm:flex-row'>
                            {selectedItems.size > 0 && 
                            <MainButton submit={false} className='h-fit' onClick={() => deleteFilesPopup(deleteFileAction)} size='SMALL' centered color='RED' background>
                                <span>Delete file{selectedItems.size > 1 ? "s" : ""}</span> 
                                <FaTrash/>
                            </MainButton>}

                            {selectedItems.size === 1 &&
                            <MainButton submit={false} centered size='SMALL' onClick={() => renameItemPopup(renameFileAction)}>
                                <span>Rename file</span>
                                <FaEdit/>
                            </MainButton>
                            }
                        </div>

                    </div>

                    <div className='mt-[20px] flex justify-around w-fit mx-auto gap-6'>
                        <QueryInputText setValue={setQueryInput}/>

                        <button>
                            <FaFilter className='size-[20px]'/>
                        </button>
                    </div>
                    <FileGrid selected={selectedItems} setSelected={setSelectedItems} items={items} className='mb-[50px]' folder={folder}/>
                </div>
            </section>

            <RightBar item={folder}/>

        </section>
    )
}

export default page