export type AuthType = {
    username: string | null,
    picture: string | null,
    email: string | null,
    id: number | null,
}

export type AuthContextType = AuthType & {
    accessToken: string | null,
    csrf: string | null
}

export type AuthContextProviderType = {
    auth: null | AuthContextType,
    setAuth: (auth: AuthType, accessToken: string | null) => void,
    setAccessToken: (token: string) => void
}
