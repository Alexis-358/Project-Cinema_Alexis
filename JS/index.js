document.addEventListener('DOMContentLoaded', () =>{
const apikey = '803f69f9';
const moviesContainer = document.getElementById('trendingMovies');
const loadMoreBtn = document.getElementById('load-more-btn');
let currentPage=1;
const url = `https://www.omdbapi.com/?apikey=${apikey}&s=2024&page=${currentPage}`;

function loadMovies(){
    fetch(url)
    .then(response => response.json())
    .then((data) => {
        if (data.Response === 'True'){
            data.Search.forEach((movie) =>{
                const movieDiv = document.createElement('div');
                movieDiv.classList.add('movie');

                movieDiv.innerHTML=`
                    <img src="${movie.Poster}" alt="${movie.Title}">
                    <h3>${movie.Title}</h3>
                    <a href="movie.html?id=${movie.imdbID}">Voir Plus</a>
                `;
                moviesContainer.appendChild(movieDiv);
            });
            currentPage++;
        }else{
            console.error("Erreur API :", data.Error);
        }
    })
    .catch((err) => console.error("Erreur de requete :", err));
}

loadMovies();
loadMoreBtn.addEventListener('click', loadMovies)
});
