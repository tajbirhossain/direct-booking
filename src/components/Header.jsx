'use client'
import React, { useEffect, useRef, useState } from 'react'
import LanguageSwitcher from './LanguageSwitcher'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'


gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)
const Header = () => {
    const [showBg, setShowBg] = useState(false)
    const [isMenuActive, setIsMenuActive] = useState(false)
    const [btnHovered, setBtnHovered] = useState(false)

    const [windowHeight, setWindowHeight] = useState(0)
    const [screenWidth, setScreenWidth] = useState(null);


    useEffect(() => {
        if (typeof window !== 'undefined') {
            setWindowHeight(typeof window !== 'undefined' && window.innerHeight)
        }
    }, [])

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setScreenWidth(window.innerWidth);

            const handleResize = () => setScreenWidth(window.innerWidth);
            window.addEventListener('resize', handleResize);

            return () => window.removeEventListener('resize', handleResize);
        }
    }, []);

    const handleMenu = () => {
        if (showBg) {
            setIsMenuActive(prev => !prev)
            setTimeout(() => {
                setShowBg(prev => !prev)
            }, 300);
            return
        }
        setShowBg(prev => !prev)
        setTimeout(() => {
            setIsMenuActive(prev => !prev)
        }, 500);
    }



    const handleNav1 = () => {
        gsap.to(window, {
            scrollTo: "#hero",
            duration: 1,
        });
        setIsMenuActive(prev => !prev)
        setTimeout(() => {
            setShowBg(prev => !prev)
        }, 300);
    }
    const handleNav2 = () => {
        gsap.to(window, {
            scrollTo: windowHeight + windowHeight / 2,
            duration: 1,
        });
        setIsMenuActive(prev => !prev)
        setTimeout(() => {
            setShowBg(prev => !prev)
        }, 300);
    }
    const handleNav3 = () => {
        gsap.to(window, {
            scrollTo: 4 * windowHeight,
            duration: 1,
        });
        setIsMenuActive(prev => !prev)
        setTimeout(() => {
            setShowBg(prev => !prev)
        }, 300);
    }
    const handleNav4 = () => {
        gsap.to(window, {
            scrollTo: "#portfolio",
            duration: 1,
        });
        setIsMenuActive(prev => !prev)
        setTimeout(() => {
            setShowBg(prev => !prev)
        }, 300);
    }
    const handleNav5 = () => {
        gsap.to(window, {
            scrollTo: "#contact",
            duration: 1,
        });
        setIsMenuActive(prev => !prev)
        setTimeout(() => {
            setShowBg(prev => !prev)
        }, 300);
    }




    return (
        <>
            <header className='w-full px-6 py-2 flex items-center justify-between fixed top-0 left-0 z-50 max-[450px]:px-3'>
                <img src="/images/logo-black.png" alt="" className='h-20 max-[700px]:h-14' />
                <div className="flex items-center justify-center gap-6 max-[500px]:gap-3">
                    <LanguageSwitcher />

                    <div className="relative">
                        <div className="absolute -top-[8px] -right-[8px] bg-[#FFD73B] rounded-lg duration-500" style={{ width: showBg ? (typeof window !== 'undefined' && screenWidth > 500 ? "380px" : "285px") : (typeof window !== 'undefined' && screenWidth > 500 ? "132px" : "108px"), height: showBg ? (typeof window !== 'undefined' && screenWidth > 700 ? "495px" : "385px") : (typeof window !== 'undefined' && screenWidth > 500 ? "42px" : "35px"), opacity: btnHovered || showBg ? 1 : 0 }} />
                        <button className='min-w-[118px] menuButton text-xl font-medium cursor-pointer -tracking-[1px] max-[700px]:text-base max-[500px]:text-sm max-[500px]:min-w-[95px]' data-hover={showBg ? "HIDE MENU" : "SHOW MENU"} onClick={handleMenu} onMouseEnter={() => setBtnHovered(true)} onMouseLeave={() => setBtnHovered(false)}>
                            <span>{showBg ? "HIDE" : "SHOW"} MENU</span>
                        </button>
                        <div className="w-[355px] h-[480px] absolute top-5 right-0 pr-4 duration-300 max-[500px]:w-[250px] max-[500px]:h-[340px]" style={{ opacity: isMenuActive ? 1 : 0, pointerEvents: isMenuActive ? "auto" : "none" }}>
                            <ul className='border-b-[1px] border-b-[#E5C135] pb-5 mb-6'>
                                <li className='menuButton w-fit text-[3em] font-medium text-start cursor-pointer -tracking-[2px] leading-[1.4] relative duration-150 delay-[0ms] max-[700px]:text-[2em]' style={{ top: isMenuActive ? "0px" : "-10px", opacity: isMenuActive ? 1 : 0, transitionDelay: isMenuActive ? "0ms" : "120ms" }} data-hover='Main'>
                                    <a className='relative z-[1]' onClick={handleNav1}>
                                        <span className='w-fit'>
                                            Main
                                        </span>
                                    </a>
                                </li>
                                <li className='menuButton w-fit text-[3em] font-medium text-start cursor-pointer -tracking-[2px] leading-[1.4] relative duration-150 delay-[30ms] max-[700px]:text-[2em]' style={{ top: isMenuActive ? "0px" : "-10px", opacity: isMenuActive ? 1 : 0, transitionDelay: isMenuActive ? "30ms" : "90ms" }} data-hover='Price Calculator'>
                                    <a className='relative z-[1]' onClick={handleNav2}>
                                        <span className='w-fit'>
                                            Price Calculator
                                        </span>
                                    </a>
                                </li>
                                <li className='menuButton w-fit text-[3em] font-medium text-start cursor-pointer -tracking-[2px] leading-[1.4] relative duration-150 delay-[60ms] max-[700px]:text-[2em]' style={{ top: isMenuActive ? "0px" : "-10px", opacity: isMenuActive ? 1 : 0, transitionDelay: isMenuActive ? "60ms" : "60ms" }} data-hover='Our Skills'>
                                    <a className='relative z-[1]' onClick={handleNav3}>
                                        <span className='w-fit'>
                                            About Us
                                        </span>
                                    </a>
                                </li>
                                <li className='menuButton w-fit text-[3em] font-medium text-start cursor-pointer -tracking-[2px] leading-[1.4] relative duration-150 delay-[90ms] max-[700px]:text-[2em]' style={{ top: isMenuActive ? "0px" : "-10px", opacity: isMenuActive ? 1 : 0, transitionDelay: isMenuActive ? "90ms" : "30ms" }} data-hover='Selected Works'>
                                    <a className='relative z-[1]' onClick={handleNav4}>
                                        <span className='w-fit'>
                                            Selected Works
                                        </span>
                                    </a>
                                </li>
                                <li className='menuButton w-fit text-[3em] font-medium text-start cursor-pointer -tracking-[2px] leading-[1.4] relative duration-150 delay-[120ms] max-[700px]:text-[2em]' style={{ top: isMenuActive ? "0px" : "-10px", opacity: isMenuActive ? 1 : 0, transitionDelay: isMenuActive ? "120ms" : "0ms" }} data-hover='Contact'>
                                    <a className='relative z-[1]' onClick={handleNav5}>
                                        <span className='w-fit'>
                                            Contact
                                        </span>
                                    </a>
                                </li>
                            </ul>

                            <div>
                                {/* <a href="#" className='flex items-center group mb-2'>
                                    <img src="/images/icons/right-up.png" alt="" className='w-5 mr-1 duration-300 rotate-0 group-hover:rotate-45' />
                                    <p data-hover='FRENCE VERSION' className='menuButton font-bold'>
                                        <span>FRENCE VERSION</span>
                                    </p>
                                </a> */}
                                <a href="mailto:support@directbookingz.com" className='flex items-center group mb-2'>
                                    <img src="/images/icons/right-up.png" alt="" className='w-5 mr-1 duration-300 rotate-0 group-hover:rotate-45' />
                                    <p data-hover='SUPPORT@DIRECTBOOKINGZ.COM' className='menuButton font-bold'>
                                        <span>SUPPORT@DIRECTBOOKINGZ.COM</span>
                                    </p>
                                </a>
                                <a href="#" className='flex items-center group mb-2'>
                                    <img src="/images/icons/right-up.png" alt="" className='w-5 mr-1 duration-300 rotate-0 group-hover:rotate-45' />
                                    <p data-hover='TELEGRAM' className='menuButton font-bold'>
                                        <span>TELEGRAM</span>
                                    </p>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <div
                className="w-full h-full fixed top-0 left-0 bg-[rgba(189,189,189,0.3)] backdrop-blur-lg z-40 duration-300"
                style={{ pointerEvents: showBg ? "auto" : "none", opacity: showBg ? 1 : 0 }}
                onClick={handleMenu}
            />
        </>
    )
}

export default Header