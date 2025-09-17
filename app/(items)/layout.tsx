"use client"

import Error from '@/components/errors/Error';
import File from '@/components/files/File';
import FolderComponent from '@/components/files/Folder';
import Loading from '@/components/ui/Loading';
import useGetItem from '@/hooks/fileHooks/file/useGetFile';
import { Item } from '@/types/Entities'
import { ItemContext, ItemContextPayload } from '@/types/ItemContext';
import { FileRoles } from '@/types/Permissions';
import { error } from 'console';
import { usePathname } from 'next/navigation';
import React, { createContext, ReactNode, use, useContext, useEffect, useReducer, useState } from 'react'

const initialContextPayload: ItemContextPayload = {
    item: null,
    fileRole: null,
    error: null,
    isLoading: true,
    filePreviewLink: null
}


const initialContext: ItemContext = {
    ...initialContextPayload,
    dispatch: (action) => {return initialContextPayload}
    
}

const ItemProvider = createContext(initialContext);

export const useItem = () => {
    return useContext(ItemProvider);
}

export type ActionFiles = 
    {type: "SET_ITEM", payload: Item} | 
    {type: "SET_ERROR", payload: string | null} | 
    {type: "SET_ITEM_NAME", payload: string} | 
    {type: "SET_FILE_ROLE", payload: FileRoles} | 
    {type: "SET_PREVIEW_LINK", payload: string} | 
    {type: "ADD_TO_ITEMS", payload: Item} | 
    {type: "REMOVE_FROM_ITEMS", payload: number} | 
    {type: "RENAME_FROM_ITEMS", payload: {id: number, name: string}} |
    {type: "RESET", payload: null}

const action = (state: ItemContextPayload, {type, payload}: ActionFiles): ItemContextPayload => {
    switch(type){

        case "SET_ERROR": 
            return {...state, error: payload, isLoading: false}

        case "SET_FILE_ROLE": 
            return {...state, fileRole: payload}

        case "SET_ITEM":
            console.log(payload);
            return {...state, item: payload, isLoading: false}

        case "SET_ITEM_NAME":
            if (state.item) {
                return {...state, item: {...state.item, name: payload}}
            }else{
                return state;
            }

        case "SET_PREVIEW_LINK":
            return {...state, filePreviewLink: payload}

        case "ADD_TO_ITEMS":
            if (!state.item) return state;

            return {...state, item: {...state.item, storedFiles: [...state.item.storedFiles, payload]}}

        case "REMOVE_FROM_ITEMS":
            if (!state.item) return state;
            const fileList = state.item?.storedFiles;
            fileList?.filter(item => item.id !== payload);

            return {...state, item: {...state.item, storedFiles: fileList}}

        case "RENAME_FROM_ITEMS":

            if (!state.item) return state;
            const mappedFileList = state.item.storedFiles;
            mappedFileList.map(item => {
                if (item.id === payload.id){
                    item.name = payload.name;
                }
                return item;
            });
            return {...state, item: {...state.item, storedFiles: mappedFileList}}
        
        case "RESET":
            return initialContext;
    }
}

const Layout = ({children}: {children: ReactNode}) => {

    const [state, dispatch] = useReducer(action, initialContextPayload);
    const pathName = usePathname();

    useEffect(() => {
        dispatch({type: "RESET", payload: null});
    }, [pathName])

    if (state.error){
        return <Error message={state.error}/>
    }

    return (
        <ItemProvider.Provider value={{...state, dispatch}}>
            {children}
        </ItemProvider.Provider>
        
    )
}

export default Layout;