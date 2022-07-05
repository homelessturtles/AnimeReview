import { getMovie, getComments, addCommentDB, getMovies } from "./data.js";
import { signInGoogle, signOutGoogle, renderListen, auth } from "./auth.js";

export const renderUser = (pic, name) => {
  const signin = document.querySelector(".sign-in");
  const displaycontainer = document.querySelector(".user-display");
  const profpic = document.querySelector(".prof-pic");
  const commentprofpic = document.querySelector(".review-prof-pic");
  const commentArea = document.querySelector(".review-message");

  const displayname = document.querySelector(".display-name");

  signin.classList.add("hide-sign-in");
  displaycontainer.classList.remove("hide-user-display");

  profpic.src = pic;
  commentprofpic.src = pic;
  displayname.innerHTML = name;
  commentArea.placeholder = "";
};

export const unrenderUser = () => {
  const signin = document.querySelector(".sign-in");
  const displaycontainer = document.querySelector(".user-display");
  const commentprofpic = document.querySelector(".review-prof-pic");
  const commentArea = document.querySelector(".review-message");

  displaycontainer.classList.add("hide-user-display");
  signin.classList.remove("hide-sign-in");

  commentprofpic.src =
    "https://thumbs.dreamstime.com/b/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg";
  commentArea.placeholder = "sign in to leave a review...";
};

const renderMovie = async (titletorender) => {
  const img = document.querySelector(".movie-img");
  const title = document.querySelector(".title");
  const about = document.querySelector(".about");
  const date = document.querySelector(".date");
  const director = document.querySelector(".director");
  const genres = document.querySelector(".genres");

  const movie = await getMovie(titletorender);
  const data = await movie.data();

  img.src = data.image;
  title.innerHTML = `${data.title}`;
  about.innerHTML = `${data.about}`;

  date.innerHTML = `Release Date: ${data.date}`;
  director.innerHTML = `Director: ${data.director}`;
  genres.innerHTML = `Genres: ${data.genres}`;
};

const clearcomments = (comments) => {
  while (comments.firstChild) {
    comments.removeChild(comments.firstChild);
  }
};

const renderComments = async (movietitle) => {
  const querysnapshot = await getComments(movietitle);
  const commentscont = document.querySelector(".comments-section");

  clearcomments(commentscont);
  querysnapshot.forEach((doc) => {
    const data = doc.data();
    const img = data.img;
    const name = data.name;
    const review = data.review;

    const commentel = document.createElement("div");

    commentel.innerHTML = `<div class="comment">
            <div class="pic-container">
                <img class="comment-prof-pic" src="${img}" alt="">
            </div>
            <div class="message-container">
                <h3 class="comment-username">${name}</h3>
                <p class="comment-message">${review}</p>
            </div>
        </div>`;

    commentscont.appendChild(commentel);
  });
};

const renderMovies = async () => {
  const querysnapshot = await getMovies();
  const moviescontainer = document.querySelector(".movies-container");

  querysnapshot.forEach((doc) => {
    const data = doc.data();
    const title = data.title;
    const image = data.image;
    const moviecontainer = document.createElement("div");
    moviecontainer.classList.add("movie-preview");
    moviecontainer.innerHTML = `<img src="${image}" alt="" class="movie-img-preview">
    <h3>${title}</h3>`;
    moviescontainer.appendChild(moviecontainer);
  });
};

const addComment = (() => {
  const input = document.querySelector(".review-message");
  const submit = document.querySelector(".review-btn");

  submit.addEventListener("click", (e) => {
    e.preventDefault();
    const msg = input.value;
    const name = auth.currentUser.displayName;
    const pic = auth.currentUser.photoURL;

    const currentMovie = document.querySelector(".title").innerHTML;

    addCommentDB(currentMovie, pic, name, msg);
    renderComments(currentMovie);

    input.value = "";

    // console.log(`${name} commented: ${msg}`)
    // console.log(`photo url: ${pic}`)
  });
})();

const renderPage = (async () => {
  signInGoogle();
  signOutGoogle();
  renderListen();
  await renderMovies();
  const moviescontainer = document.querySelector(".movies-container");
  const reviewsection = document.querySelector(".add-review-section");
  const home = document.querySelector(".logo-text");
  const moviecontainer = document.querySelector(".movie-container");
  const movies = document.querySelectorAll(".movie-preview");

  movies.forEach((movie) => {
    movie.addEventListener("click", async () => {
      //console.log(movie.querySelector('h3').innerHTML)
      await renderMovie(movie.querySelector("h3").innerHTML);
      await renderComments(movie.querySelector("h3").innerHTML);
      moviescontainer.classList.add("hide-movies-container");
      moviecontainer.classList.remove("hide-movie-container");
      reviewsection.classList.remove("hide-review-section");
    });
  });

  home.addEventListener("click", () => {
    moviescontainer.classList.remove("hide-movies-container");
    moviecontainer.classList.add("hide-movie-container");
  });
})();
