import React from 'react';
import './styles/heroElementStyles.css';

export default function HeroElement({screenSize, forSearch}) {
    return (
        <div className="hero-o-wrapper" style={{height: forSearch ? "200px" : "350px"}}>
            
        <div className="hero-bg-wrapper" style={{height: forSearch ? "200px" : "350px"}}>
                    <img className="hero-content-bg" src="/static/images/hero-backdrop.jpg" alt="Hero Element Backdrop" />
                    <div className="hero-content-overlay"></div>
                </div>

            <div className="hero-content-wrapper">
                
                {!forSearch ? (
                    <div className="hero-content">
                        <h1 className="hero-content-h">Welcome to moiva</h1>
                        <span className="hero-content-gap"></span>
                        <p className="hero-content-p">
                            This website uses 3rd party services and does not store any of the content provided, therefore is not held accountable for copyright issues. If you enjoyed our services tell your friends about us
                        </p>
                    </div>
                ) : (
                    ""
                )}
            </div>
        </div>
    )
}
