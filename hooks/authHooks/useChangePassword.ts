import axios from 'axios';
import { useCallback } from 'react';
import { ChangePasswordFormState } from '@/types/FormTypes';
import useAxiosPrivate from '../useAxiosPrivate';
import { useToast } from '../contextHooks';
import { useRouter } from 'next/navigation';
import { throwAxiosError } from '@/utils/forms';

const useChangePassword = (email: string) => {

    const api = useAxiosPrivate();
    const toast = useToast();
    const router = useRouter();

    const changePasswordRequest = useCallback(async (prevState: ChangePasswordFormState, formData: FormData): Promise<ChangePasswordFormState> => {
        const newState: ChangePasswordFormState = {
            password: "",
            confirmPassword: ""
        }

        const password = formData.get("password");
        const confirmPassword = formData.get("confirmPassword");

        if (!password || !confirmPassword){
            if (!password) newState.password = "Enter the new password, please."
            if (!confirmPassword) newState.confirmPassword = "Enter the confirm password, please."
            return newState;
        }

        if (password != confirmPassword) {
            newState.confirmPassword = "Passwords have to match."
            newState.password = "Passwords have to match."
            return newState;
        }

        try{
            await api.patch("/api/auth/resetPassword", {
                email,
                password
            })

            toast.setToast({
                message: "Password reset successfully.",
                status: 204,
                type: "SUCCESS"
            })

            sessionStorage.removeItem("resetEmail");

            router.push("/login")

        }catch(err){   
            if (axios.isAxiosError(err) && err.response?.data.isFields){
                newState.password = err.response?.data.password;
                console.log(err.response.data);
            }else{
                throwAxiosError(err, toast);
            }
        }finally{
            return newState;
        }
    }, [email])

    return changePasswordRequest
}

export default useChangePassword