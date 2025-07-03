'use client'
import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap'

const Preload = () => {
    const topBarRef = useRef(null)
    const bottomBarRef = useRef(null)
    const containerRef = useRef(null)
    const paragraphsRef = useRef([])
    const tlRef = useRef()

    const texts = ['more bookings', 'less commission', 'zero bs']

    useEffect(() => {
        const ctx = gsap.context(() => {
            tlRef.current = gsap.timeline()
            const tl = tlRef.current

            gsap.set(paragraphsRef.current, { y: 265, autoAlpha: 0 })
            gsap.set(topBarRef.current, { transformOrigin: 'top', scaleY: 1 })
            gsap.set(bottomBarRef.current, { transformOrigin: 'bottom', scaleY: 1 })

            tl.to(
                topBarRef.current,
                {
                    scaleY: 0,
                    duration: 7,
                    ease: 'none',
                },
                0
            )

            tl.to(
                bottomBarRef.current,
                {
                    scaleY: 0,
                    duration: 7,
                    ease: 'none',
                },
                0
            )

            texts.forEach((_, i) => {
                const para = paragraphsRef.current[i]
                if (!para) return

                const letters = para.querySelectorAll('span')
                const startTime = 1.5 + i * 2.5

                tl.set(
                    para,
                    { y: 0, autoAlpha: 1 },
                    startTime
                )

                tl.fromTo(
                    letters,
                    { y: 270 },
                    {
                        y: 0,
                        duration: 1.4,
                        ease: 'expo.out',
                        stagger: 0.03
                    },
                    startTime
                )

                tl.to(
                    letters,
                    {
                        y: -270,
                        duration: 1.8,
                        ease: 'expo.out',
                        stagger: 0.03
                    },
                    startTime + 1.9
                )
            })


            tl.to(containerRef.current, {
                autoAlpha: 0,
                duration: 0.5,
                onComplete: () => {
                    if (containerRef.current) {
                        containerRef.current.style.display = 'none'
                    }
                }
            }, ">")
        }, containerRef)

        return () => {
            ctx.revert()

            if (tlRef.current) {
                tlRef.current.kill()
            }
        };
    }, [])

    return (
        <div
            ref={containerRef}
            className="w-screen h-screen bg-[#f3f3ef] relative flex items-center justify-center overflow-hidden"
        >
            <div ref={topBarRef} className="w-full h-1/2 bg-black absolute left-0 top-0 z-10" />
            <div ref={bottomBarRef} className="w-full h-1/2 bg-black absolute left-0 bottom-0 z-10" />
            <div className="w-full h-[265px] overflow-hidden relative">
                {texts.map((line, idx) => (
                    <p
                        key={idx}
                        ref={el => paragraphsRef.current[idx] = el}
                        className="text-[190px] font-medium text-center leading-[120%] -tracking-[6px] absolute w-full left-0 overflow-hidden"
                    >
                        {line.split('').map((char, j) => (
                            <span key={j} className="inline-block">
                                {char === ' ' ? '\u00A0' : char}
                            </span>
                        ))}
                    </p>
                ))}
            </div>
        </div>
    )
}

export default Preload