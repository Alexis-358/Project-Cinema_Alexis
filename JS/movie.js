document.addEventListener('DOMContentLoaded', () =>{
const apikey = '803f69f9';
const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('id') || 'tt3896198';

const movieDetailsContainer = document.getElementById('movie-details-container');

function DetailsMovies(movieId){
fetch(`https://www.omdbapi.com/?apikey=${apikey}&i=${movieId}`)
    .then((response) => response.json())
    .then((data) =>{
        if (data.Response ==="True"){
            movieDetailsContainer.innerHTML = `
                <img src="${data.Poster}" alt="${data.Title}">
                <h2>${data.Title}</h2>
                <p><strong> Resumer :</strong> ${data.Plot}</p>
                <p><strong> Genre :</strong> ${data.Genre}</p>
                <p><strong> Acteurs :</strong> ${data.Actors}</p>
                <p><strong> Note :</strong> ${data.imdbRating}</p>
                <p><strong> Date de sortie :</strong> ${new Date(data.Released).toLocaleDateString('fr-FR') }</p>
            `;
        }else{
            console.error("Erreur API :", data.Error);
        }
    })
        .catch((err) => console.error("Erreur de requete :", err));
}
function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}
if (movieId){
    DetailsMovies(movieId);
}else{
    console.error("Aucun ID de film fourni dans l'URL");
}
});
