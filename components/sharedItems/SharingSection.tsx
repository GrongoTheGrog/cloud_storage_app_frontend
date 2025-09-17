import { useToast } from '@/hooks/contextHooks';
import useSharingUsers from '@/hooks/sharing/useSharingUsers';
import { Item, SharedItem, User } from '@/types/Entities';
import { throwAxiosError } from '@/utils/forms';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Toast from '../ui/Toast';
import useFetchUserByEmail from '@/hooks/userHooks/useFetchUserByEmail';
import Toggle from '../input/Toggle';
import { FaCopy, FaUserXmark } from 'react-icons/fa6';
import { time } from 'console';
import usePopup from '@/hooks/usePopup';
import useItemVisibility from '@/hooks/fileHooks/file/useItemVisibility';
import MainButton from '../buttons/MainButton';
import { useItem } from '@/app/(items)/layout';
import Loading from '../ui/Loading';
import { userHasPermission } from '@/lib/permission';
import useItemSharingUsers from '@/hooks/sharing/useItemSharingUsers';
import UserImage from '../user/UserImage';
import { FaUserAlt } from 'react-icons/fa';
import FormTextInput from '../input/FormTextInput';
import ShareEditing from './ShareEditing';

const SharingSection = () => {

    const {item} = useItem();

    const [previousSharingUsers, setPreviousSharingUsers] = useState<User[]>([]);
    const [sharingUsers, setSharingUsers] = useState<SharedItem[]>([]);
    const [message, setMessage] = useState(<><FaCopy/> Copy link </>);
    const [isPublic, setIsPublic] = useState(false);
    const [editing, setEditing] = useState(false);

    const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);


    const fetchSharingUsers = useSharingUsers();
    const fetchItemSharingUsers = useItemSharingUsers();

    const changeItemVisibility = useItemVisibility();
    const toast = useToast();
    const popup = usePopup();
    const checkPermission = userHasPermission();

    useEffect(() => {
        setIsPublic(item?.isPublic || false);
    }, [item])

    useEffect(() => {
        fetchSharingUsers()
        .then(setPreviousSharingUsers)
        .catch(err => throwAxiosError(err, toast));
    }, [])

    useEffect(() => {
        fetchItemSharingUsers()
        .then(setSharingUsers)
        .catch(err => throwAxiosError(err, toast));
    }, [item?.id])

    const clickCopy = () => {
        if (!item) return;
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

    const setPublicAction = useCallback(() => {
        if (!item) return;
        console.log(item);
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
                    })
                    .catch(() => {});           
                }
            })
        }else{
            changeItemVisibility(item.id, false)
            .then(() => {
                setIsPublic(false);
            })
            .catch(err => {});
            
        }
    }, [isPublic, item])

    return (
        <div className='flex flex-col gap-[15px] px-3'>

            <MainButton onClick={clickCopy} size='SMALL' centered className='!hover:bg-foreground'>
                {message}
            </MainButton>

            {checkPermission("SHARE") && <div className='flex justify-between items-center'>
                <span className='font-16-bold'>
                    Public
                </span>

                <Toggle preActivated={isPublic} action={setPublicAction}/>
            </div>}

            <div className='flex flex-col !py-[10px] gap-2'>
                {!editing && sharingUsers.length === 0 && (
                    <span className='text-[14px] leading-4 flex flex-col items-center gap-1'>
                        <FaUserXmark size={20}/>
                        The item hasn't been shared
                    </span>
                )}

                {!editing && <div className='flex'>
                    {sharingUsers.slice(0, 5).map(sharedUsers => (
                        <div key={sharedUsers.id}>
                            <UserImage src={sharedUsers.user.picture} width={30} height={30}/>
                        </div>
                    ))}

                    {sharingUsers.length > 5 && (
                        <span>...</span>
                    )}
                </div>}

                {editing && (
                    <ShareEditing alreadySharing={previousSharingUsers} setAlreadySharing={setPreviousSharingUsers} setShared={setSharingUsers} shared={sharingUsers}/>
                )}

                {checkPermission("SHARE") && <MainButton size='SMALL' centered background onClick={() => setEditing(prev => !prev)} className='mt-2'>
                    {editing ? "Close" : "Manage"}
                </MainButton>}
            </div>
        </div>
    )
}

export default SharingSection