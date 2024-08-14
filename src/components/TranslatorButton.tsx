'use client'
import { i18nConfig } from '@/lib/i18n/i18nConfig'
import { cn } from '@/lib/utils'
import { Languages } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { Button } from './ui/button'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'

export const TranslatorButton = ({ className }: { className?: string }) => {
	const { i18n } = useTranslation()
	const currentLocale = i18n.language
	const router = useRouter()
	const currentPathname = usePathname()

	const handleChange = (newLocale: string) => {
		const days = 30
		const date = new Date()
		date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
		const expires = date.toUTCString()
		document.cookie = `NEXT_LOCALE=${newLocale};expires=${expires};path=/`

		if (
			currentLocale === i18nConfig.defaultLocale &&
			!i18nConfig.prefixDefault
		) {
			router.push('/' + newLocale + currentPathname)
		} else {
			router.push(currentPathname.replace(`/${currentLocale}`, `/${newLocale}`))
		}

		router.refresh()
	}

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant={'ghost'}
					className={cn(
						'absolute right-20 top-5 rounded-full size-14 hover:bg-brand-100',
						className,
					)}
				>
					<Languages size={20} className='text-brand-600' />
				</Button>
			</PopoverTrigger>
			<PopoverContent className='flex flex-col w-fit'>
				{i18nConfig.locales.map((locale) => (
					<Button
						key={locale}
						variant='ghost'
						value={locale}
						className={`${currentLocale === locale ? 'bg-brand-100' : ''}`}
						onClick={() => handleChange(locale)}
					>
						{locale === 'es'
							? 'Español'
							: locale === 'pt-BR'
								? 'Português'
								: 'English'}
					</Button>
				))}
			</PopoverContent>
		</Popover>
	)
}
