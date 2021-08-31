import "./styles/gridStyles.css";
import './styles/itemStyles.css';
import React, { useEffect, useState } from 'react'
import ItemElement from "./sub-comps/ItemElement";
import ItemPlaceholder from "./sub-comps/ItemPlaceholder";

export default function GridElement({results, sort, type, resultLoading, isSearch}) {
    const [loaded, setLoaded] = useState(false);

    const stuffLoaded = () => {
        resultLoading = true
        setTimeout(() => {
            setLoaded(true);
        }, 700)
    }

    return (
        <div className="grid-o-wrapper" style={{justifyContent: isSearch ? "flex-start" : "center"}}>
            {resultLoading ? "" : stuffLoaded()}
            <div className="grid-content-wrapper">
                {!isSearch && (
                    <div className="g-c-header">
                        <div className="g-c-header-line"></div>
                        <span className="g-c-header-heading">{sort}</span>
                    </div>
                )}
                <ul className="g-c-grid">
                    {!loaded ? !isSearch ? results.map((item, index) => {return <ItemPlaceholder key={index} />}) : "" : results.map((item, index) => {
                        if (!isSearch) {
                            return <ItemElement key={`${item.title.toLowerCase().replace(/[^\w ]+/g,'').replace(/ +/g,'-')}-${index}`} type={type} slug={item.title.toLowerCase().replace(/[^\w ]+/g,'').replace(/ +/g,'-')} item={item} />
                        } else {
                            if (parseFloat(item.vote_average) > 3 && parseFloat(item.popularity) >= 10) {
                                if (item.media_type === "movie" || item.media_type === "tv") {
                                    return <ItemElement isSearch={true} key={item.media_type === "tv" ? item.name.toLowerCase().replace(/[^\w ]+/g,'').replace(/ +/g,'-') : item.title.toLowerCase().replace(/[^\w ]+/g,'').replace(/ +/g,'-')} type={item.media_type === "tv" ? "show" : "movie"} slug={item.media_type === "tv" ? item.name.toLowerCase().replace(/[^\w ]+/g,'').replace(/ +/g,'-') : item.title.toLowerCase().replace(/[^\w ]+/g,'').replace(/ +/g,'-')} item={item} />
                                }         
                            } 
                        }
                        })}
                </ul> 
            </div>
        </div>
    )
}
