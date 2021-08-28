import React, {useState} from 'react'
import CastItem from './sub-comps/CastItem'
import '../components/styles/castWrapper.css'

export default function CastWrapper({castList}) {
    const [scroll, setScroll] = useState({sLeft: 0})

    const handleScroll = (e) => {
        setScroll({sWidth: e.target.scrollWidth / 2, sLeft: e.target.scrollLeft})
    }

    return (
        <div className="cast-wrapper">
            <div className="cast-sec-header-wrapper">
                <span className="cast-header">Top Billed Cast</span>
                <div className="cast-header-line"></div>
            </div>
                <div className="cast-grid">
                    
                <ul onScroll={handleScroll} className="cast-grid-list">
                    {castList.map((cast, index) => {
                        return <CastItem cast={cast} key={index} />
                    })}
                </ul>

                {scroll.sLeft <= 20 && (<div className="cast-grid-overlay-right"></div>)}
 
            </div>
        </div>
    )
}
