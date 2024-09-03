'use client'

import { useTranslation } from '@/lib/i18n/client'
import { Search, Share2 } from 'lucide-react'
import React from 'react'
import { Button } from './ui/button'

export const Header = ({ locale }: { locale: string }) => {
	const { t } = useTranslation(locale, 'header')

	return (
		<header
			className='flex flex-col lg:flex-row items-start lg:items-center justify-between 
			gap-4 lg:gap-0 w-full h[136px] lg:h-[104px] bg-brand-50 p-4'
		>
			<h1 className='font-extrabold text-2xl lg:text-3xl'>
				{t('header:title')}
			</h1>

			<div className='flex gap-2 items-center justify-center'>
				<Button variant='ghost' className='size-10 p-0'>
					<Search />
				</Button>
				<Button className='w-fit h-10 rounded-full bg-[#4F46E5] hover:bg-[#4139d1] gap-2'>
					{t('header:share_btn')}
					<Share2 size={20} />
				</Button>
			</div>
		</header>
	)
}
