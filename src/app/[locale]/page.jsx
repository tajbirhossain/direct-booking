'use client'

import { useState, useEffect, useRef } from "react";
import Header from "@/components/Header";
import HeroBigText from "@/components/HeroBigText";
import Preload from "@/components/preload/Preload";
import HeroBgVideo from "@/components/HeroBgVideo";
import PriceCalculator from "@/components/sections/PriceCalculator";
import Portfolio from "@/components/sections/Portfolio";
import Contact from "@/components/sections/Contact";
import HeroFirstBgVideo from "@/components/HeroFirstBgVideo";
import { Trans, useTranslation } from "react-i18next";


const videoUrl = [
  {
    mp4: "/videos/design-and-branding-2.mp4"
  },
  {
    mp4: "/videos/marketing-2-2.mp4"
  },
  {
    mp4: "/videos/web-development-2-2.mp4"
  },
]

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [loaded, setLoaded] = useState(false);

  const [videoLoaded, setVideoLoaded] = useState(false)
  const [videoLoaded2, setVideoLoaded2] = useState(false)
  const [videoLoaded3, setVideoLoaded3] = useState(false)

  const { t } = useTranslation("common");

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 9000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      requestAnimationFrame(() => {
        setLoaded(true);
      });
    }
  }, [isLoading]);





  // const videoRef = useRef(null);
  const videoRef2 = useRef(null);
  const videoRef3 = useRef(null);

  const handleMouseEnter = (id) => {
    setTimeout(() => {
      if (id === 1) {
        setVideoLoaded(true)
        // if (videoRef.current) {
        //   videoRef.current.play().catch(() => {
        //   });
        // }
      } else if (id === 2) {
        setVideoLoaded2(true)
        if (videoRef2.current) {
          videoRef2.current.play().catch(() => {
          });
        }
      } else {
        setVideoLoaded3(true)
        if (videoRef3.current) {
          videoRef3.current.play().catch(() => {
          });
        }
      }
    }, 200);
  };

  const handleMouseLeave = (id) => {
    setTimeout(() => {
      if (id === 1) {
        setVideoLoaded(false)
        // if (videoRef.current) {
        //   videoRef.current.pause();
        // }
      } else if (id === 2) {
        setVideoLoaded2(false)
        if (videoRef2.current) {
          videoRef2.current.pause();
        }
      } else {
        setVideoLoaded3(false)
        if (videoRef3.current) {
          videoRef3.current.pause();
        }
      }
    }, 200);
  };


  if (isLoading) {
    return <Preload />;
  }



  return (
    <div
      className={`
        font-[family-name:var(--font-helvetica-now)]
        transition-opacity transition-filter duration-[1500ms]
        ${loaded ? "opacity-100 blur-0" : "opacity-0 blur-lg"}
      `}
    >
      <Header />
      <main>
        <section id="hero" className="grid grid-rows-[0.5fr_0.5fr_1fr] min-h-screen max-h-screen max-[650px]:grid-rows-[0.5fr_1.5fr] relative overflow-hidden">
          <div className="p-6 row-[2/3] max-[450px]:p-3">
            <h2 className="text-5xl font-bold text-center uppercase leading-[1.2] max-[1800px]:text-4xl max-[1350px]:text-3xl max-[900px]:text-2xl max-[650px]:text-3xl max-[650px]:text-start max-[450px]:text-[25px]">
              <Trans
                i18nKey="hero.main"
                components={{
                  brTag: <br />,
                  hoverOne: <span
                    onMouseEnter={() => handleMouseEnter(1)}
                    onMouseLeave={() => handleMouseLeave(1)}
                    className={`relative whitespace-nowrap cursor-pointer duration-300 z-10 hover:z-50
                            before:w-full before:h-[4px] before:bg-black before:absolute
                            before:content-[''] before:bottom-[-2px] before:left-0 before:delay-200 before:duration-300 hover:before:w-[0%]
                            after:w-[calc(100%+40px)] after:h-[calc(100%+30px)] after:rounded-lg after:bg-yellow-300 after:absolute
                            after:content-[''] after:top-1/2 after:left-1/2 after:-translate-y-1/2 after:-translate-x-1/2 after:-z-[1]
                            after:opacity-0 after:delay-200 after:duration-300 after:scale-75 hover:after:opacity-100 hover:after:scale-100
                            max-[900px]:before:h-[3px]`}
                  />,
                  hoverTwo: <span
                    onMouseEnter={() => handleMouseEnter(2)}
                    onMouseLeave={() => handleMouseLeave(2)}
                    className={`relative whitespace-nowrap cursor-pointer duration-300 z-10 hover:z-50 
                            before:w-full before:h-[4px] before:bg-black before:absolute
                            before:content-[''] before:bottom-[-2px] before:left-0 before:delay-200 before:duration-300 hover:before:w-[0%]
                            after:w-[calc(100%+40px)] after:h-[calc(100%+30px)] after:rounded-lg after:bg-orange-500 after:absolute
                            after:content-[''] after:top-1/2 after:left-1/2 after:-translate-y-1/2 after:-translate-x-1/2 after:-z-[1]
                            after:opacity-0 after:delay-200 after:duration-300 after:scale-75 hover:after:opacity-100 hover:after:scale-100
                            max-[900px]:before:h-[3px]`}
                  />,
                  hoverThree: <span
                    onMouseEnter={() => handleMouseEnter(3)}
                    onMouseLeave={() => handleMouseLeave(3)}
                    className={`relative whitespace-nowrap cursor-pointer duration-300 z-10 hover:z-50 
                            before:w-full before:h-[4px] before:bg-black before:absolute
                            before:content-[''] before:bottom-[-2px] before:left-0 before:delay-200 before:duration-300 hover:before:w-[0%]
                            after:w-[calc(100%+40px)] after:h-[calc(100%+30px)] after:rounded-lg after:bg-blue-500 after:absolute
                            after:content-[''] after:top-1/2 after:left-1/2 after:-translate-y-1/2 after:-translate-x-1/2 after:-z-[1]
                            after:opacity-0 after:delay-200 after:duration-300 after:scale-75 hover:after:opacity-100 hover:after:scale-100
                            max-[900px]:before:h-[3px]`}
                  />
                }}
              />
            </h2>
          </div>

          <HeroBigText />

          <div>
            <HeroFirstBgVideo videoLoaded={videoLoaded} />
            <HeroBgVideo videoRef={videoRef2} videoLoaded={videoLoaded2} videoUrl={videoUrl[1]} />
            <HeroBgVideo videoRef={videoRef3} videoLoaded={videoLoaded3} videoUrl={videoUrl[2]} />
          </div>
        </section>

        <PriceCalculator />

        <Portfolio />

        <Contact />
      </main>
    </div>
  );
}
