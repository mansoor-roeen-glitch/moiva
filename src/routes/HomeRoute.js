import React, {useState, useEffect} from 'react'
import { Redirect } from 'react-router';
import { gethome } from '../functions/extra/fetch';
import { apend, apkey, tmdbkey, tmdbend } from '../utils/env';
import sortList from '../functions/sort/sort'
import HeaderElement from '../components/HeaderElement';
import HeroElement from '../components/HeroElement';
import LayoutElement from '../components/LayoutElement';

export default function HomeRoute(props) {
    
    const [input, setInput] = useState("")
    const [results, setResults] = useState()
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(true);
    const [redirect, setRedirect] = useState(false);
    const [redirectPathname, setRedirectPathname] = useState(null);

    const [screenWidth, setScreenWidth] = useState(window.innerWidth)
    const [screenHeight, setScreenHeight] = useState(window.innerHeight)
    
    function handleResize () {
      setScreenWidth(window.innerWidth);
      setScreenHeight(window.innerHeight);
    }
  

    const findContent = (event) => {
        let id;
        let slug;

        if (!event.target.dataset) {
        return; // Error handler 
        } 

        if (event.target.dataset.imdbid) {
            id = event.target.dataset.imdbid.slice(2)
            slug = event.target.dataset.title.toLowerCase().replaceAll("-", "").split(" ").join("-").replaceAll(".", "").replaceAll(":", "")

        } else {
            return;
        }

        setRedirectPathname(`/${event.target.dataset.type}/${id}/${slug}`)
        setRedirect(true);
    } 

    const getHome = async () => {  

        setLoading(true)
        let homeRes = await gethome(apkey, apend, "IMDB")

        if (homeRes.success !== true) {
            setError(homeRes)
            setLoading(false)
            return; // Error handler
        }

        let showsSorted = sortList(homeRes.tv.items)
        let moviesSorted = sortList(homeRes.movies.items)

        setResults({showsSorted, moviesSorted})
        setLoading(false)

    }

    const search = (term) => {
        console.log(term)
    }

    const renderRedirect = () => {
        if (redirect) {
            return (
                <Redirect to={{pathname: redirectPathname}} />
            )
        }

    }

    useEffect(() => {
        
        // Doing the things required before page loads
        // getHome()
        document.addEventListener("resize", handleResize)
        
    }, [])

    return (
        <div className="h-main-o-wrapper">
            <div className="h-main-i-wrapper">
                <HeaderElement screenSize={{screenHeight, screenWidth}} />
            </div>
        </div>
    )
}
