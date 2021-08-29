import React, { useState, useEffect } from 'react'

export default function SearchElement() {
    
    let [searchTerm, setSearchTerm] = useState("");
    let [redirect, setRedirect] = useState(false);
    
    const handleChange = (event) => {
        setSearchTerm(event.target.value)
    }

    const handleKeypress = (event) => { 

        if (event.key === "Enter") {
            handleSearch()
        } else {
            console.log("someshit")
            setRedirect(false)
        }
    } 

    const handleSearch = async () => {
        setRedirect(true)
    }

    const renderRedirect = () => {

        if (redirect && searchTerm) {
            window.location = `https://moiva.vercel.app/search/${encodeURIComponent(searchTerm)}`
        }

    }

    useEffect(() => {
        setRedirect(false)
    }, [])

    return (
        <div className="h-searchbar-wrapper">
            <input placeholder="Search here !" onKeyPress={handleKeypress} value={searchTerm} className="h-searchbar-input" id="searchbar-input" autoComplete="off" autoCorrect="off" onChange={handleChange} />
            <div className="h-s-icon-wrapper" onClick={handleSearch} style={{cursor: "pointer"}}>
                <svg id="h-s-icon" width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M15.853 16.56c-1.683 1.517-3.911 2.44-6.353 2.44-5.243 0-9.5-4.257-9.5-9.5s4.257-9.5 9.5-9.5 9.5 4.257 9.5 9.5c0 2.442-.923 4.67-2.44 6.353l7.44 7.44-.707.707-7.44-7.44zm-6.353-15.56c4.691 0 8.5 3.809 8.5 8.5s-3.809 8.5-8.5 8.5-8.5-3.809-8.5-8.5 3.809-8.5 8.5-8.5z"/></svg>
            </div>
            {renderRedirect()}
        </div>
    )
}
