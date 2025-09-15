import { useToast } from '@/hooks/contextHooks';
import useSharingUsers from '@/hooks/sharing/useSharingUsers';
import { Item, User } from '@/types/Entities';
import { throwAxiosError } from '@/utils/forms';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Toast from '../ui/Toast';
import useFetchUserByEmail from '@/hooks/userHooks/useFetchUserByEmail';
import Toggle from '../input/Toggle';
import { FaCopy } from 'react-icons/fa6';
import { time } from 'console';
import usePopup from '@/hooks/usePopup';
import useItemVisibility from '@/hooks/fileHooks/file/useItemVisibility';
import MainButton from '../buttons/MainButton';

const SharingSection = ({item}: {item: Item}) => {

    const [alreadySharingUsers, setAlreadySharingUsers] = useState<User[]>();
    const [message, setMessage] = useState(<><FaCopy/> Copy link </>);
    const [isPublic, setIsPublic] = useState(item.isPublic);
    const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

    const fetchSharingUsers = useSharingUsers();
    const fetchUserByEmail = useFetchUserByEmail();
    const changeItemVisibility = useItemVisibility();
    const toast = useToast();
    const popup = usePopup();

    useEffect(() => {
        fetchSharingUsers()
        .then(setAlreadySharingUsers)
        .catch(err => throwAxiosError(err, toast));
    }, [])

    const clickCopy = () => {
        const domain = process.env.NEXT_PUBLIC_DOMAIN;
        const link = domain + (item.type == "FILE" ? "/files/" : "/folders/") + item.id;

        navigator.clipboard.writeText(link)
        .then(() => {


            if (!timeout.current){
                toast.setToast({
                    message: `Copied ${link}.`,
                    status: null,
                    type: "SUCCESS"
                })
            }

            if (timeout.current){
                clearTimeout(timeout.current);
            }

            setMessage(<>Link copied!</>);

            timeout.current = setTimeout(() => {
                setMessage(<><FaCopy/> Copy link </>);
                timeout.current = null;
            }, 6000)
        })
        .catch(() => {
            toast.setToast({
                message: `Failed to copy link.`,
                status: null,
                type: "ERROR"
            })
        })
    }

    const setPublicAction = useCallback((toggle: () => void) => {
        if(!isPublic){
            popup.activate({
                title: "Public item",
                subtitle: "Are you sure you want to make that item public?",
                mainText: "By turning an item public, everyone will be able to view it. If it's a folder, all items inside the folder will also turn public.",
                type: "WARNING",
                action: () => {
                    changeItemVisibility(item.id, true)
                    .then(() => {
                        setIsPublic(true);
                        toggle();
                    })
                    .catch(() => {});           
                }
            })
        }else{
            changeItemVisibility(item.id, false)
            .then(() => {
                setIsPublic(false);
                toggle();
            })
            .catch(err => {});
            
        }
    }, [isPublic])

    return (
        <div className='flex flex-col gap-[15px] px-3'>

            <MainButton onClick={clickCopy} size='SMALL' centered className='!hover:bg-foreground'>
                {message}
            </MainButton>

            <div className='flex justify-between items-center'>
                <span className='font-16-bold'>
                    Public
                </span>

                <Toggle preActivated={isPublic} action={setPublicAction}/>
            </div>
        </div>
    )
}

export default SharingSection