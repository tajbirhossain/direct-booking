'use client'
import React, { useEffect, useRef, useState } from 'react'
import LanguageSwitcher from './LanguageSwitcher'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { useTranslation } from 'react-i18next'
import { usePathname } from 'next/navigation'


gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)


const languages = [
    { code: "en", label: "English" },
    { code: "de", label: "German" },
    { code: "es", label: "Spanish" },
    { code: "it", label: "Italian" },
];


const Header = () => {
    const [showBg, setShowBg] = useState(false)
    const [isMenuActive, setIsMenuActive] = useState(false)
    const [btnHovered, setBtnHovered] = useState(false)

    const [windowHeight, setWindowHeight] = useState(0)
    const [screenWidth, setScreenWidth] = useState(null);


    // lang switcher
    const pathname = usePathname();
    const dropdownRef = useRef(null);
    const currentLocaleCode = pathname?.split("/")[1] || "en";

    const currentLanguage = languages.find((lang) => lang.code === currentLocaleCode) || languages[0];

    const [selected, setSelected] = useState(currentLanguage.label);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const onClick = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("click", onClick);
        return () => document.removeEventListener("click", onClick);
    }, []);

    useEffect(() => {
        const newLang = languages.find((l) => l.code === currentLocaleCode);
        if (newLang) setSelected(newLang.label);
    }, [currentLocaleCode]);

    const switchLocale = (label) => {
        const langObj = languages.find((l) => l.label === label);
        if (!langObj) return;

        if (langObj.label === selected) {
            setIsOpen(false);
            return;
        }

        const segments = pathname.split("/");
        segments[1] = langObj.code;
        const newPath = segments.join("/") || `/${langObj.code}`;

        window.location.href = newPath;
        setIsOpen(false);
    };
    // lang switcher ends


    const { t } = useTranslation()


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
            <div>
                <header className='w-full px-6 py-2 flex items-center justify-between fixed top-0 left-0 z-50 max-[450px]:px-3' style={{ mixBlendMode: "difference" }}>
                    <img src="/images/logo-black.png" alt="" className='h-20 max-[700px]:h-14 invert' />
                    <div className="flex items-center justify-center gap-6 max-[500px]:gap-3">
                        <div ref={dropdownRef} className='w-fit'>
                            <LanguageSwitcher languages={languages} isOpen={isOpen} setIsOpen={setIsOpen} selected={selected} switchLocale={switchLocale} />
                        </div>

                        <div className="relative">

                            <button className='min-w-[118px] menuButton text-xl font-medium text-white cursor-pointer -tracking-[1px] max-[700px]:text-base max-[500px]:text-sm max-[500px]:min-w-[95px]' data-hover={showBg ? "HIDE MENU" : "SHOW MENU"} onClick={handleMenu} onMouseEnter={() => setBtnHovered(true)} onMouseLeave={() => setBtnHovered(false)}>
                                <span>{showBg ? "HIDE MENU" : "SHOW MENU"}</span>
                            </button>

                        </div>
                    </div>
                </header>
                {/* lang switch */}
                {isOpen && (
                    <ul className="w-[120px] fixed top-[63px] right-[166px] mt-2 rounded-lg border border-gray-500 bg-white text-black overflow-hidden z-[55]">
                        {languages.map(({ label }, idx) => (
                            <li
                                key={idx}
                                onClick={() => switchLocale(label)}
                                className={`px-4 py-3 cursor-pointer transition-colors ${label === selected ? "bg-gray-300" : "hover:bg-gray-200"
                                    } max-[700px]:px-3 max-[700px]:py-2 max-[700px]:text-sm`}
                            >
                                {label}
                            </li>
                        ))}
                    </ul>
                )}
                {/* lang switch ends */}
                <div className="fixed top-[25px] right-[17px] bg-[#FFD73B] rounded-lg duration-500 z-[45] max-[700px]:top-[20px]" style={{ width: showBg ? (typeof window !== 'undefined' && screenWidth > 500 ? "380px" : "285px") : (typeof window !== 'undefined' && screenWidth > 500 ? "132px" : "108px"), height: showBg ? (typeof window !== 'undefined' && screenWidth > 700 ? "430px" : "385px") : (typeof window !== 'undefined' && screenWidth > 500 ? "42px" : "35px"), opacity: btnHovered || showBg ? 1 : 0 }} />
                <div className="w-[355px] h-[480px] fixed top-20 right-[23px] pr-4 duration-300 max-[500px]:w-[250px] max-[500px]:h-[340px] z-[46]" style={{ opacity: isMenuActive ? 1 : 0, pointerEvents: isMenuActive ? "auto" : "none" }}>
                    <ul className='border-b-[1px] border-b-[#E5C135] pb-5 mb-6'>
                        <li className='menuButton w-fit text-[2.15em] font-medium text-start cursor-pointer -tracking-[2px] leading-[1.4] relative duration-150 delay-[0ms] max-[700px]:text-[1.8em] max-[500px]:text-[1.5em]' style={{ top: isMenuActive ? "0px" : "-10px", opacity: isMenuActive ? 1 : 0, transitionDelay: isMenuActive ? "0ms" : "120ms" }} data-hover={t('header.menus', { returnObjects: true })[0]}>
                            <a className='relative z-[1]' onClick={handleNav1}>
                                <span className='w-fit'>
                                    {t('header.menus', { returnObjects: true })[0]}
                                </span>
                            </a>
                        </li>
                        <li className='menuButton w-fit text-[2.15em] font-medium text-start cursor-pointer -tracking-[2px] leading-[1.4] relative duration-150 delay-[30ms] max-[700px]:text-[1.8em] max-[500px]:text-[1.5em]' style={{ top: isMenuActive ? "0px" : "-10px", opacity: isMenuActive ? 1 : 0, transitionDelay: isMenuActive ? "30ms" : "90ms" }} data-hover={t('header.menus', { returnObjects: true })[1]}>
                            <a className='relative z-[1]' onClick={handleNav2}>
                                <span className='w-fit'>
                                    {t('header.menus', { returnObjects: true })[1]}
                                </span>
                            </a>
                        </li>
                        <li className='menuButton w-fit text-[2.15em] font-medium text-start cursor-pointer -tracking-[2px] leading-[1.4] relative duration-150 delay-[60ms] max-[700px]:text-[1.8em] max-[500px]:text-[1.5em]' style={{ top: isMenuActive ? "0px" : "-10px", opacity: isMenuActive ? 1 : 0, transitionDelay: isMenuActive ? "60ms" : "60ms" }} data-hover={t('header.menus', { returnObjects: true })[2]}>
                            <a className='relative z-[1]' onClick={handleNav3}>
                                <span className='w-fit'>
                                    {t('header.menus', { returnObjects: true })[2]}
                                </span>
                            </a>
                        </li>
                        <li className='menuButton w-fit text-[2.15em] font-medium text-start cursor-pointer -tracking-[2px] leading-[1.4] relative duration-150 delay-[90ms] max-[700px]:text-[1.8em] max-[500px]:text-[1.5em]' style={{ top: isMenuActive ? "0px" : "-10px", opacity: isMenuActive ? 1 : 0, transitionDelay: isMenuActive ? "90ms" : "30ms" }} data-hover={t('header.menus', { returnObjects: true })[3]}>
                            <a className='relative z-[1]' onClick={handleNav4}>
                                <span className='w-fit'>
                                    {t('header.menus', { returnObjects: true })[3]}
                                </span>
                            </a>
                        </li>
                        <li className='menuButton w-fit text-[2.15em] font-medium text-start cursor-pointer -tracking-[2px] leading-[1.4] relative duration-150 delay-[120ms] max-[700px]:text-[1.8em] max-[500px]:text-[1.5em]' style={{ top: isMenuActive ? "0px" : "-10px", opacity: isMenuActive ? 1 : 0, transitionDelay: isMenuActive ? "120ms" : "0ms" }} data-hover={t('header.menus', { returnObjects: true })[4]}>
                            <a className='relative z-[1]' onClick={handleNav5}>
                                <span className='w-fit'>
                                    {t('header.menus', { returnObjects: true })[4]}
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
                        <a href="tel:+16466318459" className='flex items-center group mb-2'>
                            <img src="/images/icons/right-up.png" alt="" className='w-5 mr-1 duration-300 rotate-0 group-hover:rotate-45' />
                            <p data-hover='+1 646 631 8459' className='menuButton font-bold'>
                                <span>+1 646 631 8459</span>
                            </p>
                        </a>
                    </div>
                </div>
            </div>
            <div
                className="w-full h-full fixed top-0 left-0 bg-[rgba(189,189,189,0.3)] backdrop-blur-lg z-40 duration-300"
                style={{ pointerEvents: showBg ? "auto" : "none", opacity: showBg ? 1 : 0 }}
                onClick={handleMenu}
            />
        </>
    )
}

export default Header