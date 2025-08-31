import React from 'react'
import Tags from './Tags'
import { Folder, Item } from '@/types/Entities'

type Props = {
    item: Item | undefined | null
}

const RightBar = ({item}: Props) => {
  return (
    <section className='w-[200px] px-[20px] sm:px-[0px] mt-[30px] sm:mt-0 flex flex-col gap-[12px] item'>
        <span className='font-20-bold'>
            Tags
        </span>
        <span className='font-14-regular leading-4'>
            Here you can attach your own custom tags.
        </span>
        <Tags tagJoins={item?.tagJoins}/>
    </section>
  )
}

export default RightBar