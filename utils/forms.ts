import { ToastContextType } from "@/types/ToastTypes";
import axios from "axios";

export function throwAxiosError(error: unknown, toast: ToastContextType){
    if (axios.isAxiosError(error)){
        toast.setToast({
            message: error.response?.data.message,
            status: error.status,
            type: "ERROR"
        })
    }else{
        toast.setToast({
            message: "Unknown error. Try again later.",
            status: null,
            type: "ERROR"
        })
    }
}