import React, {useState, useEffect} from 'react'
import HeaderElement from '../components/HeaderElement';
import HeroElement from '../components/HeroElement';
import GridElement from '../components/GridElement';
import { getCorsUrl, homeScrapper } from '../utils/env';

export default function HomeRoute(props) {
    
    const [results, setResults] = useState({
        comingSoon: new Array(24).fill(null), 
        latestMovies: new Array(24).fill(null), 
        latestShows: new Array(24).fill(null), 
        popularMovies: new Array(24).fill(null), 
        popularShows: new Array(24).fill(null)})

    const [resultError, setResultError] = useState(false)
    const [resultLoading, setResultLoading] = useState(true);

    async function getResponse (url) {
      url = getCorsUrl(url)
      let result = await fetch(url)
        .then(res => res.json())
        .catch(error => error)

      if (result.success === false || !result.statuscode === 200) {
        setResultError(result);
        setResultLoading(false);
        return result;
      }

      setResults(result.results)
      setResultLoading(false);

    }

    useEffect(() => {
      getResponse(homeScrapper)
    }, [])

    return (
        <div className="h-o-wrapper" style={{display: "flex", flexDirection: "column", alignItems: "center"}}>        
            <HeaderElement screenSize={props.screenSize} handleHambClick={props.handleHambClick} />
            <HeroElement screenSize={props.screenSize} />
            <div className="h-s-1-gap" style={{width: "100%", height: "70px"}}></div>
            
            <div className="h-grid-sec-wrapper" style={{width: "100%", height: "auto"}}>

                <GridElement resultLoading={resultLoading} resultError={resultError} results={results.popularMovies} sort={"Popular movies"} type="movie" />
                <div className="h-grid-sec-row-gap" style={{width: "100%", height: "90px"}}></div>
                <GridElement resultLoading={resultLoading} resultError={resultError} results={results.latestMovies} sort={"Latest movies"} type="movie" />
                <div className="h-grid-sec-row-gap" style={{width: "100%", height: "90px"}}></div>
                <GridElement resultLoading={resultLoading} resultError={resultError} results={results.popularShows} sort={"Popular shows"} type="show" />
                <div className="h-grid-sec-row-gap" style={{width: "100%", height: "90px"}}></div>
                <GridElement resultLoading={resultLoading} resultError={resultError} results={results.latestShows} sort={"Latest shows"} type="show" />
                <div className="h-grid-sec-row-gap" style={{width: "100%", height: "90px"}}></div>
                <GridElement resultLoading={resultLoading} resultError={resultError} results={results.comingSoon} sort={"Coming Soon"} type="movie" />
                <div className="h-grid-sec-row-gap" style={{width: "100%", height: "90px"}}></div>

            </div>
        
        </div>
    )
}
