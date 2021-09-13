import './styles/loader.css';
import "./styles/gridStyles.css";
import './styles/itemStyles.css';
import React, { useEffect, useState } from 'react'
import ItemElement from "./sub-comps/ItemElement";
import ItemPlaceholder from "./sub-comps/ItemPlaceholder";

export default function GridElement({results, sort, type, resultLoading, isSearch, screenSize}) {
    
    let res = [];

    if (screenSize.screenWidth > 1464.52) {
        for (let i=0; i < 16; i++ ) {
            res.push(results[i])
        }
    } else if (screenSize.screenWidth > 1200) {
        for (let i=0; i < 14; i++ ) {
            res.push(results[i])
        }
    } else if (screenSize.screenWidth > 700) {
        for (let i=0; i < 10; i++ ) {
            res.push(results[i])
        }
    } else if (screenSize.screenWidth > 400) {
        for (let i=0; i < 9; i++ ) {
            res.push(results[i])
        }
    } else  {
        for (let i=0; i < 6; i++ ) {
            res.push(results[i])
        }
    } 

    const [loaded, setLoaded] = useState(false);
    const stuffLoaded = () => {
        resultLoading = true
        setTimeout(() => {
            setLoaded(true);
        }, 300)
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
                    {!loaded && (
                        <div className="loadingGridContent">
                            <div className="loading-screen">
                                <svg className="spinner" width="65px" height="65px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
                                    <circle className="path" fill="none" strokeWidth="6" strokeLinecap="round" cx="33" cy="33" r="30"></circle>
                                </svg>
                            </div>
                        </div>
                    )}
                    {!isSearch ? !loaded && results[0] === "dummy" ? res.map((item, index) => {return <ItemPlaceholder key={index} />}) : res.map((item, index) => {
                        return <ItemElement item={item} type={type} id={item.id} isSearch={isSearch} /> })
                        : res.map((item, index) => {
                            if (item) {
                                if (item.media_type === "movie" || item.media_type === "tv" ) {
                                    return <ItemElement item={item} type={item.media_type} id={item.id} isSearch={isSearch} />
                                }
                            }
                        }) 
                    }
                        
                </ul> 
            </div>
        </div>
    )
}
