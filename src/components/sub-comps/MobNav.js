import React from 'react'
import { Link } from 'react-router-dom'

import '../styles/mobNav.css'

export default function MobNav({isActive}) {

    return (
        <div style={{opacity: isActive != false ? "1" : "0"}} className={isActive ? `mob-nav h-mob-nav-${isActive === "active" ? "active" : "closed"}` : "mob-nav"}>
            <nav className="mob-navbar">
                <ul className="mob-navbar-item-wrapper">
                    
                    <li className="mob-navbar-item-link navbar-item">
                        <Link className="r-selected mob-navbar-item-link-text navbar-item-text" to="/" >Home</Link>
                    </li>
                    
                    <li className="mob-navbar-item-link navbar-item">
                        <Link className="mob-navbar-item-link-text navbar-item-text" to="/" >Movies</Link>
                    </li>

                    <li className="mob-navbar-item-link navbar-item">
                        <Link className="mob-navbar-item-link-text navbar-item-text" to="/shows" >Tv Shows</Link>
                    </li>

                    <li className="mob-navbar-item-link navbar-item">
                        <Link className="mob-navbar-item-link-text navbar-item-text" to="/" >Top IMDB</Link>
                    </li>

                    <li className="mob-navbar-item-link navbar-item">
                        <span tabIndex="0" className="mob-navbar-item-list-text navbar-item-text">Genre</span>
                    </li>

                    <li className="mob-navbar-item-link navbar-item">
                        <span tabIndex="0" className="mob-navbar-item-list-text navbar-item-text">Country</span>
                    </li>

                </ul>
            </nav>
        </div>
    )
}
