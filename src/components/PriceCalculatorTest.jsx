import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const PriceCalculatorTest = () => {
    const containerRef = useRef(null)
    const cardsRef = useRef([])

    useEffect(() => {
        const PRESENTATION_CARDS = cardsRef.current.filter(card => card !== null)

        gsap.set(PRESENTATION_CARDS, {
            transformStyle: "preserve-3d",
            transformPerspective: 800,
        })

        const t = gsap.utils.mapRange(0, PRESENTATION_CARDS.length - 1, 0.75, 1)

        let o = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                pin: containerRef.current,
                start: "top top",
                end: "+=300%",
                scrub: 1,
            },
        })

        const teamBackground = cardsRef.current[0]
        const firstCard = cardsRef.current[0]
        const middleCards = cardsRef.current.slice(1)



        // Set initial state for first and middle cards - start at normal size
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

        // Move middle cards to center position, keep scale at 1
        o.to(middleCards, {
            scale: 1, // Keep at normal size
            ease: "power1.out",
            y: (e) => 2 * e, // Move to center
            rotationX: 0,
            stagger: {
                each: 0.5,
            },
        }, "-=0.4")

        // Final stacking - tilt and scale down based on index
        o.to(middleCards, {
            rotationX: -40,
            y: (e) => 12 * e, // Final stacked position
            ease: "power1.in",
            scale: (e) => t(e), // This creates 0.75 to 1 range, scaling down
            stagger: {
                each: 0.5,
            },
        }, "<+=0.5")

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

    return (
        <div style={{ height: '400vh' }}>
            <section ref={containerRef} className='bg-black flex items-center justify-center py-10 min-h-screen relative overflow-hidden'>
                <div ref={addToRefs} className="w-[90%] h-[calc(100vh-100px)] flex items-center bg-white rounded-2xl stackedCard border-2 border-blue-500" >
                    <div className="w-full text-center text-2xl font-bold text-gray-800">
                        Card 1
                    </div>
                </div>

                <div ref={addToRefs} className="absolute w-[90%] h-[calc(100vh-100px)] flex items-center bg-white rounded-2xl stackedCard border-2 border-yellow-500">
                    <div className="w-full text-center text-2xl font-bold text-gray-800">
                        Card 2
                    </div>
                </div>

                <div ref={addToRefs} className="absolute w-[90%] h-[calc(100vh-100px)] flex items-center bg-white rounded-2xl stackedCard border-2 border-red-500">
                    <div className="w-full text-center text-2xl font-bold text-gray-800">
                        Card 3
                    </div>
                </div>

                <div ref={addToRefs} className="absolute w-[90%] h-[calc(100vh-100px)] flex items-center bg-white rounded-2xl stackedCard border-2 border-green-500">
                    <div className="w-full text-center text-2xl font-bold text-gray-800">
                        Card 4
                    </div>
                </div>

                <div ref={addToRefs} className="absolute w-[90%] h-[calc(100vh-100px)] flex items-center bg-white rounded-2xl stackedCard border-2 border-purple-500">
                    <div className="w-full text-center text-2xl font-bold text-gray-800">
                        Card 5
                    </div>
                </div>
            </section>
        </div>
    )
}

export default PriceCalculatorTest