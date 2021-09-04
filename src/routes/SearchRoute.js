import React, {useEffect, useState} from 'react'
import GridElement from '../components/GridElement'
import HeaderElement from '../components/HeaderElement'
import { fetchData, searchitem } from '../functions/extra/fetch'
import '../components/styles/searchRoute.css'

export default function SearchRoute(props) {

    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("")
    const [results, setResults] = useState();
    const [error, setError] = useState();

    
    useEffect( async () => {

        const pathnames = window.location.pathname.split("/")
        const query = pathnames[pathnames.length - 1] 
        setSearchTerm(query)

        let res = await fetchData("get-search", {query: query.replaceAll("%20", "+")});
        if (res.success) {
            setResults(res.responsedata.results)
            setLoading(false)
        } else {
            setError(res)
            setLoading(false)
        }

    }, [])

    return (
        <div className="search-route-o-wrapper">
            <HeaderElement isSearch={true} handleHambClick={props.handleHambClick} screenSize={props.screenSize} />

            <div className="search-route-i-wrapper">
                <div className="search-route-header-wrapper" >
                    <div className="search-route-header-i-wrapper">
                        <span className="search-route-header">Search Resutls For <strong>"{decodeURIComponent(searchTerm)}"</strong></span>
                        <div className="search-route-header-bottom"></div>
                    </div>
                </div>

                <div className="search-r-o-inner">
                    <div className="h-grid-sec-row-gap" style={{width: "100%", height: "55px"}}></div>
                    {!loading && !error && (
                        <GridElement screenSize={props.screenSize} isSearch={true} results={results} resultLoading={loading} sort="Search Results" />
                    )}
                    <div className="h-grid-sec-row-gap" style={{width: "100%", height: "70px"}}></div>
                </div>
            </div>
        </div>
    )
}
