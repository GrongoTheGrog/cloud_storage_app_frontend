"use client"

import MainButton from '@/components/buttons/MainButton';
import FileCard from '@/components/files/FileCard';
import FileGrid from '@/components/files/FileGrid';
import QueryInputText from '@/components/files/QueryInputText';
import Tags from '@/components/files/Tags';
import FormTextInput from '@/components/input/FormTextInput';
import Loading from '@/components/ui/Loading';
import { useToast } from '@/hooks/contextHooks';
import useCreateFolder, { useCreateFolderPopup } from '@/hooks/fileHooks/useCreateFolder';
import useDeleteFile, { useDeletePopup } from '@/hooks/fileHooks/useDeleteFile';
import useFetchFolder from '@/hooks/fileHooks/useFetchFolder';
import usePostFile from '@/hooks/fileHooks/usePostFile';
import useRenameFile, { useRenameFilePopup } from '@/hooks/fileHooks/useRenameFile';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import usePopup from '@/hooks/usePopup';
import axios from '@/lib/axios';
import { formatSize, isColorDark } from '@/lib/FileFunctions';
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

    const folders = useMemo(() => {
        const folders = [];
        let current = folder;
        let i = 0;
        while(current && current.id && i < 3){
            folders.unshift(current);
            current = current.folder;
            i++
        }
        return folders;
    }, [folder])

    const size = useMemo(() => {
        return formatSize(folder?.size);
    }, [folder])

    useEffect(() => {
        if (folder?.storedFiles){
            setItems(folder.storedFiles.filter(item => item.name.includes(queryInput)));
        }
    }, [queryInput, folder])


    return !folder ? 
    <Loading/> :
    (   
        <section className='flex max-w-[1200px] mx-auto gap-[20px] pb-[500px] sm:mb-0'>
            <section className='px-[20px] flex-1 mx-auto'>
                <div className='flex flex-col gap-1'>
                    <div className='flex flex-col gap-1 sm:flex-row justify-between'>
                        <div className='flex sm:gap-[45px] gap-[15px] items-center text-[18px] sm:text-[25px font-bold]'>
                            <Link href={"root"}>
                                <FaFolder className='size-[25px] sm:size-[32px]'/>
                            </Link>

                            {folders.length < 3 ? null : 
                            <Link href={folders.at(folders.length - 1)!.id.toString()}>
                                /...
                            </Link>}

                            {folders.map(folder => 
                                <Link href={folder.id.toString()} key={folder.id} className='font-bold'>
                                    /{folder.name}
                                </Link>
                            )}
                        </div>

                        <span className='flex items-center gap-[20px] font-medium'>
                            <span>
                                Items: {folder?.storedFiles?.length || 0}
                            </span>
                            
                            <span>
                                Size: {size}
                            </span>
                        </span>
                    </div>

                    <Tags tagJoins={folder.tagJoins} className='mt-2 sm:hidden'/>

                    
                    <div className="static flex gap-2 justify-between items-baseline bg-background p-2 rounded-[20px] mt-2">

                        <div className='flex gap-2 sm:flex-row flex-col w-fit'>
                            <label htmlFor='file' className='button h-full text-center !py-[3px] flex gap-2 items-center justify-center !text-[14px]'>
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
                    <FileGrid selected={selectedItems} setSelected={setSelectedItems} items={items} className='mb-[50px]'/>
                </div>
            </section>

            <section className='w-[200px] hidden sm:flex flex-col gap-[12px] item'>
                <span className='font-20-bold'>
                    Tags
                </span>
                <span className='font-14-regular leading-4'>
                    Here you can attach your own custom tags.
                </span>
                <Tags tagJoins={folder.tagJoins}/>
            </section>

        </section>
    )
}

export default page