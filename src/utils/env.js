// these are the api services we are using 
// we have backup to make sure the app doesn't break 

// 100 limit
export let apend = "https://imdb-api.com/en/API/"
export let apkey = "k_o6j329vs"

// 1000 limit
export let tmdbend = "http://api.themoviedb.org/3/" 
export let tmdbkey = "f94220ac5258e7777faa232a983a3d91"

export let imageBase = "https://image.tmdb.org/t/p/"

// 1000 limit
export let omdbend = "https://www.omdbapi.com/"
export let omdbkey = "9d3d8f88" 

export let homeScrapper = "https://evening-hollows-39507.herokuapp.com/";

export function getCorsUrl (url) {
    return `https://movie-web-proxy.herokuapp.com/${url}`;
}