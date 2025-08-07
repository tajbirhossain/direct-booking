'use client'
import React, { useEffect, useRef, useState } from 'react'

const HeroBigText = () => {
    const textRef = useRef([])
    const barRef = useRef(null);


    const [time, setTime] = useState('');
    const [location, setLocation] = useState('');
    const [timezone, setTimezone] = useState('');

    useEffect(() => {
        const fetchLocation = async () => {
            try {
                const res = await fetch('https://ipwho.is/');
                const data = await res.json();
                if (data.success) {
                    setLocation(`${data.city}, ${data.country}`);
                    setTimezone(data.timezone.id);
                } else {
                    console.error('IP lookup failed');
                }
            } catch (err) {
                console.error('Failed to fetch location:', err);
            }
        };

        fetchLocation();
    }, []);

    useEffect(() => {
        if (!timezone) return;

        const updateClock = () => {
            const now = new Date();
            const options = {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                weekday: 'short',
                timeZone: timezone,
                hour12: false,
            };
            const formattedTime = new Intl.DateTimeFormat('en-US', options).format(now);
            setTime(formattedTime.toUpperCase());
        };

        updateClock();
        const interval = setInterval(updateClock, 1000);
        return () => clearInterval(interval);
    }, [timezone]);


    const handleHover = (e) => {
        const hoveredDiv = e.currentTarget;
        const bar = barRef.current;

        textRef.current.forEach((item) => {
            const img = item.querySelector("img");

            if (item === hoveredDiv) {
                item.style.transform = "scale(1.1)";
                item.style.transition = "transform 0.3s ease";
                img.style.opacity = "1";
                img.style.bottom = "10px"


                const parentRect = item.parentElement.getBoundingClientRect();
                const itemRect = item.getBoundingClientRect();

                const barLeft = item.offsetLeft + item.offsetWidth / 2 - 90
                const barTop = item.offsetTop + item.offsetHeight - 4

                bar.style.left = `${barLeft}px`;
                bar.style.top = `${barTop + 15}px`;
                bar.style.opacity = "1";
            } else {
                item.style.transform = "scale(1)";
                img.style.opacity = "0.2";
                img.style.bottom = "-40px"
            }
        });

    }
    const handleLeave = (el) => {
        textRef.current.forEach((item) => {
            const img = item.querySelector("img")
            item.style.transform = "scale(1)"
            img.style.opacity = "1"
            img.style.bottom = "0px"
        })


        const bar = barRef.current;
        bar.style.opacity = "0";
    }

    const addToRefs = (el) => {
        if (el && !textRef.current.includes(el)) {
            textRef.current.push(el)
        }
    }
    return (
        <>
            <div className='w-full p-6 row-[3/-1] flex flex-col justify-end relative max-[650px]:hidden'>
                {/* <div className="flex items-center">

            </div> */}
                <div className="w-full h-6 absolute bottom-0 left-0 backdrop-blur-md bg-[rgba(255,255,255,0.2)] z-[1]" />
                <div className="w-full flex items-center justify-between mb-3 max-[1050px]:mb-2 max-[750px]:hidden">
                    <div className='flex items-center gap-28 font-medium max-[1250px]:gap-16 max-[1050px]:gap-10 max-[1050px]:text-sm max-[950px]:gap-5 max-[950px]:text-xs'>
                        <p className='w-[135px] max-[950px]:w-[110px]'>{time || 'Loading time...'}</p>
                        <p className='w-[250px] max-[950px]:w-[200px]'>{location || 'Loading location...'}</p>
                    </div>
                    <div className='flex items-center gap-28 font-medium px-3 max-[1250px]:gap-16 max-[1050px]:gap-10 max-[1050px]:text-sm max-[950px]:gap-5 max-[950px]:text-xs'>
                        <p>DIRECT RENTALS</p>
                    </div>
                    <div className='flex items-center gap-28 font-medium max-[1250px]:gap-16 max-[1050px]:gap-10 max-[1050px]:text-sm max-[950px]:gap-5 max-[950px]:text-xs'>
                        <p><a href='https://behance.net'>YOUTUBE</a></p>
                        <p><a href='https://instagram.com'>INSTAGRAM</a></p>
                        <p><a href='https://facebook.com'>FACEBOOK</a></p>
                    </div>
                </div>
                <div className="w-full row-[3/-1] flex justify-between relative">
                    <div
                        ref={barRef}
                        className="transition-all duration-300 ease-out absolute opacity-0"
                        style={{
                            width: '180px',
                            height: '8px',
                            backgroundColor: 'black',
                            transform: 'translateY(0)',
                            zIndex: 2,
                        }}
                    />
                    <div ref={addToRefs} className="bigTextHolder h-[calc(100vw/11.5)]" onMouseEnter={handleHover} onMouseLeave={handleLeave}>
                        <img src="/images/letters-medium/D.svg" alt="" className="h-full test" />
                    </div>
                    <div ref={addToRefs} className="bigTextHolder h-[calc(100vw/11.5)]" onMouseEnter={handleHover} onMouseLeave={handleLeave}>
                        <img src="/images/letters-medium/I.svg" alt="" className="h-full" />
                    </div>
                    <div ref={addToRefs} className="bigTextHolder h-[calc(100vw/11.5)]" onMouseEnter={handleHover} onMouseLeave={handleLeave}>
                        <img src="/images/letters-medium/R.svg" alt="" className="h-full" />
                    </div>
                    <div ref={addToRefs} className="bigTextHolder h-[calc(100vw/11.5)]" onMouseEnter={handleHover} onMouseLeave={handleLeave}>
                        <img src="/images/letters-medium/E.svg" alt="" className="h-full" />
                    </div>
                    <div ref={addToRefs} className="bigTextHolder h-[calc(100vw/11.5)]" onMouseEnter={handleHover} onMouseLeave={handleLeave}>
                        <img src="/images/letters-medium/C.svg" alt="" className="h-full" />
                    </div>
                    <div ref={addToRefs} className="bigTextHolder h-[calc(100vw/11.5)]" onMouseEnter={handleHover} onMouseLeave={handleLeave}>
                        <img src="/images/letters-medium/T.svg" alt="" className="h-full" />
                    </div>
                    <span className="w-[calc(100vw/80)]" />
                    <div ref={addToRefs} className="bigTextHolder h-[calc(100vw/11.5)]" onMouseEnter={handleHover} onMouseLeave={handleLeave}>
                        <img src="/images/letters-medium/B.svg" alt="" className="h-full" />
                    </div>
                    <div ref={addToRefs} className="bigTextHolder h-[calc(100vw/11.5)]" onMouseEnter={handleHover} onMouseLeave={handleLeave}>
                        <img src="/images/letters-medium/O.svg" alt="" className="h-full" />
                    </div>
                    <div ref={addToRefs} className="bigTextHolder h-[calc(100vw/11.5)]" onMouseEnter={handleHover} onMouseLeave={handleLeave}>
                        <img src="/images/letters-medium/O.svg" alt="" className="h-full" />
                    </div>
                    <div ref={addToRefs} className="bigTextHolder h-[calc(100vw/11.5)]" onMouseEnter={handleHover} onMouseLeave={handleLeave}>
                        <img src="/images/letters-medium/K.svg" alt="" className="h-full" />
                    </div>
                    <div ref={addToRefs} className="bigTextHolder h-[calc(100vw/11.5)]" onMouseEnter={handleHover} onMouseLeave={handleLeave}>
                        <img src="/images/letters-medium/I.svg" alt="" className="h-full" />
                    </div>
                    <div ref={addToRefs} className="bigTextHolder h-[calc(100vw/11.5)]" onMouseEnter={handleHover} onMouseLeave={handleLeave}>
                        <img src="/images/letters-medium/N.svg" alt="" className="h-full" />
                    </div>
                    <div ref={addToRefs} className="bigTextHolder h-[calc(100vw/11.5)]" onMouseEnter={handleHover} onMouseLeave={handleLeave}>
                        <img src="/images/letters-medium/G.svg" alt="" className="h-full" />
                    </div>
                    <div ref={addToRefs} className="bigTextHolder h-[calc(100vw/11.5)]" onMouseEnter={handleHover} onMouseLeave={handleLeave}>
                        {/* <img src="/images/letters-medium/S.svg" alt="" className="h-full" /> */}
                        <img src="/images/letters-medium/Z.svg" alt="" className="h-full" />
                    </div>
                </div>
                {/* <div className="w-full flex justify-between items-center">
                <span className="text-[calc(100vw/9)] font-medium leading-[1] cursor-pointer tracking-[-7px]">D</span>
                <span className="text-[calc(100vw/9)] font-medium leading-[1] cursor-pointer tracking-[-7px]">I</span>
                <span className="text-[calc(100vw/9)] font-medium leading-[1] cursor-pointer tracking-[-7px]">R</span>
                <span className="text-[calc(100vw/9)] font-medium leading-[1] cursor-pointer tracking-[-7px]">E</span>
                <span className="text-[calc(100vw/9)] font-medium leading-[1] cursor-pointer tracking-[-7px]">C</span>
                <span className="text-[calc(100vw/9)] font-medium leading-[1] cursor-pointer tracking-[-7px]">T</span>
                <span className="w-[calc(100vw/80)]" />
                <span className="text-[calc(100vw/9)] font-medium leading-[1] cursor-pointer tracking-[-7px]">B</span>
                <span className="text-[calc(100vw/9)] font-medium leading-[1] cursor-pointer tracking-[-7px]">O</span>
                <span className="text-[calc(100vw/9)] font-medium leading-[1] cursor-pointer tracking-[-7px]">O</span>
                <span className="text-[calc(100vw/9)] font-medium leading-[1] cursor-pointer tracking-[-7px]">K</span>
                <span className="text-[calc(100vw/9)] font-medium leading-[1] cursor-pointer tracking-[-7px]">I</span>
                <span className="text-[calc(100vw/9)] font-medium leading-[1] cursor-pointer tracking-[-7px]">N</span>
                <span className="text-[calc(100vw/9)] font-medium leading-[1] cursor-pointer tracking-[-7px]">G</span>
                <span className="text-[calc(100vw/9)] font-medium leading-[1] cursor-pointer tracking-[-7px]">S</span>
            </div> */}
            </div>

            <img src="/images/DIRECT-BOOKINGZ-stroke.svg" alt="" className='w-[1200px] max-w-[1200px] absolute bottom-10 left-1/2 -translate-x-1/2 -z-[1] opacity-10 max-[500px]:w-[800px] hidden max-[650px]:block' />
        </>
    )
}

export default HeroBigText