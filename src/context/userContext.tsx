'use client'

import { auth } from '@/lib/firebase/clientApp'
import { type User, onAuthStateChanged } from 'firebase/auth'
import React, { createContext, useContext, useEffect, useState } from 'react'

interface UserContextType {
	user: User | null
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState<User | null>(null)

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (authUser) => {
			setUser(authUser)
		})

		return () => unsubscribe()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
	)
}

export function useUser() {
	const context = useContext(UserContext)

	if (!context) {
		throw new Error('useUser must be used within a UserProvider')
	}

	return context
}
