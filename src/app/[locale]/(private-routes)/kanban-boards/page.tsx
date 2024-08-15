'use client'

import { Button } from '@/components/ui/button'
import { signOutUser } from '@/lib/firebase/configs'
import React from 'react'

type Props = {}

export default function Home(props: Props) {
	return (
		<div>
			<Button onClick={signOutUser}>sair</Button>
		</div>
	)
}
