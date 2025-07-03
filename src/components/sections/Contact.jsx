'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import GlassDropdown from '../GlassDropdown';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const bgRef = useRef(null);
  const contextRef = useRef(null);

  useEffect(() => {
    if (!bgRef.current) return;

    contextRef.current = gsap.context(() => {
      gsap.set(bgRef.current, { opacity: 0 });

      gsap.to(bgRef.current, {
        opacity: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: bgRef.current.parentElement,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    });


    return () => {
      if (contextRef.current) {
        contextRef.current.revert();
      }
    };
  }, []);

  return (
    <section className='w-full h-screen bg-[rgb(6,6,6)] relative flex items-center justify-center'>
      <video ref={bgRef} loop muted autoPlay className='w-full h-full max-h-full object-cover fixed top-0 left-0 pointer-events-none opacity-0'>
        <source src="/videos/contact-video-sm.mp4" type="video/mp4" />
      </video>
      {/* <img ref={bgRef} src="/images/contact-3d.jpg" alt="" className='w-full h-full max-h-full object-cover fixed top-0 left-0 pointer-events-none opacity-0' /> */}
      {/* <img
        ref={bgRef}
        src="/images/water-wave.gif"
        alt=""
        className='w-full h-full max-h-full grayscale fixed top-0 left-0 pointer-events-none opacity-0'
      /> */}
      <div className="glassCard w-[90%] h-[90%] px-20 py-10 flex flex-col justify-center">
        <div className='mb-10'>
          <h3 className='text-2xl font-semibold text-gray-300 ml-[102px]'>Let's Connect!</h3>
          <div className="flex">
            <img src="/images/icons/wave.png" alt="" className='w-20 h-20 mr-5' />
            <h2 className='text-7xl font-semibold text-white -tracking-[2px]'>Got a question or just want to say hi?</h2>
          </div>
        </div>
        <form onSubmit={e => e.preventDefault()}>
          <div className="flex items-center justify-between mb-7">
            <input type="text" name="name" id="name" placeholder='Your Name' className='glassInput w-[calc(50%-10px)] h-16 rounded-2xl px-5 text-white border-[1.5px] backdrop-blur-2xl border-gray-700 placeholder:text-gray-400 focus:outline-0' />
            <input type="text" name="email" id="email" placeholder='Your Email Address' className='glassInput w-[calc(50%-10px)] h-16 rounded-2xl px-5 text-white border-[1.5px] backdrop-blur-2xl border-gray-700 placeholder:text-gray-400 focus:outline-0' />
          </div>
          <div className="flex items-center justify-between mb-7">
            <input type="text" name="phone" id="phone" placeholder='Your Phone Number' className='glassInput w-[calc(50%-10px)] h-16 rounded-2xl px-5 text-white border-[1.5px] backdrop-blur-2xl border-gray-700 placeholder:text-gray-400 focus:outline-0' />
            <GlassDropdown />
          </div>
          <div className="flex items-center justify-between mb-7">
            <textarea name="message" id="message" placeholder='Your Message...' className='glassInput w-full h-44 rounded-2xl px-5 py-5 text-white border-[1.5px] backdrop-blur-2xl border-gray-700 placeholder:text-gray-400 focus:outline-0' />
          </div>

          <button
            type='submit'
            className='relative overflow-hidden glassInput py-4 px-10 rounded-2xl text-xl text-white backdrop-blur-2xl border-gray-700 cursor-pointer placeholder:text-gray-400 focus:outline-0 shine-effect'
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;