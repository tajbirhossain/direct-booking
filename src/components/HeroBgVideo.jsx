import React from 'react'

const HeroBgVideo = ({ videoRef, videoLoaded, videoUrl }) => {
    return (
        <div>
            <video
                id="background-video-2"
                className={` fixed top-0 left-0 z-10 w-screen h-screen object-cover duration-200 ${videoLoaded ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-[1.15] pointer-events-none"}`}
                ref={videoRef}
                preload="none"
                loop
                muted
                playsInline
                disablePictureInPicture
                controlsList="nodownload"
            >
                {/* <source src={videoUrl.webm} type="video/webm" /> */}
                <source src={videoUrl.mp4} type="video/mp4" />
            </video>
        </div>
    )
}

export default HeroBgVideo