"use client"

import MainButton from '@/components/buttons/MainButton';
import ItemHeader from '@/components/files/ItemHeader';
import Loading from '@/components/ui/Loading';
import { useToast } from '@/hooks/contextHooks';
import useDownloadLink from '@/hooks/fileHooks/file/useDownloadLink';
import usePreviewLink from '@/hooks/fileHooks/file/usePreviewLink';
import { Item } from '@/types/Entities';
import { throwAxiosError } from '@/utils/forms';
import { link } from 'fs';
import React, { use, useCallback, useEffect, useLayoutEffect, useState } from 'react'
import { FaDownload, FaUpload } from 'react-icons/fa6';
import { ChangeEvent } from 'react';
import RightBar from '@/components/files/RightBar';
import useUpdateFile from '@/hooks/fileHooks/file/useUpdateFile';
import Error from '@/components/errors/Error';
import { isAxiosError } from 'axios';
import { useItem } from '@/app/(items)/layout';

const FileComponent = () => {

    const {item, error, filePreviewLink, dispatch} = useItem();

    const toast = useToast();

    const fetchDownloadLink = useDownloadLink();
    const postFile = useUpdateFile();

    usePreviewLink();

    const downloadAction = useCallback(() => {
        if (!item) return;
        fetchDownloadLink(item.id)
        .then(downloadLink => {
            const link = document.createElement("a");
            link.href = downloadLink;
            link.download = item?.name;
            link.style.display = "none";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        })
        .catch(err => {
            throwAxiosError(err, toast)
        })
    }, [item])

    const postFileAction = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        if (!item) return;
        postFile(e.target.files, item.id)
            .catch(err => throwAxiosError(err, toast))
    }, [item])

    if (error){
        return <Error message={error}/>
    }

    return (
        <div className='flex flex-col sm:flex-row max-w-[1400px] mx-auto px-[20px] pb-[50px] gap-[40px]'>
            <div className='w-full'>
                <ItemHeader/>

                <div className='w-full border-1 border-accent rounded-[10px] mx-auto mt-[20px]'>
                    <div className='flex items-center justify-center sm:justify-end gap-[20px] border-b-1 border-b-accent rounded-t-[10px] p-4 px-[40px]'>
                        <MainButton size='SMALL' onClick={downloadAction}>
                            <FaDownload/> Download
                        </MainButton>

                        <label htmlFor='file' className='button !border-1 h-full text-center !py-[3px] flex gap-2 items-center justify-center !text-[14px]'>
                                Upload file 
                                <FaUpload/>
                        </label>
                        <input id='file' type="file" hidden onChange={postFileAction} />
                    </div>

                    {item && filePreviewLink ? <embed 
                        src={filePreviewLink} 
                        type={item.fileType}
                        className='w-full sm:w-full sm:h-[600px] mx-auto object-contain text-accent bg-background rounded-b-[10px]'
                        color='red'
                    /> : <Loading className='pw-[200px] py-[100px]'/>}
                </div>
            </div>

            <RightBar/>
        </div>
    )
}

export default FileComponent