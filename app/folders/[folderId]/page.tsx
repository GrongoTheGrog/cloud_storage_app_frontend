"use client"

import MainButton from '@/components/buttons/MainButton';
import FileGrid from '@/components/files/FileGrid';
import ItemHeader from '@/components/files/ItemHeader';
import QueryInputText from '@/components/files/QueryInputText';
import RightBar from '@/components/files/RightBar';
import Tags from '@/components/tags/Tags';
import Loading from '@/components/ui/Loading';
import { useToast } from '@/hooks/contextHooks';
import useCreateFolder, {useCreateFolderPopup} from '@/hooks/fileHooks/folder/useCreateFolder';
import useDeleteFile, { useDeletePopup } from '@/hooks/fileHooks/file/useDeleteFile';
import useFetchFolder from '@/hooks/fileHooks/folder/useFetchFolder';
import usePostFile from '@/hooks/fileHooks/file/usePostFile';
import useRenameFile, { useRenameFilePopup } from '@/hooks/fileHooks/file/useRenameFile';
import usePopup from '@/hooks/usePopup';
import { Folder, Item } from '@/types/Entities';
import { throwAxiosError } from '@/utils/forms';
import { ChangeEvent, use, useCallback, useEffect, useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { FaFilter, FaFolderPlus, FaTrash, FaUpload } from 'react-icons/fa6';
import { useFilter } from '@/context/FilterContext';
import { access } from 'fs';
import FolderComponent from '@/components/files/Folder';


const page = ({params}: {params: Promise<{folderId: string}>}) => {

    const {folderId} = use(params);
    const [folder, setFolder] = useState<Folder>();
    const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set());
    const [queryInput, setQueryInput] = useState("");
    const [items, setItems] = useState<Item[]>([]);
    const [filteredItems, setFilteredItems] = useState<Item[]>([]);

    
    const {filter, setShowFilter, filterObject, dispatchFilter} = useFilter();

    const toast = useToast();
    const popup = usePopup();

    const fetchFolder = useFetchFolder();

    useEffect(() => {
        const fetch = async () => {
            const folder = await fetchFolder(folderId);
            if (!folder) return;
            setFolder(folder);
            setItems(prev => folder.storedFiles)
        }
        fetch();
    }, []);

    return (
        <FolderComponent folder={folder}  setFolder={setFolder} updateItems createItems rightBar/>
    )
}

export default page