import {app} from './firebaseConfig.js'
import {getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut} from 'firebase/auth'
import { renderUser, unrenderUser } from './app.js';

const auth = getAuth(app)

export const signInGoogle = () => {
    const signIn = document.querySelector(".sign-in-btn");
    signIn.addEventListener("click", () => {
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider).then((result) => {
        console.log(`user signed in: ${result.user.displayName}`);
      });
    });
};

export const signOutGoogle = ()=>{
    const signoutbtn = document.querySelector('.sign-out')
    signoutbtn.addEventListener('click', ()=>{
        signOut(auth);
        console.log('user has signed out')
    })
};

export const renderListen = () => {
    onAuthStateChanged(auth, (user)=>{
        if(user){
            renderUser(user.photoURL, user.displayName)
        }
        else{
            unrenderUser()
        }
    })
};

