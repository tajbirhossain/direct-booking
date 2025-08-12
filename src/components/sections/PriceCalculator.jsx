import React, { useEffect, useRef, useState, useMemo } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import InfiniteTicker from '../InfiniteTicker'
import StackedBalls from '../StackedBalls'
import AutoScrollCards from '../AutoScrollCards'
import VideoModal from '../VideoModal'
import { Trans, useTranslation } from 'react-i18next'
import Link from 'next/link'

gsap.registerPlugin(ScrollTrigger)

const PriceCalculator = () => {
    const [listings, setListings] = useState(5);
    const [adr, setAdr] = useState(200);
    const [occupancy, setOccupancy] = useState(70);
    const [ota, setOta] = useState(90)

    const [showVideoModal, setShowVideoModal] = useState(false)


    const { t } = useTranslation()



    const containerRef = useRef(null)
    const cardsRef = useRef([])
    const endBackgroundRef = useRef(null)

    useEffect(() => {
        const PRESENTATION_CARDS = cardsRef.current.filter(card => card !== null)

        gsap.set(PRESENTATION_CARDS, {
            // transformStyle: "preserve-3d",
            transformPerspective: 800,
        })

        const t = gsap.utils.mapRange(0, PRESENTATION_CARDS.length - 1, 0.75, 1)

        let o = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                pin: containerRef.current,
                start: "top top",
                end: "+=400%",
                scrub: 1,
            },
        })

        const teamBackground = cardsRef.current[0]
        const firstCard = cardsRef.current[0]
        const middleCards = cardsRef.current.slice(1)
        const lastCard = cardsRef.current[cardsRef.current.length - 1]



        gsap.set(teamBackground, {
            scale: 1.15,
        });
        gsap.set(middleCards, {
            transformOrigin: "center top",
            y: window.innerHeight,
            rotationX: 40,
            scale: 1.1,
        })

        o.from(teamBackground, {
            scale: 0.075,
            ease: "power1.in",
        })

        o.to(teamBackground, {
            scale: 1,
            ease: "power1.in",
        })

        o.to(containerRef.current, {
            backgroundColor: "#FFD73B",
        }, "<")

        o.set(firstCard, {
            transformOrigin: "center top",
        })

        o.to(firstCard, {
            rotationX: -40,
            y: -6,
            ease: "power1.in",
            scale: 0.7,
        })


        o.to(middleCards, {
            scale: 1,
            ease: "power1.out",
            y: (e) => 2 * e,
            rotationX: 0,
            stagger: {
                each: 0.5,
            },
        }, "-=0.4")


        o.to(middleCards, {
            rotationX: -40,
            y: (e) => 12 * e,
            ease: "power1.in",
            scale: (e) => t(e),
            stagger: {
                each: 0.5,
            },
        }, "<+=0.5")

        // gsap.set(endBackgroundRef.current, {
        //     scale: 0.7
        // })

        gsap.to(endBackgroundRef.current, {
            scrollTrigger: {
                trigger: ".portfolio",
                start: "top 200%",
                end: "bottom bottom",
                scrub: 0.4,
            },
            scale: 3.5,
        })

        o.to(containerRef.current, {
            backgroundColor: "#F3F3EF",
        }, "<+=1.5")

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill())
        }
    }, [])

    const addToRefs = (el) => {
        if (el && !cardsRef.current.includes(el)) {
            cardsRef.current.push(el)
        }
    }



    const occupancyRate = occupancy / 100;


    const { extraRevenue, saveFee, profit } = useMemo(() => {
        const base = listings * adr * occupancyRate * 365 * 0.315;
        return {
            extraRevenue: Math.round(base),
            saveFee: Math.round(base * 0.15),
            profit: Math.round(base * 0.5)
        };
    }, [listings, adr, occupancyRate]);




    const onShowVideoModal = () => {
        setShowVideoModal(true)
    }



    return (
        <>
            <section id='presentation' ref={containerRef} className='bg-black max-h-screen min-h-screen relative overflow-hidden'>
                <div className="relative w-full h-[500vh]">
                    <div className="relative grid grid-cols-[1fr] grid-rows-[1fr] gap-x-0 gap-y-0 pt-[2em] pb-[2em] items-center justify-items-center h-full max-h-screen">
                        <div id='priceCalculator' ref={addToRefs} className="relative w-[90%] h-[calc(100vh-64px)] flex items-center bg-black rounded-2xl col-[1] row-[1] stackedCard max-[500px]:w-[95%] max-[500px]:h-[550px] overflow-hidden" >
                            <video muted loop autoPlay playsInline controls={false} className='w-full h-full absolute top-0 left-0 object-cover'>
                                <source src="/videos/calculator-use-2-2.mp4" type="video/mp4" />
                            </video>
                            {/* <div className="w-full h-full absolute top-0 left-0 bg-[rgba(90,90,90,0.28)]" /> */}
                            <div className="w-full h-full relative z-10">
                                <div className="size-full flex items-center py-20">
                                    <div className="w-full flex items-center py-5 px-20 bg-[rgba(0,0,0,0.7)] max-[1150px]:py-4 max-[1150px]:px-10 max-[900px]:py-2 max-[900px]:px-5 max-[550px]:flex-col">
                                        <div className="w-1/2 pr-6 max-[900px]:pr-3 max-[550px]:w-full max-[550px]:pr-0 max-[550px]:mb-5">
                                            <h3 className="text-4xl mb-5 text-white max-[1350px]:text-3xl max-[1150px]:text-2xl max-[900px]:text-xl max-[900px]:mb-3 max-[650px]:text-lg">{t('cards.first.heading')}</h3>

                                            <div className="mb-3 max-[900px]:mb-1.5">
                                                <p className="text-lg font-medium text-white max-[1350px]:text-base max-[1150px]:text-sm max-[900px]:font-normal max-[650px]:text-xs">{t('cards.first.range1')}</p>
                                                <div className="flex">
                                                    <div className="w-[calc(100%-100px)] pr-5">
                                                        <input
                                                            type="range"
                                                            min="0"
                                                            max="50"
                                                            value={listings}
                                                            onChange={(e) => setListings(Number(e.target.value))}
                                                            className="w-full"
                                                        />
                                                    </div>
                                                    <div className="w-[100px]">
                                                        <span className="text-lg font-medium text-blue-500 max-[1350px]:text-base max-[1150px]:text-sm max-[900px]:font-normal max-[650px]:text-xs">{listings}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mb-3 max-[900px]:mb-1.5">
                                                <p className="text-lg font-medium text-white max-[1350px]:text-base max-[1150px]:text-sm max-[900px]:font-normal max-[650px]:text-xs">{t('cards.first.range2')}</p>
                                                <div className="flex">
                                                    <div className="w-[calc(100%-100px)] pr-5">
                                                        <input
                                                            type="range"
                                                            min="50"
                                                            max="1000"
                                                            step="10"
                                                            value={adr}
                                                            onChange={(e) => setAdr(Number(e.target.value))}
                                                            className="w-full"
                                                        />
                                                    </div>
                                                    <div className="w-[100px]">
                                                        <span className="text-lg font-medium text-blue-500 max-[1350px]:text-base max-[1150px]:text-sm max-[900px]:font-normal max-[650px]:text-xs">${adr}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mb-3 max-[900px]:mb-1.5">
                                                <p className="text-lg font-medium text-white max-[1350px]:text-base max-[1150px]:text-sm max-[900px]:font-normal max-[650px]:text-xs">{t('cards.first.range3')}</p>
                                                <div className="flex">
                                                    <div className="w-[calc(100%-100px)] pr-5">
                                                        <input
                                                            type="range"
                                                            min="0"
                                                            max="100"
                                                            step="1"
                                                            value={occupancy}
                                                            onChange={(e) => setOccupancy(Number(e.target.value))}
                                                            className="w-full"
                                                        />
                                                    </div>
                                                    <div className="w-[100px]">
                                                        <span className="text-lg font-medium text-blue-500 max-[1350px]:text-base max-[1150px]:text-sm max-[900px]:font-normal max-[650px]:text-xs">{occupancy}%</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mb-3 max-[900px]:mb-1.5">
                                                <p className="text-lg font-medium text-white max-[1350px]:text-base max-[1150px]:text-sm max-[900px]:font-normal max-[650px]:text-xs">{t('cards.first.range4')} %</p>
                                                <div className="flex">
                                                    <div className="w-[calc(100%-100px)] pr-5">
                                                        <input
                                                            type="range"
                                                            min="0"
                                                            max="100"
                                                            step="1"
                                                            name="otaBookings"
                                                            id="otaBookings"
                                                            className="w-full"
                                                            value={ota}
                                                            onChange={(e) => setOta(Number(e.target.value))}
                                                        />
                                                    </div>
                                                    <div className="w-[100px]">
                                                        <span className="text-lg font-medium text-blue-500 max-[1350px]:text-base max-[1150px]:text-sm max-[900px]:font-normal max-[650px]:text-xs">{ota}%</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="w-1/2 pl-6 max-[900px]:pl-3 max-[550px]:w-full max-[550px]:pl-0">
                                            <div className="mb-5 text-white max-[900px]:mb-2.5">
                                                <h3 className="text-4xl text-blue-400 max-[1350px]:text-3xl max-[1150px]:text-2xl max-[900px]:text-xl max-[650px]:text-lg">${profit.toLocaleString()}</h3>
                                                <p className="text-lg max-[1150px]:text-base">{t('cards.first.priceProf')}</p>
                                            </div>

                                            <div className="mb-4 max-[900px]:mb-2">
                                                <h4 className="text-3xl text-white mb-2 max-[1350px]:text-2xl max-[1150px]:text-xl max-[900px]:text-lg max-[650px]:text-base max-[650px]:mb-1">
                                                    <Trans
                                                        i18nKey={'cards.first.subHeading1'}
                                                        values={{ occupancySts: occupancy < 60 ? t('cards.first.below') : t('cards.first.above') }}
                                                    />
                                                </h4>
                                                <p className="text-white max-[1150px]:text-sm max-[650px]:text-xs">
                                                    <Trans
                                                        i18nKey={'cards.first.para1'}
                                                        values={{ saveOta: extraRevenue.toLocaleString() }}
                                                        components={{
                                                            spanBlue: <span className="text-blue-500" />
                                                        }}
                                                    />
                                                </p>
                                            </div>

                                            <div className="mb-4 max-[900px]:mb-2">
                                                <h4 className="text-3xl text-white mb-2 max-[1350px]:text-2xl max-[1150px]:text-xl max-[900px]:text-lg max-[650px]:text-base max-[650px]:mb-1">
                                                    <Trans
                                                        i18nKey={'cards.first.subHeading2'}
                                                        values={{ otaSts: ota < 80 ? t('cards.first.below') : t('cards.first.above') }}
                                                    />
                                                </h4>
                                                <p className="text-white max-[1150px]:text-sm max-[650px]:text-xs">
                                                    <Trans
                                                        i18nKey={'cards.first.para2'}
                                                        values={{ saveOta: extraRevenue.toLocaleString() }}
                                                        components={{
                                                            spanBlue: <span className="text-blue-500" />
                                                        }}
                                                    />
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div ref={addToRefs} className="relative w-[90%] h-[calc(100vh-64px)] flex items-center bg-[#f3f3ef] rounded-2xl col-[1] row-[1] stackedCard max-[500px]:w-[95%] max-[500px]:h-[550px]">
                            <div className="w-full h-full">
                                <div className="w-full h-full text-center relative py-[60px] flex items-center">
                                    <div className="w-full h-[60px] absolute top-0 left-0 border-b-[1px] border-b-black max-[1150px]:h-[45px]">
                                        <InfiniteTicker />
                                    </div>
                                    <div className="w-full max-w-[1100px] mx-auto py-10 px-6 flex flex-col gap-y-[3.75em] max-[1150px]:gap-y-[2.5em] max-[1150px]:py-5 max-[900px]:gap-y-[1.5em] max-[900px]:px-3">
                                        <h3 className='text-5xl font-black max-[1350px]:text-4xl max-[1150px]:text-3xl max-[900px]:text-2xl'>{t('cards.second.heading')}</h3>
                                        <div className="flex items-center justify-center flex-wrap gap-y-[1.5em] gap-x-[5em] max-[1350px]:gap-y-[1em] max-[1350px]:gap-x-[3.5em] max-[1150px]:gap-y-[0.75em] max-[1150px]:gap-x-[2em]">
                                            <img src="images/logos/1.png" loading="lazy" width="110" alt="" className='w-[140px] max-[1350px]:w-[110px] max-[1150px]:w-[90px] max-[900px]:w-[70px]' />
                                            <img src="images/logos/2.png" loading="lazy" width="85" alt="" className='w-[115px] max-[1350px]:w-[85px] max-[1150px]:w-[70px] max-[900px]:w-[60px]' />
                                            <img src="images/logos/3.png" loading="lazy" width="160" alt="" className='w-[190px] max-[1350px]:w-[160px] max-[1150px]:w-[140px] max-[900px]:w-[120px]' />
                                            <img src="images/logos/4.png" loading="lazy" width="150" alt="" className='invert w-[180px] max-[1350px]:w-[150px] max-[1150px]:w-[130px] max-[900px]:w-[110px]' />
                                            <img src="images/logos/5-1.png" loading="lazy" width="140" alt="" className='w-[170px] max-[1350px]:w-[140px] max-[1150px]:w-[120px] max-[900px]:w-[100px]' />
                                            <img src="images/logos/6.png" loading="lazy" width="110" alt="" className='w-[140px] max-[1350px]:w-[110px] max-[1150px]:w-[90px] max-[900px]:w-[70px]' />
                                            <img src="images/logos/7.png" loading="lazy" width="110" alt="" className='w-[140px] max-[1350px]:w-[110px] max-[1150px]:w-[90px] max-[900px]:w-[70px]' />
                                        </div>
                                    </div>
                                    <div className="w-full h-[60px] absolute bottom-0 left-0 border-t-[1px] border-t-black max-[1150px]:h-[45px]">
                                        <InfiniteTicker />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div id='ourSkills' ref={addToRefs} className="relative w-[90%] h-[calc(100vh-64px)] flex items-center bg-black rounded-2xl col-[1] row-[1] stackedCard max-[500px]:w-[95%] max-[500px]:h-[550px]">
                            <div className="w-full h-full">
                                <div className="w-full h-full relative pt-[120px] text-center max-[1150px]:pt-[90px] max-[900px]:pt-[40px]">
                                    <h3 className='max-w-[1250px] text-5xl font-black text-white mx-auto relative z-[1] max-[1350px]:text-4xl max-[1150px]:text-3xl max-[900px]:text-2xl'>
                                        {t('cards.third.heading')}
                                    </h3>
                                    <StackedBalls />
                                </div>
                            </div>
                        </div>

                        <div ref={addToRefs} className="relative w-[90%] h-[calc(100vh-64px)] flex items-center bg-[#f3f3ef] rounded-2xl col-[1] row-[1] stackedCard max-[500px]:w-[95%] max-[500px]:h-[550px]">
                            <div className="w-full h-full rounded-2xl overflow-hidden relative">
                                <img src="/images/customer-review.png" alt="" className='w-full h-full object-cover max-[800px]:object-contain' />
                                <div className="size-[183px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 rounded-full max-[1150px]:size-[120px]">
                                    <button
                                        onClick={onShowVideoModal}
                                        className="size-full bg-black flex items-center justify-center rounded-full relative z-10 cursor-pointer hover:bg-gray-900 transition-colors"
                                    >
                                        <img src="/images/icons/play-circle.svg" alt="" className="max-[1150px]:w-12 pointer-events-none" />
                                    </button>
                                    <span className="w-full h-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[rgba(128,194,226,1)] opacity-75 animate-[ping_2s_ease-in-out_infinite] pointer-events-none"></span>
                                </div>
                            </div>
                        </div>

                        <div ref={addToRefs} className="relative w-[90%] h-[calc(100vh-64px)] flex items-center bg-black rounded-2xl col-[1] row-[1] stackedCard max-[500px]:w-[95%] max-[500px]:h-[550px] lastStackedCard">
                            <div className="w-full h-full">
                                <div className="w-full h-full flex flex-col items-center justify-center text-center text-white">
                                    <h3 className='max-w-[900px] text-5xl font-black mb-7 relative z-[1] max-[1350px]:text-4xl max-[1150px]:text-3xl max-[900px]:text-2xl'>{t('cards.fifth.heading')}</h3>
                                    <p className='text-2xl font-bold mb-5 relative z-[1] max-[1150px]:text-xl max-[900px]:text-lg'>{t('cards.fifth.openPdfText')}</p>
                                    <a href={'/our-services-pdf'} target="_blank" rel="noopener noreferrer">
                                        <button className='size-16 bg-white rounded-full flex items-center justify-center cursor-pointer relative z-[1] duration-300 scale-100 hover:bg-blue-500 hover:scale-110 max-[900px]:size-10'>
                                            <img src="images/icons/right.png" alt="" className='w-8 max-[900px]:w-8' />
                                        </button>
                                    </a>
                                    <div className="w-full h-full absolute top-0 left-0 right-0 bottom-0 overflow-hidden rounded-2xl flex flex-col items-center justify-center text-center">
                                        <div ref={endBackgroundRef} className="w-[100vh] h-screen translate-y-[60%] bg-[#ff9fc4] rounded-[50%] endBackground" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <VideoModal showVideoModal={showVideoModal} setShowVideoModal={setShowVideoModal} />
        </>
    )
}

export default PriceCalculator