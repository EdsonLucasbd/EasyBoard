import { i18nRouter } from 'next-i18n-router'
import { NextRequest, NextResponse } from 'next/server'
import { i18nConfig } from './lib/i18n/i18nConfig'

export function middleware(request: NextRequest) {
	const response = i18nRouter(request, i18nConfig)

	const publicRoutes = ['/auth']
	const signInURL = new URL('/auth', request.url)
	const currentPath = request.nextUrl.pathname

	const token = request.cookies.get('authToken')?.value

	if (currentPath === '/') {
		return NextResponse.redirect(signInURL)
	}

	if (!token && !publicRoutes.some((route) => currentPath.includes(route))) {
		return NextResponse.redirect(signInURL)
	} else if (token && currentPath.includes(`/auth`)) {
		const kanbanBoardsURL = new URL('/kanban-boards', request.url)
		return NextResponse.redirect(kanbanBoardsURL)
	}

	return response
}

// applies this middleware only to files in the app directory
export const config = {
	matcher: '/((?!api|static|.*\\..*|_next).*)',
}
