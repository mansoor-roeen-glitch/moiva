import React, {useState, useEffect, useRef} from 'react';
import { imageBase } from '../utils/env';
import {findContent, getStreamUrl, findEpisodes} from '../functions/lookmovie/index';
import VideoElement from '../components/VideoElement';
import { stringify } from 'json5';
import errorHandler from '../functions/extra/errorhandler';
import HeaderElement from '../components/HeaderElement';
import CastWrapper from '../components/CastWrapper';
import MediaWrapper from '../components/MediaWrapper';
import "../components/styles/tvRouteStyles.css"
import "../components/styles/loader.css"
import { fetchData } from '../functions/extra/fetch';
import { useOnScreen } from '../functions/extra/useOnScreen';

export default function ShowRoute (props) {
    
    const [selectedEp, setSelectedEp] = useState(0);
    const [selectedSe, setSelectedSe] = useState(0);
    const [data, setData] = useState();
    const [result, setResult] = useState();
    const [episodes, setEpisodes] = useState();
    const [loading, setLoading] = useState(true);
    const [streamOptions, setStreamOptions] = useState();

    const [sDetails, setSDetails] = useState();
    const [sLoading, setSLoading] = useState(true); 

    const [streaminfoerror, setStreaminfoerror] = useState(false);
    const [streaminfoloading, setStreaminfoloading] = useState(true);

    const [streamError, setStreamError] = useState(false)
    const [streamloading, setStreamLoading] = useState(false) 
    const [clicked, setClicked] = useState(false)
    const [sactive, setSactive] = useState(false)

    let response;

    useEffect( async() => {

        let pathnames = window.location.pathname.split("/");
        let tmdbId = decodeURIComponent(pathnames[pathnames.length - 2]);
        let type = pathnames[1];
        let tmdbType = "tv";

        let results = [];
        let error = false;

        if (!tmdbId || !type) {
            return; // Error handler
        }

        let res = await fetchData("get-by-id", {id: tmdbId, type: tmdbType, isCast: true});   
        console.log(res)
        if (res.statuscode === 200 && res.responsedata) {
            results = res.responsedata;
        }
            
        let seasonDetails = await fetchData("get-season-details", {id: results.id, seasonNumber: selectedSe})
        if (error || !results || !seasonDetails) {
            return;
        }
        
        console.log(seasonDetails)

        setResult(results)
        setSDetails(seasonDetails.responsedata)
        setLoading(false)
        setSLoading(false)

        getStreamInfo(encodeURI(results.name), type, results.first_air_date)

    }, [])

    async function getStreamInfo (title, type, year) {

        if (!title || !type || !year) {
            setStreaminfoerror(errorHandler(
                "Invalid Data Provided .. ",
                400,
                false,
                "GSI"
            ))

            return;
        }  

        response = await findContent(title, year.split("-")[0], type)
        
        if (!response.success) {
            setStreaminfoerror(response)
            setStreaminfoloading(false)
            return;
        }

        let foundEpisodes = await findEpisodes(response.matchedResult.slug)

        // Default values, will change accordingly to the user
        setSelectedEp(stringify(1))
        setSelectedSe(stringify(1))
        
        setSelectedEp(0)
        setSelectedSe(0)

        setEpisodes(foundEpisodes)
        setData(response.matchedResult)
        setStreaminfoloading(false)
        
    }
    
    async function getSeasonDetails (id, seasonNumber) {
        let seasonDetails = await fetchData("get-season-details", {id: id, seasonNumber});
        if (!seasonDetails.res || !seasonDetails.res.episodes || !seasonDetails.tmdbSuccess) {
            return "error"
        }

        return seasonDetails.res
    }

    async function handleStreamClick (episode) {
        setClicked(true)
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
        let streamUrlResponse = await getStreamUrl({slug: data.slug, type: data.type, source: data.source, season: JSON.stringify(selectedSe + 1), episode: JSON.stringify(episode  + 1)})
        
        if (!streamUrlResponse.success) {
            
            setStreamError(streamUrlResponse);
            setStreamLoading(false)
        }
        setStreamOptions({url: streamUrlResponse.url, options: streamUrlResponse.options});
        setStreamLoading(false)
    }

    const handleSeasonSelect = async (index) => {
        console.log(index)
        if (sDetails.season_number !== index) {
            let seasonDetails = await fetchData("get-season-details", {id: result.id, seasonNumber: index -1})
            setSDetails(seasonDetails.responsedata)
            setSelectedSe(index -1)
        }
    }

    if (loading) {
        return (
            <div className="laoding-screen">
                <svg className="spinner" width="65px" height="65px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
                    <circle className="path" fill="none" strokeWidth="6" strokeLinecap="round" cx="33" cy="33" r="30"></circle>
                </svg>
            </div>
        )
    }

    return (
        
        <div className="tv-r-wrapper">
            <HeaderElement handleHambClick={props.handleHambClick} screenSize={props.screenSize} />
            <div className={`tv-info-sec-bg-wrapper${clicked ? " video-playing" : ""}`}>
                <div className="tv-info-sec-bg-overlay"></div>
                <div className="tv-info-sec-bg-overlay-rg"></div>
                <img className={`tv-info-sec-bg`} alt={result.name} data-src={result.backdrop_path} src={`${imageBase}original/${result.backdrop_path}`} ></img> 
                
            </div>

            {clicked && (
                <div className="tv-player-wrapper">
                    <VideoElement streamType="episode" streamLoading={streamloading} streamOptions={streamOptions} />
                </div>
            )}  

            {console.log(sDetails)}

            {clicked && sDetails && !sLoading && episodes && (
                <div className="tv-e-details">
                    <div className="tv-e-details-wrapper">
                        <div className="tv-e-details-header">
                            <div className="tv-e-details-header-t-wrapper">
                                <span className="tv-e-details-header-text">{sDetails.episodes[selectedEp].name} <span>(S{sDetails.season_number}:E{sDetails.episodes[selectedEp].episode_number})</span></span>
                                <span className="tv-e-details-header-date">Air date {sDetails.episodes[selectedEp].air_date.replaceAll("-", "/").split("/").reverse().join("/")}</span>                        
                            </div>
                            <div className="tv-e-details-header-s-wrapper">
                                <div className="tv-e-s-btn-wrapper">
                                    <svg className="tv-e-btn-svg" width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M20 15h4.071v2h-4.071v4.071h-2v-4.071h-4.071v-2h4.071v-4.071h2v4.071zm-8 6h-12v-2h12v2zm0-4.024h-12v-2h12v2zm0-3.976h-12v-2h12v2zm12-4h-24v-2h24v2zm0-4h-24v-2h24v2z"/></svg>
                                    <button className="tv-e-s-btn" onClick={() => {setSactive(!sactive)}}>Season {selectedSe + 1}</button>
                                </div>
                                <div className={`tv-e-details-header-s-l-wrapper${sactive ? " s-l-active" : ""}`}>
                                    <ul className="tv-e-details-header-s-l">
                                        {result.seasons.map((season, index) => {
                                            if (index !== 0) {
                                                return (
                                                    <li key={index} className="tv-e-details-header-s-i" onClick={() => {handleSeasonSelect(index); setSactive(!setSactive)}}>
                                                       <span className="tv-e-details-header-s-i-text">season {index}</span>
                                                   </li>)
                                            }
                                        })}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="tv-e-select-wrapper">
                        <ul className="tv-e-select-list">
                            {sDetails && sDetails.episodes.map((episode, index) => {
                                return (
                                    <li key={index} className="tv-e-select-item" onClick={() => {handleStreamClick(index)}} >
                                        <div className="tv-e-select-i-bg-wrapper">
                                            <img className="tv-e-select-i-bg-wrapper" data-src={episode.still_path} src={`${imageBase}w200${episode.still_path}`} alt={episode.name}></img>
                                            <div className="tv-e-select-i-bg-overlay"></div>
                                        </div>
                                        <div className="tv-e-select-i-header-wrapper">
                                            <span className="tv-e-select-header-text">{episode.name}</span>
                                            <span className="tv-e-select-header-date">{episode.air_date}</span>
                                        </div>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
            )}

            <div className="tv-r-inner">
            <div className={`tv-info-sec-wrapper${clicked ? " p-less" : ""}`}>
                    <div className="tv-info-sec-d-wrapper">
                        <div className="tv-info-sec-d-i">
                            <img id="tv-info-sec-d-i" alt={result.name} data-src={result.poster_path} src={`${imageBase}w500/${result.poster_path}`}></img>
                        </div>

                        <div className="tv-info-sec-details-col2">
                            <div className="tv-info-sec-details-col2-row1">
                                {result.tagline && (
                                    <span className="tv-info-tagline">{result.tagline}</span>
                                )}
                                <h2 className="tv-info-sec-details-col2-row1-header">{result.name} <span className="tv-info-sec-details-col2-row1-year">({result.first_air_date.split("-")[0]})</span></h2>
                            </div>
                            <div className="tv-info-sec-details-col2-row2">
                                <div className="tv-info-sec-details-col2-row2-col1">
                                    <span className="tv-info-sec-details-col2-row2-col1-text">{result.type}</span>
                               </div>
                               <div className="tv-info-sec-details-c2-r2-c2">
                                    <ul className="tv-info-sec-details-c2-r2-c2-list">
                                        <li className="tv-info-sec-details-c2-r2-c2-item">
                                            <span className="tv-info-details-c2-r2-c2-item-text tv-info-sec-details-ry">{result.first_air_date.replaceAll("-", "/").split("/").reverse().join("/")} <span className="tv-info-sec-lang">({result.original_language.toUpperCase()})</span> </span>
                                        </li>
                                        
                                        <div className="tv-info-sec-details-c2-r2-c2-list-gap"></div>
                                        
                                        <li className="tv-info-sec-details-c2-r2-c2-item">
                                            <span className="tv-info-details-c2-r2-c2-item-text tv-info-sec-details-genre">{result.genres[0].name}</span>
                                        </li>

                                        <div className="tv-info-sec-details-c2-r2-c2-list-gap"></div>
                                        
                                        <li className="tv-info-sec-details-c2-r2-c2-item">
                                            <span className="tv-info-details-c2-r2-c2-item-text tv-info-sec-details-runtime">EP: {result.number_of_episodes}</span>
                                        </li>
                                    </ul>
                               </div>
                            </div>
                            <div className="tv-info-sec-details-col2-row3">
                                <div className="tv-info-sec-bts-wraper">
                                    <div onClick={() => {!streaminfoerror && !streaminfoloading && handleStreamClick(0)}} className={`tv-info-sec-btn${streaminfoerror ? " streaminfoerror" : ""}`} id="m-i-s-btn1">
                                        <span className="tv-info-sec-btn-text" id="m-i-s-btn1-text">{streaminfoloading && !streaminfoerror ? "Loading" : !streaminfoerror ? "Watch now" : "Not available"}</span>
                                    </div>
                                    <div className="tv-info-sec-btn" id="m-i-s-btn2">
    
                                        <div className="tv-info-sec-btn-2-playsvg">
                                            <svg id="tv-info-sec-btn-2-playsvg" width="22" height="21" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M2.75 19.25V1.75L19.25 10.5L2.75 19.25Z" fill="white"/>
                                            </svg>
                                        </div>

                                        <span className="tv-info-sec-btn-text" id="m-i-s-btn2-text">Play Trailer</span>
                                    </div>
                                </div>
                            </div>
                            <div className="tv-info-sec-details-col2-row4">
                                <div className="tv-info-overview">
                                    <span className="tv-info-overview-header">Overview</span>
                                    <span className="tv-info-overview-text">
                                        {result.overview ? result.overview.split("").length > 250 ? result.overview.slice(0, 250) + " ..." : result.overview : "We don't have an overview translated in English. Help us expand our database by adding one."}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="cast-outer-container">
                    {!result || !result.credits && (
                        <div className="cast-container-placeholder">some content here</div>
                    )} 
                    {result && result.credits && (
                        <CastWrapper castList={result.credits.cast} />
                    )}
                </div>

                <div className="images-outer-container">
                    {!result || !result.images || !result.videos && (
                        <div className="images-container-placeholder">some content here</div>
                    )}
                    {result && result.images && result.videos && (
                        <MediaWrapper images={{backdrops: result.images.backdrops.slice(0, 7), posters: result.images.posters.slice(0, 7)}} videos={result.videos.results.slice(0, 5)} />
                    )}
                </div>
                
            </div>
        </div>
    )   
}

