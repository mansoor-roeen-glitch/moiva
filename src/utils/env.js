export let imageBase = "https://image.tmdb.org/t/p/";
export let base_url = "https://moiva-proxy.herokuapp.com";

export function getCorsUrl (url) {
    return `https://movie-web-proxy.herokuapp.com/${url}`;
}

export function getProxyUrl (pathname) {
    return `https://moiva-proxy.herokuapp.com/${pathname}`
}