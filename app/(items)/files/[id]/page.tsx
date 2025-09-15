"use client"

import FileComponent from '@/components/files/File'
import useGetFile from '@/hooks/fileHooks/file/useGetFile'
import React, { use, useEffect, useLayoutEffect, useState } from 'react'
import { useItem } from '../../layout'
import Loading from '@/components/ui/Loading'

const Page = ({ params }: { params: Promise<{ id: string }>}) => {
  const { dispatch, isLoading, item } = useItem();
  const [hasStarted, setHasStarted] = useState(false);

  const id = use(params).id;

    useEffect(() => {
        dispatch({ type: "RESET", payload: null });
        setHasStarted(true);
    }, [id]);

    useGetFile(id);

  if (!hasStarted) return <Loading />;
  return <FileComponent />;
};

export default Page