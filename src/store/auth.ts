import { auth } from '@/lib/firebase/authConfigs'
import { User, onAuthStateChanged } from 'firebase/auth'
import { create } from 'zustand'

interface AuthState {
	user: User | null
	loading: boolean
	error: string | null
	setUser: (user: User | null) => void
	setLoading: (loading: boolean) => void
	setError: (error: string | null) => void
}

export const useAuthStore = create<AuthState>((set) => ({
	user: null,
	loading: true,
	error: null,
	setUser: (user) => set({ user, loading: false }),
	setLoading: (loading) => set({ loading }),
	setError: (error) => set({ error, loading: false }),
}))

onAuthStateChanged(auth, (user) => {
	if (user) {
		useAuthStore.getState().setUser(user)
	} else {
		useAuthStore.getState().setUser(null)
	}
})
