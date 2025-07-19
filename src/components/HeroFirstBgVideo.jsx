import React, { useEffect, useRef, useState } from 'react';

const videos = [
    {
        src: "/videos/design-and-branding-2.mp4",
        logo: '/images/logos/1.png',
    },
    {
        src: "/videos/design-and-branding-2.mp4",
        logo: '/images/logos/1.png',
    },
    {
        src: "/videos/design-and-branding-2.mp4",
        logo: '/images/logos/1.png',
    },
];

const HeroFirstBgVideo = () => {
    const videoRefs = useRef([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [logoVisible, setLogoVisible] = useState([false, true, true]);

    useEffect(() => {
        const currentVideo = videoRefs.current[currentIndex];

        const handleVideoEnd = () => {
            if (currentVideo) currentVideo.pause();

            setLogoVisible((prev) => {
                const updated = [...prev];
                updated[currentIndex] = true;
                return updated;
            });

            const nextIndex = (currentIndex + 1) % videos.length;
            setCurrentIndex(nextIndex);
        };

        if (currentVideo) {
            currentVideo.currentTime = 0;
            currentVideo.play().catch(console.error);
            currentVideo.addEventListener('ended', handleVideoEnd);
        }

        setLogoVisible((prev) => prev.map((_, i) => i !== currentIndex));

        return () => {
            if (currentVideo) {
                currentVideo.removeEventListener('ended', handleVideoEnd);
            }
        };
    }, [currentIndex]);

    return (
        <div className="flex w-screen h-screen overflow-hidden">
            {videos.map((video, index) => (
                <div key={index} className="relative flex-1 w-full h-full">
                    <video
                        ref={(el) => (videoRefs.current[index] = el)}
                        className={`w-full h-full object-cover absolute top-0 left-0 transition-opacity duration-300 ${logoVisible[index] ? 'opacity-0 pointer-events-none' : 'opacity-100'
                            }`}
                        src={video.src}
                        muted
                        playsInline
                        disablePictureInPicture
                        controlsList="nodownload"
                    />

                    {logoVisible[index] && (
                        <div className="w-full h-full bg-white flex items-center justify-center z-10 relative">
                            <img
                                src={video.logo}
                                alt="Video Logo"
                                className="w-34 h-34 object-contain"
                            />
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default HeroFirstBgVideo;
