import { doc, getDoc, setDoc } from '@firebase/firestore'
import { auth } from './clientApp'
import db from './firestore'
import { getUser } from './userManagement'

type Task = {
	level?: 'low' | 'important' | 'high'
	title: string
	content: string
	collaborators: string[]
}

export async function createTask() {
	const uid = auth.currentUser?.uid
	const user = await getUser(uid!)
	const boardRef = doc(db, 'boards', user!.ownedBoards[0])
	const docSnap = await getDoc(boardRef)
	if (docSnap.exists()) {
		console.log('Document data:', docSnap.data()['lists'])
		setDoc(boardRef, { lists: ['teste 2'] }, { merge: true })
	} else {
		// docSnap.data() will be undefined in this case
		console.log('No such document!')
	}
}
