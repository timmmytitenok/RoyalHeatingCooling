'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '../../components/Navbar';

export default function NewConstruction() {
  const [heroVisible, setHeroVisible] = useState(false);
  const [sectionsVisible, setSectionsVisible] = useState<boolean[]>([]);
  const [ctaVisible, setCtaVisible] = useState(false);

  const heroRef = useRef<HTMLElement>(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const ctaRef = useRef<HTMLElement>(null);

  // Hero animation on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setHeroVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Sections animation on scroll
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

  // CTA animation on scroll
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
                  NEW CONSTRUCTION HVAC
                </span>
                <h1 className={`text-3xl lg:text-5xl font-bold text-white mb-3 lg:mb-4 leading-tight whitespace-pre-line transition-all duration-700 delay-100 text-center lg:text-left ${heroVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-sm'}`}>
                  New Construction
                </h1>
                <p className={`text-white/80 text-sm lg:text-lg leading-relaxed mb-6 lg:mb-8 transition-all duration-700 delay-200 text-center lg:text-left ${heroVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-sm'}`}>
                  Complete HVAC installations for new construction projects. Residential and commercial systems designed and installed right from the start.
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
                <div className="rounded-2xl lg:rounded-[3rem] aspect-[4/3] flex items-center justify-center overflow-hidden shadow-[0_15px_40px_5px_rgba(0,0,0,0.3)] lg:shadow-[0_25px_60px_10px_rgba(0,0,0,0.4)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_30px_80px_15px_rgba(0,0,0,0.5)] cursor-pointer">
                  <Image
                    src="/new-construction-hero.jpg"
                    alt="New Construction HVAC"
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
                {/* Experience Badge */}
                <div className="absolute bottom-4 left-4 lg:bottom-8 lg:left-8 w-20 h-20 lg:w-32 lg:h-32 bg-gradient-to-br from-[var(--royal-red)] to-[var(--royal-red-dark)] rounded-full flex flex-col items-center justify-center shadow-2xl z-10 rotate-[-15deg] cursor-pointer transition-all duration-300 ease-out hover:scale-[1.18] hover:rotate-[-10deg] hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(0,0,0,0.55)]">
                  <div className="text-white text-2xl lg:text-4xl font-bold">15+</div>
                  <div className="text-white text-[10px] lg:text-sm font-semibold">Years of</div>
                  <div className="text-white text-[10px] lg:text-sm font-semibold">Experience</div>
                </div>
                {/* Image */}
                <Image
                  src="/new-construction-section2.jpg"
                  alt="New Construction HVAC Installation"
                  fill
                  className="object-cover rounded-[2rem]"
                />
              </div>
            </div>
            
            {/* Content */}
            <div className={`transition-all duration-700 delay-200 lg:order-1 flex flex-col justify-center ${sectionsVisible[1] ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-sm'}`}>
              <h2 className="text-lg lg:text-2xl font-bold text-[var(--royal-dark)] mb-4 whitespace-nowrap text-center lg:text-left">
                Residential &amp; Commercial HVAC
              </h2>
              <p className="text-gray-600 text-sm lg:text-base leading-relaxed mb-6 lg:mb-8 text-center lg:text-left">
                As a qualified new construction HVAC specialist, Royal Heating and Cooling provides custom-engineered heating, cooling, and ventilation systems for residential and commercial properties. Our experienced team partners closely with your construction crew to ensure every system is properly sized, efficiently designed, and engineered for long-lasting performance. We tackle common obstacles including optimal airflow distribution, energy conservation, climate zoning, and regulatory compliance, guaranteeing that new commercial buildings achieve dependable temperature control right from launch day.
              </p>

              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-4 lg:gap-6 mb-6 lg:mb-8">
                <div className="text-center lg:text-left">
                  <div className="text-2xl lg:text-3xl font-bold text-[var(--royal-red)]">100+</div>
                  <div className="text-gray-500 text-xs lg:text-sm mt-1">Projects Completed</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-2xl lg:text-3xl font-bold text-[var(--royal-red)]">100%</div>
                  <div className="text-gray-500 text-xs lg:text-sm mt-1">Licensed & Insured</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-2xl lg:text-3xl font-bold text-[var(--royal-red)]">24/7</div>
                  <div className="text-gray-500 text-xs lg:text-sm mt-1">Support Available</div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Comprehensive HVAC Solutions Section */}
      <section 
        ref={(el) => { sectionRefs.current[2] = el; }}
        className="py-12 lg:py-24 bg-gray-50 relative z-20 -mt-1 -mb-1"
      >
        <div className="max-w-[1200px] mx-auto px-4 lg:px-6">
          {/* Title */}
          <div className="text-center mb-12 lg:mb-16">
            <h2 className={`text-2xl lg:text-3xl font-bold text-[var(--royal-dark)] mb-4 transition-all duration-700 ${sectionsVisible[2] ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-sm'}`}>
              Comprehensive HVAC Solutions for New Construction Projects
            </h2>
            <div className="w-16 h-1 bg-[var(--royal-red)] mx-auto mb-6"></div>
            <p className={`text-gray-600 text-sm lg:text-base mt-6 max-w-3xl mx-auto transition-all duration-700 delay-100 ${sectionsVisible[2] ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-sm'}`}>
              Constructing a new commercial or residential building demands a dependable and effective HVAC system to maintain long-term comfort and efficiency. Our team delivers tailored HVAC solutions engineered to fulfill the distinct requirements of new construction developments.
            </p>
          </div>

          {/* Two Column Layout */}
          <div className={`grid md:grid-cols-2 gap-8 lg:gap-16 max-w-5xl mx-auto transition-all duration-700 delay-200 ${sectionsVisible[2] ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-sm'}`}>
            {/* HVAC Design Services */}
            <div>
              <h3 className="text-xl lg:text-2xl font-bold text-[var(--royal-dark)] mb-4">HVAC Design Services</h3>
              <p className="text-gray-600 text-sm lg:text-base leading-relaxed">
                Our HVAC design solutions guarantee that new construction and renovation projects feature efficient, properly sized, and high-performing heating and cooling systems. Through careful analysis of building layouts, airflow requirements, and energy efficiency objectives, we develop custom HVAC solutions optimized for each facility.
              </p>
            </div>

            {/* New HVAC Installation */}
            <div>
              <h3 className="text-xl lg:text-2xl font-bold text-[var(--royal-dark)] mb-4">New HVAC Installation</h3>
              <p className="text-gray-600 text-sm lg:text-base leading-relaxed">
                Royal Heating and Cooling&apos;s new HVAC installation solutions deliver dependable, energy-efficient heating and cooling systems for commercial and residential properties. From choosing the ideal equipment to expert installation, we ensure every system is engineered for maximum performance and sustained durability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Custom Ductwork & Maintenance Section */}
      <section 
        ref={(el) => { sectionRefs.current[3] = el; }}
        className="py-12 lg:py-24 bg-white relative z-20 -mt-1 -mb-1"
      >
        <div className="max-w-[1200px] mx-auto px-4 lg:px-6">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-20 items-center">
            {/* Image */}
            <div className={`transition-all duration-700 ${sectionsVisible[3] ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-sm'}`}>
              <div className="bg-[var(--royal-cream)] rounded-[2rem] aspect-[4/3] flex items-center justify-center overflow-hidden shadow-[0_20px_50px_-10px_rgba(0,0,0,0.4)] relative transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_22px_55px_-10px_rgba(0,0,0,0.45)] cursor-pointer">
                <Image
                  src="/new-construction-ductwork.png"
                  alt="New Construction HVAC Ductwork"
                  fill
                  className="object-cover rounded-[2rem]"
                />
              </div>
            </div>
            
            {/* Content */}
            <div className={`transition-all duration-700 delay-200 ${sectionsVisible[3] ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-sm'}`}>
              <h2 className="text-xl lg:text-2xl font-bold text-[var(--royal-dark)] mb-4 leading-tight lg:whitespace-nowrap">
                <span className="lg:hidden">Maintenance for New Construction</span>
                <span className="hidden lg:inline">HVAC Maintenance for New Construction</span>
              </h2>
              <div className="w-16 h-1 bg-[var(--royal-red)] mb-6"></div>
              <p className="text-gray-600 text-sm lg:text-base leading-relaxed">
                We engineer and install custom ductwork tailored for new construction projects, guaranteeing optimal airflow, energy efficiency, and climate control from opening day. Our skilled team designs and fabricates duct systems precisely fitted to your building's unique configuration, maximizing performance for sustained reliability. After your HVAC system is operational, we provide preventative maintenance services to maintain smooth operation. Regular inspections, tune-ups, and system evaluations help avoid expensive breakdowns, boost efficiency, and prolong equipment lifespan, ensuring continuous comfort and performance for your new facility.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section 
        ref={(el) => { sectionRefs.current[4] = el; }}
        className="py-12 lg:py-28 pb-20 lg:pb-40 bg-[var(--royal-cream)] relative z-20 -mt-1 -mb-1"
      >
        <div className="max-w-[1200px] mx-auto px-4 lg:px-6">
          <div className={`text-center max-w-2xl mx-auto mb-8 lg:mb-12 transition-all duration-700 ${sectionsVisible[4] ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-sm'}`}>
            <span className="inline-block text-xs font-bold text-[var(--royal-red)] uppercase tracking-widest mb-3">Customer Reviews</span>
            <h2 className="text-2xl lg:text-3xl font-bold text-[var(--royal-dark)] leading-tight">
              What Our Customers <span className="text-[var(--royal-red)]">Say</span>
            </h2>
            <p className="text-gray-600 mt-3 lg:mt-4 text-sm lg:text-base">
              <span className="lg:hidden">Real experiences from real homeowners.</span>
              <span className="hidden lg:inline">Real experiences from real homeowners in our community.</span>
            </p>
          </div>

          <div className={`grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8 mb-8 lg:mb-10 transition-all duration-700 delay-200 ${sectionsVisible[4] ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-sm'}`}>
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
          <div className={`text-center transition-all duration-700 delay-300 ${sectionsVisible[4] ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-sm'}`}>
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
              Same-day service available
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
