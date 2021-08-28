import React from 'react'
import { imageBase } from '../../utils/env'

export default function CastItem({cast}) {

    let character = cast.character.split("/")[0]

    return (
        <li className="cast-grid-item">
            <div className="cast-grid-item-i-wrapper">
                <img className="cast-grid-item-i" data-src={cast.profile_path} src={`${imageBase}w300/${cast.profile_path}`} alt={cast.name} />
                <div className="cast-grid-item-i-overlay"></div>
            </div>

            <div className="cast-grid-item-details">                
                <div className="cast-grid-item-details-rname">
                    <span className="cast-grid-item-details-rname-text">{cast.name.split("").length > 20 ? cast.name.slice(0, 20) + "..." : cast.name}</span>
                </div>                
                <div className="cast-grid-item-details-fname">
                    <span className="cast-grid-item-details-cname-text">{character.split("").length > 20 ? character.slice(0, 20) + "..." : character}</span>
                </div>                
            </div>

        </li>
    )
}
