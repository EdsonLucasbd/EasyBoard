'use client'

import { useMenu } from '@/hooks/useMenu'
import { auth, signOutUser } from '@/lib/firebase/configs'
import { useTranslation } from '@/lib/i18n/client'
import { motion } from 'framer-motion'
import {
	ArrowRightCircle,
	KanbanSquare,
	LogOut,
	Logs,
	Settings,
	Users2,
	X,
} from 'lucide-react'
import Image from 'next/image'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Sidebar, SidebarBody, SidebarLink } from './ui/sidebar'

export const Menu = ({ locale }: { locale: string }) => {
	const { open, setOpen } = useMenu()
	const { t } = useTranslation(locale, 'menu')

	const user = auth.currentUser

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

	return (
		<div
			className='flex flex-col bg-white 
      dark:bg-neutral-800 w-[300px] flex-1 mx-auto overflow-hidden h-screen'
		>
			<Sidebar open={open} setOpen={setOpen}>
				<SidebarBody
					className='justify-between gap-10 bg-white px-4 max-w-[300px]
          border-r border-brand-border'
				>
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

						<Input
							type='text'
							name='search'
							id='search'
							placeholder={t('menu:search')}
							className='rounded-full'
						/>

						<div className='flex flex-col gap-2'>
							{links.map((link, idx) => (
								<SidebarLink key={idx} link={link} />
							))}
						</div>
					</div>
					<div className='flex items-center justify-between'>
						<SidebarLink
							link={{
								label: user?.displayName as string,
								href: '#',
								icon: (
									<Image
										src={user?.photoURL as string}
										className='h-7 w-7 flex-shrink-0 rounded-full'
										width={50}
										height={50}
										alt='Avatar'
										aria-hidden
									/>
								),
							}}
						/>

						<Button
							variant='ghost'
							onClick={signOutUser}
							className={`${open ? 'flex' : 'hidden'}`}
						>
							<LogOut />
						</Button>
					</div>
				</SidebarBody>
			</Sidebar>
		</div>
	)
}
