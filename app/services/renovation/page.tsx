'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '../../components/Navbar';

export default function Renovation() {
  const [heroVisible, setHeroVisible] = useState(false);
  const [sectionsVisible, setSectionsVisible] = useState<boolean[]>([]);
  const [ctaVisible, setCtaVisible] = useState(false);

  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const ctaRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHeroVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sectionRefs.current.forEach((section, index) => {
      if (section) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setSectionsVisible((prev) => {
                  const newState = [...prev];
                  newState[index] = true;
                  return newState;
                });
              }
            });
          },
          { threshold: 0.15, rootMargin: '-50px 0px' }
        );
        observer.observe(section);
        observers.push(observer);
      }
    });

    return () => observers.forEach((observer) => observer.disconnect());
  }, []);

  useEffect(() => {
    if (ctaRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setCtaVisible(true);
            }
          });
        },
        { threshold: 0.15, rootMargin: '-50px 0px' }
      );
      observer.observe(ctaRef.current);
      return () => observer.disconnect();
    }
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section - Sticky */}
      <section className="lg:sticky lg:top-0 pt-24 pb-12 lg:pt-40 lg:pb-24 min-h-[auto] lg:min-h-[85vh] flex items-center bg-gradient-to-b from-[var(--royal-red)] via-[var(--royal-red-dark)] to-[var(--royal-red-dark)] z-10">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              {/* Content */}
              <div className="text-center lg:text-left">
                <span className={`inline-block text-xs font-bold text-[var(--royal-gold)] uppercase tracking-widest mb-3 lg:mb-4 transition-all duration-700 text-center lg:text-left w-full lg:w-auto ${heroVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-sm'}`}>
                  RENOVATION HVAC
                </span>
                <h1 className={`text-3xl lg:text-5xl font-bold text-white mb-3 lg:mb-4 leading-tight whitespace-pre-line transition-all duration-700 delay-100 text-center lg:text-left ${heroVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-sm'}`}>
                  HVAC Renovation
                </h1>
                <p className={`text-white/80 text-sm lg:text-lg leading-relaxed mb-6 lg:mb-8 transition-all duration-700 delay-200 text-center lg:text-left ${heroVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-sm'}`}>
                  Upgrade and modernize your existing HVAC system during your renovation. We design and install efficient heating and cooling solutions tailored to your space.
                </p>
                
                {/* CTAs */}
                <div className={`flex flex-col sm:flex-row flex-wrap gap-3 lg:gap-4 justify-center lg:justify-start transition-all duration-700 delay-300 ${heroVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-sm'}`}>
                  <a 
                    href="tel:3306621123" 
                    className="group relative overflow-hidden inline-flex items-center justify-center gap-3 bg-white text-[var(--royal-red)] px-10 py-4 rounded-full font-bold text-base lg:text-lg shadow-lg transition-all duration-300 ease-out hover:scale-110 hover:shadow-2xl hover:bg-[var(--royal-gold)] hover:text-white active:scale-95 active:shadow-md w-full sm:w-auto"
                  >
                    <svg className="w-5 h-5 lg:w-6 lg:h-6 relative z-10 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                    </svg>
                    <span className="relative z-10"><span className="lg:hidden">Call Us Now</span><span className="hidden lg:inline">Call Now</span></span>
                    <div className="absolute inset-0 bg-gradient-to-r from-[var(--royal-gold)] to-[var(--royal-gold-light)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </a>
                  <Link 
                    href="/contact" 
                    className="group relative overflow-hidden inline-flex items-center justify-center gap-3 border-2 border-white text-white px-10 py-4 rounded-full font-bold text-base lg:text-lg shadow-md transition-all duration-300 ease-out hover:scale-110 hover:shadow-xl hover:bg-white hover:text-[var(--royal-red)] active:scale-95 active:shadow-sm w-full sm:w-auto"
                  >
                    <svg className="w-5 h-5 lg:w-6 lg:h-6 relative z-10 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="relative z-10">Schedule Service</span>
                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </Link>
                </div>
              </div>
              
              {/* Image */}
              <div className={`relative transition-all duration-700 delay-400 ${heroVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-sm'}`}>
                <div className="rounded-2xl lg:rounded-[3rem] aspect-[4/3] flex items-center justify-center overflow-hidden shadow-[0_15px_40px_5px_rgba(0,0,0,0.3)] lg:shadow-[0_25px_60px_10px_rgba(0,0,0,0.4)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_30px_80px_15px_rgba(0,0,0,0.5)] cursor-pointer relative">
                  <Image
                    src="/renovation-hero.png"
                    alt="HVAC Renovation"
                    fill
                    className="object-cover rounded-2xl lg:rounded-[3rem]"
                  />
                </div>
              </div>
            </div>
          </div>
      </section>

      {/* Content Section 2 */}
      <section 
        ref={(el) => { sectionRefs.current[1] = el; }}
        className="pt-20 lg:pt-32 pb-12 lg:pb-32 relative z-20 bg-white -mt-1 -mb-1 shadow-[0_-25px_50px_-12px_rgba(0,0,0,0.4)]"
      >
        <div className="max-w-[1200px] mx-auto px-4 lg:px-6">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-20 items-center">
            {/* Image */}
            <div className={`transition-all duration-700 lg:order-2 ${sectionsVisible[1] ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-sm'}`}>
              <div className="bg-[var(--royal-cream)] rounded-[2rem] aspect-[4/3] flex items-center justify-center overflow-hidden shadow-[0_20px_50px_-10px_rgba(0,0,0,0.4)] relative transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_22px_55px_-10px_rgba(0,0,0,0.45)] cursor-pointer">
                <Image
                  src="/renovation-section2.png"
                  alt="HVAC Renovation Ductwork Installation"
                  fill
                  className="object-cover rounded-[2rem]"
                />
              </div>
            </div>
            
            {/* Content */}
            <div className={`transition-all duration-700 delay-200 lg:order-1 flex flex-col justify-center ${sectionsVisible[1] ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-sm'}`}>
              <h2 className="text-lg lg:text-2xl font-bold text-[var(--royal-dark)] mb-4 whitespace-nowrap text-center lg:text-left">
                <span className="lg:hidden">Ultimate Guide For Your Renovation</span>
                <span className="hidden lg:inline">Ultimate Guide for Your Home Renovation</span>
              </h2>
              <p className="text-gray-600 text-sm lg:text-base leading-relaxed mb-4 text-center lg:text-left">
                A home renovation demands countless decisions — from flooring and finishes to fixtures and layouts. Yet one choice stands above the rest in shaping how your home actually performs for years to come: your heating and cooling system.
              </p>
              <p className="text-gray-600 text-sm lg:text-base leading-relaxed mb-4 text-center lg:text-left">
                Selecting the right HVAC solution during a remodel isn&apos;t simply another line item — it&apos;s a strategic investment in lasting comfort, superior air quality, and long-term property value. The reality is that the ideal system for a new home addition rarely suits a finished basement, and with conflicting information everywhere, it&apos;s easy to feel paralyzed or risk a costly misstep.
              </p>
              <p className="text-gray-600 text-sm lg:text-base leading-relaxed text-center lg:text-left">
                This guide eliminates the guesswork. We provide clear, scenario-driven frameworks so you can evaluate your options with confidence — whether you&apos;re expanding with a sunroom, converting a basement, or taking on a complete gut renovation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Extend or Replace */}
      <section 
        ref={(el) => { sectionRefs.current[2] = el; }}
        className="py-12 lg:py-28 bg-white relative z-20 -mt-1 -mb-1"
      >
        <div className="max-w-[900px] mx-auto px-4 lg:px-6">
          <div className={`transition-all duration-700 ${sectionsVisible[2] ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-sm'}`}>
            <h2 className="text-xl lg:text-3xl font-bold text-[var(--royal-dark)] mb-3 whitespace-nowrap text-center lg:text-left">
              <span className="lg:hidden">First Decision: Extend or Replace?</span>
              <span className="hidden lg:inline">The First Decision: Extend or Replace?</span>
            </h2>
            <div className="w-16 h-1 bg-[var(--royal-red)] mb-8 mx-auto lg:mx-0"></div>
            <p className="text-gray-600 text-sm lg:text-base leading-relaxed mb-5 text-center lg:text-left">
              Before comparing models or brands, there&apos;s a fundamental question to answer: should you extend your current system into the renovated space, or invest in a dedicated solution?
            </p>
            <p className="text-gray-600 text-sm lg:text-base leading-relaxed mb-6 text-center lg:text-left">
              Tapping into existing ductwork appears straightforward, but it&apos;s often a costly miscalculation. Your current furnace and air conditioner were engineered for your home&apos;s original footprint. Forcing that system to service additional square footage introduces serious consequences:
            </p>
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-4 bg-gray-50 rounded-xl p-5 shadow-lg border border-gray-100 transition-all duration-300 lg:hover:-translate-y-1.5 lg:hover:shadow-xl lg:hover:scale-[1.02] cursor-pointer [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)]">
                <div className="w-10 h-10 bg-[var(--royal-red)]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-5 h-5 text-[var(--royal-red)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-[var(--royal-dark)] text-sm lg:text-base mb-1">Uneven Temperatures</h4>
                  <p className="text-gray-500 text-sm">Original rooms run cold while the new space never reaches a comfortable temperature.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 bg-gray-50 rounded-xl p-5 shadow-lg border border-gray-100 transition-all duration-300 lg:hover:-translate-y-1.5 lg:hover:shadow-xl lg:hover:scale-[1.02] cursor-pointer [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)]">
                <div className="w-10 h-10 bg-[var(--royal-red)]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-5 h-5 text-[var(--royal-red)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-[var(--royal-dark)] text-sm lg:text-base mb-1">Reduced Efficiency</h4>
                  <p className="text-gray-500 text-sm">An overworked system runs continuously, driving up energy costs with diminishing returns.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 bg-gray-50 rounded-xl p-5 shadow-lg border border-gray-100 transition-all duration-300 lg:hover:-translate-y-1.5 lg:hover:shadow-xl lg:hover:scale-[1.02] cursor-pointer [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)]">
                <div className="w-10 h-10 bg-[var(--royal-red)]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-5 h-5 text-[var(--royal-red)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-[var(--royal-dark)] text-sm lg:text-base mb-1">Premature Failure</h4>
                  <p className="text-gray-500 text-sm">Operating beyond designed capacity shortens your equipment&apos;s lifespan significantly.</p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-[var(--royal-red)]/5 to-transparent border-l-4 border-[var(--royal-red)] rounded-r-xl p-5 lg:p-6">
              <p className="text-gray-700 text-sm lg:text-base leading-relaxed">
                <span className="font-bold text-[var(--royal-dark)]">The $5,000 Rule:</span> Multiply your system&apos;s age by the estimated cost of extending it. If the result exceeds $5,000, a new dedicated system is almost always the smarter financial decision. A professional load calculation confirms the answer definitively.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Your HVAC Options */}
      <section 
        ref={(el) => { sectionRefs.current[3] = el; }}
        className="py-12 lg:py-28 bg-gray-50 relative z-20 -mt-1 -mb-1"
      >
        <div className="max-w-[1200px] mx-auto px-4 lg:px-6">
          <div className={`text-center mb-8 lg:mb-16 transition-all duration-700 ${sectionsVisible[3] ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-sm'}`}>
            <h2 className="text-2xl lg:text-3xl font-bold text-[var(--royal-dark)] mb-3">
              <span className="lg:hidden">Your HVAC Options</span>
              <span className="hidden lg:inline">Your HVAC Options for Renovations</span>
            </h2>
            <div className="w-16 h-1 bg-[var(--royal-red)] mx-auto mb-6"></div>
            <p className="text-gray-600 text-sm lg:text-base max-w-2xl mx-auto">
              Once you&apos;ve determined your approach, it&apos;s time to evaluate the hardware. Renovation projects typically fall into three proven categories.
            </p>
          </div>

          <div className={`grid md:grid-cols-3 gap-6 lg:gap-8 transition-all duration-700 delay-200 ${sectionsVisible[3] ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-sm'}`}>
            <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-lg border border-gray-100 transition-all duration-300 lg:hover:-translate-y-1.5 lg:hover:shadow-xl lg:hover:scale-[1.02] cursor-pointer [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)]">
              <div className="w-12 h-12 bg-[var(--royal-red)]/10 rounded-xl flex items-center justify-center mb-5">
                <svg className="w-6 h-6 text-[var(--royal-red)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-lg lg:text-xl font-bold text-[var(--royal-dark)] mb-3">Extending Central HVAC</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Best suited for minor layout changes in homes with newer, high-capacity systems. Involves tapping into existing ductwork.
              </p>
              <p className="text-gray-500 text-xs leading-relaxed">
                Cost-effective upfront, but risks performance degradation if the system wasn&apos;t designed for the additional load.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-lg border border-gray-100 ring-2 ring-[var(--royal-red)]/20 transition-all duration-300 lg:hover:-translate-y-1.5 lg:hover:shadow-xl lg:hover:scale-[1.02] cursor-pointer [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)]">
              <div className="w-12 h-12 bg-[var(--royal-red)]/10 rounded-xl flex items-center justify-center mb-5">
                <svg className="w-6 h-6 text-[var(--royal-red)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="flex items-center gap-2 mb-3">
                <h3 className="text-lg lg:text-xl font-bold text-[var(--royal-dark)]">Ductless Mini-Splits</h3>
                <span className="text-[10px] font-bold text-[var(--royal-red)] bg-[var(--royal-red)]/10 px-2 py-0.5 rounded-full uppercase tracking-wider">Popular</span>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                The go-to solution for most single-room renovations. An outdoor compressor connects to sleek indoor units — no ductwork required.
              </p>
              <p className="text-gray-500 text-xs leading-relaxed">
                Exceptionally efficient with room-by-room temperature control and whisper-quiet operation.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-lg border border-gray-100 transition-all duration-300 lg:hover:-translate-y-1.5 lg:hover:shadow-xl lg:hover:scale-[1.02] cursor-pointer [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)]">
              <div className="w-12 h-12 bg-[var(--royal-red)]/10 rounded-xl flex items-center justify-center mb-5">
                <svg className="w-6 h-6 text-[var(--royal-red)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
            </svg>
              </div>
              <h3 className="text-lg lg:text-xl font-bold text-[var(--royal-dark)] mb-3">Radiant Floor Heating</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Hot water tubes or electric wiring installed beneath the floor deliver silent, even heat from the ground up.
              </p>
              <p className="text-gray-500 text-xs leading-relaxed">
                A premium upgrade for targeted spaces like bathrooms and basements where comfort matters most.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Best System by Renovation Type */}
      <section 
        ref={(el) => { sectionRefs.current[4] = el; }}
        className="py-12 lg:py-28 bg-white relative z-20 -mt-1 -mb-1"
      >
        <div className="max-w-[900px] mx-auto px-4 lg:px-6">
          <div className={`text-center mb-8 lg:mb-16 transition-all duration-700 ${sectionsVisible[4] ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-sm'}`}>
            <h2 className="text-2xl lg:text-3xl font-bold text-[var(--royal-dark)] mb-3">
              The Right System for Your Specific Project
            </h2>
            <div className="w-16 h-1 bg-[var(--royal-red)] mx-auto mb-6"></div>
            <p className="text-gray-600 text-sm lg:text-base max-w-2xl mx-auto">
              Every renovation presents unique challenges. Here&apos;s how to match the right technology to your project — beyond generic recommendations.
            </p>
          </div>

          <div className={`space-y-6 transition-all duration-700 delay-200 ${sectionsVisible[4] ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-sm'}`}>
            {/* Home Addition */}
            <div className="border border-gray-200 rounded-2xl p-6 lg:p-8 shadow-lg transition-all duration-300 lg:hover:-translate-y-1.5 lg:hover:shadow-xl lg:hover:scale-[1.02] cursor-pointer [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)]">
              <h3 className="text-lg lg:text-xl font-bold text-[var(--royal-dark)] mb-3">New Home Addition</h3>
              <p className="text-gray-600 text-sm lg:text-base leading-relaxed mb-3">
                Sunrooms, primary suites, and expanded living areas are the classic use case for a <span className="font-semibold text-[var(--royal-dark)]">ductless mini-split</span>. Extending ductwork is invasive and risks destabilizing your entire home&apos;s climate balance.
              </p>
              <p className="text-gray-500 text-sm leading-relaxed">
                A dedicated ductless unit delivers precise, high-efficiency heating and cooling to the new space without impacting the rest of your home.
              </p>
            </div>

            {/* Finished Basement */}
            <div className="border border-gray-200 rounded-2xl p-6 lg:p-8 shadow-lg transition-all duration-300 lg:hover:-translate-y-1.5 lg:hover:shadow-xl lg:hover:scale-[1.02] cursor-pointer [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)]">
              <h3 className="text-lg lg:text-xl font-bold text-[var(--royal-dark)] mb-3">Finished Basement</h3>
              <p className="text-gray-600 text-sm lg:text-base leading-relaxed mb-4">
                Below-grade spaces present a dual challenge: temperature regulation and moisture control. Without proper management, dampness and mold become inevitable.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="font-semibold text-[var(--royal-dark)] text-sm mb-2">Ductless Mini-Split</h4>
                  <p className="text-gray-500 text-xs leading-relaxed">Controls temperature and actively dehumidifies — critical for basement environments.</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="font-semibold text-[var(--royal-dark)] text-sm mb-2">Radiant Floor Heating</h4>
                  <p className="text-gray-500 text-xs leading-relaxed">Transforms a cold concrete slab into a source of gentle, consistent warmth. Pair with a dehumidifier for optimal results.</p>
                </div>
              </div>
            </div>

            {/* Attic / Garage */}
            <div className="border border-gray-200 rounded-2xl p-6 lg:p-8 shadow-lg transition-all duration-300 lg:hover:-translate-y-1.5 lg:hover:shadow-xl lg:hover:scale-[1.02] cursor-pointer [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)]">
              <h3 className="text-lg lg:text-xl font-bold text-[var(--royal-dark)] mb-3">Attic or Garage Conversion</h3>
              <p className="text-gray-600 text-sm lg:text-base leading-relaxed">
                These spaces endure the most extreme temperature swings in any home. Poor insulation and direct exposure make them impossible to condition reliably with a central system extension. A <span className="font-semibold text-[var(--royal-dark)]">high-efficiency ductless mini-split</span> is purpose-built for this challenge — delivering powerful, independent climate control regardless of exterior conditions.
              </p>
        </div>

            {/* Gut Renovation */}
            <div className="border border-gray-200 rounded-2xl p-6 lg:p-8 shadow-lg transition-all duration-300 lg:hover:-translate-y-1.5 lg:hover:shadow-xl lg:hover:scale-[1.02] cursor-pointer [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)]">
              <h3 className="text-lg lg:text-xl font-bold text-[var(--royal-dark)] mb-3">Whole-Home Gut Renovation</h3>
              <p className="text-gray-600 text-sm lg:text-base leading-relaxed mb-4">
                A full gut renovation is a rare opportunity to engineer your comfort system from the ground up. With walls open, you&apos;re not limited to patching — you can build something truly modern.
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-[var(--royal-red)] rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-600 text-sm leading-relaxed"><span className="font-semibold text-[var(--royal-dark)]">High-Efficiency Central HVAC</span> — Perfectly designed and sealed ductwork installed while walls are accessible.</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-[var(--royal-red)] rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-600 text-sm leading-relaxed"><span className="font-semibold text-[var(--royal-dark)]">Zoned Climate Control</span> — Independent zones for bedrooms, living areas, and common spaces eliminate energy waste.</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-[var(--royal-red)] rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-600 text-sm leading-relaxed"><span className="font-semibold text-[var(--royal-dark)]">Hybrid Systems</span> — Combines an electric heat pump with a gas furnace, automatically selecting the most cost-effective fuel source based on conditions.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Cost & Efficiency */}
      <section 
        ref={(el) => { sectionRefs.current[5] = el; }}
        className="py-12 lg:py-28 bg-gray-50 relative z-20 -mt-1 -mb-1"
      >
        <div className="max-w-[1200px] mx-auto px-4 lg:px-6">
          <div className={`text-center mb-8 lg:mb-16 transition-all duration-700 ${sectionsVisible[5] ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-sm'}`}>
            <h2 className="text-2xl lg:text-3xl font-bold text-[var(--royal-dark)] mb-3">
              Cost & Efficiency Explained
        </h2>
            <div className="w-16 h-1 bg-[var(--royal-red)] mx-auto mb-6"></div>
            <p className="text-gray-600 text-sm lg:text-base max-w-2xl mx-auto">
              The sticker price on a unit tells only part of the story. Understanding total cost and efficiency ratings ensures you make a decision that pays dividends for years.
            </p>
          </div>

          <div className={`grid md:grid-cols-2 gap-6 lg:gap-10 max-w-4xl mx-auto transition-all duration-700 delay-200 ${sectionsVisible[5] ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-sm'}`}>
            <div>
              <h3 className="text-lg lg:text-xl font-bold text-[var(--royal-dark)] mb-4">Understanding the True Cost</h3>
              <p className="text-gray-600 text-sm lg:text-base leading-relaxed mb-4">
                Total investment extends beyond the equipment itself. Installation complexity, electrical upgrades, and unit sizing all factor into the final number.
              </p>
              <p className="text-gray-600 text-sm lg:text-base leading-relaxed">
                A quality installation should always take priority over saving a few hundred dollars upfront. Poor installation is the single most common cause of premature system failure and inflated energy bills.
              </p>
            </div>

            <div>
              <h3 className="text-lg lg:text-xl font-bold text-[var(--royal-dark)] mb-4">Decoding Efficiency Ratings</h3>
              <div className="space-y-4">
                <div className="bg-white rounded-xl p-5 border border-gray-100">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-sm font-bold text-[var(--royal-red)] bg-[var(--royal-red)]/10 px-3 py-1 rounded-full">SEER</span>
                    <span className="text-sm font-semibold text-[var(--royal-dark)]">Cooling Efficiency</span>
                  </div>
                  <p className="text-gray-500 text-sm">Seasonal Energy Efficiency Ratio — higher numbers mean lower cooling costs.</p>
                </div>
                <div className="bg-white rounded-xl p-5 border border-gray-100">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-sm font-bold text-[var(--royal-red)] bg-[var(--royal-red)]/10 px-3 py-1 rounded-full">HSPF</span>
                    <span className="text-sm font-semibold text-[var(--royal-dark)]">Heating Efficiency</span>
                  </div>
                  <p className="text-gray-500 text-sm">Heating Seasonal Performance Factor — higher numbers mean lower heating costs.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section 
        ref={(el) => { sectionRefs.current[6] = el; }}
        className="py-12 lg:py-28 pb-20 lg:pb-40 bg-[var(--royal-cream)] relative z-20 -mt-1 -mb-1"
      >
        <div className="max-w-[1200px] mx-auto px-4 lg:px-6">
          <div className={`text-center max-w-2xl mx-auto mb-8 lg:mb-12 transition-all duration-700 ${sectionsVisible[6] ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-sm'}`}>
            <span className="inline-block text-xs font-bold text-[var(--royal-red)] uppercase tracking-widest mb-3">Customer Reviews</span>
            <h2 className="text-2xl lg:text-3xl font-bold text-[var(--royal-dark)] leading-tight">
              What Our Customers <span className="text-[var(--royal-red)]">Say</span>
            </h2>
            <p className="text-gray-600 mt-3 lg:mt-4 text-sm lg:text-base">
              <span className="lg:hidden">Real experiences from real homeowners.</span>
              <span className="hidden lg:inline">Real experiences from real homeowners in our community.</span>
            </p>
          </div>

          <div className={`grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8 mb-8 lg:mb-10 transition-all duration-700 delay-200 ${sectionsVisible[6] ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-sm'}`}>
            {/* Review 1 - Anton V */}
            <div className="bg-white rounded-xl lg:rounded-2xl p-5 lg:p-8 shadow-lg border border-gray-100 transition-all duration-300 lg:hover:-translate-y-2.5 lg:hover:shadow-2xl lg:hover:scale-[1.03] cursor-pointer [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)]">
              <div className="flex gap-1 mb-3 lg:mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 lg:w-5 lg:h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 mb-4 lg:mb-6 leading-relaxed text-sm lg:text-base">
                &quot;Royal did a terrific job of replacing our water heater for a new one. Swapped the old for the new in an hour, and got the water running again in no time. Definitely will use them again for any future needs.&quot;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-[var(--royal-red)] text-white flex items-center justify-center font-bold text-sm lg:text-base">
                  AV
                </div>
                <div>
                  <p className="font-semibold text-[var(--royal-dark)] text-sm lg:text-base">Anton V</p>
                  <p className="text-gray-500 text-xs lg:text-sm">Google Review</p>
                </div>
              </div>
            </div>

            {/* Review 2 - Ryan Gaab */}
            <div className="bg-white rounded-xl lg:rounded-2xl p-5 lg:p-8 shadow-lg border border-gray-100 transition-all duration-300 lg:hover:-translate-y-2.5 lg:hover:shadow-2xl lg:hover:scale-[1.03] cursor-pointer [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)]">
              <div className="flex gap-1 mb-3 lg:mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 lg:w-5 lg:h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 mb-4 lg:mb-6 leading-relaxed text-sm lg:text-base">
                &quot;Great service even when others companies wouldn&apos;t offer estimates on the weekend. Ruvim came on Saturday and was able to assess the situation. Got the new furnace installed Tuesday. Would gladly do business with again!&quot;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-[var(--royal-red)] text-white flex items-center justify-center font-bold text-sm lg:text-base">
                  RG
                </div>
                <div>
                  <p className="font-semibold text-[var(--royal-dark)] text-sm lg:text-base">Ryan Gaab</p>
                  <p className="text-gray-500 text-xs lg:text-sm">Google Review</p>
                </div>
              </div>
            </div>

            {/* Review 3 - David Savchuk */}
            <div className="bg-white rounded-xl lg:rounded-2xl p-5 lg:p-8 shadow-lg border border-gray-100 transition-all duration-300 lg:hover:-translate-y-2.5 lg:hover:shadow-2xl lg:hover:scale-[1.03] cursor-pointer [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)]">
              <div className="flex gap-1 mb-3 lg:mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 lg:w-5 lg:h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 mb-4 lg:mb-6 leading-relaxed text-sm lg:text-base">
                &quot;Royal Heating and Cooling has done an incredible job with installing and servicing my tankless water heater and AC units. The customer service is amazing with such kind and respectful workers. I am so glad I chose Royal Heating and Cooling.&quot;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-[var(--royal-red)] text-white flex items-center justify-center font-bold text-sm lg:text-base">
                  DS
                </div>
                <div>
                  <p className="font-semibold text-[var(--royal-dark)] text-sm lg:text-base">David Savchuk</p>
                  <p className="text-gray-500 text-xs lg:text-sm">Google Review</p>
                </div>
              </div>
            </div>
          </div>

          {/* Google Reviews Button */}
          <div className={`text-center transition-all duration-700 delay-300 ${sectionsVisible[6] ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-sm'}`}>
            <a 
              href="https://share.google/eynDmlRw6TvltPK0c" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white border-2 border-[var(--royal-dark)] text-[var(--royal-dark)] px-6 lg:px-8 py-2.5 lg:py-3 rounded-full font-semibold hover:bg-[var(--royal-dark)] hover:text-white transition-all text-sm lg:text-base"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Read More Reviews on Google
            </a>
          </div>
        </div>
      </section>

      {/* Final Call-to-Action Section */}
      <section 
        ref={ctaRef}
        className="py-12 lg:py-24 bg-gradient-to-b from-[var(--royal-red)] to-[var(--royal-red-dark)] relative z-20 -mt-1"
      >
        <div className="container">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className={`text-4xl lg:text-4xl lg:text-5xl font-bold text-white mb-4 lg:mb-6 transition-all duration-700 leading-tight ${ctaVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-sm'}`}>
              <span className="lg:hidden">Ready to Get<br /><span className="text-[var(--royal-gold)]">Comfortable?</span></span>
              <span className="hidden lg:inline">Ready to Get <span className="text-[var(--royal-gold)]">Comfortable?</span></span>
            </h2>
            <p className={`text-white/80 text-sm lg:text-lg mb-8 lg:mb-10 transition-all duration-700 delay-100 ${ctaVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-sm'}`}>
              <span className="lg:hidden">Our team is here to help. Call now or book online.</span>
              <span className="hidden lg:inline">Whether it&apos;s an emergency repair or a scheduled tune-up, our team is here to help. Call now or book online — we&apos;ll take care of the rest.</span>
            </p>
            
            <div className={`flex flex-col sm:flex-row flex-wrap justify-center gap-4 lg:gap-4 transition-all duration-700 delay-200 ${ctaVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-sm'}`}>
          <a
            href="tel:3306621123"
                className="group relative overflow-hidden inline-flex items-center justify-center gap-3 bg-white text-[var(--royal-red)] px-10 py-4 rounded-full font-bold text-base lg:text-lg shadow-lg hover:shadow-2xl transition-all duration-300 ease-out hover:scale-110 hover:bg-[var(--royal-gold)] hover:text-white active:scale-95 active:shadow-md w-full sm:w-auto"
              >
                <svg className="w-5 h-5 lg:w-6 lg:h-6 relative z-10 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
                <span className="relative z-10">Call (330) 662-1123</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--royal-gold)] to-[var(--royal-gold-light)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
              <Link 
                href="/contact" 
                className="group relative overflow-hidden inline-flex items-center justify-center gap-3 bg-transparent border-2 border-white text-white px-10 py-4 rounded-full font-bold text-base lg:text-lg shadow-md hover:shadow-xl transition-all duration-300 ease-out hover:scale-110 hover:bg-white hover:text-[var(--royal-red)] active:scale-95 active:shadow-sm w-full sm:w-auto"
              >
                <svg className="w-5 h-5 lg:w-6 lg:h-6 relative z-10 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="relative z-10">Schedule Service</span>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
            </div>

            <p className={`text-white/60 text-xs lg:text-sm mt-6 lg:mt-8 transition-all duration-700 delay-300 ${ctaVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-sm'}`}>
              Available 24/7 for emergencies • Same-day service available
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#141414] pt-8 lg:pt-14 pb-6 relative z-20">
        <div className="container">
          {/* Mobile Layout */}
          <div className="lg:hidden">
            {/* Brand Only */}
            <div className="flex flex-col items-center text-center mb-6">
              <Image
                src="/footer1.png"
                alt="Royal Heating and Cooling"
                width={400}
                height={400}
                className="h-36 w-auto mb-4 drop-shadow-lg"
              />
              <p className="text-gray-500 text-sm">
                Comfort & efficiency you can trust.
              </p>
            </div>

            {/* Bottom Bar Mobile */}
            <div className="border-t border-white/5 pt-4 mt-6">
              <p className="text-center text-gray-700 text-xs">
                © {new Date().getFullYear()} Royal Heating and Cooling. All Rights Reserved.
              </p>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:block">
            <div className="grid grid-cols-4 gap-10 lg:gap-16 mb-10">
              {/* Column 1 - Brand */}
              <div className="flex flex-col items-center text-center">
                <Image
                  src="/footer1.png"
                  alt="Royal Heating and Cooling"
                  width={300}
                  height={300}
                  className="h-[85px] w-auto mb-4 drop-shadow-lg transition-transform duration-300 ease-out hover:scale-110 cursor-pointer"
                />
                <p className="text-gray-500 text-xs">
                  Comfort & efficiency you can trust.
                </p>
              </div>

              {/* Column 2 - Services (Part 1) */}
              <div>
                <h4 className="text-gray-300 text-xs font-semibold uppercase tracking-wider mb-4">Services</h4>
                <ul className="space-y-2">
                  <li><Link href="/services/furnaces" className="text-gray-500 text-xs hover:text-gray-300 transition-colors">Furnaces</Link></li>
                  <li><Link href="/services/air-conditioning" className="text-gray-500 text-xs hover:text-gray-300 transition-colors">Air Conditioning</Link></li>
                  <li><Link href="/services/heat-pump" className="text-gray-500 text-xs hover:text-gray-300 transition-colors">Heat Pumps</Link></li>
                </ul>
              </div>

              {/* Column 3 - Services (Part 2) */}
              <div>
                <h4 className="text-gray-300 text-xs font-semibold uppercase tracking-wider mb-4">&nbsp;</h4>
                <ul className="space-y-2">
                  <li><Link href="/services/mini-split" className="text-gray-500 text-xs hover:text-gray-300 transition-colors">Mini-Split Systems</Link></li>
                  <li><Link href="/services/indoor-air-quality" className="text-gray-500 text-xs hover:text-gray-300 transition-colors">Indoor Air Quality</Link></li>
                  <li><Link href="/services/water-heaters" className="text-gray-500 text-xs hover:text-gray-300 transition-colors">Water Heaters</Link></li>
                </ul>
              </div>

              {/* Column 4 - Contact */}
              <div>
                <h4 className="text-gray-300 text-xs font-semibold uppercase tracking-wider mb-4">Contact</h4>
                <ul className="space-y-2">
                  <li><Link href="/contact" className="text-gray-500 text-xs hover:text-gray-300 transition-colors">Schedule Service</Link></li>
                  <li><a href="tel:3306621123" className="text-gray-500 text-xs hover:text-gray-300 transition-colors">(330) 662-1123</a></li>
                </ul>
                <p className="text-gray-600 text-xs mt-4">
                  Licensed • Insured • Family Owned
                </p>
              </div>
            </div>

            {/* Bottom Bar Desktop */}
            <div className="border-t border-white/5 pt-5">
              <p className="text-center text-gray-700 text-xs">
                © {new Date().getFullYear()} Royal Heating and Cooling. All Rights Reserved.
              </p>
            </div>
        </div>
      </div>
      </footer>
    </div>
  );
}
