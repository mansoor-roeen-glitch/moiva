import "./styles/gridStyles.css";
import './styles/itemStyles.css';
import React, { useEffect, useState } from 'react'
import ItemElement from "./sub-comps/ItemElement";
import ItemPlaceholder from "./sub-comps/ItemPlaceholder";

export default function GridElement({results, sort, type, resultLoading, isSearch, ref}) {
    const [loaded, setLoaded] = useState(false);
    const stuffLoaded = () => {
        resultLoading = true
        setTimeout(() => {
            setLoaded(true);
        }, 700)
    }

    return (
        <div ref={ref} className="grid-o-wrapper" style={{justifyContent: isSearch ? "flex-start" : "center"}}>
            {resultLoading ? "" : stuffLoaded()}
            <div className="grid-content-wrapper">
                {!isSearch && (
                    <div className="g-c-header">
                        <div className="g-c-header-line"></div>
                        <span className="g-c-header-heading">{sort}</span>
                    </div>
                )}
                <ul className="g-c-grid">
                    {!isSearch ? !loaded && results[0] === "dummy" ? results.map((item, index) => {return <ItemPlaceholder key={index} />}) : results.map((item, index) => {
                        return <ItemElement item={item} type={type} id={item.id} /> })
                        : results.map((item, index) => {
                            if (item.media_type === "movie" || item.media_type === "tv" ) {
                                return <ItemElement item={item} type={item.media_type} id={item.id} />
                            }
                        }) 
                    }
                        
                </ul> 
            </div>
        </div>
    )
}
