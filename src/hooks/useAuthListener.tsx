import { firebaseApp } from '@/lib/firebase/authConfigs'
import { getAuth, onIdTokenChanged } from 'firebase/auth'
import { useEffect } from 'react'

export function useAuthListener() {
	useEffect(() => {
		const auth = getAuth(firebaseApp)

		const unsubscribe = onIdTokenChanged(auth, async (user) => {
			if (user) {
				const token = await user.getIdToken(true)

				await fetch('/api/auth/refresh-token', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ token }),
				})
			}
		})

		return () => unsubscribe()
	}, [])
}
