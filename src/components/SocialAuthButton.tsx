'use client'

import { cn } from '@/lib/utils'
import type { UserCredential, signInWithPopup } from 'firebase/auth'
import React from 'react'
import { Button } from './ui/button'

type SocialAuthButton = {
	children: React.ReactNode
	className?: string
	signInMethod: () => Promise<void>
}

export const SocialAuthButton = ({
	children,
	className,
	signInMethod,
}: SocialAuthButton) => {
	async function handleSignIn() {
		try {
			await signInMethod()
			// const accessToken = await userCredentials?.user.getIdToken()
		} catch (error: unknown) {
			console.error(error)
		}
	}

	return (
		<Button
			variant='outline'
			className={cn(
				'bg-brand-50 w-[60px] h-[55px] border-none ring-1 ring-inset ring-brand-border',
				className,
			)}
			onClick={handleSignIn}
		>
			{children}
		</Button>
	)
}
