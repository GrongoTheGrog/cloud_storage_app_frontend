export type AuthType = {
    username: string | null,
    picture: string | null,
    email: string | null,
    id: number | null,
}

export type AuthContextType = AuthType & {
    accessToken: string | null,
}

export type AuthContextProviderType = {
    auth: null | AuthContextType,
    setAuth: (auth: AuthType) => void,
    setAccessToken: (token: string) => void,
    accessToken: string | null,
    logout: () => void
}
