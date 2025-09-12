"use client"

import FileComponent from '@/components/files/File'
import useGetFile from '@/hooks/fileHooks/file/useGetFile'
import React, { use } from 'react'

const page = ({params}: {params: Promise<{id: string}>}) => {

    const fileParams = use(params);
    useGetFile(fileParams.id);

    return (
        <FileComponent/>
    )
}

export default page