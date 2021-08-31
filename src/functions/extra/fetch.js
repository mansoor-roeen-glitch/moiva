export function getitem (query, apend, apkey, source, type) {
    return fetch(`${apend}search/${type}?query=${query}&api_key=${apkey}`)
    .then(res => res.json()).then(data => {return {res: data, statuscode: 200, tmdbSuccess: true}}).catch(err => {return {res: err, statuscode: 404, tmdbSuccess: false}})
}

export function searchitem (query, apend, apkey, source) {
    return fetch(`${apend}search/multi?query=${encodeURIComponent(query)}&api_key=${apkey}`)
    .then(res => res.json()).then(data => { return {res: data, statuscode: 200, tmdbSuccess: true}}).catch(err => {return {res: err, statuscode: 500, tmdbSuccess: false}})
}

export function getbyid (id, apkey, type, apc) {
    return fetch(`https://api.themoviedb.org/3/${type}/${id}?api_key=${apkey}&append_to_response=videos,images${apc ? ",credits" : ""}`)
    .then(res => res.json()).then(data => { return {res: data, statuscode: 200, tmdbSuccess: data.length > 0 ? true : false}}).catch(err => {return {res: err, statuscode: 500, tmdbSuccess: false}})
}

export function getcredits (id, apkey, type) {
    return fetch(`https://api.themoviedb.org/3/${type}/${id}/credits?api_key=${apkey}`)
    .then(res => res.json()).then(data => { return {res: data, statuscode: 200, tmdbSuccess: data.cast ? true : false}}).catch(err => {return {res: err, statuscode: 500, tmdbSuccess: false}})
}

export function getseasondetails (id, apkey, seasonNumber) {
    return fetch(`http://api.themoviedb.org/3/tv/${id}/season/${seasonNumber}?api_key=${apkey}`)
    .then(res => res.json().then(data => { return {res: data, statuscode: 200, tmdbSuccess: true}}).catch(err => {return {res: err, statuscode: 500, tmdbSuccess: false}}))
}