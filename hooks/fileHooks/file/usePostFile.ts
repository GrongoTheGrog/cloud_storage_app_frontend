import useAxiosPrivate from '../../useAxiosPrivate'
import { useToast } from '../../contextHooks'
import { throwAxiosError } from '@/utils/forms'
import { useItem } from '@/app/(items)/layout'

const usePostFile = () => {
    const api = useAxiosPrivate();
    const toast = useToast();
    const {dispatch} = useItem();
    
    return async (file: File | null | undefined, folderIdString: string) => {
        const folderId = folderIdString === "root" ? null : folderIdString;
        if (!file) {
            toast.setToast({
                message: "User must select a file",
                status: null,
                type: "ERROR"
            })
            return;
        }

        const formData = new FormData();
        formData.append("file", file);
        if (folderId) {
            formData.append("folderId", folderId);
        }

        try{
            toast.setToast({
                message: "Sending file...",
                status: null,
                type: "WARNING"
            })

            const file = await api.post("/api/files", formData, {headers: {"Content-Type": "multipart/form-data"}})
            
            toast.setToast({
                message: "File uploaded.",
                status: null,
                type: "SUCCESS"
            })

            dispatch({type: "ADD_TO_ITEMS", payload: file.data})
        }catch(err){
            throwAxiosError(err, toast);
        }
    }

    
}

export default usePostFile