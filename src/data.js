import {app} from './firebaseConfig'
import {getFirestore, doc, collection, query, getDoc, onSnapshot} from 'firebase/firestore'

export const getMovie = async (titleSearch) => {
    const db = getFirestore(app)
    const docRef = doc(db, 'movies', titleSearch)
    const docSnap = await getDoc(docRef)

    return docSnap;
}

export const getComments = async(titleSearch) => {
    const db = getFirestore(app)
    const q = query(collection(db, 'movies', titleSearch, "comments"))
   
    const unsub = onSnapshot(q, (querySnapshot)=>{
        const messages = []
        querySnapshot.forEach((doc)=>{
            messages.push(doc.data())
        })
        console.log(messages)
    })

}