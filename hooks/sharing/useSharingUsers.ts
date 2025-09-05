import { User } from "@/types/Entities";
import useAxiosPrivate from "../useAxiosPrivate"


const useSharingUsers = () => {

    const api = useAxiosPrivate();

    return async (): Promise<User[]> => {
        const response = await api.get("/api/user/sharingUsers");
        return response.data
    }
}

export default useSharingUsers