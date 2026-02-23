'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from './components/Navbar';

const services = [
  {
    title: 'Furnaces',
    slug: 'furnaces',
    description: "No heat? We'll get your home warm again — fast.",
    icon: (
      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
      </svg>
    ),
  },
  {
    title: 'Air Conditioning',
    slug: 'air-conditioning',
    description: 'Stay cool when it matters. Same-day AC repairs available.',
    icon: (
      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: 'Heat Pump',
    slug: 'heat-pump',
    description: 'One system for heating and cooling — year-round comfort.',
    icon: (
      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
  },
  {
    title: 'Mini-Split Systems',
    slug: 'mini-split',
    description: 'Perfect for rooms without ductwork. Quiet and efficient.',
    icon: (
      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 6v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 6v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    ),
  },
  {
    title: 'Hot Water Heaters & Tankless',
    slug: 'water-heaters',
    description: "Cold showers? We'll fix or replace your water heater today.",
    icon: (
      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
  },
  {
    title: 'Duct Cleaning',
    slug: 'duct-cleaning',
    description: 'Breathe easier. Remove dust, allergens, and buildup.',
    icon: (
      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
  },
  {
    title: 'Indoor Air Quality',
    slug: 'indoor-air-quality',
    description: 'Healthier air for your family — filtration, purification, and more.',
    icon: (
      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    ),
  },
];

const brands = ['American Standard', 'Ameristar', 'Trane', 'Daikin', 'Amana', 'Goodman'];

const faqs = [
  {
    question: 'Are your technicians licensed and insured?',
    answer: 'Yes. Our HVAC technicians are fully licensed and insured, and receive ongoing training to deliver safe, high-quality service in every home.',
  },
  {
    question: 'Do you offer free estimates?',
    answer: 'Yes! We provide free estimates for new system installations and replacements. Our team will assess your needs and provide honest, upfront pricing with no hidden fees.',
  },
  {
    question: 'Do you offer financing options?',
    answer: 'Absolutely. We understand that HVAC systems are a significant investment. We offer flexible financing options to help make your comfort affordable.',
  },
  {
    question: 'What areas do you serve?',
    answer: 'We proudly serve the greater Northeast Ohio area. Contact us to confirm if we service your specific location.',
  },
];

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [servicesVisible, setServicesVisible] = useState(false);
  const [expectVisible, setExpectVisible] = useState(false);
  const [reviewsVisible, setReviewsVisible] = useState(false);
  const [brandsVisible, setBrandsVisible] = useState(false);
  const [ctaVisible, setCtaVisible] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [isScheduleModalClosing, setIsScheduleModalClosing] = useState(false);
  const [isScheduleSubmitted, setIsScheduleSubmitted] = useState(false);
  const [scheduleForm, setScheduleForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    service: '',
  });
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', phone: '', message: '' });
  
  const servicesRef = useRef<HTMLElement>(null);
  const expectRef = useRef<HTMLElement>(null);
  const reviewsRef = useRef<HTMLElement>(null);
  const brandsRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const createObserver = (setVisible: (v: boolean) => void, delay: number = 200) => {
      return new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => setVisible(true), delay);
          }
        },
        { threshold: 0.2 }
      );
    };

    const servicesObserver = createObserver(setServicesVisible, 300);
    const expectObserver = createObserver(setExpectVisible);
    const reviewsObserver = createObserver(setReviewsVisible);
    const brandsObserver = createObserver(setBrandsVisible);
    const ctaObserver = createObserver(setCtaVisible);

    if (servicesRef.current) servicesObserver.observe(servicesRef.current);
    if (expectRef.current) expectObserver.observe(expectRef.current);
    if (reviewsRef.current) reviewsObserver.observe(reviewsRef.current);
    if (brandsRef.current) brandsObserver.observe(brandsRef.current);
    if (ctaRef.current) ctaObserver.observe(ctaRef.current);

    return () => {
      servicesObserver.disconnect();
      expectObserver.disconnect();
      reviewsObserver.disconnect();
      brandsObserver.disconnect();
      ctaObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!isScheduleModalOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isScheduleModalOpen]);

  const resetScheduleForm = () => {
    setScheduleForm({
      fullName: '',
      phone: '',
      email: '',
      service: '',
    });
  };

  const openScheduleModal = () => {
    resetScheduleForm();
    setIsScheduleSubmitted(false);
    setIsScheduleModalClosing(false);
    setIsScheduleModalOpen(true);
  };

  const closeScheduleModal = () => {
    setIsScheduleModalClosing(true);
    setTimeout(() => {
      setIsScheduleModalOpen(false);
      setIsScheduleModalClosing(false);
      setIsScheduleSubmitted(false);
      resetScheduleForm();
    }, 400);
  };

  useEffect(() => {
    if (!isScheduleSubmitted) return;
    const timer = setTimeout(() => {
      closeScheduleModal();
    }, 5000);
    return () => clearTimeout(timer);
  }, [isScheduleSubmitted]);

  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="lg:sticky lg:top-0 pt-7 lg:pt-14 pb-30 lg:pb-48 relative bg-gradient-to-b from-[var(--royal-red)] via-[var(--royal-red-dark)] to-[var(--royal-red-dark)] overflow-hidden z-10">
        <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-1 lg:py-16 xl:py-24">
          <div className="grid lg:grid-cols-2 gap-0 lg:gap-12 items-center">
            {/* Van Image - First on Mobile */}
            <div className="relative animate-drive-in order-1 lg:order-2 translate-y-0 lg:translate-y-12 translate-x-0 lg:translate-x-12">
              <div className="relative z-30">
                <Image
                  src="/van.png"
                  alt="Royal Heating and Cooling Service Van"
                  width={700}
                  height={500}
                  className="w-full h-auto drop-shadow-2xl"
                  priority
                />
                {/* Ground shadow under the van */}
                <div className="absolute bottom-0 lg:bottom-41 left-1/2 -translate-x-1/2 w-full h-2 lg:h-3 bg-black/95 rounded-[50%] blur-md"></div>
              </div>
              {/* Decorative background glow */}
              <div className="absolute top-1/2 right-0 -translate-y-1/2 w-3/4 h-3/4 bg-black opacity-15 rounded-full blur-3xl -z-0"></div>
            </div>

            {/* Left Content - Second on Mobile */}
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl lg:rounded-3xl p-6 lg:p-8 xl:p-10 shadow-2xl border border-white/20 order-2 lg:order-1 translate-x-0 lg:-translate-x-4 w-full -mt-12 lg:mt-0">
              <span className="section-label text-xs lg:text-sm animate-fade-up-1 block text-center lg:text-left">Family Owned & Operated HVAC</span>
              <h1 className="text-4xl lg:text-4xl xl:text-5xl font-bold text-[var(--royal-dark)] leading-tight mt-3 lg:mt-4 mb-2 lg:mb-3 animate-fade-up-2 text-center lg:text-left">
                Your Comfort,<br />
                <span className="text-4xl lg:text-4xl xl:text-5xl text-[var(--royal-red)]">Our Crown.</span>
              </h1>
              <p className="text-[var(--royal-red)] font-medium text-xs lg:text-sm mb-4 lg:mb-6 animate-fade-up-3 text-center lg:text-left hidden lg:block">
                Fast, reliable heating & cooling — same-day service available.
              </p>
              <p className="text-gray-600 text-sm lg:text-base mb-6 lg:mb-6 leading-relaxed animate-fade-up-4 text-center lg:text-left">
                <span className="hidden lg:inline">Fast repairs. Honest pricing. Done right the first time.<br />We keep your home comfortable — guaranteed.</span>
                <span className="lg:hidden">Fast repairs. Honest pricing. Done right.<br />We keep your home comfortable guaranteed.</span>
              </p>

              {/* Trust Pills */}
              <div className="hidden lg:flex flex-wrap justify-start gap-2 mb-8 animate-fade-up-5">
                <span className="feature-pill text-xs py-1.5 px-3">
                  <span className="w-1.5 h-1.5 bg-[var(--royal-gold)] rounded-full"></span>
                  Same-Day Service
                </span>
                <span className="feature-pill text-xs py-1.5 px-3">
                  <span className="w-1.5 h-1.5 bg-[var(--royal-gold)] rounded-full"></span>
                  Locally Owned
                </span>
                <span className="feature-pill text-xs py-1.5 px-3">
                  <span className="w-1.5 h-1.5 bg-[var(--royal-gold)] rounded-full"></span>
                  Upfront Pricing
                </span>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row flex-wrap gap-3 lg:gap-4 items-stretch sm:items-center justify-center lg:justify-start animate-fade-up-6">
                <button 
                  onClick={openScheduleModal}
                  className="group relative overflow-hidden bg-[var(--royal-red)] text-white px-8 lg:px-10 py-3 lg:py-3.5 text-sm lg:text-base rounded-full font-semibold text-center justify-center inline-flex items-center gap-2 shadow-lg hover:shadow-2xl transition-all duration-300 ease-out hover:scale-110 hover:shadow-[var(--royal-red)]/50 active:scale-95 active:shadow-md"
                >
                  <span className="relative z-10">Schedule Service</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[var(--royal-red-dark)] to-[var(--royal-red)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700"></div>
                </button>
                <a 
                  href="tel:3306621123" 
                  className="group relative overflow-hidden border-2 border-[var(--royal-red)] text-[var(--royal-red)] bg-white px-6 lg:px-8 py-3 lg:py-3.5 text-sm lg:text-base rounded-full font-semibold inline-flex items-center gap-2 justify-center shadow-md hover:shadow-xl transition-all duration-300 ease-out hover:scale-110 hover:bg-[var(--royal-gold)] hover:text-white hover:border-[var(--royal-gold)] active:scale-95 active:shadow-sm"
                >
                  <svg className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                  </svg>
                  <span className="relative z-10">Call Now</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[var(--royal-gold)] to-[var(--royal-gold-light)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </a>
              </div>
              <p className="text-[9px] lg:text-[10px] text-gray-400 mt-3 lg:mt-4 text-center w-full animate-fade-up-7">Talk to a real technician — no call centers.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - Floats ABOVE hero with shadow casting up */}
      <section ref={servicesRef} className="relative z-30">
        <div className="bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] rounded-t-[0rem] rounded-b-[0rem] shadow-[0_-25px_1000px_20px_rgba(0,0,0,0.6),0_35px_1000px_20px_rgba(0,0,0,0.5)] py-16 lg:py-32 xl:py-40">
          <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-20 items-start lg:items-center">
              {/* Left Content - Centered */}
              <div className={`flex flex-col justify-center items-center lg:items-start transition-all duration-500 ease-out ${servicesVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-12 blur-sm'}`}>
                <span className="section-label text-xs lg:text-sm text-center lg:text-left">Our Services</span>
                <h2 className="text-4xl lg:text-4xl lg:text-5xl font-bold text-white mt-3 lg:mt-4 mb-4 lg:mb-6 leading-tight text-center lg:text-left">
                  We fix it right.<br />
                  <span className="text-[var(--royal-gold)]">The first time.</span>
                </h2>
                <p className="text-gray-400 text-base lg:text-lg mb-6 lg:mb-8 max-w-lg text-center lg:text-left">
                  Whether it&apos;s an emergency repair or a planned upgrade, we&apos;ll walk you through your options — no pressure, no surprises.
                </p>
                {/* Desktop Button */}
                <Link href="/about-us" className="hidden lg:inline-flex group relative overflow-hidden bg-[var(--royal-red)] text-white px-6 lg:px-8 py-2.5 lg:py-3 text-sm lg:text-base rounded-full font-semibold w-fit items-center gap-2 shadow-lg hover:shadow-2xl transition-all duration-300 ease-out hover:scale-110 hover:shadow-[var(--royal-red)]/50 active:scale-95 active:shadow-md">
                  <span className="relative z-10">See How We Can Help</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[var(--royal-red-dark)] to-[var(--royal-red)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700"></div>
                </Link>
              </div>

              {/* Right - Service Cards */}
              <div className="space-y-3 lg:space-y-4">
                {services.map((service, index) => (
                  <Link 
                    href={`/services/${service.slug}`} 
                    key={index} 
                    className={`service-card group cursor-pointer transition-all duration-300 ${servicesVisible ? 'opacity-100 blur-0' : 'opacity-0 blur-sm'}`}
                    style={{ 
                      transitionDelay: servicesVisible ? `${300 + index * 80}ms` : '0ms',
                    }}
                  >
                    <div className="service-card-icon w-8 h-8 lg:w-9 lg:h-9">
                      {service.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-white text-xs lg:text-sm">{service.title}</h3>
                      <p className="text-gray-400 text-[10px] lg:text-xs mt-0.5">{service.description}</p>
                    </div>
                    <span className="text-[var(--royal-gold)] text-[10px] lg:text-xs opacity-0 lg:group-hover:opacity-100 transition-opacity whitespace-nowrap hidden lg:inline">
                      Learn More →
                    </span>
                  </Link>
                ))}
              </div>
            </div>
            
            {/* Bottom Button - Mobile Only */}
            <div className="flex justify-center mt-12 lg:hidden">
              <Link href="/about-us" className="group relative overflow-hidden bg-[var(--royal-red)] text-white px-10 py-4 text-base rounded-full font-bold w-fit inline-flex items-center gap-2 shadow-xl hover:shadow-2xl transition-all duration-300 ease-out hover:scale-110 hover:shadow-[var(--royal-red)]/50 active:scale-95 active:shadow-md">
                <span className="relative z-10">See How We Can Help</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--royal-red-dark)] to-[var(--royal-red)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700"></div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* What to Expect Section */}
      <section ref={expectRef} className="pt-12 lg:pt-20 pb-12 lg:pb-20 bg-white relative z-40">
        <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className={`text-center max-w-2xl mx-auto mb-10 lg:mb-16 transition-all duration-700 ${expectVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="section-label text-xs lg:text-sm">How It Works</span>
            <h2 className="text-3xl lg:text-4xl lg:text-5xl font-bold text-[var(--royal-dark)] mt-3 lg:mt-4 mb-3 lg:mb-4 text-center leading-tight">
              What to Expect<br />When You <span className="text-[var(--royal-red)]">Call Royal</span>
            </h2>
            <p className="text-gray-600 text-sm lg:text-lg">
              We make the process simple so you can focus on what matters — your comfort.
            </p>
          </div>

          {/* Process Steps */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
            {/* Step 1 */}
            <div className={`bg-white rounded-xl lg:rounded-2xl p-4 lg:p-6 border border-gray-100 shadow-lg transition-all duration-300 lg:hover:-translate-y-2.5 lg:hover:shadow-2xl lg:hover:scale-[1.03] cursor-pointer [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] ${expectVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-[var(--royal-red)] text-white flex items-center justify-center text-lg lg:text-xl font-bold mb-3 lg:mb-4">
                1
              </div>
              <h3 className="text-base lg:text-lg font-bold text-[var(--royal-dark)] mb-2">Give Us a Call</h3>
              <p className="text-gray-600 text-xs lg:text-sm leading-relaxed">
                Speak directly with a real technician — not a call center. Tell us what&apos;s going on, and we&apos;ll schedule a time that works for you.
              </p>
            </div>

            {/* Step 2 */}
            <div className={`bg-white rounded-xl lg:rounded-2xl p-4 lg:p-6 border border-gray-100 shadow-lg transition-all duration-300 lg:hover:-translate-y-2.5 lg:hover:shadow-2xl lg:hover:scale-[1.03] cursor-pointer [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] ${expectVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-[var(--royal-red)] text-white flex items-center justify-center text-lg lg:text-xl font-bold mb-3 lg:mb-4">
                2
              </div>
              <h3 className="text-base lg:text-lg font-bold text-[var(--royal-dark)] mb-2">We Diagnose the Issue</h3>
              <p className="text-gray-600 text-xs lg:text-sm leading-relaxed">
                Our technician arrives on time, inspects your system, and explains exactly what&apos;s happening — in plain English.
              </p>
            </div>

            {/* Step 3 */}
            <div className={`bg-white rounded-xl lg:rounded-2xl p-4 lg:p-6 border border-gray-100 shadow-lg transition-all duration-300 lg:hover:-translate-y-2.5 lg:hover:shadow-2xl lg:hover:scale-[1.03] cursor-pointer [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] ${expectVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-[var(--royal-red)] text-white flex items-center justify-center text-lg lg:text-xl font-bold mb-3 lg:mb-4">
                3
              </div>
              <h3 className="text-base lg:text-lg font-bold text-[var(--royal-dark)] mb-2">You Get Upfront Pricing</h3>
              <p className="text-gray-600 text-xs lg:text-sm leading-relaxed">
                Before any work begins, you&apos;ll know the cost. No hidden fees, no surprises. You decide if you want to move forward.
              </p>
            </div>

            {/* Step 4 */}
            <div className={`bg-white rounded-xl lg:rounded-2xl p-4 lg:p-6 border border-gray-100 shadow-lg transition-all duration-300 lg:hover:-translate-y-2.5 lg:hover:shadow-2xl lg:hover:scale-[1.03] cursor-pointer [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] ${expectVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-[var(--royal-red)] text-white flex items-center justify-center text-lg lg:text-xl font-bold mb-3 lg:mb-4">
                4
              </div>
              <h3 className="text-base lg:text-lg font-bold text-[var(--royal-dark)] mb-2">We Get It Done Right</h3>
              <p className="text-gray-600 text-xs lg:text-sm leading-relaxed">
                We complete the work correctly the first time, clean up after ourselves, and make sure you&apos;re completely satisfied.
              </p>
            </div>
          </div>

          {/* Reassurance */}
          <p className={`text-center text-gray-500 mt-8 lg:mt-12 text-sm lg:text-lg font-medium transition-all duration-700 ${expectVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: expectVisible ? '500ms' : '0ms' }}>
            No pressure. No surprises. Just honest service.
          </p>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" ref={reviewsRef} className="py-12 lg:py-20 bg-[var(--royal-cream)] relative z-40">
        <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center max-w-2xl mx-auto mb-8 lg:mb-12 transition-all duration-700 ${reviewsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="section-label text-xs lg:text-sm">Customer Reviews</span>
            <h2 className="text-2xl lg:text-4xl lg:text-5xl font-bold text-[var(--royal-dark)] mt-3 lg:mt-4 leading-tight">
              What Our Customers <span className="text-[var(--royal-red)]">Say</span>
            </h2>
            <p className="text-gray-600 mt-3 lg:mt-4 text-sm lg:text-base">
              <span className="lg:hidden">Real experiences from real homeowners.</span>
              <span className="hidden lg:inline">Real experiences from real homeowners in our community.</span>
            </p>
          </div>

          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8 mb-8 lg:mb-10">
            {/* Review 1 - Anton V */}
            <div className={`bg-white rounded-xl lg:rounded-2xl p-5 lg:p-8 shadow-lg border border-gray-100 transition-all duration-300 lg:hover:-translate-y-2.5 lg:hover:shadow-2xl lg:hover:scale-[1.03] cursor-pointer [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] ${reviewsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
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
            <div className={`bg-white rounded-xl lg:rounded-2xl p-5 lg:p-8 shadow-lg border border-gray-100 transition-all duration-300 lg:hover:-translate-y-2.5 lg:hover:shadow-2xl lg:hover:scale-[1.03] cursor-pointer [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] ${reviewsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
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
            <div className={`bg-white rounded-xl lg:rounded-2xl p-5 lg:p-8 shadow-lg border border-gray-100 transition-all duration-300 lg:hover:-translate-y-2.5 lg:hover:shadow-2xl lg:hover:scale-[1.03] cursor-pointer [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] ${reviewsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
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
          <div className={`text-center transition-all duration-500 ${reviewsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: reviewsVisible ? '400ms' : '0ms' }}>
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

      {/* Brands Section */}
      <section ref={brandsRef} className="py-10 lg:py-16 bg-white border-y border-gray-100 relative z-40">
        <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-6 lg:mb-10 transition-all duration-700 ${brandsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="section-label text-xs lg:text-sm">Brands We Work With</span>
            <h2 className="text-xl lg:text-2xl font-bold text-[var(--royal-dark)] mt-2">
              <span className="lg:hidden">Industry-Leading Brands</span>
              <span className="hidden lg:inline">Trusted Industry-Leading Brands</span>
            </h2>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-4 lg:gap-8 lg:gap-16">
            {brands.map((brand, index) => (
              <div 
                key={index} 
                className={`text-base lg:text-xl lg:text-2xl font-bold text-gray-300 hover:text-[var(--royal-red)] transition-all duration-500 cursor-default ${brandsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                style={{ transitionDelay: brandsVisible ? `${index * 80}ms` : '0ms' }}
              >
                {brand}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Call-to-Action Section */}
      <section ref={ctaRef} className="py-12 lg:py-24 bg-gradient-to-b from-[var(--royal-red)] to-[var(--royal-red-dark)] relative z-40">
        <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
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
                className="group relative overflow-hidden inline-flex items-center justify-center gap-3 bg-white text-[var(--royal-red)] px-10 lg:px-10 py-4 lg:py-4 rounded-full font-bold text-base lg:text-lg shadow-lg hover:shadow-2xl transition-all duration-300 ease-out hover:scale-110 hover:bg-[var(--royal-gold)] hover:text-white active:scale-95 active:shadow-md w-full sm:w-auto"
              >
                <svg className="w-5 h-5 lg:w-6 lg:h-6 relative z-10 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
                <span className="relative z-10">Call (330) 662-1123</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--royal-gold)] to-[var(--royal-gold-light)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
              <button 
                onClick={openScheduleModal}
                className="group relative overflow-hidden inline-flex items-center justify-center gap-3 bg-transparent border-2 border-white text-white px-10 lg:px-10 py-4 lg:py-4 rounded-full font-bold text-base lg:text-lg shadow-md hover:shadow-xl transition-all duration-300 ease-out hover:scale-110 hover:bg-white hover:text-[var(--royal-red)] active:scale-95 active:shadow-sm w-full sm:w-auto"
              >
                <svg className="w-5 h-5 lg:w-6 lg:h-6 relative z-10 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="relative z-10">Schedule Service</span>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>

            <p className={`text-white/60 text-xs lg:text-sm mt-6 lg:mt-8 transition-all duration-700 ${ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: ctaVisible ? '300ms' : '0ms' }}>
              Available 24/7 for emergencies • Same-day service available
            </p>
          </div>
        </div>
      </section>

{/* Footer */}
      <footer className="bg-[#141414] pt-8 lg:pt-14 pb-6 relative z-40">
        <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
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
            <div className="grid grid-cols-4 gap-10 lg:gap-16 mb-8 lg:mb-10">
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
                  <li>
                    <button
                      onClick={openScheduleModal}
                      className="text-gray-500 text-xs hover:text-gray-300 transition-colors"
                    >
                      Schedule Service
                    </button>
                  </li>
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

      {/* Homepage Schedule Modal */}
      {isScheduleModalOpen && (
        <div className={`fixed inset-0 z-[1200] flex items-center justify-center p-4 sm:p-6 ${isScheduleModalClosing ? 'animate-modal-fade-out' : 'animate-modal-fade-in'}`}>
          <div
            className={`absolute inset-0 ${isScheduleModalClosing ? 'animate-backdrop-unblur' : 'animate-backdrop-blur'}`}
            onClick={closeScheduleModal}
          />
          <div className={`relative w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-3xl bg-white shadow-[0_30px_80px_-20px_rgba(0,0,0,0.45)] border border-white/40 ${isScheduleModalClosing ? 'animate-modal-slide-down' : 'animate-modal-slide-up'}`}>
            {!isScheduleSubmitted ? (
              <>
                <div className="bg-gradient-to-r from-[var(--royal-red)] to-[var(--royal-red-dark)] px-6 py-6 sm:px-8 sm:py-7">
                  <button
                    onClick={closeScheduleModal}
                    className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/20 text-white hover:bg-white/30 transition-all duration-200"
                    aria-label="Close schedule form"
                  >
                    ✕
                  </button>
                  <p className="text-[var(--royal-gold)] text-xs font-semibold uppercase tracking-[0.16em] mb-2">
                    Schedule Service
                  </p>
                  <h2 className="text-white text-2xl sm:text-3xl font-bold leading-tight">Book Your Service Request</h2>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setIsScheduleSubmitted(true);
                  }}
                  className="px-6 py-6 sm:px-8 sm:py-8 space-y-6"
                >
                  <div>
                    <label htmlFor="home-schedule-full-name" className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name <span className="text-[var(--royal-red)]">*</span>
                    </label>
                    <input
                      required
                      id="home-schedule-full-name"
                      type="text"
                      value={scheduleForm.fullName}
                      onChange={(e) => setScheduleForm((prev) => ({ ...prev, fullName: e.target.value }))}
                      placeholder="John Doe"
                      className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--royal-red)]/30 focus:border-[var(--royal-red)]"
                    />
                  </div>

                  <div>
                    <label htmlFor="home-schedule-phone" className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number <span className="text-[var(--royal-red)]">*</span>
                    </label>
                    <input
                      required
                      id="home-schedule-phone"
                      type="tel"
                      value={scheduleForm.phone}
                      onChange={(e) => setScheduleForm((prev) => ({ ...prev, phone: e.target.value }))}
                      placeholder="(330) 555-1234"
                      className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--royal-red)]/30 focus:border-[var(--royal-red)]"
                    />
                  </div>

                  <div>
                    <label htmlFor="home-schedule-email" className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address <span className="text-[var(--royal-red)]">*</span>
                    </label>
                    <input
                      required
                      id="home-schedule-email"
                      type="email"
                      value={scheduleForm.email}
                      onChange={(e) => setScheduleForm((prev) => ({ ...prev, email: e.target.value }))}
                      placeholder="john.doe@example.com"
                      className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--royal-red)]/30 focus:border-[var(--royal-red)]"
                    />
                  </div>

                  <div>
                    <label htmlFor="home-schedule-service" className="block text-sm font-semibold text-gray-700 mb-2">
                      Service Needed <span className="text-[var(--royal-red)]">*</span>
                    </label>
                    <select
                      required
                      id="home-schedule-service"
                      value={scheduleForm.service}
                      onChange={(e) => setScheduleForm((prev) => ({ ...prev, service: e.target.value }))}
                      className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[var(--royal-red)]/30 focus:border-[var(--royal-red)]"
                    >
                      <option value="" disabled>Select a service</option>
                      <option value="Air Conditioning">Air Conditioning</option>
                      <option value="Furnace">Furnace</option>
                      <option value="Heat Pump">Heat Pump</option>
                      <option value="Mini-Split Systems">Mini-Split Systems</option>
                      <option value="Water Heaters">Water Heaters</option>
                      <option value="Duct Cleaning">Duct Cleaning</option>
                      <option value="Indoor Air Quality">Indoor Air Quality</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center justify-center bg-[var(--royal-red)] text-white font-semibold px-6 py-3 rounded-full transition-all duration-300 hover:bg-[var(--royal-red-dark)] hover:scale-[1.02] active:scale-95"
                  >
                    Submit Request
                  </button>
                </form>
              </>
            ) : (
              <div className="px-8 py-14 text-center animate-[fadeInUp_0.35s_ease-out]">
                <div className="w-16 h-16 rounded-full bg-[var(--royal-red)]/10 text-[var(--royal-red)] mx-auto flex items-center justify-center mb-5">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-[var(--royal-dark)] mb-3">Thank You!</h3>
                <p className="text-gray-600 text-base sm:text-lg mb-2">
                  We will reach out as soon as possible to confirm your service request.
                </p>
                <p className="text-gray-500 text-sm">Closing in 5 seconds...</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Floating Text Us Button */}
      <div className="hidden fixed bottom-4 right-4 lg:bottom-6 lg:right-6 z-40 opacity-0 animate-[popFade_0.4s_ease-out_2s_forwards]">
        {/* Contact Form Popup */}
        <div className={`absolute bottom-14 lg:bottom-16 right-0 w-[calc(100vw-2rem)] max-w-80 bg-white rounded-xl lg:rounded-2xl shadow-2xl border border-gray-100 overflow-hidden transition-all duration-500 ease-out origin-bottom-right ${isContactOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-2 pointer-events-none'}`}>
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
          className={`text-us-btn group flex items-center gap-2 px-4 lg:px-5 py-2.5 lg:py-3 rounded-full font-semibold transition-all duration-300 ease-out text-sm lg:text-base ${isContactOpen ? 'bg-gray-800 text-white hover:scale-110' : 'text-white hover:scale-110 hover:-translate-y-1'}`}
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
