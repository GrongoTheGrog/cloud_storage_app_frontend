import axios, { AxiosInstance } from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default axios.create({
    baseURL: BASE_URL,
    withCredentials: true
});

export const axiosPrivate: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true
});