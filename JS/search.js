document.addEventListener('DOMContentLoaded', () =>{
const apikey = '803f69f9';
const searchBar = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');
const loadMoreBtn = document.getElementById('load-more-btn');
let currentPage=1;

searchBar.addEventListener('input', ()=>{
    const query = searchBar.value.trim();
    if (query.length > 0) {
        searchMovies(query);
    }else{
        searchResults.innerHTML='';
    }
});

function searchMovies(query){
    const url = `https://www.omdbapi.com/?apikey=${apikey}&s=${encodeURIComponent(query)}`;

    fetch(url)
        .then((response) => response.json())
        .then((data) =>{
            if(data.Response ==="True"){
                searchResults.innerHTML='';
                data.Search.forEach((movie) =>{
                    const resultDiv = document.createElement('div');
                    resultDiv.classList.add('search-result');

                    resultDiv.innerHTML=`
                        <img src="${movie.Poster}" alt="${movie.Title}">
                        <h3>${movie.Title}</h3>
                        <a href="movie.html?id=${movie.imdbID}">Voir Plus</a>
                    `;
                    searchResults.appendChild(resultDiv);
                });
                currentPage++;
            }else{
                console.error("Erreur API :", data.Error);
            }
        })
        .catch((err) => console.error("Erreur de requete :", err));
    }

    searchBar.addEventListener('input', () => {
        clearTimeout(debounceTimeout);

        debounceTimeout = setTimeout(() => {
            searchQuery = searchBar.value.trim();

            if (searchQuery.length >= 3) {
                searchResults.innerHTML = ''; 
                currentPage = 1; 
                searchMovies(searchQuery); 
            } else {
                searchResults.innerHTML = ''; 
            }
        }, 300); 
    });

   
    loadMoreBtn.addEventListener('click', () => {
        if (searchQuery.length >= 3) {
            searchMovies(searchQuery, currentPage);
        }
    });
});