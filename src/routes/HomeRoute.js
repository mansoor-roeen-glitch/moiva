import React, {useState, useEffect, useRef} from 'react'
import HeaderElement from '../components/HeaderElement';
import HeroElement from '../components/HeroElement';
import GridElement from '../components/GridElement';
import { getCorsUrl, getProxyUrl, homeScrapper } from '../utils/env';
import {useOnScreen} from '../functions/extra/useOnScreen';

export default function HomeRoute(props) {
    
    const [results, setResults] = useState({
        ratedMovies: new Array(24).fill("dummy"), 
        ratedShows: new Array(24).fill("dummy"), 
        popularMovies: new Array(24).fill("dummy"), 
        popularShows: new Array(24).fill("dummy")})

    const [resultLoading, setResultsLoading] = useState({
        ratedMoviesLoading: true, 
        ratedShowsLoading: true, 
        popularMoviesLoading: true, 
        popularShowsLoading: true})

    const [isViewed, setIsViewed] = useState({
        isRatedMovies: false, 
        isRatedShows: false, 
        isPopularMovies: false, 
        isPopularShows: false})


    const ratedshowsRef = useRef();
    const isRatedshowsVisible = useOnScreen(ratedshowsRef)

    const ratedmoviesRef = useRef();
    const isRatedmoviesVisible = useOnScreen(ratedmoviesRef)

    const popularmoviesRef = useRef();
    const isPopularmoviesVisible = useOnScreen(popularmoviesRef)

    const popularshowsRef = useRef();
    const isPopularshowsVisible = useOnScreen(popularshowsRef)

    const [resultError, setResultError] = useState(false)

    async function getResponse (pathname) {
      let url = getProxyUrl(pathname)
      let result = await fetch(url)
        .then(res => res.json())
        .catch(error => error)
      return result
    }

    useEffect( async () => {
      
      if (isPopularmoviesVisible && !isViewed.isPopularMovies) {
        let result = await getResponse('popular-movies')
        
        if (result.success === false || !result.statuscode === 200 && result.responsedata.results.length <= 0) {
          setResultsLoading(prevStates => ({...prevStates, popularMoviesLoading: false}))
          setResultError(result);
          return;
        }

        setResultsLoading(prevStates => ({...prevStates, popularMoviesLoading: false}))
        setResults(prevStates => ({...prevStates, popularMovies: result.responsedata.results}))
        setIsViewed(prevStates => ({...prevStates, isPopularMovies: true}));
      }

      if (isPopularshowsVisible && !isViewed.isPopularShows) {
        let result = await getResponse('popular-tvs')
        console.log(result)
        
        if (result.success === false || !result.statuscode === 200 && result.responsedata.results.length <= 0) {
          setResultError(result);
          setResultsLoading(prevStates => ({...prevStates, popularShowsLoading: false}))
          return;
        }

        setResults(prevStates => ({...prevStates, popularShows: result.responsedata.results}))
        setResultsLoading(prevStates => ({...prevStates, popularShowsLoading: false}))
        setIsViewed(prevStates => ({...prevStates, isPopularShows: true}));
      } 

      if (isRatedmoviesVisible && !isViewed.isRatedMovies) {
        console.log("something")
        let result = await getResponse('rated-movies')
        console.log(result)
        if (result.success === false || !result.statuscode === 200 && result.responsedata.results.length <= 0) {
          setResultError(result);
          setResultsLoading(prevStates => ({...prevStates, ratedMoviesLoading: false}))
          return;
        }

        setResults(prevStates => ({...prevStates, ratedMovies: result.responsedata.results}))
        setResultsLoading(prevStates => ({...prevStates, ratedMoviesLoading: false}))
        setIsViewed(prevStates => ({...prevStates, isRatedMovies: true}));
      } 

      if (isRatedshowsVisible && !isViewed.isRatedShows) {
        let result = await getResponse('rated-tvs')
        console.log(result)
        if (result.success === false || !result.statuscode === 200 && result.responsedata.results.length <= 0) {
          setResultError(result);
          setResultsLoading(prevStates => ({...prevStates, ratedShowsLoading: false}))
          return;
        }

        setResults(prevStates => ({...prevStates, ratedShows: result.responsedata.results}))
        setResultsLoading(prevStates => ({...prevStates, ratedShowsLoading: false}))
        setIsViewed(prevStates => ({...prevStates, isRatedShows: true}))
      }

    }, [isPopularshowsVisible,isPopularmoviesVisible,isRatedmoviesVisible,isRatedshowsVisible])

    return (
        
        <div className="h-o-wrapper" style={{display: "flex", flexDirection: "column", alignItems: "center"}}>        
            <HeaderElement screenSize={props.screenSize} handleHambClick={props.handleHambClick} />
            <HeroElement screenSize={props.screenSize} />
            <div className="h-s-1-gap" style={{width: "100%", height: "70px"}}></div>
            
            <div className="h-grid-sec-wrapper" style={{width: "100%", height: "auto"}}>

                <div className="h-grid-sec-wp" ref={popularmoviesRef} >
                  <GridElement type="movie" screenSize={props.screenSize} resultLoading={resultLoading.popularMoviesLoading} resultError={resultError} results={results.popularMovies} sort={"Popular movies"}/>
                </div>
                
                <div className="h-grid-sec-row-gap" style={{width: "100%", height: "90px"}}></div>
                
                <div className="h-grid-sec-wp" ref={ratedmoviesRef}>
                  <GridElement type="movie" screenSize={props.screenSize} resultLoading={resultLoading.ratedMoviesLoading} resultError={resultError} results={results.ratedMovies} sort={"Top rated movies"}/>
                </div>
                
                <div className="h-grid-sec-row-gap" style={{width: "100%", height: "90px"}}></div>

                <div className="h-grid-sec-wp" ref={popularshowsRef} >
                  <GridElement type="tv" screenSize={props.screenSize} resultLoading={resultLoading.popularShowsLoading} resultError={resultError} results={results.popularShows} sort={"Popular shows"}/>
                </div>  

                <div className="h-grid-sec-row-gap" style={{width: "100%", height: "90px"}}></div>
                
                <div className="h-grid-sec-wp" ref={ratedshowsRef} >
                  <GridElement type="tv" screenSize={props.screenSize} resultLoading={resultLoading.ratedShowsLoading} resultError={resultError} results={results.ratedShows} sort={"Top rated shows"} />
                </div>

                <div className="h-grid-sec-row-gap" style={{width: "100%", height: "90px"}}></div>

            </div>
        
        </div>
    )
}
