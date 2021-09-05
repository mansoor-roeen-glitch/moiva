export let imageBase = process.env.REACT_APP_IMG_BASE;
export let base_url = process.env.REACT_APP_PROXY;

export function getCorsUrl (url, search) {
    return `${search ? `${process.env.REACT_APP_WORKER}/?destination=` : `${process.env.REACT_APP_CORS_PROXY}/`}${url}`;
}

export function getProxyUrl (pathname) {
    return `${base_url}/${pathname}`
}