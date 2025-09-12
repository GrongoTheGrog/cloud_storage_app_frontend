"use client"

import FolderComponent from '@/components/files/Folder';
import useGetFolder from '@/hooks/fileHooks/file/useGetFolder';
import React, { use } from 'react'

const page = ({params}: {params: Promise<{id: string}>}) => {

    const folderParams = use(params);
    useGetFolder(folderParams.id);

    return (
        <FolderComponent rightBar/>
    )
}

export default page