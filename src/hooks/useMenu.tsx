'use client'

import { useEffect, useState } from 'react'

export const useMenu = () => {
	const [open, setOpen] = useState(false)

	useEffect(() => {
		setOpen(false)
	}, [])

	return { open, setOpen }
}
