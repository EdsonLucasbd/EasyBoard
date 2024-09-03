import { arrayUnion, doc, getDoc, setDoc, updateDoc } from '@firebase/firestore'
import { v4 as uuidv4 } from 'uuid'
import db from './firestore'

export interface UserData {
	name: string
	email: string
	photoURL?: string
	kanbanBoards: string[]
	ownedBoards: string[]
}

interface KanbanBoard {
	title: string
	ownerId: string
	members: string[]
	lists: any[]
	createdAt: Date
	updatedAt: Date
}

export async function checkOwnedBoards(uid: string) {
	const docRef = doc(db, 'users', uid)
	const docSnap = await getDoc(docRef)

	if (docSnap.exists()) {
		const user = docSnap.data() as UserData

		if (!user.ownedBoards || user.ownedBoards.length === 0) {
			return false
		} else {
			return true
		}
	} else {
		return false
	}
}

async function createKanbanBoard(ownerId: string): Promise<string> {
	const boardId = uuidv4()
	const boardData: KanbanBoard = {
		title: 'Meu Quadro',
		ownerId: ownerId,
		members: [ownerId],
		lists: [],
		createdAt: new Date(),
		updatedAt: new Date(),
	}

	const boardRef = doc(db, 'boards', boardId)
	await setDoc(boardRef, boardData)

	return boardId
}

export async function createUserWithBoard(
	uid: string,
	userData: Omit<UserData, 'kanbanBoards' | 'ownedBoards'>,
) {
	const boardId = await createKanbanBoard(uid)

	const userRef = doc(db, 'users', uid)

	const userDataWithBoard: UserData = {
		...userData,
		kanbanBoards: [boardId],
		ownedBoards: [boardId],
	}

	await setDoc(userRef, userDataWithBoard, { merge: true })
}

async function createUser(uid: string, userData: UserData) {
	const userRef = doc(db, 'users', uid)

	await setDoc(userRef, userData, { merge: true })
}

export async function getUser(uid: string): Promise<UserData | null> {
	const userRef = doc(db, 'users', uid)
	const userSnap = await getDoc(userRef)

	if (userSnap.exists()) {
		return userSnap.data() as UserData
	} else {
		console.log('Usuário não encontrado')
		return null
	}
}

async function addKanbanBoardToUser(uid: string, boardId: string) {
	const userRef = doc(db, 'users', uid)

	await updateDoc(userRef, {
		kanbanBoards: arrayUnion(boardId),
	})
}
