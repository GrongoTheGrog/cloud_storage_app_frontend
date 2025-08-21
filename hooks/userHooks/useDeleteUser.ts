import useAxiosPrivate from '../useAxiosPrivate'
import { useAuth, useToast } from '../contextHooks';
import { throwAxiosError } from '@/utils/forms';

const useDeleteUser = () => {

    const axios = useAxiosPrivate();
    const toast = useToast();
    const auth = useAuth();

    return async (userId: number) => {  
        toast.setToast({
            message: "Deleting account...",
            status: null,
            type: "WARNING"
        })
        axios.delete(`/api/user/${userId}`)
            .then(() => {
                toast.setToast({
                    message: "Account deleted successfully.",
                    status: null,
                    type: "WARNING"
                });
                auth.logout();  
            })
            .catch(err => throwAxiosError(err, toast));
    }
}

export default useDeleteUser