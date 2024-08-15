'use client'

import i18next, { type InitOptions } from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import resourcesToBackend from 'i18next-resources-to-backend'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import {
	initReactI18next,
	useTranslation as useTranslationOrg,
} from 'react-i18next'
import { getOptions } from './i18nConfig'
import { i18nConfig } from './i18nConfig'

const runsOnServerSide = typeof window === 'undefined'

const languages = i18nConfig.locales
const cookieName = i18nConfig.localeCookie ?? 'i18next'

interface LanguageDetectorOptions {
	order: string[]
}

interface I18nextInitOptions extends InitOptions {
	detection?: LanguageDetectorOptions
	preload?: string[]
}

i18next
	.use(initReactI18next)
	.use(LanguageDetector)
	.use(
		resourcesToBackend(
			(language: string, namespace: string) =>
				import(`../../../locales/${language}/${namespace}.json`),
		),
	)
	.init({
		...getOptions(),
		lng: undefined,
		detection: {
			order: ['path', 'htmlTag', 'cookie', 'navigator'],
		},
		preload: runsOnServerSide ? languages : [],
	} as I18nextInitOptions)

export function useTranslation(lng: string, ns: string, options?: object) {
	const [cookies, setCookie] = useCookies([cookieName])
	const ret = useTranslationOrg(ns, options)
	const { i18n } = ret
	if (runsOnServerSide && lng && i18n.resolvedLanguage !== lng) {
		i18n.changeLanguage(lng)
	} else {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const [activeLng, setActiveLng] = useState(i18n.resolvedLanguage)
		// eslint-disable-next-line react-hooks/rules-of-hooks
		useEffect(() => {
			if (activeLng === i18n.resolvedLanguage) return
			setActiveLng(i18n.resolvedLanguage)
		}, [activeLng, i18n.resolvedLanguage])
		// eslint-disable-next-line react-hooks/rules-of-hooks
		useEffect(() => {
			if (!lng || i18n.resolvedLanguage === lng) return
			i18n.changeLanguage(lng)
		}, [lng, i18n])
		// eslint-disable-next-line react-hooks/rules-of-hooks
		useEffect(() => {
			if (cookies.i18next === lng) return
			setCookie(cookieName, lng, { path: '/' })
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, [lng, cookies.i18next])
	}
	return ret
}
