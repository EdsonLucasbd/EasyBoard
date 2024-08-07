'use client'

import { I18nextProvider } from 'react-i18next'
import { createInstance } from 'i18next'
import initTranslations from '@/lib/i18n'

interface TranslationsProviderProps {
	children: React.ReactNode
	locale: string
	namespaces: string[]
	resources?: Record<string, any>
}

export default function TranslationsProvider({
	children,
	locale,
	namespaces,
	resources,
}: TranslationsProviderProps) {
	const i18n = createInstance()

	initTranslations({ locale, namespaces, i18nInstance: i18n, resources })

	return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
}
