import TranslationsProvider from '@/components/Providers/TranslationsProvider'
import initTranslations from '@/lib/i18n'
import React from 'react'

// const i18nNamespaces = ['menu', 'header', 'status', 'tags']

export default async function Home({
	params: { locale },
}: { params: { locale: string } }) {
	return <div className='flex flex-1'>Home</div>
}
