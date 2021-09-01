import { base_url } from "../../utils/env"
export function fetchData (link, {...extra}) {
    switch (link) {

        case "get-season-details":
            link = `${base_url}/get-season-details/${extra.id}/${extra.seasonNumber}`;
            break;
        case "get-credits":
            link = `${base_url}/get-credits/${extra.type}/${extra.id}`;
            break;
        case "get-by-id":
            link = `${base_url}/get-by-id/${extra.type}/${extra.id}`;
            break;
        case "get-search":
            link = `${base_url}/get-search/${extra.query}`;
            break;
        case "get-images":
            link = `${base_url}/get-images/${extra.type}/${extra.id}`;
            break;
        case "get-videos":
            link = `${base_url}/get-videos/${extra.type}/${extra.id}`;
            break;            
        default:
            link = "";
            break;
    }

    if (!link) {
        return {success: false, statuscode: 402, error: "invalid request"};
    }

    return fetch(link)
    .then(res => res.json()).then(data => data).catch(err => err)

}