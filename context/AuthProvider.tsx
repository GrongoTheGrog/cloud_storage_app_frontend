"use client"
import { useToast } from '@/hooks/contextHooks';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import axios from '@/lib/axios';
import { AuthContextType, AuthContextProviderType, AuthType } from '@/types/AuthTypes';
import { throwAxiosError } from '@/utils/forms';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react'
import { createContext } from 'react'


const LOCAL_STORAGE_AUTH = "UserInfo";

export const AuthContext = createContext<AuthContextProviderType>({
    auth: null,
    setAuth: (): void => {},
    accessToken: null,
    setAccessToken: (token: string): void => {},
    logout: () => {}
});

const AuthProvider = ({children}: React.PropsWithChildren) => {

    const router = useRouter();
    const toast = useToast();

    const [authState, setAuthState] = useState<AuthContextType>({
            username: null,
            picture: null,
            id: null,
            email: null,
            accessToken: null,
    });

    useEffect(() => {
        const storedUserInfo = localStorage.getItem(LOCAL_STORAGE_AUTH);

        if (storedUserInfo){
            const parsed: AuthType = JSON.parse(storedUserInfo);
            setAuthState({...parsed, accessToken: null});
        } 

        const fetchCsrfToken = async () => {
            const response = await axios.get("/api/auth/getCsrfToken");
            setAuthState(prev => ({...prev, csrf: response.data.token}))
        }
        
        fetchCsrfToken();
    }, [])

    const context: AuthContextProviderType = {
        auth: authState,
        
        setAuth: (auth: AuthType) => {
            localStorage.setItem("UserInfo", JSON.stringify(auth, null, 2));
            setAuthState(prev => ({...prev, ...auth}));
        },

        setAccessToken: (token: string) => setAuthState(prev => ({...prev, accessToken: token})),

        accessToken: authState.accessToken,

        logout: async () => {
            setAuthState({
                accessToken: null,
                username: null,
                id: null,
                picture: null,
                email: null
            })
            localStorage.removeItem(LOCAL_STORAGE_AUTH);
            try{
                console.log("logging out")
                await axios.get("/api/auth/logout");
                router.push("/login");
            }catch(err){
                throwAxiosError(err, toast);
            }
        }
    }

    return (
        <AuthContext.Provider value={context}>
            {children}
        </AuthContext.Provider>
    )
}



export default AuthProvider