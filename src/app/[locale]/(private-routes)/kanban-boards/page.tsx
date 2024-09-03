import TranslationsProvider from '@/components/Providers/TranslationsProvider'
import { List, ListHeader, ListItem } from '@/components/list'
import initTranslations from '@/lib/i18n'
import React from 'react'

// const i18nNamespaces = ['menu', 'header', 'status', 'tags']

export default async function Home({
	params: { locale },
}: { params: { locale: string } }) {
	return (
		<div className='flex flex-col lg:flex-row items-center justify-center gap-8 w-full bg-white h-full p-8'>
			<List>
				<ListHeader quantity={0} title='Not started' type='not-started' />

				<ListItem
					tag='important'
					title='Task 1'
					content='lorem ipsum dolor sit amet consectetur adipisicing elit.'
				/>
			</List>

			<List>
				<ListHeader quantity={0} title='In progress' type='in-progress' />
			</List>

			<List>
				<ListHeader quantity={0} title='Done' type='completed' />
			</List>
		</div>
	)
}
