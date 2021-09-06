import React from 'react'; 
import { Link } from 'react-router-dom';
import { useState } from 'react/cjs/react.development';
import { imageBase } from '../../utils/env';
import LazyImage from './LazyImage';

export default function ItemElement({item, type, id, isSearch}) {

    if ( isSearch && !item.release_date) {
        return "";
    }

    let name = type === "movie" ? item.title : item.name;
    let slug = name.toLowerCase().replace(/[^\w ]+/g,'').replace(/ +/g,'-');
    let release_date = type === "tv" ? item.first_air_date : item.release_date;
    let release_year = release_date.split("-")[0];
    let route_type = type === "tv" ? "show" : "movie"

    return (
        <li data-id={slug} key={slug} id={slug} className="grid-item-t1">
            
            <Link style={{textDecoration: "none"}} to={`/${route_type}/${id}/${slug}-${release_date}`} className="grid-item-t1-bd-wrapper">
                <LazyImage className="grid-item-bd" width="100%" height="100%" src={`${imageBase}w200/${item.poster_path}`} />
                <div className="grid-item-bd-overlay"></div>
            </Link>

            <div className="grid-item-t1-info">
                <div className="t1-col1" style={{}}>
                    
                    <div className="t1-col1-rating">
                        <div className="t1-col1-rating-svg">
                            <svg id="t1-col1-rating-svg" width="16" height="16" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7 0.167969L8.65258 5.25347H14L9.67342 8.39705L11.326 13.4826L7 10.3396L2.67342 13.4826L4.326 8.39705L0 5.25347H5.34742L7 0.167969Z" fill="#ECA51B"/>
                            </svg>
                        </div>
                        <span className="t1-col1-text">{item.vote_average}</span>
                    
                    </div>

                    <div className="t1-col1-year">
                        <span className="t1-col1-year-text">{release_year}</span>
                    </div>
                </div>
                
                <div className="t1-col2">
                    <Link to={`/${route_type}/${id}/${slug}-${release_date}`} style={{textDecoration: "none"}} className="t1-col2-name">
                        <span className="t1-col2-name-text">{(name.split("").length > 28 ? name.slice(0, 26) + " ..." : name)}</span>
                    </Link>
                </div>

                <div className="t1-col3">
                    <div className="t1-col3-btn-wrapper">
                        <Link style={{textDecoration: "none"}} to={`/${route_type}/${id}/${slug}-${release_date}`}>
                            <button id="t1-col3-btn2" className="t1-col3-btn">
                                <span className="t1-col3-btn-text">Preview</span>
                            </button>
                        </Link>
                    </div>
                </div>

            </div>

        </li>
    )
}
