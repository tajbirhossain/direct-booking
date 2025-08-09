'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import GlassDropdown from '../GlassDropdown';
import { useTranslation } from 'react-i18next';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const bgRef = useRef(null);
  const contextRef = useRef(null);

  const { t } = useTranslation()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.service.trim() ||
      !formData.message.trim()
    ) {
      alert('Please fill out all fields before submitting.');
      return;
    }
    setIsSubmitting(true);

    try {
      const response = await fetch('https://script.google.com/macros/s/AKfycbz0t6lDYyt0RMADvFj6zhMrWOBmLjr_ZJYxZRk50vOmTMTQJ6MHZBniGdGvmy8Z4WGx/exec', {
        method: 'POST',
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert("Message sent successfully!");
        setFormData({ name: '', email: '', phone: '', service: '', message: '' });
      } else {
        alert("Something went wrong.");
      }
    } catch (error) {
      alert("Error sending message.");
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <section id='contact' className='w-full min-h-screen bg-[rgb(6,6,6)] relative flex items-center justify-center py-5'>
      <video ref={bgRef} loop muted autoPlay className='w-full h-full max-h-full object-cover fixed top-0 left-0 pointer-events-none opacity-0'>
        <source src="/videos/contact-video-sm-2.mp4" type="video/mp4" />
      </video>

      <div className="glassCard w-[90%] h-[90%] px-20 py-10 flex flex-col justify-center max-[1350px]:px-14 max-[1350px]:py-8 max-[700px]:w-[95%] max-[700px]:px-8 max-[700px]:py-6 max-[450px]:h-auto max-[450px]:px-5 max-[450px]:py-4">
        <div className='mb-10 max-[700px]:mb-5'>
          <h3 className='text-2xl font-semibold text-gray-300 ml-[102px] max-[1350px]:text-xl max-[1350px]:ml-[79px] max-[700px]:text-lg max-[700px]:ml-[50px] max-[450px]:text-base max-[450px]:ml-10'>{t('contact.subHeading')}</h3>
          <div className="flex">
            <img src="/images/icons/wave.png" alt="" className='w-20 h-20 mr-5 max-[1350px]:size-14 max-[700px]:size-10 max-[700px]:mr-2 max-[450px]:size-8' />
            <h2 className='text-7xl font-semibold text-white -tracking-[2px] max-[1350px]:text-5xl max-[700px]:text-4xl max-[450px]:text-3xl'>{t('contact.heading')}</h2>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex items-center justify-between mb-7 max-[450px]:flex-col">
            <input
              type="text"
              name="name"
              placeholder={t('contact.inputs.name')}
              value={formData.name}
              onChange={handleChange}
              className='glassInput w-[calc(50%-10px)] h-16 rounded-2xl px-5 text-white border-[1.5px] backdrop-blur-2xl border-gray-700 placeholder:text-gray-400 focus:outline-0 max-[450px]:w-full max-[450px]:mb-2'
            />
            <input
              type="email"
              name="email"
              placeholder={t('contact.inputs.email')}
              value={formData.email}
              onChange={handleChange}
              className='glassInput w-[calc(50%-10px)] h-16 rounded-2xl px-5 text-white border-[1.5px] backdrop-blur-2xl border-gray-700 placeholder:text-gray-400 focus:outline-0 max-[450px]:w-full'
            />
          </div>

          <div className="flex items-center justify-between mb-7 max-[450px]:flex-col">
            <input
              type="text"
              name="phone"
              placeholder={t('contact.inputs.phone')}
              value={formData.phone}
              onChange={handleChange}
              className='glassInput w-[calc(50%-10px)] h-16 rounded-2xl px-5 text-white border-[1.5px] backdrop-blur-2xl border-gray-700 placeholder:text-gray-400 focus:outline-0 max-[450px]:w-full max-[450px]:mb-2'
            />
            <GlassDropdown
              value={formData.service}
              onChange={(val) => setFormData((prev) => ({ ...prev, service: val }))}
            />
          </div>

          <div className="flex items-center justify-between mb-7">
            <textarea
              name="message"
              placeholder={t('contact.inputs.message')}
              value={formData.message}
              onChange={handleChange}
              className='glassInput w-full h-44 rounded-2xl px-5 py-5 text-white border-[1.5px] backdrop-blur-2xl border-gray-700 placeholder:text-gray-400 focus:outline-0'
            />
          </div>

          <button
            type='submit'
            disabled={isSubmitting}
            className={`relative overflow-hidden glassInput py-4 px-10 rounded-2xl text-xl text-white backdrop-blur-2xl border-gray-700 cursor-pointer shine-effect transition-all duration-300 ${isSubmitting
              ? 'opacity-50 cursor-not-allowed bg-gray-600'
              : 'hover:bg-[rgba(255,255,255,0.4)] hover:bg-opacity-10'
              }`}
          >
            {isSubmitting ? t('contact.submitting') : t('contact.submit')}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
