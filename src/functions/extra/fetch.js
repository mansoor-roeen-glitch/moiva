export function getitem (id, apkey, apend, source) {
    return fetch(`${apend}/?apikey=${apkey}&i=${id}&type=series&plot=full`)
    .then(res => res.json()).then(data => data).catch(err => console.log(err))
}

export async function gethome (apkey, apend, source) {

    let results;
    let error;

    let tvshows = await fetch(`${apend}MostPopularTvs/${apkey}`).then((res) => res.json()).catch((err) => {error = err; console.log(err)})
    let movies = await fetch(`${apend}MostPopularMovies/${apkey}`).then((res) => res.json()).catch((err) => {error = err; console.log(err)})

    if (typeof tvshows.errorMessage !== "undefined") {
        error = tvshows.errorMessage
    } else if (typeof movies.errorMessage !== "undefined") {
        error = movies.errorMessage
    } else if (typeof tvshows.errorMessage !== "undefined" && typeof movies.errorMessage !== "undefined") {
        error = {tvError: tvshows.errorMessage, movieError: movies.errorMessage}
    }

    if (error) {
        return {success: false, status: 500, message: error}
    } 

    results = {tv: tvshows, movies: movies, source: source, success: true}
    return results;

}