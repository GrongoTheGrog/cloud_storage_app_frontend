"use client"

import FolderComponent from '@/components/files/Folder';
import useGetFolder from '@/hooks/fileHooks/file/useGetFolder';
import React, { use, useLayoutEffect } from 'react'
import { useItem } from '../../layout';

const page = ({params}: {params: Promise<{id: string}>}) => {

    const folderParams = use(params);
    useGetFolder(folderParams.id);

    return (
        <FolderComponent rightBar createItems updateItems/>
    )
}

export default page;