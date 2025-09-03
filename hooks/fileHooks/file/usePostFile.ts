import useAxiosPrivate from '../../useAxiosPrivate'
import { useToast } from '../../contextHooks'
import { throwAxiosError } from '@/utils/forms'
import { File } from '@/types/Entities'

const usePostFile = () => {
    const api = useAxiosPrivate();
    const toast = useToast();
    
    return async (fileList: FileList | null, folderIdString: string) => {
        const folderId = folderIdString === "root" ? null : folderIdString;
        if (!fileList || fileList.length === 0) {
            toast.setToast({
                message: "User must select a file",
                status: null,
                type: "ERROR"
            })
            return;
        }

        const file = fileList.item(0);

        if (!file) return;

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

            return file.data;

        }catch(err){
            throwAxiosError(err, toast);
        }
    }

    
}

export default usePostFile