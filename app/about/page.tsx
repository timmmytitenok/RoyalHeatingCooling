'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../components/Navbar';

export default function AboutPage() {
  const [heroVisible, setHeroVisible] = useState(false);
  const [storyVisible, setStoryVisible] = useState(false);
  const [differenceVisible, setDifferenceVisible] = useState(false);
  const [treatmentVisible, setTreatmentVisible] = useState(false);
  const [ctaVisible, setCtaVisible] = useState(false);
  const [vanProgress, setVanProgress] = useState(0);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', phone: '', message: '' });
  
  const trustWords = ['Trust', 'Results', 'Clarity'];

  const heroRef = useRef<HTMLElement>(null);
  const storyRef = useRef<HTMLElement>(null);
  const differenceRef = useRef<HTMLElement>(null);
  const treatmentRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLElement>(null);
  const vanSectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setHeroVisible(true);
    
    // Word cycling animation
    const wordInterval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentWordIndex(prev => (prev + 1) % trustWords.length);
        setIsAnimating(false);
      }, 200);
    }, 2000);

    // Scroll handler for van animation
    const handleScroll = () => {
      if (vanSectionRef.current) {
        const section = vanSectionRef.current;
        const rect = section.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Van section is in view when its top enters the viewport
        const sectionTop = rect.top;
        const sectionHeight = section.offsetHeight;
        
        // Start when section top reaches bottom of viewport
        // End when section bottom leaves top of viewport
        const startPoint = windowHeight; // section top at bottom of screen
        const endPoint = -sectionHeight; // section bottom at top of screen
        
        const progress = (startPoint - sectionTop) / (startPoint - endPoint);
        const clampedProgress = Math.max(0, Math.min(1, progress));
        
        setVanProgress(clampedProgress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    const createObserver = (setter: (value: boolean) => void, delay = 0, margin = '0px') => {
      return new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setter(true);
            }, delay);
          }
        },
        { threshold: 0.1, rootMargin: margin }
      );
    };

    const storyObserver = createObserver(setStoryVisible, 200);
    const differenceObserver = createObserver(setDifferenceVisible, 300);
    const treatmentObserver = createObserver(setTreatmentVisible, 400);
    const ctaObserver = createObserver(setCtaVisible, 300);

    if (storyRef.current) storyObserver.observe(storyRef.current);
    if (differenceRef.current) differenceObserver.observe(differenceRef.current);
    if (treatmentRef.current) treatmentObserver.observe(treatmentRef.current);
    if (ctaRef.current) ctaObserver.observe(ctaRef.current);

    return () => {
      clearInterval(wordInterval);
      window.removeEventListener('scroll', handleScroll);
      storyObserver.disconnect();
      differenceObserver.disconnect();
      treatmentObserver.disconnect();
      ctaObserver.disconnect();
    };
  }, []);

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Sticky Container for Hero and Van Section */}
      <div className="h-auto lg:h-[170vh] relative">
        {/* About Hero - Two Column Layout - Sticky */}
        <section ref={heroRef} className="lg:sticky lg:top-0 z-10 pt-32 pb-16 lg:pt-35 lg:pb-24 min-h-[auto] lg:min-h-screen flex items-center bg-gradient-to-b from-[var(--royal-red)] to-[var(--royal-red-dark)]">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-0 lg:gap-16 items-center">
            {/* Left Column - Content */}
            <div className={`text-center lg:text-left transition-all duration-700 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-2">
                Honest Work.
              </h1>
              <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6">
                Built on{' '}
                <span 
                  className={`text-[var(--royal-gold)] inline-block transition-all duration-200 ${isAnimating ? 'opacity-0 translate-y-2 blur-sm' : 'opacity-100 translate-y-0 blur-0'}`}
                >
                  {trustWords[currentWordIndex]}.
                </span>
              </h2>
              
              <p className="text-sm lg:text-lg text-gray-400 leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0">
                We&apos;re not a big corporation — we&apos;re your neighbors. A local, 
                family-run HVAC company that believes in doing the job right, 
                being upfront about pricing, and treating every home like our own.
              </p>
              
              {/* Trust Chips */}
              <div className="hidden lg:flex flex-nowrap gap-3 overflow-x-auto">
                <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full">
                  <svg className="w-5 h-5 text-[var(--royal-gold)]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L13.09 8.26L19 9L14.14 12.14L15.45 18L12 15.27L8.55 18L9.86 12.14L5 9L10.91 8.26L12 2Z"/>
                  </svg>
                  <span className="text-white text-sm font-medium">Family Owned & Operated</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full">
                  <svg className="w-5 h-5 text-[var(--royal-gold)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span className="text-white text-sm font-medium">Licensed & Insured</span>
                </div>
              </div>
            </div>
            
            {/* Right Column - Image */}
            <div className={`transition-all duration-700 delay-200 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="relative">
                <div className="rounded-2xl overflow-hidden shadow-[0_25px_80px_10px_rgba(0,0,0,0.7)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_35px_100px_15px_rgba(0,0,0,0.8)] cursor-pointer">
                  <Image
                    src="/about-hero-new.jpg"
                    alt="Royal Heating and Cooling Team"
                    width={800}
                    height={600}
                    className="w-full h-auto object-cover"
                    priority
                  />
                </div>
                {/* Decorative accent */}
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-[var(--royal-red)]/20 rounded-2xl -z-10"></div>
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-[var(--royal-red)]/15 rounded-2xl -z-10"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

        {/* Black Section - Van Animation - Scrolls over hero */}
        <section ref={vanSectionRef} className="pt-12 pb-12 lg:pt-24 lg:pb-45 relative z-20 min-h-[70vh] lg:min-h-[80vh] bg-[var(--royal-dark)] flex items-center justify-center overflow-hidden shadow-[0_-10px_60px_5px_rgba(0,0,0,0.3),0_10px_60px_5px_rgba(0,0,0,0.2)] lg:shadow-[0_-25px_1000px_20px_rgba(0,0,0,0.6),0_35px_1000px_20px_rgba(0,0,0,0.5)]">
        <div className="container relative">
          {/* Hidden Message - Revealed by van (from right to left) */}
          <div className="text-center relative z-20 hidden lg:block">
            <h2 
              className="text-4xl lg:text-6xl font-bold text-white mb-4"
              style={{
                clipPath: `inset(0 0 0 ${70 - vanProgress * 150}%)`,
              }}
            >
              Family Owned. <span className="text-[var(--royal-gold)]">Community Driven.</span>
            </h2>
            <p 
              className="text-xl text-white/70 max-w-2xl mx-auto"
              style={{
                clipPath: `inset(0 0 0 ${70 - vanProgress * 150}%)`,
              }}
            >
              Serving Northeast Ohio with pride since day one.
            </p>
          </div>
          
          {/* Van - Drives across screen (right to left) - Moves with section */}
          <div 
            className="absolute top-1/2 -translate-y-1/2 z-30 pointer-events-none"
            style={{
              left: `calc(${60 - vanProgress * 150}%)`,
            }}
          >
            <div className="relative">
              <Image
                src="/van.png"
                alt="Royal Heating and Cooling Van"
                width={600}
                height={375}
                className="w-96 lg:w-[500px] h-auto drop-shadow-2xl relative z-10 transition-[filter] duration-300"
                style={{ 
                  minWidth: '500px',
                  filter: `blur(${Math.max(0, 10 - vanProgress * 80)}px)`
                }}
              />
              {/* Ground shadow under the van */}
              <div className="absolute bottom-32 left-1/2 -translate-x-1/2 w-[95%] h-8 bg-black rounded-[50%] blur-lg"></div>
            </div>
          </div>
        </div>
        </section>
      </div>

      {/* Our Values */}
      <section ref={storyRef} className="pt-24 pb-12 lg:py-28 bg-white relative z-30">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid lg:grid-cols-[55%_45%] gap-6 lg:gap-16 items-center">
            {/* Left - Content */}
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-[var(--royal-dark)] mb-4">
                Our Values
              </h2>
              {/* Divider */}
              <div className="w-16 h-1 bg-[var(--royal-red)] mb-7"></div>
              
              <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
                <p>
                  Royal Heating and Cooling was built on a simple belief: do honest work, 
                  treat people right, and stand behind every job. Too many homeowners get 
                  overcharged or pushed into services they don&apos;t actually need — we set 
                  out to be the company that does things differently.
                </p>
                <p>
                  We&apos;re a local, family-oriented team that takes pride in clear communication 
                  and quality craftsmanship. When you call us, you speak with real people who 
                  listen, explain your options plainly, and never pressure you into a decision.
                </p>
                <p>
                  <span className="lg:hidden">Our goal isn&apos;t just to fix your HVAC system — it&apos;s to earn your trust so you feel confident calling us again and recommending us to the people you care.</span>
                  <span className="hidden lg:inline">Our goal isn&apos;t just to fix your HVAC system — it&apos;s to earn your trust so you feel confident calling us again and recommending us to the people you care about.</span>
                </p>
              </div>
            </div>
            
            {/* Right - Logo */}
            <div className="flex items-center justify-center mt-6 lg:mt-0">
              <div className="bg-gray-50 rounded-3xl p-8 lg:p-12">
                <Image
                  src="/footer1.png"
                  alt="Royal Heating and Cooling"
                  width={400}
                  height={400}
                  className="w-full max-w-[320px] lg:max-w-[380px] h-auto drop-shadow-[0_15px_30px_rgba(0,0,0,0.3)] transition-all duration-300 hover:scale-105 cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section ref={differenceRef} className="py-20 bg-[var(--royal-cream)] relative z-30">
        <div className="container">
          <div className={`max-w-4xl mx-auto transition-all duration-700 ${differenceVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="text-center mb-8">
              <h2 className="text-2xl lg:text-4xl font-bold text-[var(--royal-dark)] mb-2">
                What Makes Us Different
              </h2>
              <p className="text-gray-500 text-base">The values that guide every job we do.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                {
                  title: "No Surprise Pricing",
                  description: "We tell you the cost before we start. No hidden fees, no upsells."
                },
                {
                  title: "We Show Up On Time",
                  description: "Your time matters. We respect it by being punctual and prepared."
                },
                {
                  title: "Honest Recommendations",
                  description: "We'll tell you what you actually need — not what makes us the most money."
                },
                {
                  title: "Clean, Respectful Work",
                  description: "We treat your home like our own. Booties on, mess cleaned up."
                },
                {
                  title: "Real People, Real Answers",
                  description: "Call us and talk to someone who knows HVAC — not a call center."
                },
                {
                  title: "We Stand Behind Our Work",
                  description: "If something's not right, we'll make it right. Period."
                }
              ].map((item, index) => (
                <div 
                  key={item.title}
                  className={`bg-white rounded-lg p-4 shadow-sm transition-all duration-300 lg:hover:-translate-y-2.5 lg:hover:shadow-2xl lg:hover:scale-[1.03] cursor-pointer [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] ${differenceVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[var(--royal-red)] flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-[var(--royal-dark)] text-sm">{item.title}</h3>
                      <p className="text-gray-500 text-xs">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How We Treat Our Customers */}
      <section ref={treatmentRef} className="py-20 bg-white relative z-30">
        <div className="container">
          <div className={`max-w-4xl mx-auto transition-all duration-700 ${treatmentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {/* Main Heading & Intro */}
            <div className="text-center mb-10">
              <h2 className="text-3xl lg:text-4xl font-bold text-[var(--royal-dark)] mb-6">
                <span className="lg:hidden">How We Treat<br />Our Customers</span>
                <span className="hidden lg:inline">How We Treat Our Customers</span>
              </h2>
              <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto">
                We believe in listening first. When you call us with a problem, we take 
                the time to understand what&apos;s going on before jumping to solutions. 
                We explain everything in plain English — no jargon, no confusing quotes.
              </p>
            </div>

            {/* Value Items */}
            <div className="grid md:grid-cols-3 gap-8 text-center mb-14">
              {[
                {
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  ),
                  title: "We Listen",
                  description: "Your concerns come first"
                },
                {
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  ),
                  title: "Clear Quotes",
                  description: "Know the price upfront"
                },
                {
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                    </svg>
                  ),
                  title: "No Pressure",
                  description: "Take your time deciding"
                }
              ].map((item, index) => (
                <div 
                  key={item.title}
                  className={`transition-all duration-500 ${treatmentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                  style={{ transitionDelay: treatmentVisible ? `${(index + 1) * 150}ms` : '0ms' }}
                >
                  <div className="w-16 h-16 rounded-full bg-[var(--royal-cream)] flex items-center justify-center mx-auto mb-4 text-[var(--royal-red)]">
                    {item.icon}
                  </div>
                  <h3 className="font-semibold text-[var(--royal-dark)] mb-1">{item.title}</h3>
                  <p className="text-gray-500 text-sm">{item.description}</p>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="flex items-center justify-center gap-4 mb-10">
              <div className="h-px w-16 bg-gray-200"></div>
              <div className="w-2 h-2 rounded-full bg-[var(--royal-red)]/30"></div>
              <div className="h-px w-16 bg-gray-200"></div>
            </div>

            {/* Reviews Subheading */}
            <div className={`text-center mb-8 transition-all duration-500 ${treatmentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: treatmentVisible ? '500ms' : '0ms' }}>
              <h3 className="text-xl lg:text-2xl font-semibold text-[var(--royal-dark)] mb-2">
                Hear It From Them
              </h3>
              <p className="text-gray-400 text-sm">Real words from real homeowners.</p>
            </div>

            {/* Testimonial Cards */}
            <div className="grid md:grid-cols-3 gap-5">
              {[
                {
                  text: "Royal did a terrific job of replacing our water heater for a new one. Swapped the old for the new in an hour, and got the water running again in no time. Definitely will use them again for any future needs.",
                  name: "Anton V",
                  city: "Google Review"
                },
                {
                  text: "Great service even when others companies wouldn't offer estimates on the weekend. Ruvim came on Saturday and was able to assess the situation. Got the new furnace installed Tuesday. Would gladly do business with again!",
                  name: "Ryan Gaab",
                  city: "Google Review"
                },
                {
                  text: "Royal Heating and Cooling has done an incredible job with installing and servicing my tankless water heater and AC units. The customer service is amazing with such kind and respectful workers. I am so glad I chose Royal Heating and Cooling.",
                  name: "David Savchuk",
                  city: "Google Review"
                }
              ].map((review, index) => (
                <div 
                  key={review.name}
                  className={`bg-[var(--royal-cream)] rounded-lg p-5 border border-gray-100 transition-all duration-500 ${treatmentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                  style={{ transitionDelay: treatmentVisible ? `${600 + index * 100}ms` : '0ms' }}
                >
                  {/* 5 Stars */}
                  <div className="flex gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-[var(--royal-gold)]" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  {/* Review Text */}
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    &ldquo;{review.text}&rdquo;
                  </p>
                  {/* Customer Info */}
                  <p className="text-xs font-medium text-[var(--royal-dark)]">
                    {review.name} <span className="text-gray-400 font-normal">• {review.city}</span>
                  </p>
                </div>
              ))}
            </div>

            {/* Read More Reviews Link */}
            <div className={`text-center mt-8 transition-all duration-500 ${treatmentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: treatmentVisible ? '900ms' : '0ms' }}>
              <a 
                href="https://share.google/eynDmlRw6TvltPK0c" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[var(--royal-red)] font-medium text-sm hover:underline transition-all"
              >
                Read More Reviews
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Final Call-to-Action Section */}
      <section ref={ctaRef} className="py-12 lg:py-24 bg-gradient-to-b from-[var(--royal-red)] to-[var(--royal-red-dark)] relative z-30">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className={`text-4xl lg:text-4xl lg:text-5xl font-bold text-white mb-4 lg:mb-6 transition-all duration-700 leading-tight ${ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <span className="lg:hidden">Ready to Get<br /><span className="text-[var(--royal-gold)]">Comfortable?</span></span>
              <span className="hidden lg:inline">Ready to Get <span className="text-[var(--royal-gold)]">Comfortable?</span></span>
            </h2>
            <p className={`text-white/80 text-sm lg:text-lg mb-8 lg:mb-10 transition-all duration-700 ${ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: ctaVisible ? '100ms' : '0ms' }}>
              <span className="lg:hidden">Our team is here to help. Call now or book online.</span>
              <span className="hidden lg:inline">Whether it&apos;s an emergency repair or a scheduled tune-up, our team is here to help. Call now or book online — we&apos;ll take care of the rest.</span>
            </p>
            
            <div className={`flex flex-col sm:flex-row flex-wrap justify-center gap-4 lg:gap-4 transition-all duration-700 ${ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: ctaVisible ? '200ms' : '0ms' }}>
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

            <p className={`text-white/60 text-xs lg:text-sm mt-6 lg:mt-8 transition-all duration-700 ${ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: ctaVisible ? '300ms' : '0ms' }}>
              Available 24/7 for emergencies • Same-day service available
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#141414] pt-8 lg:pt-14 pb-6 relative z-30">
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

      {/* Floating Text Us Button */}
      <div className="hidden lg:block fixed bottom-6 right-6 z-40 opacity-0 animate-[popFade_0.4s_ease-out_2s_forwards]">
        {/* Contact Form Popup */}
        <div className={`absolute bottom-16 right-0 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden transition-all duration-500 ease-out origin-bottom-right ${isContactOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-2 pointer-events-none'}`}>
          {/* Header */}
          <div className="bg-[var(--royal-red)] px-5 py-4">
            <div className="flex items-center gap-2 text-white">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span className="font-semibold">Text Us Now</span>
            </div>
            <p className="text-white/80 text-xs mt-1">Get a quick response via text message</p>
          </div>

          {/* Form */}
          <div className="p-5 space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Your Name</label>
              <input
                type="text"
                value={contactForm.name}
                onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                placeholder="John Doe"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--royal-red)] focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Phone Number</label>
              <input
                type="tel"
                value={contactForm.phone}
                onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                placeholder="(330) 555-1234"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--royal-red)] focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Quick Message</label>
              <textarea
                value={contactForm.message}
                onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                placeholder="How can we help you today?"
                rows={3}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--royal-red)] focus:border-transparent transition-all resize-none"
              />
            </div>
            <button
              type="button"
              className="w-full bg-[var(--royal-red)] text-white py-3 rounded-lg font-semibold text-sm hover:bg-[var(--royal-red-dark)] transition-all hover:shadow-lg"
            >
              Send Message
            </button>
            <p className="text-[10px] text-gray-400 text-center">
              We&apos;ll text you back shortly!
            </p>
          </div>
        </div>

        {/* Toggle Button */}
        <button
          onClick={() => setIsContactOpen(!isContactOpen)}
          className={`text-us-btn group flex items-center gap-2 px-5 py-3 rounded-full font-semibold transition-all duration-300 ease-out ${isContactOpen ? 'bg-gray-800 text-white hover:scale-110' : 'text-white hover:scale-110 hover:-translate-y-1'}`}
        >
          {isContactOpen ? (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Close
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Text Us
            </>
          )}
        </button>
      </div>
    </main>
  );
}
