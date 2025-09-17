import { Item, Tag } from '@/types/Entities'
import React, { Dispatch, SetStateAction, useCallback } from 'react'
import MainButton from '../buttons/MainButton';
import { FaTimes } from 'react-icons/fa';
import { FaCheck, FaMinus, FaPlus, FaTrash } from 'react-icons/fa6';
import useUnbindTag from '@/hooks/tagHooks/useUnbindTag';
import useBindTag from '@/hooks/tagHooks/useBindTag';
import { throwAxiosError } from '@/utils/forms';
import { useToast } from '@/hooks/contextHooks';
import useDeleteTag from '@/hooks/tagHooks/useDeleteTag';
import usePopup from '@/hooks/usePopup';

type Props = {
    setSelected: Dispatch<SetStateAction<Set<number>>>;
    setTags: Dispatch<SetStateAction<Tag[]>>;
    selected: boolean;
    tag: Tag,
    item: Item | undefined | null
}

const TagCardEditing = ({selected, tag, setSelected, item, setTags}: Props) => {

    const unbind = useUnbindTag();
    const bind = useBindTag();
    const deleteTag = useDeleteTag();
    const popup = usePopup();


    const toast = useToast();

    const deleteTagAction = useCallback(() => {
        deleteTag(tag.id)
        .then(() => {
            setTags(prev => prev.filter(tagFilter => tagFilter.id !== tag.id));
            setSelected(prev => {
                prev.delete(tag.id);
                return new Set(prev);
            })
        })
        .catch(err => throwAxiosError(err, toast));
    }, [])

    const deleteTagPopup = useCallback(() => {
        popup.activate({
            title: "Delete tag",
            subtitle: "Are you sure you want to delete that tag?",
            mainText: `The tag of name "${tag.name}" will be forever deleted.`,
            action: deleteTagAction,
            type: "DELETE"
        })
    }, [])

    const toggleTag = useCallback(() => {
        if (!item) return;

        //unbind
        if (selected){
            unbind(item?.id, tag.id)
            .then(() => setSelected(prev => {
                prev.delete(tag.id);
                return new Set(prev);
            }))
            .catch(err => throwAxiosError(err, toast));
            return;
        }

        //bind
        bind(item.id, tag.id)
        .then(() => setSelected(prev => {
            prev.add(tag.id);
            return new Set(prev);
        }))
        .catch(err => throwAxiosError(err, toast));

    }, [item])

    return (
        <div className='tag-editing-card'>
            <MainButton className='w-[25px] flex justify-center items-center aspect-square !p-[5px] !min-w-0 cursor-pointer' background={selected} color="NORMAL" onClick={toggleTag}>
                {selected ? <FaCheck size={12}/> : <FaPlus size={12}/>}
            </MainButton>

            <div className='w-[15px] aspect-square rounded-[10px]' style={{backgroundColor: tag.hex_color}}>

            </div>

            <div className='flex flex-col justify-center'>
                <span className='font-14-bold'>
                    {tag.name}
                </span>

                <span className='text-[12px] '>
                    {tag.description}
                </span>
            </div>


            <button className='tag-delete-button p-1 rounded-[3px] bg-pdf' onClick={deleteTagPopup}>
                <FaTrash size={12} className='text-white'/>
            </button>
        </div>
    )
}

export default TagCardEditing