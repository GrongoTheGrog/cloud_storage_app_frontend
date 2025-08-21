"use client"

import MainButton from '@/components/buttons/MainButton';
import FileCard from '@/components/files/FileCard';
import FileGrid from '@/components/files/FileGrid';
import QueryInputText from '@/components/files/QueryInputText';
import Tags from '@/components/files/Tags';
import FormTextInput from '@/components/input/FormTextInput';
import Loading from '@/components/ui/Loading';
import { useToast } from '@/hooks/contextHooks';
import useDeleteFile from '@/hooks/fileHooks/useDeleteFile';
import useFetchFolder from '@/hooks/fileHooks/useFetchFolder';
import usePostFile from '@/hooks/fileHooks/usePostFile';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import { formatSize, isColorDark } from '@/lib/FileFunctions';
import { Folder, Item } from '@/types/Entities';
import { throwAxiosError } from '@/utils/forms';
import Link from 'next/link';
import { ChangeEvent, use, useEffect, useMemo, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { FaFilter, FaFolder, FaPlus, FaUpload } from 'react-icons/fa6';


const page = ({params}: {params: Promise<{folderId: string}>}) => {

    const {folderId} = use(params);
    const [folder, setFolder] = useState<Folder>();
    const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set());
    const [queryInput, setQueryInput] = useState("");
    const [items, setItems] = useState<Item[]>([]);

    const toast = useToast();

    const fetchFolder = useFetchFolder();
    const postFile = usePostFile();
    const deleteFiles = useDeleteFile();

    const deleteFileAction = () => {
        toast.setToast({
            message: "Deleting files...",
            status: null,
            type: "WARNING"
        })

        deleteFiles(selectedItems).then(async () => {
            const folder = await fetchFolder(folderId);
            setFolder(folder);

            toast.setToast({
                message: "Items deleted successfuly.",
                status: null,
                type: "SUCCESS"
            })
        })
    }

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
        <section className='flex max-w-[1200px] mx-auto gap-[20px]'>
            <section className='px-[20px] flex-1 mx-auto'>
                <div className='flex flex-col gap-1'>
                    <div className='flex flex-col gap-1 sm:flex-row justify-between'>
                        <div className='flex gap-[15px] items-center'>
                            <Link href={"root"}>
                                <FaFolder className='size-[25px]'/>
                            </Link>

                            {folders.length < 3 ? null : 
                            <Link href={folders.at(folders.length - 1)!.id.toString()}>
                                /...
                            </Link>}

                            {folders.map(folder => 
                                <Link href={folder.id.toString()} key={folder.id} className='font-bold text-[18px]'>
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

                    <div className='mt-[20px] flex justify-around w-fit mx-auto gap-6'>
                        <QueryInputText setValue={setQueryInput}/>

                        <button>
                            <FaFilter className='size-[20px]'/>
                        </button>
                    </div>


                    <FileGrid selected={selectedItems} setSelected={setSelectedItems} items={items} className='mb-[50px]'/>

                    <div className='flex gap-2'>
                        <label htmlFor='file' className='button h-full text-center'>
                            Upload file
                        </label>
                        <input id='file' type="file" hidden onChange={postFileAction} />

                        <MainButton submit={false} className='h-fit' onClick={deleteFileAction}>
                            Delete file{selectedItems.size > 1 ? "s" : ""}
                        </MainButton>
                    </div>
                </div>
            </section>

            <section className='w-[200px] hidden sm:flex flex-col gap-[12px]'>
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