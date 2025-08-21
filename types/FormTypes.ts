
export interface LogInFormState {
    email: string;
    password: string;
}

export interface SignonFormState {
    username: string
    email: string;
    password: string;
    confirmPassword: string;
}

export interface ChangePasswordFormState {
    password: string
    confirmPassword: string
}

export interface ResetPasswordFormState {
    email: string
}