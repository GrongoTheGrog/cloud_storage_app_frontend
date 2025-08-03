export type AuthContextType = {
    username: string | null,
    picture: string | null,
    email: string | null,
    id: number | null
}

export type AuthContextProviderType = {
    auth: null | AuthContextType,
    setAuth: (auth: AuthContextType) => void
}