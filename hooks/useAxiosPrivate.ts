
import { useAuth, useToast } from '@/hooks/contextHooks';
import { axiosPrivate } from '@/lib/axios';
import React, { useEffect } from 'react'
import useRefreshToken from './authHooks/useRefreshToken';
import { useRouter } from 'next/navigation';

const useAxiosPrivate = () => {
    
    const {auth, setAuth, setAccessToken} = useAuth();
    const refresh = useRefreshToken();
    const router = useRouter();
    const toast = useToast();

    useEffect(() => {

        const requestInterceptor = axiosPrivate.interceptors.request.use(
            config => {
                const accessToken = auth?.accessToken;

                if (!config.headers.Authorization) {
                    console.log(`Attaching access token ${accessToken} to request.`);
                    config.headers.Authorization = `Bearer ${accessToken}`;
                }

                config.headers.set("X-XSRF-TOKEN", auth?.csrf);


                return config;
            },
            error => error
        )

        const responseInterceptor = axiosPrivate.interceptors.response.use(
            request => request,
            async error => {
                const prevRequest = error.config;
                if (error.response.data.refreshNeeded && !prevRequest?.sent){
                    try{
                        prevRequest.sent = true;
                        const newAccessToken = await refresh();
                        console.log("Access token " + newAccessToken)
                        prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                        return axiosPrivate(prevRequest);
                    }catch(err){
                        toast.setToast({
                            message: "Your session expired.",
                            status: 403,
                            type: "WARNING"
                        })

                        setAuth({
                            email: null,
                            username: null,
                            id: null,
                            picture: null
                        }, null);
                        router.push("/login")
                        console.log("Error trying to refresh.");
                    }
                }

                return Promise.reject(error);
            }
        )

        return () => {
            axiosPrivate.interceptors.response.eject(responseInterceptor);
            axiosPrivate.interceptors.request.eject(requestInterceptor);
        }
    }, [auth])

    return axiosPrivate;
}

export default useAxiosPrivate