'use client'
import React, { useState } from 'react'

const Header = () => {
    const [showBg, setShowBg] = useState(false)
    const [isMenuActive, setIsMenuActive] = useState(false)
    const [btnHovered, setBtnHovered] = useState(false)

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

    return (
        <>
            <header className='w-full px-6 py-2 flex items-center justify-between fixed top-0 left-0 z-50'>
                <img src="/images/logo-black.png" alt="" className='h-20' />
                <div className="relative">
                    <div className="absolute -top-[4px] -right-[8px] bg-[#FFD73B] rounded-lg duration-500" style={{ width: showBg ? "380px" : "142px", height: showBg ? "520px" : "38px", opacity: btnHovered || showBg ? 1 : 0 }} />
                    <button className='menuButton text-xl font-medium cursor-pointer -tracking-[1px]' data-hover={showBg ? "HIDE MENU" : "SHOW MENU"} onClick={handleMenu} onMouseEnter={() => setBtnHovered(true)} onMouseLeave={() => setBtnHovered(false)}>
                        <span>{showBg ? "HIDE" : "SHOW"} MENU</span>
                    </button>
                    <div className="w-[355px] h-[480px] absolute top-5 right-0 pr-4 duration-300" style={{ opacity: isMenuActive ? 1 : 0, pointerEvents: isMenuActive ? "auto" : "none" }}>
                        <ul className='border-b-[1px] border-b-[#E5C135] pb-5 mb-6'>
                            <li className='menuButton w-fit text-[3em] font-medium text-start cursor-pointer -tracking-[2px] leading-[1.4] relative duration-150 delay-[0ms]' style={{ top: isMenuActive ? "0px" : "-10px", opacity: isMenuActive ? 1 : 0, transitionDelay: isMenuActive ? "0ms" : "120ms" }} data-hover='Main'>
                                <span className='w-fit'>
                                    Main
                                </span>
                            </li>
                            <li className='menuButton w-fit text-[3em] font-medium text-start cursor-pointer -tracking-[2px] leading-[1.4] relative duration-150 delay-[30ms]' style={{ top: isMenuActive ? "0px" : "-10px", opacity: isMenuActive ? 1 : 0, transitionDelay: isMenuActive ? "30ms" : "90ms" }} data-hover='Price Calculator'>
                                <span className='w-fit'>
                                    Price Calculator
                                </span>
                            </li>
                            <li className='menuButton w-fit text-[3em] font-medium text-start cursor-pointer -tracking-[2px] leading-[1.4] relative duration-150 delay-[60ms]' style={{ top: isMenuActive ? "0px" : "-10px", opacity: isMenuActive ? 1 : 0, transitionDelay: isMenuActive ? "60ms" : "60ms" }} data-hover='Our Skills'>
                                <span className='w-fit'>
                                    Our Skills
                                </span>
                            </li>
                            <li className='menuButton w-fit text-[3em] font-medium text-start cursor-pointer -tracking-[2px] leading-[1.4] relative duration-150 delay-[90ms]' style={{ top: isMenuActive ? "0px" : "-10px", opacity: isMenuActive ? 1 : 0, transitionDelay: isMenuActive ? "90ms" : "30ms" }} data-hover='Selected Works'>
                                <span className='w-fit'>
                                    Selected Works
                                </span>
                            </li>
                            <li className='menuButton w-fit text-[3em] font-medium text-start cursor-pointer -tracking-[2px] leading-[1.4] relative duration-150 delay-[120ms]' style={{ top: isMenuActive ? "0px" : "-10px", opacity: isMenuActive ? 1 : 0, transitionDelay: isMenuActive ? "120ms" : "0ms" }} data-hover='Contact'>
                                <span className='w-fit'>
                                    Contact
                                </span>
                            </li>
                        </ul>

                        <div>
                            <a href="#" className='flex items-center group mb-2'>
                                <img src="/images/icons/right-up.png" alt="" className='w-5 mr-1 duration-300 rotate-0 group-hover:rotate-45' />
                                <p data-hover='FRENCE VERSION' className='menuButton font-bold'>
                                    <span>FRENCE VERSION</span>
                                </p>
                            </a>
                            <a href="#" className='flex items-center group mb-2'>
                                <img src="/images/icons/right-up.png" alt="" className='w-5 mr-1 duration-300 rotate-0 group-hover:rotate-45' />
                                <p data-hover='HELLO@DBOOKING.COM' className='menuButton font-bold'>
                                    <span>HELLO@DBOOKING.COM</span>
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