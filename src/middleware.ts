import { i18nRouter } from 'next-i18n-router'
import { NextRequest, NextResponse } from 'next/server'
import { auth } from './lib/firebase/configs'
import { i18nConfig } from './lib/i18n/i18nConfig'

export function middleware(request: NextRequest) {
	const response = i18nRouter(request, i18nConfig)

	const publicRoutes = ['/auth']
	const signInURL = new URL('/auth', request.url)
	const currentPath = request.nextUrl.pathname

	const user = auth.currentUser

	if (!user && !publicRoutes.some((route) => currentPath.startsWith(route))) {
		if (!currentPath.includes(`/auth`)) {
			return NextResponse.redirect(signInURL)
		}
	}

	return response
}

// applies this middleware only to files in the app directory
export const config = {
	matcher: '/((?!api|static|.*\\..*|_next).*)',
}
