import { getFirestore } from 'firebase/firestore'
import { firebaseApp } from './clientApp'

const db = getFirestore(firebaseApp)
export default db
