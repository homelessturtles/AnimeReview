import {app} from './firebaseConfig'
import {getFirestore, doc, collection, query, getDoc, getDocs, addDoc, orderBy, serverTimestamp} from 'firebase/firestore'

export const getMovie = async (titleSearch) => {
    const db = getFirestore(app)
    const docRef = doc(db, 'movies', titleSearch)
    const docSnap = await getDoc(docRef)

    return docSnap;
}

export const getMovies = async () => {
    const db = getFirestore(app)
    const q = query(collection(db, 'movies'))
    const querysnapshot = await getDocs(q)
    return querysnapshot
}

export const getComments = async(titleSearch) => {
    const db = getFirestore(app)
    const q = query(collection(db, 'movies', titleSearch, "comments"), orderBy("timestamp", "desc"))
    const querysnapshot = await getDocs(q)

    return querysnapshot;
}

export const addCommentDB = async (titleSearch, image, username, moviereview) => {
    const db = getFirestore(app)
    const timestampvalue = serverTimestamp()
    const docRef = await addDoc(collection(db, 'movies', titleSearch, 'comments'), {
        img: image,
        name: username,
        review: moviereview,
        timestamp: timestampvalue
    });
}