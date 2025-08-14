"use client"
import axios from '@/lib/axios';
import { AuthContextType, AuthContextProviderType, AuthType } from '@/types/AuthTypes';
import React, { useContext, useEffect, useState } from 'react'
import { createContext } from 'react'

export const AuthContext = createContext<AuthContextProviderType>({
    auth: null,
    setAuth: (): void => {},
    setAccessToken: (): void => {}
});

const AuthProvider = ({children}: React.PropsWithChildren) => {


    const [authState, setAuthState] = useState<AuthContextType>({
            username: null,
            picture: null,
            id: null,
            email: null,
            accessToken: null,
            csrf: null
    });

    useEffect(() => {
        const storedUserInfo = localStorage.getItem("UserInfo");

        if (storedUserInfo){
            const parsed: AuthType = JSON.parse(storedUserInfo);
            setAuthState({...parsed, accessToken: null, csrf: null});
        } 

        const fetchCsrfToken = async () => {
            const response = await axios.get("/api/auth/getCsrfToken");
            setAuthState(prev => ({...prev, csrf: response.data.token}))
        }
        fetchCsrfToken();
    }, [])

    const context: AuthContextProviderType = {
        auth: authState,
        setAuth: (auth: AuthType, accessToken: string | null) => {
            localStorage.setItem("UserInfo", JSON.stringify(auth, null, 2));
            setAuthState(prev => ({...prev, ...auth, accessToken}));
        },
        setAccessToken: (token: string) => setAuthState(prev => ({...prev, accessToken: token}))
    }

    return (
        <AuthContext.Provider value={context}>
            {children}
        </AuthContext.Provider>
    )
}



export default AuthProvider