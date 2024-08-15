import { Config } from 'next-i18n-router/dist/types'

export const i18nConfig: Config = {
	locales: ['en', 'pt-BR', 'es'],
	defaultLocale: 'pt-BR',
}

const defaultNS = 'translation'

export function getOptions(lng = i18nConfig.defaultLocale, ns = defaultNS) {
	return {
		// debug: true,
		supportedLngs: i18nConfig.locales,
		fallbackLng: i18nConfig.defaultLocale,
		lng,
		fallbackNS: defaultNS,
		defaultNS,
		ns,
	}
}
