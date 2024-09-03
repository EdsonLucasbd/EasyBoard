'use client'

import { useUser } from '@/context/userContext'
import { signOutUser } from '@/lib/firebase/authConfigs'
import { useTranslation } from '@/lib/i18n/client'
import { motion } from 'framer-motion'
import {
	ArrowRightCircle,
	KanbanSquare,
	LogOut,
	Logs,
	SearchIcon,
	Settings,
	Users2,
	X,
} from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Sidebar, SidebarBody, SidebarLink } from './ui/sidebar'

export const Menu = ({ locale }: { locale: string }) => {
	const [placeholder, setPlaceholder] = useState('')
	const [open, setOpen] = useState(false)
	const { t } = useTranslation(locale, 'menu')
	const { user } = useUser()

	const links = [
		{
			label: t('menu:home'),
			href: '#',
			icon: (
				<KanbanSquare className='text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0' />
			),
		},
		{
			label: t('menu:tasks'),
			href: '#',
			icon: (
				<Logs className='text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0' />
			),
		},
		{
			label: t('menu:users'),
			href: '#',
			icon: (
				<Users2 className='text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0' />
			),
		},
		{
			label: t('menu:settings'),
			href: '#',
			icon: (
				<Settings className='text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0' />
			),
		},
	]

	useEffect(() => {
		setPlaceholder(t('menu:search'))
	}, [t, user?.displayName])

	return (
		<div
			className='flex flex-col bg-white
      dark:bg-neutral-800 mx-auto overflow-hidden w-full lg:w-fit h-16 lg:h-screen 
			border-r border-brand-border'
		>
			<Sidebar open={open} setOpen={setOpen}>
				<SidebarBody className='justify-between gap-10 bg-white px-4 max-w-[300px]'>
					<div className='flex flex-col flex-1 overflow-y-auto overflow-x-hidden gap-8'>
						<div className='flex items-center justify-between'>
							<motion.div
								className='flex items-center gap-2'
								animate={{
									display: true
										? open
											? 'inline-flex'
											: 'none'
										: 'inline-block',
									opacity: open ? 1 : 0,
								}}
							>
								<Image
									src='/logo.webp'
									alt=''
									aria-hidden
									width={50}
									height={50}
									className='size-9'
								/>
								<h2>EasyBoard</h2>
							</motion.div>

							<Button
								variant='ghost'
								onClick={() => setOpen(!open)}
								className='hover:bg-transparent'
							>
								{open ? <X /> : <ArrowRightCircle />}
							</Button>
						</div>

						<div className='relative'>
							<SearchIcon className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
							<Input
								type='search'
								name='search'
								id='search'
								placeholder={placeholder || 'Search...'}
								className='rounded-full px-0 pl-8'
							/>
						</div>

						<div
							className={`flex flex-col gap-2 ${open ? '' : 'items-center'}`}
						>
							{links.map((link, idx) => (
								<SidebarLink key={idx} link={link} className='w-fit' />
							))}
						</div>
					</div>
					<div className='flex items-end justify-between h-[70px] border-t border-brand-border'>
						<div className='flex items-center justify-between w-full'>
							<div className='flex items-center justify-start gap-x-3 py-2'>
								<Avatar>
									<AvatarImage
										src={user?.photoURL as string}
										className='size-10 flex-shrink-0 rounded-full'
										aria-hidden
									/>
									<AvatarFallback>👤</AvatarFallback>
								</Avatar>

								<motion.span
									animate={{
										display: true
											? open
												? 'inline-block'
												: 'none'
											: 'inline-block',
										opacity: open ? 1 : 0,
									}}
									className='text-neutral-700 dark:text-neutral-200 whitespace-pre inline-block !p-0 !m-0
								font-bold text-base'
								>
									{user?.displayName}
								</motion.span>
							</div>

							<Button
								variant='ghost'
								onClick={signOutUser}
								className={`${open ? 'flex' : 'hidden'}`}
							>
								<LogOut />
							</Button>
						</div>
					</div>
				</SidebarBody>
			</Sidebar>
		</div>
	)
}
