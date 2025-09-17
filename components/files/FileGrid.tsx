import { Folder, Item } from '@/types/Entities'
import React from 'react'
import { FaCloudRain } from 'react-icons/fa6'
import FileCard from './FileCard'
import { useCallback } from 'react'
import Loading from '../ui/Loading'
import { useItem } from '@/app/(items)/layout'

type FileGridProps = {
  items: Item[];
  className?: string;
  selected: Set<number>;
  setSelected: React.Dispatch<React.SetStateAction<Set<number>>>;
};

const FileGrid = ({items, className, selected, setSelected}: FileGridProps) => {

    const {item, isLoading, dispatch} = useItem();

    const selectItemFunction = useCallback((item: Item) => {
        if (selected.has(item.id)){
            setSelected(prev => {
                const set = new Set(prev);
                set.delete(item.id);
                return set;
            }
        );
        }else{
            setSelected(prev => {
                const set = new Set(prev);
                set.add(item.id);
                return set;
            })
        }
    }, [selected])

    if (isLoading || !item){
        return (
            <Loading className='mt-[40px]'/>
        )
    }

    if (item && items.length == 0) return (
        <div className='mx-auto flex items-center flex-col gap-[15px] mt-[40px]'>
            <FaCloudRain className='size-[75px]'/>
            <span className='text-center font-16-bold'>
                No files in here 
            </span>
        </div>
    )

    return (
        <div className={'flex flex-col gap-[10px] sm:gap-[20px] mt-[15px] sm:mt-[40px] sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5' + className}>    
            {items.map(item => 
                <FileCard 
                    item={item} 
                    key={item.id} 
                    selected={selected.has(item.id)}
                    onClick={selectItemFunction}
                />
            )}
        </div>
    )
}

export default FileGrid