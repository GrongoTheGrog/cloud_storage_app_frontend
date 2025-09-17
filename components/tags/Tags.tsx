import { Item, Tag, TagJoin } from '@/types/Entities';
import React, { useEffect, useState } from 'react'
import { isColorDark } from '@/lib/FileFunctions';
import { FaCheck, FaPlus, FaT, FaTag, FaTicket } from 'react-icons/fa6';
import { FaEdit, FaTimes } from 'react-icons/fa';
import MainButton from '@/components/buttons/MainButton';
import useFetchTags from '@/hooks/tagHooks/useFetchTags';
import { throwAxiosError } from '@/utils/forms';
import Toast from '@/components/ui/Toast';
import { useToast } from '@/hooks/contextHooks';
import TagGridEditing from './TagGridEditing';
import TagGridNormal from './TagGridNormal';
import { useItem } from '@/app/(items)/layout';
import { userHasPermission } from '@/lib/permission';

const Tags = ({className}: {className?: string}) => {

    const [userTags, setUserTags] = useState<Tag[]>([]);
    const [selected, setSelected] = useState<Set<number>>(new Set());

    const [creating, setCreating] = useState(false);
    const [editing, setEditing] = useState(false);

    const {item} = useItem();

    const checkPermission = userHasPermission();

    const toast = useToast();
    const fetchTags = useFetchTags();

    useEffect(() => {
        setSelected(new Set(item?.tagJoins?.map(tagJoin => tagJoin.tag.id)));
    }, [item]);
    

    useEffect(() => {
        fetchTags()
        .then(tags => setUserTags(tags))
        .catch(err => throwAxiosError(err, toast))
    }, [])

    return (
        <div className={'flex flex-col gap-3 text-[14px] rounded-[5px] p-3 ' + className}>
            {checkPermission("UPDATE") && <MainButton submit={false} centered size='SMALL' onClick={() => setEditing(prev => !prev)}>

                {editing ? (
                    <>
                        <FaCheck/> Done
                    </> 
                ) : (
                    <>
                        <FaTag/> Edit tags
                    </>
                )}
                
            </MainButton>}

            {
                editing ?
                <TagGridEditing setTags={setUserTags} setSelected={setSelected} tags={userTags} selected={selected} item={item}/> :
                <TagGridNormal selected={selected} userTags={userTags}/>
            }
        </div>
    )
}

export default Tags