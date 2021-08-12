import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './styles/headerStyles.css';
import './styles/searchbarStyles.css';

import SearchElement from './sub-comps/SearchElement'; 

export default function HeaderElement({screenSize}) {

    const [isNavActive, setIsNavActive] = useState(false)

    const handleHambClick = () => {
        if (isNavActive === "active") {
            setIsNavActive("closed")
        } else if (isNavActive === "closed") {
            setIsNavActive("active")
        } else {
            setIsNavActive("active")
        }
    }

    document.addEventListener("click", (event) => {
        if (isNavActive === "active") {
            let cn = event.target.className;
        
            if (
                cn === "HeaderElement.js:25 r-selected navbar-item-link-text navbar-item-1-text" || 
                cn === "h-i-middle-wrapper h-mob-nav-active" ||
                cn === "navbar-item-wrapper" || 
                cn === "h-i-hamb-wrapper") {
                    return "";
                } else {
                    setIsNavActive("closed")
                }
        }
    })

    return (
        
        <div className="header-outer-wrapper">
            <div className="header-inner-wrapper">
                <div className="h-i-left-wrapper">
 
                    <a href="/" className="moiva-svg-wrapper">
                        <svg id="moiva-svg" width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0)">
                            <path id="moiva-svg-a" fill-rule="evenodd" clip-rule="evenodd" d="M17.6067 13.6921L20.2311 20.8122H20.4394L23.4804 13.7846L26.3547 13.8586L26.438 21.8108L26.8338 26.5822H24.0219L24.1261 21.7738L23.8969 16.91L21.3975 23.0314L18.8356 23.1424L16.5028 16.91L16.3154 21.7738L16.4612 26.5822H13.8784L14.17 22.0882L14.295 14.1545L17.6067 13.6921Z" fill="#76F5D7" stroke="#76F5D7" stroke-width="0.25" stroke-linecap="round"/>
                            </g>
                            <path d="M20.5 3L3 11.5556V29.0556L20.5 38L38 29.4444V11.9444L20.5 3Z" stroke="#76F5D7" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
                            <defs>
                            <clipPath id="clip0">
                            <rect width="13.2432" height="13.1765" fill="white" transform="translate(13.8784 13.6921)"/>
                            </clipPath>
                            </defs>
                        </svg>
                    </a>
                </div>
            
            <div className={isNavActive ? `h-i-middle-wrapper h-mob-nav-${isNavActive}` : "h-i-middle-wrapper"}>
                <nav className="h-i-navbar">
                    <ul className="navbar-item-wrapper">
                        
                        <li className="navbar-item-link navbar-item-1 home">
                            <Link className="r-selected navbar-item-link-text navbar-item-1-text" to="/" >Home</Link>
                        </li>
                        
                        <li className="navbar-item-link navbar-item-2 movie">
                            <Link className="navbar-item-link-text navbar-item-2-text" to="/" >Movies</Link>
                        </li>

                        <li className="navbar-item-link navbar-item-3 show">
                            <Link className="navbar-item-link-text navbar-item-2-text" to="/shows" >Tv Shows</Link>
                        </li>

                        <li className="navbar-item-link navbar-item-4 imdb">
                            <Link className="navbar-item-link-text navbar-item-3-text" to="/" >Top IMDB</Link>
                        </li>

                        <li className="navbar-item-link navbar-item-5">
                            <span tabIndex="0" className="navbar-item-list-text navbar-item-4-text">Genre</span>
                        </li>

                        <li className="navbar-item-link navbar-item-5">
                            <span tabIndex="0" className="navbar-item-list-text navbar-item-4-text">Country</span>
                        </li>

                    </ul>
                </nav>
            </div>

            
            <div className="h-i-right-wrapper">
                <SearchElement />
                {screenSize.screenWidth <= 1150 &&
                    (<div className="h-i-hamb-wrapper" onClick={handleHambClick}>
                        <input type="checkbox"id="h-i-hamb-checkbox" name="h-i-hamb" />
                        <label id="h-i-hamb-label" className="h-i-hamb-label" for="h-i-hamb">
                            <span className="h-i-hamb-line" id="h-i-hamb-link-1"></span>
                            <span className="h-i-hamb-line" id="h-i-hamb-link-2"></span>
                            <span className="h-i-hamb-line" id="h-i-hamb-link-3"></span>
                        </label>
                    </div>)} 
            </div>

            </div>
        </div>
    )
}
