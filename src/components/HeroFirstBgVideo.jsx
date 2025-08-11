import React, { useEffect, useRef, useState } from "react";

const videos = [
    "/videos/design-and-branding-1-3.mp4",
    "/videos/design-and-branding-3.mp4",
    "/videos/design-and-branding-2.mp4",
];

const HeroFirstBgVideo = ({ videoLoaded }) => {
    const videoRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        if (videoLoaded) {
            setCurrentIndex(0);
            video.currentTime = 0;
            video.src = videos[0];
            video.play().catch(console.error);
        } else {
            video.pause();
        }
    }, [videoLoaded]);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handleEnded = () => {
            if (!videoLoaded) return;
            const nextIndex = (currentIndex + 1) % videos.length;
            setCurrentIndex(nextIndex);
        };

        video.addEventListener("ended", handleEnded);
        return () => {
            video.removeEventListener("ended", handleEnded);
        };
    }, [currentIndex, videoLoaded]);

    useEffect(() => {
        const video = videoRef.current;
        if (!video || !videoLoaded) return;
        video.src = videos[currentIndex];
        video.currentTime = 0;
        video.play().catch(console.error);
    }, [currentIndex, videoLoaded]);

    return (
        <div
            className={`flex w-screen h-screen bg-white fixed top-0 left-0 z-10 duration-200 overflow-hidden ${videoLoaded
                ? "opacity-100 scale-100 pointer-events-auto"
                : "opacity-0 scale-[1.15] pointer-events-none"
                }`}
        >
            <video
                ref={videoRef}
                className="max-w-[700px] w-full h-full object-cover absolute top-0 left-1/2 -translate-x-1/2 transition-opacity duration-300"
                muted
                playsInline
                disablePictureInPicture
                controlsList="nodownload"
            />
        </div>
    );
};

export default HeroFirstBgVideo;
