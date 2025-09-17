import React, { useEffect } from 'react'
import { useToast } from '../../contextHooks'
import useAxiosPrivate from '../../useAxiosPrivate';
import { useItem } from '@/app/(items)/layout';
import { throwAxiosError } from '@/utils/forms';

const usePreviewLink = () => {

    const api = useAxiosPrivate();
    const toast = useToast();
    const {item, dispatch} = useItem();

    useEffect(() => {
        const fetch = async () => {
            try{
                if (!item?.id) return;
                const response = await api.get("/api/files/preview/" + item.id);
                dispatch({type: "SET_PREVIEW_LINK", payload: response.data});
            }catch(err){
                throwAxiosError(err, toast);
            }
            
        }

        fetch();
    }, [item?.id])
}

export default usePreviewLink