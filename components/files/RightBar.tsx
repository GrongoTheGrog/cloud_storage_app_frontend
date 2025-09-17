import React from 'react'
import Tags from '../tags/Tags'
import { Folder, Item } from '@/types/Entities'
import SharingSection from '../sharedItems/SharingSection'
import { FaPerson, FaShare, FaTags, FaUser } from 'react-icons/fa6'
import { useItem } from '@/app/(items)/layout'

const RightBar = () => {
	return (
		<section className='w-full sm:min-w-[220px] sm:max-w-[280] px-[20px] sm:px-[0px] mt-[30px] sm:mt-0 flex flex-col gap-[12px] item box-border'>
			<span className='font-bold text-[24px] flex gap-5 items-center'>
				<FaTags className='size-[18px]'/> Tags
			</span>
			<span className='font-14-regular leading-4'>
				Here you can attach your own custom tags.
			</span>
			<Tags/>

			<span className='font-bold text-[24px] flex gap-5 items-center mt-[20px]'>
				<FaUser className='size-[18px]'/> Share
			</span>
			<SharingSection/>
		</section>
	)
}

export default RightBar