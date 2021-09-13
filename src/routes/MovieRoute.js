import React, {useState, useEffect} from 'react';
import {fetchData} from '../functions/extra/fetch';
import {findContent, getStreamUrl} from '../functions/lookmovie/index';
import VideoElement from '../components/VideoElement';
import errorHandler from '../functions/extra/errorhandler';
import HeaderElement from '../components/HeaderElement';
import CastWrapper from '../components/CastWrapper';
import '../components/styles/movieRouteStyles.css'
import MediaWrapper from '../components/MediaWrapper';
import "../components/styles/loader.css"
import { imageBase } from '../utils/env';
import { Helmet } from 'react-helmet';

export default function MovieRoute (props) {

    const [data, setData] = useState();
    const [result, setResult] = useState();
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [streamOptions, setStreamOptions] = useState();
    const [streamSubtitles, setStreamSubtitles] = useState();

    const [streamerror, setStreamerror] = useState(false);
    const [streamloading, setStreamloading] = useState(false);
    const [streaminfoerror, setStreaminfoerror] = useState(false);
    const [streaminfoloading, setStreaminfoloading] = useState(true);
    const [clicked, setClicked] = useState(false)

    let response;

    useEffect( async () => {

        let pathnames = window.location.pathname.split("/");
        let tmdbId = decodeURIComponent(pathnames[pathnames.length - 2]);
        let tmdbType = "movie";
        let error = false;

        if (!tmdbType || !tmdbId) {
            return; // Error handler
        }

        let results = await fetchData("get-by-id", {id: tmdbId, type: tmdbType});

        if (!results || !results.success) {
            return;
        } 

        setResult(results.responsedata)
        setLoading(false)
        setStreaminfoloading(true)
        
        let matched = await getStreamInfo(encodeURI(results.responsedata.title), tmdbType, results.responsedata.release_date.split("-")[0]);
        
        if (!matched) {
            setStreaminfoerror("Stream data not found")
            setStreaminfoloading(false)
        }

        setData(matched)
        setStreaminfoloading(false)

    }, [findContent])

    async function getStreamInfo (title, type, year) {
        if (!title || !type || !year) {
            return errorHandler(
                "Invalid Data Provided .. ",
                400,
                false,
                "GSI"
            )
        }   
        response = await findContent(title.replace(/\(.*?\)/, ""), year, type)
        if (!response.success) {
            setStreaminfoerror(response)
            return;
        }

        setData(response.matchedResult)
        return response.matchedResult;
    }

    async function handleStreamClick () {

        setStreamloading(true)

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

        setClicked(true)
        setStreamloading(true)
        
        let streamUrlResponse = await getStreamUrl(data)

        if (!streamUrlResponse.success) {
            setStreamerror(streamUrlResponse)
            setStreamloading(false);

            return;
        }

        setStreamOptions({url: streamUrlResponse.url, options: streamUrlResponse.options.videoOpts});
        setStreamSubtitles(streamUrlResponse.options.subtitles)
        setStreamloading(false)
        setLoading(false)

    }

    if (!loading && error) {
        return (<h1>Error</h1>)
    }

    if (!result) {
        return (            
            <div className="loading-screen">
                <Helmet>
                    <title>Moiva | Loading</title>
                </Helmet>
                <svg class="spinner" width="65px" height="65px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
                    <circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle>
                </svg>
            </div>
        )
    }

    return (

        <div className="movie-r-wrapper">
            <Helmet>
                <title>Moiva | {result.title}</title>
            </Helmet>
            <HeaderElement handleHambClick={props.handleHambClick} screenSize={props.screenSize} />
            <div className={`movie-info-sec-bg-wrapper${clicked ? " video-playing" : ""}`}>
                <div className="movie-info-sec-bg-overlay"></div>
                <div className="movie-info-sec-bg-overlay-rg"></div>
                <img className={`movie-info-sec-bg`} alt={result.title} data-src={result.backdrop_path} src={`${imageBase}original/${result.backdrop_path}`} ></img> 
                
            </div>

            {clicked && (
                <div className="movie-player-wrapper">
                    <VideoElement streamType="movie" streamLoading={streamloading} streamOptions={streamOptions} streamSubtitles={streamSubtitles} />
                </div>
            )}

            <div className="movie-r-inner">
            <div className={`movie-info-sec-wrapper${clicked ? " p-less" : ""}`}>
                    <div className="movie-info-sec-d-wrapper">
                        <div className="movie-info-sec-d-i">
                            <img id="movie-info-sec-d-i" alt={result.title} data-src={result.poster_path} src={`${imageBase}w500/${result.poster_path}`}></img>
                        </div>

                        <div className="movie-info-sec-details-col2">
                            <div className="movie-info-sec-details-col2-row1">
                                {result.tagline && (
                                    <span className="movie-info-tagline">{result.tagline}</span>
                                )}
                                <h2 className="movie-info-sec-details-col2-row1-header">{result.title} <span className="movie-info-sec-details-col2-row1-year">({result.release_date.split("-")[0]})</span></h2>
                            </div>
                            <div className="movie-info-sec-details-col2-row2">
                                <div className="movie-info-sec-details-col2-row2-col1">
                                    <span className="movie-info-sec-details-col2-row2-col1-text">{result.adult ? "NC-17" : "PG"}</span>
                               </div>
                               <div className="movie-info-sec-details-c2-r2-c2">
                                    <ul className="movie-info-sec-details-c2-r2-c2-list">
                                        <li className="movie-info-sec-details-c2-r2-c2-item">
                                            <span className="movie-info-details-c2-r2-c2-item-text movie-info-sec-details-ry">{result.release_date.replaceAll("-", "/").split("/").reverse().join("/")} <span className="movie-info-sec-lang">({result.original_language.toUpperCase()})</span> </span>
                                        </li>
                                        
                                        <div className="movie-info-sec-details-c2-r2-c2-list-gap"></div>
                                        
                                        <li className="movie-info-sec-details-c2-r2-c2-item">
                                            <span className="movie-info-details-c2-r2-c2-item-text movie-info-sec-details-genre">{result.genres.length > 0 && result.genres[0].name }</span>
                                        </li>

                                        <div className="movie-info-sec-details-c2-r2-c2-list-gap"></div>
                                        
                                        <li className="movie-info-sec-details-c2-r2-c2-item">
                                            <span className="movie-info-details-c2-r2-c2-item-text movie-info-sec-details-runtime">{result.runtime}</span>
                                        </li>
                                    </ul>
                               </div>
                            </div>
                            <div className="movie-info-sec-details-col2-row3">
                                <div className="movie-info-sec-bts-wraper">
                                    <div onClick={() => {!streaminfoerror && !streaminfoloading && handleStreamClick()}} className={`movie-info-sec-btn${streaminfoerror ? " streaminfoerror" : ""}${result.status !== "Released" ? " not-released" : ""}`} id="m-i-s-btn1">
                                        <span className="movie-info-sec-btn-text" id="m-i-s-btn1-text">{streaminfoloading && !streaminfoerror ? "Loading" : !streaminfoerror ? "Watch now" : "Not available"}</span>
                                    </div>
                                    <div className="movie-info-sec-btn" id="m-i-s-btn2">
    
                                        <div className="movie-info-sec-btn-2-playsvg">
                                            <svg id="movie-info-sec-btn-2-playsvg" width="22" height="21" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M2.75 19.25V1.75L19.25 10.5L2.75 19.25Z" fill="white"/>
                                            </svg>
                                        </div>

                                        <span className="movie-info-sec-btn-text" id="m-i-s-btn2-text">Play Trailer</span>
                                    </div>
                                </div>
                            </div>
                            <div className="movie-info-sec-details-col2-row4">
                                <div className="movie-info-overview">
                                    <span className="movie-info-overview-header">Overview</span>
                                    <span className="movie-info-overview-text">
                                        {result.overview ? result.overview.split("").length > 250 ? result.overview.slice(0, 250) + " ..." : result.overview : "We don't have an overview translated in English. Help us expand our database by adding one."}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                {result.credits && (
                    <CastWrapper castList={result.credits.cast} />
                )}
                {result.images && result.videos && (
                    <MediaWrapper images={{backdrops: result.images.backdrops.slice(0, 7), posters: result.images.posters.slice(0, 7)}} videos={result.videos.results.slice(0, 5)} />
                )}
                
            </div>
        </div>
    )
}
