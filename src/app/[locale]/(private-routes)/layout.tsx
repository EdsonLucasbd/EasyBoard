import type { Metadata } from 'next'
import '../globals.css'
import { Header } from '@/components/Header'
import { Menu } from '@/components/Menu'
import { i18nConfig } from '@/lib/i18n/i18nConfig'
import { dir } from 'i18next'

export const metadata: Metadata = {
	title: 'My Kanban Board',
	description: 'Generated by create next app',
}

export function generateStaticParams() {
	return i18nConfig.locales.map((locale) => ({ locale }))
}

export default function KanbanBoardLayout({
	children,
	params: { locale },
}: Readonly<{
	children: React.ReactNode
	params: { locale: string }
}>) {
	return (
		<html lang={locale} dir={dir(locale)}>
			<body>
				<div className='flex flex-col lg:flex-row'>
					<Menu locale={locale} />
					<div className='flex flex-col flex-1 items-center'>
						<Header locale={locale} />
						{children}
					</div>
				</div>
			</body>
		</html>
	)
}
