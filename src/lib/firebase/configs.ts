import { getApp, getApps, initializeApp } from 'firebase/app'
import {
	EmailAuthProvider,
	FacebookAuthProvider,
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	getAuth,
	signInWithEmailAndPassword,
	signInWithPopup,
} from 'firebase/auth'

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

export async function signInWithGoogle() {
	try {
		return await signInWithPopup(auth, googleAuthProvider)
	} catch (error) {
		console.error('Error signing in with Google', error)
	}
}

export async function signInWithFacebook() {
	try {
		return await signInWithPopup(auth, facebookAuthProvider)
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
		// Aqui você pode realizar ações após o login, como redirecionar o usuário
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
		// Aqui você pode realizar ações após o cadastro, como enviar um email de verificação
	} catch (error) {
		console.error('Erro create user', error)
	}
}

export async function signOut() {
	try {
		return auth.signOut()
	} catch (error) {
		console.error('Error signing out', error)
	}
}
