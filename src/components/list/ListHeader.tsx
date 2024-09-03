'use client'

import { Plus } from 'lucide-react'

interface ListHeaderProps {
	title: string
	quantity: number
	color: string
}
export const ListHeader = ({ title, color, quantity }: ListHeaderProps) => {
	return (
		<div
			className='flex items-center justify-between w-full h-12 text-white font-bold text-base 
        leading-[22px] py-2 pl-2 pr-3 rounded-full mb-4'
			style={{ backgroundColor: color }}
		>
			<div className='flex items-center space-x-2'>
				<span
					className='font-semibold text-sm bg-white rounded-full h-full px-3 py-1.5'
					style={{ color: color }}
				>
					{quantity}
				</span>
				<h3>{title}</h3>
			</div>
			<Plus className='text-white size-6' />
		</div>
	)
}
