import { getApp, getApps, initializeApp } from 'firebase/app'
import {
	EmailAuthProvider,
	FacebookAuthProvider,
	GoogleAuthProvider,
	type NextOrObserver,
	type User,
	onAuthStateChanged as _onAuthStateChanged,
	browserLocalPersistence,
	createUserWithEmailAndPassword,
	getAuth,
	setPersistence,
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut,
} from 'firebase/auth'
import { auth } from './clientApp'
import { checkOwnedBoards, createUserWithBoard } from './userManagement'

export function onAuthStateChanged(cb: NextOrObserver<User>) {
	return _onAuthStateChanged(auth, cb)
}

export const googleAuthProvider = new GoogleAuthProvider()
export const facebookAuthProvider = new FacebookAuthProvider()
export const emailAuthProvider = new EmailAuthProvider()

const date = new Date()
const ExpireDate = date.setFullYear(date.getFullYear() + 2)

async function signInWithGoogle() {
	try {
		const result = await signInWithPopup(auth, googleAuthProvider)
		const token = await result.user.getIdToken()
		document.cookie = `authToken=${token}; expires=${date.toUTCString()}; path=/; Secure; SameSite=Strict`

		const hasOwnedBoards = await checkOwnedBoards(result.user.uid)

		if (!hasOwnedBoards) {
			await createUserWithBoard(result.user.uid, {
				name: result.user.displayName || '',
				email: result.user.email || '',
				photoURL: result.user.photoURL || '',
			})
		}

		window.location.href = '/kanban-boards'
		// return result
	} catch (error) {
		console.error('Error signing in with Google', error)
	}
}

async function signInWithFacebook() {
	try {
		const result = await signInWithPopup(auth, facebookAuthProvider)
		const token = await result.user.getIdToken()

		document.cookie = `authToken=${token}; path=/;`

		const hasOwnedBoards = await checkOwnedBoards(result.user.uid)

		if (!hasOwnedBoards) {
			await createUserWithBoard(result.user.uid, {
				name: result.user.displayName || '',
				email: result.user.email || '',
				photoURL: result.user.photoURL || '',
			})
		}

		window.location.href = '/kanban-boards'
		// return result
	} catch (error) {
		console.error('Error signing in with Facebook', error)
	}
}

async function signInWithEmail(email: string, password: string) {
	try {
		const userCredential = await signInWithEmailAndPassword(
			auth,
			email,
			password,
		)
		const user = userCredential.user
		console.log('Usuário logado com sucesso:', user)

		const token = await user.getIdToken()

		document.cookie = `authToken=${token}; path=/;`
		window.location.href = '/kanban-boards'
		// return userCredential
	} catch (error: unknown) {
		console.error('Error signing in with Email and Password', error)
	}
}

export async function createUser(email: string, password: string) {
	try {
		const userCredential = await createUserWithEmailAndPassword(
			auth,
			email,
			password,
		)
		const user = userCredential.user

		console.log('Usuário criado com sucesso:', user)

		window.location.href = '/auth'
	} catch (error) {
		console.error('Erro create user', error)
	}
}

export async function signOutUser() {
	try {
		await signOut(auth)

		document.cookie =
			'authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;'

		window.location.href = '/auth'
	} catch (error) {
		console.error('Erro ao deslogar o usuário:', error)
	}
}

export async function signInWithProvider(
	provider: 'google' | 'facebook' | 'email',
	email?: string,
	password?: string,
) {
	setPersistence(auth, browserLocalPersistence)
		.then(() => {
			switch (provider) {
				case 'google':
					return signInWithGoogle()
				case 'facebook':
					return signInWithFacebook()
				case 'email':
					if (email && password) {
						return signInWithEmail(email, password)
					} else {
						throw new Error(
							'Email e senha são necessários para login com email e senha',
						)
					}
				default:
					throw new Error('Provedor de autenticação desconhecido')
			}
		})
		.catch((error) => {
			console.error('Erro durante a autenticação:', error)
		})
}
