import { AuthContext } from "@/context/AuthProvider";
import { useContext } from "react";
import { AuthContextProviderType } from "@/types/AuthTypes";
import { ToastContext } from "@/context/ToastProvider";
import { ToastContextType } from "@/types/ToastTypes";

export function useAuth(): AuthContextProviderType{
    return useContext(AuthContext);
}

export const useToast = (): ToastContextType => {
    return useContext(ToastContext);
}