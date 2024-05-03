const movieBox = document.getElementById('container');

let favouriteMovies = JSON.parse(localStorage.getItem('favourite'));

console.log(favouriteMovies);

function showFavourite(movieList) {
    movieBox.innerHTML = "";
    movieList.forEach(({ id, image }) => {
        let movieTile = document.createElement('div');
        const stringfiedMovieData = encodeURIComponent(JSON.stringify({id}));
        movieTile.innerHTML = `
        <a href="movieDetailPage.html?data=${stringfiedMovieData}">
            <img
                src="${image}"
            >
        </a>
            <div id="cross" onclick="removeFromFavourite('${id}')"><i class="fa-solid fa-xmark"></i></div>
        `;
        movieBox.append(movieTile);
    });
}
showFavourite(favouriteMovies);

function removeFromFavourite(id) {
    console.log(id);
    console.log("remove from favourite -> is pressed");
    favouriteMovies = favouriteMovies.filter(({ id: movieID }) => movieID !== id);

    localStorage.setItem('favourite', JSON.stringify(favouriteMovies));

    console.log(favouriteMovies);

    showFavourite(favouriteMovies);
}

