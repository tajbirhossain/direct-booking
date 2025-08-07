import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Portfolio = () => {

  const sectionRef = useRef(null);
  const welcomeRef = useRef(null);
  const wallRef = useRef(null);
  const cursorRef = useRef(null);
  const projectNameARef = useRef(null);
  const projectNameBRef = useRef(null);
  const projectTagARef = useRef(null);
  const projectTagBRef = useRef(null);
  const projectYearRef = useRef(null);
  const counterRef = useRef(null);
  const cardsRef = useRef([]);


  const pRef = useRef(false);
  const isAnimatingRef = useRef(false);
  const currentIndexRef = useRef(0);
  const sequenceTLsRef = useRef([]);
  const scrollObserverRef = useRef(null);


  const projects = [
    {
      name: ["NYC", "RENTALS"],
      tag: ["BRAND", "IDENTITY"],
      year: "2023",
      link: "https://www.behance.net/gallery/131077809/Polemica-online-gaming-platform-rebranding"
    },
    {
      name: ["MIAMI", "STAYS"],
      tag: ["DIGITAL", "BRANDING"],
      year: "2024",
      link: "https://www.behance.net/gallery/170376729/Units-Autonomous-Community"
    },
    {
      // name: ["BIDAPP", "SDK"],
      name: ["SEARCH", "STAY"],
      tag: ["DIGITAL", "STRATEGY"],
      year: "2020",
      link: "https://www.behance.net/gallery/199373991/SDK-Platform-bidapp-UXUI-Brand-Identity"
    },
    {
      name: ["FRENCH", "RIVIERA"],
      tag: ["IDENTITY", "WEBSITE"],
      year: "2023",
      link: "https://www.behance.net/gallery/145220925/Urban-Amenities-branding-for-modern-furniture-company"
    },
    // {
    //   name: ["INDIEVID", "LABEL"],
    //   tag: ["IDENTITY,", "WEBSITE"],
    //   year: "2022",
    //   link: "https://www.behance.net/gallery/147247443/Indievid-indie-music-label"
    // },
    // {
    //   name: ["SCREEN", "BLASTERS"],
    //   tag: ["READYMAG", "WEBSITE"],
    //   year: "2022",
    //   link: "https://www.behance.net/gallery/176041679/ScreenBlasters-Design-website-made-via-Readymag"
    // }
  ];


  // const imageBases = [
  //   "images/cards/bdp-",
  //   "images/cards/unnts-",
  //   "images/cards/plmc-",
  //   "images/cards/urb-",
  //   "images/cards/indvd-",
  //   "images/cards/scrn-"
  // ];
  const imageBases = [
    "images/cards/card-3",
    "images/cards/card-2",
    "images/cards/card-1",
    "images/cards/card-4-2",
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const cards = cardsRef.current.filter(Boolean);

      const d = gsap.utils.mapRange(0, cards.length - 1, 1, 0.75);
      const u = gsap.utils.mapRange(0, cards.length - 1, 1, 0.25);

      gsap.set(cursorRef.current, { autoAlpha: 0 });
      gsap.set(cards, {
        transformOrigin: "center center",
        zIndex: (i) => -i,
        y: (i) => 20 * i,
        scale: (i) => d(i),
        autoAlpha: (i) => (i < 3 ? u(i) : 0),
      });

      const introTL = gsap.timeline({
        // paused: true,
        onComplete: () => {
          pRef.current = true;
        }
      }).pause();

      introTL
        .from(wallRef.current, {
          yPercent: 100,
          duration: 0.3,
          delay: 0.5,
          ease: "power2.out",
        })
        .from(cards, {
          yPercent: 10,
          autoAlpha: 0,
          ease: "power2.out",
          stagger: { from: "start", each: 0.3 },
          duration: 0.5,
        })
        .from([
          projectTagARef.current,
          projectTagBRef.current,
          projectNameARef.current,
          projectNameBRef.current,
          projectYearRef.current
        ], {
          yPercent: 100,
          duration: 0.3,
          stagger: 0.1,
        }, "<")
        .set(welcomeRef.current, { autoAlpha: 0 });


      function updateProjectInfo(index, direction) {
        const tl = gsap.timeline({
          defaults: { ease: "power1.inOut" }
        });

        tl.to([
          projectTagARef.current,
          projectTagBRef.current,
          projectNameARef.current,
          projectNameBRef.current,
          projectYearRef.current
        ], {
          yPercent: direction ? -100 : 100,
          duration: 0.25,
          stagger: 0.1,
          onComplete: () => {
            projectNameARef.current.textContent = projects[index].name[0];
            projectNameBRef.current.textContent = projects[index].name[1];
            projectTagARef.current.textContent = projects[index].tag[0];
            projectTagBRef.current.textContent = projects[index].tag[1];
            projectYearRef.current.textContent = projects[index].year;
            counterRef.current.textContent = `${String(index + 1).padStart(2, '0')} / 04`;
          }
        })
          .set([
            projectTagARef.current,
            projectTagBRef.current,
            projectNameARef.current,
            projectNameBRef.current,
            projectYearRef.current
          ], {
            yPercent: direction ? 100 : -100,
          })
          .to([
            projectTagARef.current,
            projectTagBRef.current,
            projectNameARef.current,
            projectNameBRef.current,
            projectYearRef.current
          ], {
            duration: 0.25,
            stagger: 0.1,
            yPercent: 0,
          });
      }


      function navigateCards(newIndex, direction) {
        if (isAnimatingRef.current) {
          return;
        }


        if (newIndex >= cards.length && direction) {

          if (scrollObserverRef.current) {
            scrollObserverRef.current.disable();
          }
          return;
        }

        if (newIndex < 0 && !direction) {

          if (scrollObserverRef.current) {
            scrollObserverRef.current.disable();
          }
          return;
        }



        isAnimatingRef.current = true;

        const tl = gsap.timeline({
          defaults: { ease: "power2.inOut" },
          onComplete: () => {
            currentIndexRef.current = newIndex;
            isAnimatingRef.current = false;
          }
        });

        if (direction) {
          for (let i = newIndex; i < cards.length; i++) {
            tl.to(cards[i], {
              autoAlpha: gsap.getProperty(cards[i - 1], "opacity"),
              y: gsap.getProperty(cards[i - 1], "y"),
              scale: gsap.getProperty(cards[i - 1], "scale"),
              zIndex: gsap.getProperty(cards[i - 1], "zIndex"),
            }, "<");
          }

          tl.to(cards[currentIndexRef.current], {
            yPercent: -300,
            zIndex: 99,
          }, "<");
        } else {
          tl.to(cards[newIndex], {
            yPercent: 0,
          });

          tl.to(cards.slice(newIndex), {
            zIndex: (i) => -i,
            y: (i) => 20 * i,
            scale: (i) => d(i),
            autoAlpha: (i) => (i < 3 ? u(i) : 0),
          }, "<");
        }

        updateProjectInfo(newIndex, direction);


        if (newIndex === cards.length - 1) {
          gsap.to(section, {
            color: "#F3F3EF",
            backgroundColor: "#060606",
            duration: 0.5,
          });
        } else if (newIndex > 2) {
          gsap.to(section, {
            color: "#060606",
            backgroundColor: "#F3F3EF",
            duration: 0.5,
          });
        } else {
          gsap.to(section, {
            color: "#060606",
            backgroundColor: "#F3F3EF",
            duration: 0.5,
          });
        }
      }


      function setupCardInteractions() {
        cards.forEach((card, index) => {
          const tiltElement = card.querySelector('.tilt-card');
          if (!tiltElement) return;

          gsap.set(tiltElement, {
            transformStyle: "preserve-3d",
            transformPerspective: 800,
          });


          const imageContainer = tiltElement.querySelector('a');
          // if (imageContainer && imageBases[index] && !imageContainer.querySelector('img')) {
          //   for (let i = 1; i <= 5; i++) {
          //     const img = document.createElement('img');
          //     img.src = `${imageBases[index]}0${i}.avif`;
          //     img.style.position = 'absolute';
          //     img.style.top = '0';
          //     img.style.left = '0';
          //     img.style.width = '100%';
          //     img.style.height = '100%';
          //     img.style.objectFit = 'cover';
          //     img.style.opacity = i === 1 ? 1 : 0;
          //     imageContainer.appendChild(img);
          //   }

          //   const images = Array.from(imageContainer.querySelectorAll('img'));
          //   const sequenceTL = gsap.timeline({
          //     repeat: -1,
          //     repeatDelay: 1,
          //     yoyo: true,
          //     paused: true
          //   }).to(images, {
          //     autoAlpha: 1,
          //     duration: 0,
          //     stagger: { amount: 3 }
          //   });

          //   sequenceTLsRef.current[index] = sequenceTL;

          //   tiltElement.addEventListener('mouseenter', () => sequenceTL.play());
          //   tiltElement.addEventListener('mouseleave', () => sequenceTL.pause());
          // }

          if (imageContainer && imageBases[index] && !imageContainer.querySelector('img')) {
            const img = document.createElement('img');
            img.src = `${imageBases[index]}.png`;
            img.style.position = 'absolute';
            img.style.top = '0';
            img.style.left = '0';
            img.style.width = '100%';
            img.style.height = '100%';
            img.style.objectFit = 'cover';
            imageContainer.appendChild(img);
          }


          const handleMouseMove = (e) => {
            const rect = tiltElement.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            gsap.to(cursorRef.current, {
              x: e.clientX + 32,
              y: e.clientY + 32,
              autoAlpha: 1,
            });

            const rotateY = 40 * ((x - rect.width / 2) / rect.width);
            const rotateX = -40 * ((y - rect.height / 2) / rect.height);

            gsap.to(tiltElement, {
              rotationX: rotateX,
              rotationY: rotateY,
              scale: 1.25,
              duration: 0.4,
            });
          };

          const handleMouseLeave = () => {
            gsap.to(cursorRef.current, { autoAlpha: 0 });
            gsap.to(tiltElement, {
              rotationX: 0,
              rotationY: 0,
              scale: 1,
              duration: 0.4,
            });
          };

          const handleMouseDown = () => {
            gsap.to(tiltElement, { scale: 0.97, duration: 0.2 });
          };

          const handleMouseUp = () => {
            gsap.to(tiltElement, { scale: 1, duration: 0.2 });
          };


          tiltElement.addEventListener('mousemove', handleMouseMove);
          tiltElement.addEventListener('mouseleave', handleMouseLeave);
          tiltElement.addEventListener('mousedown', handleMouseDown);
          tiltElement.addEventListener('mouseup', handleMouseUp);


          card._handlers = {
            mouseMove: handleMouseMove,
            mouseLeave: handleMouseLeave,
            mouseDown: handleMouseDown,
            mouseUp: handleMouseUp
          };
        });
      }


      let r = gsap.delayedCall(1, () => isAnimatingRef.current = true).pause()

      const portfolioScrollTrigger = ScrollTrigger.create({
        trigger: section,
        pin: true,
        start: "top top",
        end: "+=300",
        onEnter: (self) => {

          if (!pRef.current) {
            introTL.play();
            setupCardInteractions();
          }


          if (!scrollObserverRef.current) {
            scrollObserverRef.current = ScrollTrigger.observe({
              target: window,
              type: "wheel,touch",
              onUp: () => {
                if (pRef.current && !isAnimatingRef.current) {
                  navigateCards(currentIndexRef.current + 1, true);
                }
              },
              onDown: () => {
                if (pRef.current && !isAnimatingRef.current) {
                  navigateCards(currentIndexRef.current - 1, false);
                }
              },
              wheelSpeed: -1,
              tolerance: 1,
              preventDefault: true,
              onEnable: (i) => {
                (isAnimatingRef.current = false), r.restart(), window.lenis?.stop()
              },
              onDisable: (i) => {
                window.lenis?.start();
              },
            });
          } else {
            scrollObserverRef.current.enable();
          }
        },
        onEnterBack: (self) => {
          if (scrollObserverRef.current) {
            // scrollObserverRef.current.enable();
            scrollObserverRef.current.isEnabled || (self.scroll(self.end - 1), scrollObserverRef.current.enable());
          }
        },
        onLeave: (self) => {
          if (scrollObserverRef.current) {
            scrollObserverRef.current.disable();
          }
        },
        onLeaveBack: (self) => {
          if (scrollObserverRef.current) {
            scrollObserverRef.current.disable();
          }
        }
      });

    }, sectionRef)


    return () => {
      ctx.revert();

      if (scrollObserverRef.current) {
        scrollObserverRef.current.kill();
        scrollObserverRef.current = null;
      }

      cardsRef.current.filter(Boolean).forEach(card => {
        if (card._handlers) {
          const tiltElement = card.querySelector('.tilt-card');
          if (tiltElement) {
            tiltElement.removeEventListener('mousemove', card._handlers.mouseMove);
            tiltElement.removeEventListener('mouseleave', card._handlers.mouseLeave);
            tiltElement.removeEventListener('mousedown', card._handlers.mouseDown);
            tiltElement.removeEventListener('mouseup', card._handlers.mouseUp);

            if (card._handlers.sequenceEnter) {
              tiltElement.removeEventListener('mouseenter', card._handlers.sequenceEnter);
            }
            if (card._handlers.sequenceLeave) {
              tiltElement.removeEventListener('mouseleave', card._handlers.sequenceLeave);
            }
          }
        }
      });

      sequenceTLsRef.current.forEach(tl => {
        if (tl) {
          tl.kill();
          tl = null;
        }
      });
    };
  }, []);

  return (
    <section id='portfolio' ref={sectionRef} className="portfolio h-screen relative bg-[#f3f3ef] text-[#060606] overflow-hidden">
      <div ref={welcomeRef} className="portfolio-welcome absolute inset-0 flex items-center justify-center z-10">
        <div className="portfolio-welcome-content text-center relative overflow-hidden">
          <div className="heading-label text-sm font-medium mb-2">BEST OF</div>
          <h1 className="text-[5em] font-black leading-[1] -tracking-[1.5px] max-[1350px]:text-[4em] max-[1150px]:text-[3em] max-[900px]:text-[2em] max-[550px]:text-[3em]">OUR WORKS</h1>
          <div ref={wallRef} className="welcome-wall absolute inset-0 bg-[#f3f3ef]"></div>
        </div>
      </div>

      <div className="portfolio-slider-layout absolute inset-0 grid grid-cols-[1fr_1fr_1fr] z-20 max-[550px]:grid-cols-[1fr] max-[550px]:grid-rows-[1fr_1fr_1fr] max-[550px]:items-center max-[550px]:content-center max-[550px]:justify-items-center max-[550px]:justify-center">
        <div className="portfolio-work-tag overflow-hidden flex flex-col justify-center max-[550px]:row-[1] max-[550px]:col-[1]">
          <div className="project-tag-heading relative overflow-hidden">
            <h1 ref={projectTagARef} className="project-tag-a text-[5em] font-bold text-end leading-[1] -tracking-[1px] max-[1350px]:text-[4em] max-[1150px]:text-[3em] max-[900px]:text-[2em] max-[550px]:text-[3em]">BRAND</h1>
          </div>
          <div className="project-tag-heading relative overflow-hidden">
            <h1 ref={projectTagBRef} className="project-tag-b text-[5em] font-bold text-end leading-[1] -tracking-[1px] max-[1350px]:text-[4em] max-[1150px]:text-[3em] max-[900px]:text-[2em] max-[550px]:text-[3em]">IDENTITY</h1>
          </div>
        </div>

        <div className="portfolio-slider-center inset-0 flex items-center justify-center pointer-events-none max-[550px]:row-[2] max-[550px]:col-[1]">
          {projects.map((project, index) => (
            <div
              key={index}
              ref={el => cardsRef.current[index] = el}
              className="tilt-card-container absolute w-[24em] h-[29em] max-h-[29em] pointer-events-auto max-[1350px]:w-[20em] max-[1350px]:h-[25em] max-[1350px]:max-h-[25em] max-[1150px]:w-[15em] max-[1150px]:h-[20em] max-[1150px]:max-h-[20em] max-[900px]:w-[12em] max-[900px]:h-[15em] max-[900px]:max-h-[15em]"
            >
              <div className="tilt-card w-full h-full bg-gray-200 rounded-2xl cursor-pointer overflow-hidden">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full h-full relative"
                >
                  {/* <span className="absolute inset-0 flex items-center justify-center text-black font-bold text-xl z-10">
                    {project.name.join(' ')}
                  </span> */}
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="portfolio-project-name overflow-hidden flex flex-col justify-center max-[550px]:row-[3] max-[550px]:col-[1]">
          <div className="project-name-heading flex gap-4 overflow-hidden">
            <h1 ref={projectNameARef} className="project-name-a text-[5em] font-bold leading-[1] -tracking-[1px] max-[1350px]:text-[4em] max-[1150px]:text-[3em] max-[900px]:text-[2em] max-[550px]:text-[3em]">NYC</h1>
            <div ref={projectYearRef} className="project-year text-lg font-bold max-[1150px]:text-base">2023</div>
          </div>
          <div className="project-name-heading overflow-hidden">
            <h1 ref={projectNameBRef} className="project-name-b text-[5em] font-bold leading-[1] -tracking-[1px] max-[1350px]:text-[4em] max-[1150px]:text-[3em] max-[900px]:text-[2em] max-[550px]:text-[3em]">RENTALS</h1>
          </div>
        </div>

        <div ref={counterRef} className="w-full portfolio-counter absolute bottom-8 left-0 text-center font-bold max-[900px]:text-sm">
          01 / 04
        </div>

        <div
          ref={cursorRef}
          className="portfolio-cursor fixed w-16 h-16 bg-white rounded-full pointer-events-none z-50 flex items-center justify-center text-black text-xs font-bold mix-blend-difference"
        >
          SHOW
        </div>
      </div>
    </section>
  );
};

export default Portfolio;