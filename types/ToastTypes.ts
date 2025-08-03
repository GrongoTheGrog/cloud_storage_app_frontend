export type ToastPossibleTypes = "WARNING" | "ERROR" | "SUCCESS"

export type ToastType = {
    type: ToastPossibleTypes
    message: string,
    status?: number | null
}

export type ToastContextType = {
    toast: ToastType | null,
    setToast: (toast: ToastType) => void
}