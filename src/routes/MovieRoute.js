import React, {useState, useEffect} from 'react';
import { omdbend, omdbkey} from '../utils/env';
import {getitem} from '../functions/extra/fetch';
import {findContent, getStreamUrl} from '../functions/lookmovie/index';
import VideoElement from '../components/VideoElement';
import errorHandler from '../functions/extra/errorhandler';

export default function MovieRoute (props) {
    
    const [data, setData] = useState();
    const [result, setResult] = useState();
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [streamOptions, setStreamOptions] = useState();
    const [streamerror, setStreamerror] = useState(false);
    const [streamloading, setStreamloading] = useState(false);
    const [streaminfoerror, setStreaminfoerror] = useState(false);
    const [streaminfoloading, setStreaminfoloading] = useState(false);

    let response;

    useEffect( async () => {
        let imdbId = parseInt(window.location.pathname.split("/")[2])
        let type = window.location.pathname.split("/")[1]

        if (!imdbId || !type) {
            return; // Error handler
        }

        setLoading(true)

        let source = "TMDB"
        imdbId = "tt" + imdbId

        let data = await getitem(imdbId, omdbkey, omdbend, source)
        console.log(data)
        if (data && data.Response === "True") {
            setResult(data)
            setLoading(false)
            setStreaminfoloading(true)

            getStreamInfo(data, type)
            setStreaminfoloading(false)
        } else {
            setError(data)
            setLoading(false)
        }

    }, [findContent])

    async function getStreamInfo (getStreamProps, type) {
        if (!getStreamProps && getStreamProps.Response === "False") {
            return errorHandler(
                "Invalid Data Provided .. ",
                400,
                false,
                "GSI"
            )
        }  

        response = await findContent({title: getStreamProps.Title, year: getStreamProps.Released.split(" ")[2]}, type)
        
        if (!response.success) {
            setStreaminfoerror(response)
            return;
        }
        
        setData(response.matchedResult)

    }

    async function handleStreamClick () {

        if (!data) {
            setStreamerror(errorHandler(
                "Data not provided",
                400,
                false,
                "HSC"
            ));

            setStreamloading(false)

            return;
        }

        setStreamloading(true)
        let streamUrlResponse = await getStreamUrl(data)
        
        if (!streamUrlResponse.success) {
            setStreamerror(streamUrlResponse)
            setStreamloading(false);

            return;
        }

        setStreamOptions({url: streamUrlResponse.url, options: streamUrlResponse.options});
        setStreamloading(false)

    }

    return (
        
        <div>
            {loading ? "" : <span>{result.Title}</span>}
            {!loading && data && !error ? <button onClick={handleStreamClick} style={{width: "100px", height: "100px"}}>this will play the thing</button> : ""}
            {streamOptions ? <VideoElement streamOptions={streamOptions} streamLoading={streamloading} streamError={streamerror} /> : ""}
        </div>
    )
}
