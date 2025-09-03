import React from 'react'
import Tags from '../tags/Tags'
import { Folder, Item } from '@/types/Entities'

type Props = {
    item: Item | undefined | null
}

const RightBar = ({item}: Props) => {
	if (!item?.id) return null;
	return (
		<section className='w-full sm:min-w-[220px] sm:max-w-[280] px-[20px] sm:px-[0px] mt-[30px] sm:mt-0 flex flex-col gap-[12px] item box-border'>
			<span className='font-bold text-[24px]'>
				Tags
			</span>
			<span className='font-14-regular leading-4'>
				Here you can attach your own custom tags.
			</span>
			<Tags item={item}/>
		</section>
	)
}

export default RightBar