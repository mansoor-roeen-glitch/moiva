import React, { useState } from 'react'
import '../components/styles/mediaWrapper.css'
import { imageBase } from '../utils/env'

export default function MediaWrapper({images, videos}) {    
    const [checkedBox, setCheckedBox] = useState("2")

    return (
        <div className="media-wrapper">

            <div className="media-wrapper-header-wrapper">
                
                <div className="media-wrapper-h-t-wrapper">
                    <span className="media-wrapper-header">Media</span>
                    <div className="media-wrapper-header-line"></div>
                </div>
            
                <div className="media-w-h-c-wrapper">
                    <div onClick={() => {setCheckedBox("1")}} className={`media-checkbox-wrapper${checkedBox === "1" ? " active" : ""}`}>
                        <input type="ratio" id="media-checkbox-videos" className="media-checkbox" name="media-checkbox" />
                        <span className="media-checkbox-text">Videos <span className="media-checkbox-text-number">{videos.length}</span></span>
                        <div className="media-checkbox-underline"></div>
                    </div>

                    <div onClick={() => {setCheckedBox("2")}} className={`media-checkbox-wrapper${checkedBox === "2" ? " active" : ""}`}>
                        <input type="ratio" id="media-checkbox-backdrops" className="media-checkbox" name="media-checkbox" />
                        <span className="media-checkbox-text">Backdrops <span className="media-checkbox-text-number">{images.posters.length}</span></span>
                        <div className="media-checkbox-underline"></div>
                    </div>

                    <div onClick={() => {setCheckedBox("3")}} className={`media-checkbox-wrapper${checkedBox === "3" ? " active" : ""}`}>
                        <input type="ratio" id="media-checkbox-posters" className="media-checkbox" name="media-checkbox" />
                        <span className="media-checkbox-text">Posters <span className="media-checkbox-text-number">{images.posters.length}</span></span>
                        <div className="media-checkbox-underline"></div>
                    </div>
                </div>
            
            </div>

            <div className="media-wrapper-grid-wrapper">
                {checkedBox !== "1" ? (
                    <ul className="media-grid">
                        {checkedBox === "2" ? images.backdrops.map((image, index) => (
                            <li key={index} className="media-grid-item" >
                                <div className="media-grid-item-i-w">
                                    <img className="media-grid-item-i" src={`${imageBase}original/${image.file_path}`} data-src={image.file_path} alt="Train to Busan" />
                                </div>
                            </li>
                        )) : images.posters.map((image, index) => (
                            <li key={index} className="media-grid-item">
                                <div className="media-grid-item-i-w">
                                    <img className="media-grid-item-i" src={`${imageBase}original/${image.file_path}`} data-src={image.file_path} alt="Train to Busan" />
                                </div>
                            </li>
                        ))}
                    </ul>
                ): (
                    <ul className="media-grid">
                    {videos.map((video, index) => (
                        <li key={index} className="media-grid-item-v">
                            <div className="media-grid-item-v-w">
                                <iframe className="media-grid-item-i-v" src={`https://www.youtube.com/embed/${video.key}`} data-src={video.key} alt="Train to Busan" frameBorder="0" allowFullScreen ></iframe>
                            </div>
                        </li>
                    ))}
                    </ul>
                )}
                <div className="media-grid-overlay-right"></div>
            </div>
        </div>
    )
}
