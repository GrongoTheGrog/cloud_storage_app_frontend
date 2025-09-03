import { Item, Tag } from '@/types/Entities'
import React, { Dispatch, SetStateAction, useState } from 'react'
import TagCardCreating from './TagCardCreating'
import MainButton from '../buttons/MainButton'
import { FaPlus } from 'react-icons/fa6'
import Loading from '../ui/Loading'
import TagCardEditing from './TagCardEditing'

type Props = {
    setSelected: Dispatch<SetStateAction<Set<number>>>;
    setTags: Dispatch<SetStateAction<Tag[]>>;
    tags: Tag[];
    selected: Set<number>;
    item: Item | undefined | null;
}

const TagGridEditing = ({setTags, setSelected, tags, selected, item}: Props) => {

    const [creating, setCreating] = useState(false);

    return (
        <div className='flex flex-col gap-3'>
            {creating ? (
                <TagCardCreating setCreating={setCreating} setTags={setTags}/>
            ) : (
                <MainButton centered size='SMALL' color='BLUE' background onClick={() => setCreating(true)}>
                    <FaPlus/> Create tag
                </MainButton>
            )}

            <span className='font-20-bold'>
                Selected tags
            </span>

            <div className='flex flex-col gap-2'>
                {selected.size > 0 ? tags.map(tag => {
                    if (!selected.has(tag.id)) return null;
                    return <TagCardEditing 
                        tag={tag} 
                        selected={true} 
                        setSelected={setSelected} 
                        item={item} 
                        key={tag.id}
                        setTags={setTags}
                        />
                }) : (
                    <span className='font-14-medium text-center my-[10px]'>
                        No tags attached
                    </span>
                )}
            </div>

            <div className='h-[1px] w-full bg-foreground my-[5px]'></div>

            <span className='font-16-bold'>Available Tags</span>

            {!tags ? 
            <Loading/> : tags.length > 0 && tags.length !== selected.size ? 
            <div className='flex flex-col gap-2'>
                {tags.map(tag => {
                    if (selected.has(tag.id)) return null;
                    return (
                    <TagCardEditing 
                        tag={tag} 
                        selected={false} 
                        setSelected={setSelected} 
                        item={item} 
                        key={tag.id}
                        setTags={setTags}    
                    />
                    )
                })}
            </div> : 
            <span className='font-14-medium text-center my-[10px]'>
                No available tags
            </span>}
        </div>
    )
}

export default TagGridEditing