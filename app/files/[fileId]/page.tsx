"use client"

import MainButton from '@/components/buttons/MainButton';
import ItemHeader from '@/components/files/ItemHeader';
import Loading from '@/components/ui/Loading';
import { useToast } from '@/hooks/contextHooks';
import useDownloadLink from '@/hooks/fileHooks/useDownloadLink';
import useFetchFile from '@/hooks/fileHooks/useFetchFile';
import usePostFile from '@/hooks/fileHooks/usePostFile';
import usePreviewLink from '@/hooks/fileHooks/usePreviewLink';
import { Item } from '@/types/Entities';
import { throwAxiosError } from '@/utils/forms';
import { link } from 'fs';
import React, { use, useCallback, useEffect, useState } from 'react'
import { FaDownload, FaUpload } from 'react-icons/fa6';
import { ChangeEvent } from 'react';
import RightBar from '@/components/files/RightBar';
import useUpdateFile from '@/hooks/fileHooks/useUpdateFile';


const page = ({params}: {params: Promise<{fileId: number}>}) => {

    const {fileId} = use(params);
    const [file, setFile] = useState<Item>();
    const [fileLink, setFileLink] = useState();
    const toast = useToast();

    const fetchDownloadLink = useDownloadLink();
    const fetchPreviewLink = usePreviewLink();
    const postFile = useUpdateFile();

    const fetchFile = useFetchFile();

    const fetchPreviewLinkAction = () => {
        fetchFile(fileId)
        .then(setFile)
        .catch(err => throwAxiosError(err, toast));
    }

    useEffect(() => {
        fetchPreviewLinkAction();
    }, [fileId])

    useEffect(() => {
        fetchPreviewLink(fileId)
        .then((link) => {
            setFileLink(link);
        })
        .catch(err => throwAxiosError(err, toast))
    }, [fileId])

    const downloadAction = useCallback(() => {
        if (!file) return;
        fetchDownloadLink(fileId)
        .then(downloadLink => {
            const link = document.createElement("a");
            link.href = downloadLink;
            link.download = file?.name;
            link.style.display = "none";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        })
        .catch(err => {
            console.log(err);
            throwAxiosError(err, toast)
        })
    }, [file])

    const postFileAction = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        console.log("check1")
        if (!file) return;
        console.log("check2")
        postFile(e.target.files, file.id)
            .then(() =>
                fetchPreviewLinkAction()
            )
            .catch(err => throwAxiosError(err, toast))
    }, [file])

    return (
        <div className='flex flex-col sm:flex-row max-w-[1200px] mx-auto px-[20px] pb-[50px] gap-[20px]'>
            <div className='w-full'>
                <ItemHeader item={file} setItem={setFile}/>

                <div className='w-full border-1 border-accent rounded-[10px] mx-auto mt-[20px]'>
                    <div className='flex items-center justify-end gap-[20px] border-b-1 border-b-accent rounded-t-[10px] p-4 px-[40px]'>
                        <MainButton size='SMALL' onClick={downloadAction}>
                            <FaDownload/> Download
                        </MainButton>

                        <label htmlFor='file' className='button !border-1 h-full text-center !py-[3px] flex gap-2 items-center justify-center !text-[14px]'>
                                Upload file 
                                <FaUpload/>
                        </label>
                        <input id='file' type="file" hidden onChange={postFileAction} />
                    </div>

                    {file ? <embed 
                        src={fileLink} 
                        type={file.fileType}
                        className='sm:w-full sm:h-[600px] mx-auto object-contain text-accent bg-background rounded-b-[10px]'
                        color='red'
                    /> : <Loading className='pw-[200px] py-[100px]'/>}
                </div>
            </div>

            <RightBar item={file}/>
        </div>
    )
}

export default page