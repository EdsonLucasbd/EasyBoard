import { collection, doc, setDoc } from '@firebase/firestore'
import { getApp, getApps, initializeApp } from 'firebase/app'
import {
	EmailAuthProvider,
	FacebookAuthProvider,
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	getAuth,
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut,
} from 'firebase/auth'
import db from './firestore'

export const firebaseApp =
	getApps().length > 0
		? getApp()
		: initializeApp({
				apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
				authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
			})
export const auth = getAuth(firebaseApp)

export const googleAuthProvider = new GoogleAuthProvider()
export const facebookAuthProvider = new FacebookAuthProvider()
export const emailAuthProvider = new EmailAuthProvider()

export async function createStorage(name: string, id: string) {
	try {
		const docRef = doc(collection(db, 'boards'), name)
		await setDoc(docRef, {
			'default-board': id,
		})

		console.log('Document written with ID: ', docRef.id)
	} catch (error) {
		console.error('Error adding document: ', error)
	}
}

export async function signInWithGoogle() {
	try {
		const result = await signInWithPopup(auth, googleAuthProvider)
		const token = await result.user.getIdToken()

		document.cookie = `authToken=${token}; path=/;`
		window.location.href = '/kanban-boards'

		return result
	} catch (error) {
		console.error('Error signing in with Google', error)
	}
}

export async function signInWithFacebook() {
	try {
		const result = await signInWithPopup(auth, facebookAuthProvider)
		const token = await result.user.getIdToken()

		document.cookie = `authToken=${token}; path=/;`
		window.location.href = '/kanban-boards'

		return result
	} catch (error) {
		console.error('Error signing in with Facebook', error)
	}
}

export async function signInWithEmail(email: string, password: string) {
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
