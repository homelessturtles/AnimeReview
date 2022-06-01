import {getMovie, getComments} from './data.js'
import { signInGoogle, signOutGoogle, renderListen } from './auth.js'

export const renderUser = (pic, name) => {
    const signin = document.querySelector('.sign-in')
    const displaycontainer = document.querySelector('.user-display')
    const profpic = document.querySelector('.prof-pic')
    const commentprofpic = document.querySelector('.review-prof-pic')
    const displayname = document.querySelector('.display-name')

    signin.classList.add('hide-sign-in')
    displaycontainer.classList.remove('hide-user-display')

    profpic.src = pic;
    commentprofpic.src=pic
    displayname.innerHTML = name
}

export const unrenderUser = () => {
    const signin = document.querySelector('.sign-in')
    const displaycontainer = document.querySelector('.user-display')
    const commentprofpic = document.querySelector('.review-prof-pic')

    displaycontainer.classList.add('hide-user-display')
    signin.classList.remove('hide-sign-in')
    
    commentprofpic.src = "https://thumbs.dreamstime.com/b/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg";
}

signInGoogle();
signOutGoogle();
renderListen();

const renderMovie = async (titletorender) => {
    const img = document.querySelector('.movie-img')
    const rating = document.querySelector('.rating')
    const title = document.querySelector('.title')
    const about = document.querySelector('.about')
    const date = document.querySelector('.date')
    const director = document.querySelector('.director')
    const genres = document.querySelector('.genres')

    const movie = await getMovie(titletorender)
    const data = await movie.data()

    img.src = data.image
    rating.innerHTML = `${data.rating}`
    title.innerHTML = `${data.title}`
    about.innerHTML = `${data.about}`
    
    date.innerHTML = `Release Date: ${data.date}`
    director.innerHTML = `Director: ${data.director}`
    genres.innerHTML = `Genres: ${data.genres}`
};

const renderComments = async (movietitle) => {

}

renderMovie('Your Name')
renderComments('Your Name')

getComments('Your Name')

