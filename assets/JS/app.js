console.log('page-load');

// set the local storage (if not set)
const favouriteData = localStorage.getItem('favourite');
if (!favouriteData)
    localStorage.setItem("favourite", JSON.stringify([]));
// access container 
const movieBox = document.getElementById("container");
const notify = document.getElementById('notify');
const searchBar = document.getElementById('searchBar');

// access local storage movies data
let localData = JSON.parse(localStorage.getItem('favourite'));

// searchBar keyEnter
searchBar.onkeyup = () => {
    const movie = searchBar.value.trim();
    console.log(movie);
    getMovies(movie);
};

// api call
async function getMovies(movie) {
    const url = `https://www.omdbapi.com/?s=${movie}&apikey=46ae6bc5`;
    try {
        const res = await fetch(url);
        console.log(res);
        data = await res.json();
        console.log(data);
        console.log(data.Search);
        showMovies(data.Search);
    } catch (error) {
        console.log(`error: ${error}`);
    }
}

// default movies display
getMovies('avengers');

// load default movies on screen
const randomMovieName = ['superman', 'titanic', 'x-men', 'spider-man', 'The dark knight', 'The lord of the rings', 'don', 'The matrix', 'star wars', 'tiger'];

const imdbButton = document.getElementById('imdb-button');
imdbButton.onclick = () => {
    let i = Math.floor(Math.random() * 10);
    console.log(i);
    getMovies(randomMovieName[i]);
};


// show result
function showMovies(moviesList) {
    movieBox.innerHTML = "";
    if (!moviesList)
        return;

    moviesList.forEach(({ Title: name, imdbID: id, Poster: image, Year: year }) => {
        // create movie-tile
        const movieTile = document.createElement('div');
        // encode moviedata for detailPage url
        const stringfiedMovieData = encodeURIComponent(JSON.stringify({ name, id, image, year }));
        // console.log({ stringfiedMovieData });
        movieTile.innerHTML = `
        <a href="movieDetails.html?data=${stringfiedMovieData}" target="_blank">
            <img
                src="${image}"
                alt="${name}"
            />
        </a>
        `;

        const button = document.createElement('button');
        button.innerHTML = "+";

        // check the movie if present in localStorage
        const isFavouriteMovie = localData.find(({ id: LocalID }) => LocalID === id);

        if (isFavouriteMovie) {
            button.innerHTML = '<i class="fa-solid fa-check"></i>';
            button.style.backgroundColor = "yellow";
        }

        // onclicking button add and remove from favourite movie list

        button.onclick = () => {
            if (button.style.backgroundColor == 'yellow') {
                showNofication(name, 'Successfully Removed');
                button.innerHTML = '+';
                button.style.backgroundColor = ' rgba(4, 26, 37, 0.5)';
                // removing movie from local storage
                localData = localData.filter(({ id: LocalID }) => LocalID !== id);
            }
            else {
                showNofication(name, 'Successfully Added');
                button.innerHTML = '<i class="fa-solid fa-check"></i>';
                button.style.backgroundColor = "yellow";
                // adding movie to local storage
                localData = [...localData, { name, id, image, year }];
            }
            localStorage.setItem('favourite', JSON.stringify(localData));
        }

        movieTile.appendChild(button);
        movieBox.appendChild(movieTile);
    });
}

// show dialog box on adding/removing movie for few seconds only
function showNofication(movie = 'Movie', message) {
    notify.innerHTML = movie + " " + message;
    setTimeout(() => {
        notify.innerHTML = "";
    }, 1000);
}

// writing media query for phone size screen

let favourite_list_btn = document.querySelector('nav a span');

let x = window.matchMedia("(max-width: 450px)");

if(x.matches){
    favourite_list_btn.innerHTML = '<i class="fa-solid fa-list"></i>';
}
