import JSON5 from 'json5';
import { getCorsUrl } from '../../utils/env';
import errorHandler from '../extra/errorhandler';

// Access token ..
async function getAccessToken(config) {
    let url = '';

    if (config.type === 'movie') {
        url = getCorsUrl(`https://lookmovie.site/api/v1/security/movie-access?id_movie=${config.id}&token=1&sk=&step=1`);
    } else if (config.type === 'show') {
        url = getCorsUrl(`https://lookmovie.site/api/v1/security/show-access?slug=${config.slug}&token=&step=2`);
    }

    const data = await fetch(url).then((d) => d.json());

    const token = data?.data?.accessToken;
    if (token) return token;

    return errorHandler(
        "Invalid type provided in config",
        400,
        false, 
        "GAT"
    );
}

// this function will be triggered when user clicks on certain movie
// function will find the content from imdb name and other details
async function findContent (config, type) {

    if (!config) {
        return;
    }

    const searchUrl = getCorsUrl(`https://lookmovie.site/${type}s/search/?q=${encodeURIComponent(config.title)}`);
    let searchRes;
    try {
        searchRes = await fetch(searchUrl).then(d => d.text())
    } catch (error) {
        return error; 
    }

    if (!searchRes) {
        return errorHandler(
            "Content not found",
            404,
            false,
            "FC"
        );
    }

    // Parse DOM to find search results on full search page
    const parser = new DOMParser();
    const doc = parser.parseFromString(searchRes, "text/html");
    const nodes = Array.from(doc.querySelectorAll('.movie-item-style-1'));
    let results = nodes.map(node => {
        return {
            type: type,
            title: node.querySelector('h6 a').innerText.trim(),
            year: node.querySelector('.year').innerText.trim(),
            slug: node.querySelector('a').href.split('/').pop(),
            source: "lookmovie"
        }
        // We go through all the results and filter them down
    })

    if (results.length > 1) {
        results = results.filter((resultItem) => {
            return resultItem.year === config.year;
        })
    }
    
    const matchedResult = results.length > 0 ? results[0] : false; 
    
    if (!matchedResult) {
        return errorHandler(
            "Content not found",
            404,
            false,
            "FC"
        );
    }
    
    return {matchedResult, success: true, status: 200}; 

}

async function getEpisodes(slug) {
    const url = getCorsUrl(`https://lookmovie.site/shows/view/${slug}`);
    const pageReq = await fetch(url).then((d) => d.text());

    const data = JSON5.parse("{" +
        pageReq
            .slice(pageReq.indexOf(`show_storage`))
            .split("};")[0]
            .split("= {")[1]
            .trim() +
        "}"
    );

    let seasons = [];
    let episodes = [];
    data.seasons.forEach((e) => {
        if (!seasons.includes(e.season))
            seasons.push(e.season);

        if (!episodes[e.season])
            episodes[e.season] = []
        episodes[e.season].push(e.episode)
    })

    return { seasons, episodes }
}

// Stream url
async function getStreamUrl (slug, type, season, episode) {  // Not available yet for shows 

    const url = getCorsUrl(`https://lookmovie.site/${type}s/view/${slug}`);
    const pageReq = await fetch(url).then((d) => d.text());
    const data = JSON5.parse("{" +
        pageReq
            .slice(pageReq.indexOf(`${type}_storage`))
            .split("};")[0]
            .split("= {")[1]
            .trim() +
        "}"
    );

    let id = '';
    if (type === "movie") {
        id = data.id_movie;
    } else if (type === "show") { 
        const episodeObj = data.seasons.find((v) => { return v.season === season && v.episode === episode; });

        if (episodeObj) {
            id = episodeObj.id_episode;
        }
    }

    if (id === '') {
        return errorHandler(
            "Invalid ID",
            404, 
            false,
            "GSU"
        )
    }

    const videoUrl = await getVideoUrl({
        slug: slug,
        id: id,
        type: type,
    });

     return { url: videoUrl.url, options: videoUrl.options, success: true, status: 200 }

}

// Getting url for the video 
// function will be called by getStreamUrl
async function getVideoUrl (config) {
    const accessToken = await getAccessToken(config);
    const now = Math.floor(Date.now() / 1e3);

    let url = '';

    if (config.type === 'movie') {
        url = getCorsUrl(`https://lookmovie.site/manifests/movies/json/${config.id}/${now}/${accessToken}/master.m3u8`);
    } else if (config.type === 'show') {
        url = getCorsUrl(`https://lookmovie.site/manifests/shows/json/${accessToken}/${now}/${config.id}/master.m3u8`);
    }

    const videoOpts = await fetch(url).then((d) => d.json());

    if (!videoOpts) {
        return errorHandler(
            "Video not found .. ",
            500,
            false,
            "GVU"
        )
    }

    // Find video URL and return it (with a check for a full url if needed)
    const opts = ["1080p", "1080", "720p", "720", "480p", "480", "auto"]

    let videoUrl = "";
    for (let res of opts) {
        if (videoOpts[res] && !videoOpts[res].includes('dummy') && !videoOpts[res].includes('earth-1984') && !videoUrl) {
            videoUrl = videoOpts[res]
        }
    }

    return {url: videoUrl.startsWith("/") ? `https://lookmovie.com${videoUrl}` : videoUrl, options: videoOpts};
}

let lookmovie = {findContent, getEpisodes, getStreamUrl, getVideoUrl}
export default lookmovie;