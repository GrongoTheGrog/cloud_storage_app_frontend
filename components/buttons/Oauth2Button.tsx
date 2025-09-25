"use client"

import React, { ReactNode, useCallback } from 'react'
import MainButton from './MainButton'
import { BsGithub } from 'react-icons/bs'
import { BsGoogle } from 'react-icons/bs'
import { IconType } from 'react-icons'
import { useRouter } from 'next/navigation'

const icons: Record<string, IconType> = {
  Google: BsGoogle,
  Github: BsGithub,
};

const Oauth2Button = ({service}: {service: string}) => {

    const router = useRouter();
    const ServiceIcon = icons[service];
    if (!ServiceIcon) throw new Error(`Service "${service}" not supported.`);

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    const onClick = useCallback(() => {
        router.push(backendUrl + "/api/oauth2/login/" + service.toLowerCase());
    }, []);

    return (
        <MainButton className='light-shadow font-20-bold flex justify-center items-center gap-2 py-2' onClick={onClick} submit={false}>
            <ServiceIcon />
            {service}
        </MainButton>
    );
}

export default Oauth2Button