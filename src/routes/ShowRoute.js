import React, {useState, useEffect} from 'react';
import { omdbend, omdbkey } from '../utils/env';
import {getitem} from '../functions/extra/fetch';
import {findContent, getStreamUrl, findEpisodes} from '../functions/lookmovie/index';
import VideoElement from '../components/VideoElement';
import { stringify } from 'json5';
import errorHandler from '../functions/extra/errorhandler';

export default function ShowRoute (props) {
    
    const [selectedEp, setSelectedEp] = useState();
    const [selectedSe, setSelectedSe] = useState();
    const [data, setData] = useState();
    const [result, setResult] = useState();
    const [error, setError] = useState(false);
    const [episodes, setEpisodes] = useState();
    const [loading, setLoading] = useState(true);
    const [streamOptions, setStreamOptions] = useState();

    const [streaminfoerror, setStreaminfoerror] = useState(false);
    const [streaminfoLoading, setStreaminfoLoading] = useState(false)

    const [streamError, setStreamError] = useState(false)
    const [streamLoading, setStreamLoading] = useState(false)

    let response;

    useEffect( async () => {

        let imdbId = window.location.pathname.split("/")[2]
        let type = window.location.pathname.split("/")[1];
        

        if (!imdbId || !type) {
            return; // Error handler
        }

        imdbId = "tt" + imdbId

        let source = "OMDB"

        setStreaminfoLoading(true)
        let data = await getitem(imdbId, omdbkey, omdbend, source)
        if (data.Response === "True") {
            setResult(data)
            getStreamInfo(data, type)
            setStreaminfoLoading(false)
        } else {
            setError(data.Error)
            setLoading(false)
        }
        

    }, [])

    async function getStreamInfo (getStreamProps, type) {

        if (!getStreamProps && getStreamProps.Response === "False") {
            setStreaminfoerror(errorHandler(
                "Invalid Data Provided .. ",
                400,
                false,
                "GSI"
            ))

            return;
        }  

        response = await findContent({title: getStreamProps.Title, year: getStreamProps.Year.slice(0, 4)}, type)
        if (!response.success) {
            setStreaminfoerror(response)
            return;
        }

        let foundEpisodes = await findEpisodes(response.matchedResult.slug)

        // Default values, will change accordingly to the user
        setSelectedEp(stringify(1))
        setSelectedSe(stringify(1))

        setData(response.matchedResult)
        setEpisodes(foundEpisodes)
    }

    async function handleStreamClick (episode) {

        setSelectedEp(episode)

        if (!data  || !selectedEp || !selectedSe || !episode) {
            setStreamError(errorHandler(
                "Episode or Season not found",
                404, 
                false,
                "HSC"
            )) // error handler
        }

        setStreamLoading(true)
        let streamUrlResponse = await getStreamUrl({slug: data.slug, type: data.type, source: data.source, season: selectedSe, episode: episode})
        
        if (!streamUrlResponse.success) {
            setStreamError(streamUrlResponse);
            setStreamLoading(false)
        }

        setStreamOptions({url: streamUrlResponse.url, options: streamUrlResponse.options});
        setStreamLoading(false)
    }

    return (
        
        <div>
            {!loading && !error && episodes && result ? <button style={{width: "100px", height: "100px"}}>get bullshit</button> : "loading or some error, fuck off"}    
        
            {episodes 
                ? (<div>
                    { episodes.seasons.map((season, index) => {return <button onClick={() => {setSelectedSe(season)}} key={index} style={{height: "100px", width: "100px"}}> {season}</button>})}
                </div>) 
                : <span>bullshit</span>}   

            {episodes 
                ? (<div>
                    { episodes.episodes[parseInt(selectedSe)].map((episode, index) => {return <button onClick={() => {handleStreamClick(episode)}} key={index} style={{height: "100px", width: "100px"}}>{episode}</button>})}
                </div>) 
                : <span>bullshit</span>}   

            {streamOptions && !loading ? <VideoElement streamOptions={streamOptions} loading={loading} /> : ""}    
        
        </div>
    )
}

