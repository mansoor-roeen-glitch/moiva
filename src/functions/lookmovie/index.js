import lookmovie from "./lookmovie.js";

export async function findContent (details, type) {   
    
    if(!details) {
        return; // We will respond with an error
    }

    const content = await lookmovie.findContent({title: details.title, year: details.year}, type)
    return content;
}

export async function findEpisodes (slug) {
    if (!slug) {
        return; // Error handler
    }

    const episodes = await lookmovie.getEpisodes(slug).catch((error) => {
        console.log(error);
        return error;
    })

    if (!episodes) {
        return; // Error handler
    }

    return episodes;
}

export async function getStreamUrl ({slug, type, source, season, episode}) {
    switch (source) {
        case 'lookmovie':
            return await lookmovie.getStreamUrl(slug, type, season, episode)
            
        default: 
            return; // Error handler
    }
}
