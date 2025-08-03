"use client"
import { AuthContextType, AuthContextProviderType } from '@/types/AuthTypes';
import React, { useContext, useState } from 'react'
import { createContext } from 'react'

const AuthContext = createContext<AuthContextProviderType>({
    auth: null,
    setAuth: (): void => {}
});

export function useAuth(): AuthContextProviderType{
    return useContext(AuthContext);
}

const AuthProvider = ({children}: React.PropsWithChildren) => {

    const [authState, setAuthState] = useState<AuthContextType>({
            username: null,
            picture: null,
            id: null,
            email: null
    });

    const context: AuthContextProviderType = {
        auth: authState,
        setAuth: (auth: AuthContextType) => setAuthState(auth)
    }

    return (
        <AuthContext.Provider value={context}>
            {children}
        </AuthContext.Provider>
    )
}



export default AuthProvider