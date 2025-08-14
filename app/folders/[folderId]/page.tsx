"use client"

import FileCard from '@/components/files/FileCard';
import FormTextInput from '@/components/input/FormTextInput';
import Loading from '@/components/ui/Loading';
import { useToast } from '@/hooks/contextHooks';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import { Folder, Item } from '@/types/Entities';
import { throwAxiosError } from '@/utils/forms';
import Link from 'next/link';
import { use, useEffect, useMemo, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { FaCloudRain, FaFilter, FaFolder } from 'react-icons/fa6';


const page = ({params}: {params: Promise<{folderId: string}>}) => {

    const {folderId} = use(params);
    const api = useAxiosPrivate();
    const toast = useToast();
    const [folder, setFolder] = useState<Folder>();

    useEffect(() => {
        const fetch = async () => {
            try {
                const folder = await api.get("/api/folders/" + folderId);               
                setFolder(folder.data);
            }catch(err){
                throwAxiosError(err, toast);
            }
        }
        fetch();
    }, []);

    const folders = useMemo(() => {
        const folders = [];
        let current = folder;
        let i = 0;
        while(current && current.id && i < 3){
            folders.push(current);
            current = current.folder;
            i++
        }
        return folders;
    }, [folder])

    console.log(folder?.storedFiles);

    return !folder ? 
    <Loading/> :
    (
        <section className='px-[20px]'>
            <div className='flex flex-col gap-1'>
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
                        Size: {folder?.size} bytes
                    </span>
                    
                </span>
                

                <form className='mt-[20px] flex justify-around'>
                    <div className='flex g-0'>
                        <FormTextInput
                            password={false}
                            placeholder='Search file name'
                            name='filename'
                            className='rounded-l-[100px]'
                        />
                        <button className='px-[15px] bg-border rounded-r-[100px]'>
                            <FaSearch/>
                        </button>  
                    </div>
                    

                    <button>
                        <FaFilter className=''/>
                    </button>
                </form>


                <div className='flex flex-col gap-[5px] mt-[80px]'>
                    {folder.storedFiles && folder.storedFiles.length ?
                    folder?.storedFiles.map(item => 
                        <FileCard item={item} key={item.id}/>
                    ) : 
                    <div className='mx-auto flex items-center flex-col gap-[15px]'>
                        <FaCloudRain className='size-[75px]'/>
                        <span className='text-center font-16-bold'>
                            No files uploaded yet
                        </span>
                    </div>
                    }
                </div>
            </div>
        </section>

    )
}

export default page