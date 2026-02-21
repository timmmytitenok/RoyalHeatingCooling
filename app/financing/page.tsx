'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '../components/Navbar';

export default function Financing() {
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
      <section className="lg:sticky lg:top-0 pt-40 pb-6 lg:pt-28 lg:pb-14 min-h-[auto] flex items-center bg-gradient-to-b from-[var(--royal-red)] via-[var(--royal-red-dark)] to-[var(--royal-red-dark)] z-10">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-4 lg:gap-16 items-center">
              {/* Content */}
              <div className="text-center lg:text-left">
                <span className={`inline-block text-xs font-bold text-[var(--royal-gold)] uppercase tracking-widest mb-3 lg:mb-4 transition-all duration-700 text-center lg:text-left w-full lg:w-auto ${heroVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-sm'}`}>
                  FLEXIBLE PAYMENT OPTIONS
                </span>
                <h1 className={`text-3xl lg:text-5xl font-bold text-white mb-3 lg:mb-4 leading-tight whitespace-pre-line transition-all duration-700 delay-100 text-center lg:text-left ${heroVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-sm'}`}>
                  Financing Options
                </h1>
                <p className={`text-white/80 text-sm lg:text-lg leading-relaxed mb-6 lg:mb-8 transition-all duration-700 delay-200 text-center lg:text-left ${heroVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-sm'}`}>
                  <span className="lg:hidden">Comfort shouldn&apos;t have to wait. We offer flexible financing plans so you can get the HVAC system you need today and pay over time.</span>
                  <span className="hidden lg:inline">Comfort shouldn&apos;t have to wait. We offer flexible financing plans so you can get the HVAC system you need today and pay over time with affordable monthly payments.</span>
                </p>
              </div>
              
              {/* Van Image */}
              <div className="relative animate-drive-in -translate-y-4 lg:translate-y-12 translate-x-0 lg:translate-x-12">
                <div className="relative z-30">
                  <Image
                    src="/van.png"
                    alt="Royal Heating and Cooling Service Van"
                    width={700}
                    height={500}
                    className="w-full h-auto drop-shadow-2xl"
                    priority
                  />
                  <div className="absolute bottom-26 lg:bottom-41 left-1/2 -translate-x-1/2 w-full h-2 lg:h-3 bg-black/95 rounded-[50%] blur-md"></div>
                </div>
                <div className="absolute top-1/3 lg:top-1/2 right-0 -translate-y-1/2 w-3/4 h-3/4 bg-black opacity-15 rounded-full blur-3xl -z-0"></div>
              </div>
            </div>
          </div>
      </section>

      {/* Content Section 2 - Blank White */}
      <section 
        ref={(el) => { sectionRefs.current[1] = el; }}
        className="pt-20 lg:pt-32 pb-12 lg:pb-32 relative z-20 bg-white -mt-1 -mb-1 shadow-[0_-25px_50px_-12px_rgba(0,0,0,0.4)]"
      >
        <div className="max-w-[1200px] mx-auto px-4 lg:px-6">
          <div className={`grid lg:grid-cols-2 gap-16 lg:gap-16 items-center transition-all duration-700 ${sectionsVisible[1] ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-sm'}`}>
            
            {/* LEFT: Content */}
            <div>
              <span className="inline-flex items-center rounded-full bg-gray-100 px-4 py-1.5 text-xs lg:text-sm font-medium text-gray-700 mb-4">
                Financing &bull; Fast Approval &bull; Flexible Plans
              </span>

              <h2 className="text-xl lg:text-3xl font-extrabold tracking-tight text-[var(--royal-dark)] mb-4 leading-tight lg:whitespace-nowrap">
                Financing Options for Your Needs
              </h2>

              <p className="text-gray-600 text-sm lg:text-lg leading-relaxed mb-4">
                We know investing in your home comfort system is a big decision. Whether you&apos;re replacing an older unit, upgrading efficiency, or handling an unexpected repair, upfront costs shouldn&apos;t stand in the way of reliable heating and cooling.
              </p>

              <p className="text-gray-600 text-sm lg:text-lg leading-relaxed mb-6">
                Our flexible financing options make comfort more accessible — so you can get the system you need now and pay over time with manageable monthly payments.
              </p>

              {/* CTA Row */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-xl bg-[var(--royal-red)] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:bg-[var(--royal-red-dark)] hover:shadow-lg hover:scale-105 active:scale-95"
                >
                  Contact Our Team
                </Link>
                <span className="text-sm text-gray-500">
                  Questions? We&apos;ll help you choose the best plan.
                </span>
              </div>
            </div>

            {/* RIGHT: Image + Overlay Card */}
            <div className="relative">
              <div className="overflow-hidden rounded-2xl lg:rounded-3xl border border-gray-200 bg-gray-50 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.1)] lg:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.15)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_22px_55px_-10px_rgba(0,0,0,0.2)] cursor-pointer relative h-72 sm:h-96">
                <Image
                  src="/financing-specialist.png"
                  alt="Talk to a financing specialist"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Overlay Card */}
              <div className="mt-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-all duration-300 lg:hover:-translate-y-1 lg:hover:shadow-lg cursor-pointer">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Apply in minutes</p>
                    <p className="text-xs lg:text-sm text-gray-600">Get an estimate → Apply → Choose your plan</p>
                  </div>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center rounded-xl bg-[var(--royal-dark)] px-4 py-2 text-sm font-semibold text-white transition-all duration-300 hover:bg-black hover:shadow-lg whitespace-nowrap"
                  >
                    Talk to a Specialist
                  </Link>
                </div>
              </div>
            </div>

          </div>

          {/* Full-Width Feature Cards */}
          <div className={`mt-16 lg:mt-24 transition-all duration-700 delay-200 ${sectionsVisible[1] ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-sm'}`}>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex items-start gap-3 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 lg:hover:-translate-y-1.5 lg:hover:shadow-xl lg:hover:scale-[1.02] cursor-pointer [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)]">
                <span className="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-xl bg-green-50 flex-shrink-0">
                  <svg viewBox="0 0 24 24" className="h-5 w-5 text-green-700" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M20 6L9 17l-5-5" /></svg>
                </span>
                <div>
                  <p className="font-semibold text-gray-900 text-sm lg:text-base">Fast, secure application</p>
                  <p className="mt-1 text-xs lg:text-sm text-gray-600">Quick decisions — often in minutes.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 lg:hover:-translate-y-1.5 lg:hover:shadow-xl lg:hover:scale-[1.02] cursor-pointer [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)]">
                <span className="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-xl bg-green-50 flex-shrink-0">
                  <svg viewBox="0 0 24 24" className="h-5 w-5 text-green-700" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M20 6L9 17l-5-5" /></svg>
                </span>
                <div>
                  <p className="font-semibold text-gray-900 text-sm lg:text-base">Flexible monthly payments</p>
                  <p className="mt-1 text-xs lg:text-sm text-gray-600">Plans that fit your budget and timeline.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 lg:hover:-translate-y-1.5 lg:hover:shadow-xl lg:hover:scale-[1.02] cursor-pointer [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)]">
                <span className="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-xl bg-green-50 flex-shrink-0">
                  <svg viewBox="0 0 24 24" className="h-5 w-5 text-green-700" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M20 6L9 17l-5-5" /></svg>
                </span>
                <div>
                  <p className="font-semibold text-gray-900 text-sm lg:text-base">No prepayment penalties</p>
                  <p className="mt-1 text-xs lg:text-sm text-gray-600">Pay it off early anytime.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 lg:hover:-translate-y-1.5 lg:hover:shadow-xl lg:hover:scale-[1.02] cursor-pointer [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)]">
                <span className="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-xl bg-green-50 flex-shrink-0">
                  <svg viewBox="0 0 24 24" className="h-5 w-5 text-green-700" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M20 6L9 17l-5-5" /></svg>
                </span>
                <div>
                  <p className="font-semibold text-gray-900 text-sm lg:text-base">Repairs, replacements & upgrades</p>
                  <p className="mt-1 text-xs lg:text-sm text-gray-600">Coverage for most HVAC needs.</p>
                </div>
              </div>
            </div>

            <div className="text-center mt-14 lg:mt-8 max-w-4xl mx-auto">
              <p className="text-sm text-gray-600 lg:whitespace-nowrap">
                <span className="lg:hidden">Have questions about eligibility or plan details? Our team will walk you through and help you choose what fits best.</span>
                <span className="hidden lg:inline">Have questions about eligibility or plan details? Our team will walk you through the options and help you choose what fits best.</span>
              </p>
              <p className="mt-3 text-xs text-gray-400 italic">
                *Financing is subject to credit approval. Minimum monthly payments may be required. Terms and conditions apply.
              </p>
            </div>
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
            <h2 className={`text-4xl lg:text-5xl font-bold text-white mb-4 lg:mb-6 transition-all duration-700 leading-tight ${ctaVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-sm'}`}>
              <span className="lg:hidden">Ready to Get<br /><span className="text-[var(--royal-gold)]">Financed?</span></span>
              <span className="hidden lg:inline">Ready to Get <span className="text-[var(--royal-gold)]">Financed?</span></span>
            </h2>
            <p className={`text-white/80 text-sm lg:text-lg mb-12 lg:mb-14 transition-all duration-700 delay-100 ${ctaVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-sm'}`}>
              Don&apos;t let upfront costs stand in the way of your comfort. Talk to a specialist today.
            </p>
            
            <div className={`flex justify-center transition-all duration-700 delay-200 ${ctaVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-sm'}`}>
              <a 
                href="tel:3306621123" 
                className="group relative overflow-hidden inline-flex items-center justify-center gap-3 bg-white text-[var(--royal-red)] px-10 py-4 rounded-full font-bold text-base lg:text-lg shadow-lg hover:shadow-2xl transition-all duration-300 ease-out hover:scale-110 hover:bg-[var(--royal-gold)] hover:text-white active:scale-95 active:shadow-md w-full sm:w-auto"
              >
                <svg className="w-5 h-5 lg:w-6 lg:h-6 relative z-10 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
                <span className="relative z-10">Talk to a Specialist</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--royal-gold)] to-[var(--royal-gold-light)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
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
