'use client'

import firebase, {
	onAuthStateChanged,
	signInWithEmailAndPassword,
	type User,
} from 'firebase/auth'
import { useRouter } from 'next/navigation'
import React, { createContext, useEffect, useState } from 'react'
import { auth } from '../lib/firebase/configs'

interface AuthContextProps {
	user: User | null
	signIn: (email: string, password: string) => Promise<void>
	signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextProps>({
	user: null,
	signIn: async (email: string, password: string) => {},
	signOut: async () => {},
})
function AuthProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState<User | null>(null)
	const router = useRouter()

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setUser(user)
			if (user) {
				// Usuário está autenticado
				console.log('Usuaário autenticado', user)
			} else {
				// Usuário não está autenticado
				router.push('/auth')
			}
		})

		return () => unsubscribe()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const signIn = async (email: string, password: string) => {
		try {
			const userCredential = await signInWithEmailAndPassword(
				auth,
				email,
				password,
			)
			// Handle successful login
		} catch (error) {
			// Handle error
		}
	}

	const signOut = async () => {
		try {
			await firebase.signOut(auth)
			// Handle successful sign out
		} catch (error) {
			// Handle error
		}
	}

	return (
		<AuthContext.Provider value={{ user, signIn, signOut }}>
			{children}
		</AuthContext.Provider>
	)
}

export { AuthContext, AuthProvider }
