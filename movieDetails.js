const data = JSON.parse(decodeURIComponent(location.search.replace("?data=", "")));

console.log(data);

const movieBox = document.getElementById("movieBox");

// api call by id to get all movie information
async function getDetailedInfo(movieID) {
    const url = `https://www.omdbapi.com/?i=${movieID}&apikey=46ae6bc5`;
    
    try{
        const res = await fetch(url);
        console.log(res);
        const movieInfo = await res.json();
        console.log(movieInfo);
        showDetails(movieInfo);
    }catch(error){
        console.log(`error: ${error}`);
    }
    
}
getDetailedInfo(data.id);

function showDetails(movieInfo) {
    movieBox.innerHTML = `
    <div id="left">
        <h2 id="movie-title">${movieInfo.Title}</h2>
        <div id="movie-genre">
            <span>Genres:</span>
        </div>
        <div id="movie-meta">
            <p>Release Date: ${movieInfo.Released}</p>
            <p>Runtime: ${movieInfo.Runtime}</p>
            <p class="rating"><i class="fa-solid fa-star" style="color: #FFD43B;"></i>${movieInfo.Ratings[0].Value}</p>
        </div>
        <div id="movie-lang">
            <span>Available in: </span>
        </div>
        <p id="movie-plot">${movieInfo.Plot}</p>
    </div>
    <div id="right">
        <img src="${movieInfo.Poster}" alt="movie Image"/>
    </div>
`;
    // for Genre
    const genreBox = document.getElementById('movie-genre');
    const genres = movieInfo.Genre.split(',');
    genres.forEach((genreValue)=>{
        const genreSpan = document.createElement('span');
        genreSpan.className = "genre-value";
        genreSpan.innerHTML = genreValue;
        genreBox.appendChild(genreSpan);
    });

    // for language of movie
    const languageBox = document.getElementById('movie-lang');
    const language = movieInfo.Language.split(',');
    language.forEach((languageValue)=>{
        const languageSpan = document.createElement('span');
        languageSpan.className = "language-value";
        languageSpan.innerHTML = languageValue;
        languageBox.appendChild(languageSpan);
    });
}


