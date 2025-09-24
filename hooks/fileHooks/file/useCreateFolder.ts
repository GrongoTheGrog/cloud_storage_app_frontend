import usePopup from '@/hooks/usePopup'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import { useToast } from '@/hooks/contextHooks'

const useCreateFolder = () => {

    const api = useAxiosPrivate();
    const toast = useToast();

    return async (name: string, parentFolderId: number | null) => {
        toast.setToast({
            message: "Creating folder...",
            status: null,
            type: "WARNING"
        })
        
        const response = await api.post("/api/folders", {
            parentFolderId, 
            name
        });

        toast.setToast({
            message: "Folder created successfully.",
            status: null,
            type: "SUCCESS"
        })

        return response.data;
    }
}


export const useCreateFolderPopup = () => {

    const popup = usePopup();

    const createFolder = async () => {
        
    }

    return (func: (folderName: string) => void) => {
        popup.activate({
            format: "INPUT",
            type: "WARNING",
            title: "Create folder",
            subtitle: "Folder creation",
            mainText: "Enter the folder name in the input box below: ",
            action: func 
        })
    }
}

export default useCreateFolder