import React, {useEffect, useState} from "react";
import Hls from "hls.js";

export default function VideoElement(props) {

    console.log(props)

    const [progress, setProgress] = useState();
    const [error, setError] = useState(false);
    
    const videoRef = React.useRef(null);


    useEffect(() => {
        if (props.streamLoading) {
            return;
        }

        if (!props.streamOptions.url.endsWith(".mp4")) {
            setError(false)
            if (!videoRef || !videoRef.current || !props.streamOptions.url || props.streamOptions.url.length === 0 || props.streamLoading) return;

            const hls = new Hls();

            if (!Hls.isSupported() && videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
                videoRef.current.src = props.streamOptions.url;
                return;
            } else if (!Hls.isSupported()) {
                setError(true)
                return;
            }

            hls.attachMedia(videoRef.current);
            hls.loadSource(props.streamOptions.url);
        }

    }, [videoRef, props.streamOptions, props.streamLoading])

    if (error)
        return (<h2 className="h2-message">Your browser is not supported</h2>)

    if (props.streamLoading)
        return <h2 className="h2-message">loading {props.streamType} ...</h2>
    
    if (!props.streamOptions.url || props.streamOptions.url.length === 0)
        return <h2 className="h2-message">No video selected</h2>

    if (!props.streamOptions.url.endsWith('.mp4')) { 
        return (
            <video className="videoElement" ref={videoRef} controls autoPlay onProgress={setProgress} />
        )
    } else {
        return (
            <video className="videoElement" ref={videoRef} controls autoPlay onProgress={setProgress}>
                <source src={props.streamOptions.url} type="video/mp4" />
            </video>
        )
    }
}
