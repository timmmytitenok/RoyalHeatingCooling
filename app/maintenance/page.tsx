'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '../components/Navbar';

export default function MaintenancePlan() {
  const [heroVisible, setHeroVisible] = useState(false);
  const [sectionsVisible, setSectionsVisible] = useState<boolean[]>([]);
  const [ctaVisible, setCtaVisible] = useState(false);
  const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);
  const [isMemberModalClosing, setIsMemberModalClosing] = useState(false);
  const [isMemberSubmitted, setIsMemberSubmitted] = useState(false);
  const [memberForm, setMemberForm] = useState({
    fullName: '',
    phone: '',
    email: '',
  });

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

  useEffect(() => {
    if (!isMemberModalOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [isMemberModalOpen]);

  const resetMemberForm = () => {
    setMemberForm({
      fullName: '',
      phone: '',
      email: '',
    });
  };

  const openMemberModal = () => {
    resetMemberForm();
    setIsMemberSubmitted(false);
    setIsMemberModalClosing(false);
    setIsMemberModalOpen(true);
  };

  const closeMemberModal = () => {
    setIsMemberModalClosing(true);
    setTimeout(() => {
      setIsMemberModalOpen(false);
      setIsMemberModalClosing(false);
      setIsMemberSubmitted(false);
      resetMemberForm();
    }, 400);
  };

  useEffect(() => {
    if (!isMemberSubmitted) return;
    const timer = setTimeout(() => {
      closeMemberModal();
    }, 5000);
    return () => clearTimeout(timer);
  }, [isMemberSubmitted]);

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
                  PREVENTATIVE CARE
                </span>
                <h1 className={`text-3xl lg:text-5xl font-bold text-white mb-3 lg:mb-4 leading-tight whitespace-pre-line transition-all duration-700 delay-100 text-center lg:text-left ${heroVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-sm'}`}>
                  Maintenance Plan
                </h1>
                <p className={`text-white/80 text-sm lg:text-lg leading-relaxed mb-6 lg:mb-8 transition-all duration-700 delay-200 text-center lg:text-left ${heroVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-sm'}`}>
                  Protect your investment and avoid costly breakdowns with our comprehensive HVAC maintenance plans. Regular tune-ups keep your system running at peak efficiency year-round.
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

      {/* Opening Body Section */}
      <section 
        ref={(el) => { sectionRefs.current[1] = el; }}
        className="pt-20 lg:pt-32 pb-12 lg:pb-24 relative z-20 bg-white -mt-1 -mb-1 shadow-[0_-25px_50px_-12px_rgba(0,0,0,0.4)]"
      >
        <div className="max-w-[900px] mx-auto px-4 lg:px-6">
          <div className={`transition-all duration-700 ${sectionsVisible[1] ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-sm'}`}>
            <h2 className="text-2xl lg:text-3xl font-bold text-[var(--royal-dark)] mb-3 text-center">
              Why Maintenance Matters
            </h2>
            <div className="w-16 h-1 bg-[var(--royal-red)] mx-auto mb-8"></div>
            <p className="text-gray-600 text-sm lg:text-base leading-relaxed mb-5 text-center lg:text-left">
              Your HVAC system runs thousands of hours each year, silently keeping your family comfortable through every season. But like any high-performance machine, it needs regular care to stay reliable. Without it, small issues quietly compound — a dirty filter restricts airflow, a worn component strains the motor, refrigerant levels drop — until one day, your system fails when you need it most.
            </p>
            <p className="text-gray-600 text-sm lg:text-base leading-relaxed mb-5 text-center lg:text-left">
              The average emergency HVAC repair costs between $300 and $1,500 — and that doesn&apos;t account for the discomfort, disruption, and urgency pricing that comes with an unexpected breakdown in the dead of winter or peak of summer. Most of these failures are entirely preventable with routine professional maintenance.
            </p>
            <p className="text-gray-600 text-sm lg:text-base leading-relaxed mb-5 text-center lg:text-left">
              A well-maintained system doesn&apos;t just run — it runs efficiently. That means lower monthly energy bills, fewer surprise repairs, a longer equipment lifespan, and cleaner air circulating through your home. Neglecting maintenance, on the other hand, is the fastest way to void your manufacturer&apos;s warranty and shorten the life of a system that cost thousands to install.
            </p>
            <p className="text-gray-600 text-sm lg:text-base leading-relaxed text-center lg:text-left">
              That&apos;s why we created the Royal Comfort Plan — a simple, affordable membership that puts you in control of your home&apos;s comfort before problems ever arise.
            </p>
          </div>
        </div>
      </section>

      {/* Value Emphasis Section */}
      <section 
        ref={(el) => { sectionRefs.current[2] = el; }}
        className="py-12 lg:py-24 bg-gray-50 relative z-20 -mt-1 -mb-1"
      >
        <div className="max-w-[1200px] mx-auto px-4 lg:px-6">
          <div className={`text-center mb-8 lg:mb-16 transition-all duration-700 ${sectionsVisible[2] ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-sm'}`}>
            <span className="inline-block text-xs font-bold text-[var(--royal-red)] uppercase tracking-widest mb-3">Royal Comfort Plan</span>
            <h2 className="text-2xl lg:text-3xl font-bold text-[var(--royal-dark)] mb-3">
              Become a Royal Member
            </h2>
            <div className="w-16 h-1 bg-[var(--royal-red)] mx-auto mb-6"></div>
            <p className="text-gray-600 text-sm lg:text-base max-w-2xl mx-auto">
              Complete protection for your home&apos;s most essential system — for less than the cost of a streaming subscription.
            </p>
          </div>

          <div className={`grid md:grid-cols-3 gap-6 lg:gap-8 max-w-4xl mx-auto transition-all duration-700 delay-200 ${sectionsVisible[2] ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-sm'}`}>
            <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-lg border border-gray-100 text-center transition-all duration-300 lg:hover:-translate-y-1.5 lg:hover:shadow-xl lg:hover:scale-[1.02] cursor-pointer [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)]">
              <div className="text-4xl lg:text-5xl font-bold text-[var(--royal-red)] mb-2">$12</div>
              <div className="text-gray-500 text-sm font-medium mb-4">per month</div>
              <div className="w-10 h-px bg-gray-200 mx-auto mb-4"></div>
              <p className="text-gray-600 text-xs lg:text-sm">Less than $0.40/day for complete HVAC protection and priority service.</p>
            </div>

            <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-lg border border-gray-100 text-center ring-2 ring-[var(--royal-red)]/20 transition-all duration-300 lg:hover:-translate-y-1.5 lg:hover:shadow-xl lg:hover:scale-[1.02] cursor-pointer [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)]">
              <div className="text-4xl lg:text-5xl font-bold text-[var(--royal-red)] mb-2">$144</div>
              <div className="text-gray-500 text-sm font-medium mb-4">annual plan</div>
              <div className="w-10 h-px bg-gray-200 mx-auto mb-4"></div>
              <p className="text-gray-600 text-xs lg:text-sm">One year commitment. Full access to all 7 member benefits from day one.</p>
            </div>

            <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-lg border border-gray-100 text-center transition-all duration-300 lg:hover:-translate-y-1.5 lg:hover:shadow-xl lg:hover:scale-[1.02] cursor-pointer [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)]">
              <div className="text-4xl lg:text-5xl font-bold text-[var(--royal-red)] mb-2">$0</div>
              <div className="text-gray-500 text-sm font-medium mb-4">surprise bills</div>
              <div className="w-10 h-px bg-gray-200 mx-auto mb-4"></div>
              <p className="text-gray-600 text-xs lg:text-sm">Compare to $300–$1,500 for a single emergency repair without coverage.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section 
        ref={(el) => { sectionRefs.current[3] = el; }}
        className="py-12 lg:py-28 bg-white relative z-20 -mt-1 -mb-1"
      >
        <div className="max-w-[1000px] mx-auto px-4 lg:px-6">
          <div className={`text-center mb-8 lg:mb-16 transition-all duration-700 ${sectionsVisible[3] ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-sm'}`}>
            <h2 className="text-2xl lg:text-3xl font-bold text-[var(--royal-dark)] mb-3">
              Enjoy 7 Benefits
            </h2>
            <div className="w-16 h-1 bg-[var(--royal-red)] mx-auto"></div>
          </div>

          <div className={`space-y-5 transition-all duration-700 delay-200 ${sectionsVisible[3] ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-sm'}`}>
            {/* Benefit 1 */}
            <div className="bg-gray-50 rounded-2xl p-6 lg:p-8 border border-gray-100 shadow-lg transition-all duration-300 lg:hover:-translate-y-1.5 lg:hover:shadow-xl lg:hover:scale-[1.02] cursor-pointer [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] relative">
              <div className="absolute top-3 right-3 hidden w-6 h-6 bg-[var(--royal-red)] rounded-full items-center justify-center">
                <span className="text-white font-bold text-[10px]">1</span>
              </div>
              <div className="lg:flex lg:items-start lg:gap-5">
                <div className="hidden lg:flex w-12 h-12 bg-[var(--royal-red)] rounded-full items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white font-bold text-base">1</span>
                </div>
                <div>
                  <h3 className="text-base lg:text-xl font-bold text-[var(--royal-dark)] mb-2 pr-8 lg:pr-0">Annual System Tune-Ups</h3>
                  <p className="text-gray-600 text-sm lg:text-base leading-relaxed mb-1">2 per year (1 for boilers)</p>
                  <p className="text-gray-500 text-sm leading-relaxed">Inspect & test operation of accessories attached to your system</p>
                </div>
              </div>
            </div>

            {/* Benefit 2 */}
            <div className="bg-gray-50 rounded-2xl p-6 lg:p-8 border border-gray-100 shadow-lg transition-all duration-300 lg:hover:-translate-y-1.5 lg:hover:shadow-xl lg:hover:scale-[1.02] cursor-pointer [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] relative">
              <div className="absolute top-3 right-3 hidden w-6 h-6 bg-[var(--royal-red)] rounded-full items-center justify-center">
                <span className="text-white font-bold text-[10px]">2</span>
              </div>
              <div className="lg:flex lg:items-start lg:gap-5">
                <div className="hidden lg:flex w-12 h-12 bg-[var(--royal-red)] rounded-full items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white font-bold text-base">2</span>
                </div>
                <div>
                  <h3 className="text-base lg:text-xl font-bold text-[var(--royal-dark)] mb-2 pr-8 lg:pr-0">Front-Of-The Line Priority Service</h3>
                  <p className="text-gray-500 text-sm lg:text-base leading-relaxed">Members&apos; needs are addressed within 24 business hours</p>
                </div>
              </div>
            </div>

            {/* Benefit 3 */}
            <div className="bg-gray-50 rounded-2xl p-6 lg:p-8 border border-gray-100 shadow-lg transition-all duration-300 lg:hover:-translate-y-1.5 lg:hover:shadow-xl lg:hover:scale-[1.02] cursor-pointer [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] relative">
              <div className="absolute top-3 right-3 hidden w-6 h-6 bg-[var(--royal-red)] rounded-full items-center justify-center">
                <span className="text-white font-bold text-[10px]">3</span>
              </div>
              <div className="lg:flex lg:items-start lg:gap-5">
                <div className="hidden lg:flex w-12 h-12 bg-[var(--royal-red)] rounded-full items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white font-bold text-base">3</span>
                </div>
                <div>
                  <h3 className="text-base lg:text-xl font-bold text-[var(--royal-dark)] mb-3 pr-8 lg:pr-0">Exclusive Discounts</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-[var(--royal-red)] rounded-full flex-shrink-0"></div>
                      <p className="text-gray-600 text-sm lg:text-base">15% off service work</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-[var(--royal-red)] rounded-full flex-shrink-0"></div>
                      <p className="text-gray-600 text-sm lg:text-base">50% off diagnostic fee (free with repair)</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-[var(--royal-red)] rounded-full flex-shrink-0"></div>
                      <p className="text-gray-600 text-sm lg:text-base">50% off filters</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-[var(--royal-red)] rounded-full flex-shrink-0"></div>
                      <p className="text-gray-600 text-sm lg:text-base">No overtime rates</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-[var(--royal-red)] rounded-full flex-shrink-0"></div>
                      <p className="text-gray-600 text-sm lg:text-base">Annually test & replace (as needed) thermostat batteries</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Benefit 4 */}
            <div className="bg-gray-50 rounded-2xl p-6 lg:p-8 border border-gray-100 shadow-lg transition-all duration-300 lg:hover:-translate-y-1.5 lg:hover:shadow-xl lg:hover:scale-[1.02] cursor-pointer [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] relative">
              <div className="absolute top-3 right-3 hidden w-6 h-6 bg-[var(--royal-red)] rounded-full items-center justify-center">
                <span className="text-white font-bold text-[10px]">4</span>
              </div>
              <div className="lg:flex lg:items-start lg:gap-5">
                <div className="hidden lg:flex w-12 h-12 bg-[var(--royal-red)] rounded-full items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white font-bold text-base">4</span>
                </div>
                <div>
                  <h3 className="text-base lg:text-xl font-bold text-[var(--royal-dark)] mb-2 pr-8 lg:pr-0">Reduce Unexpected Breakdowns</h3>
                  <p className="text-gray-600 text-sm lg:text-base leading-relaxed mb-1">Service report with each tune-up</p>
                  <p className="text-gray-500 text-sm leading-relaxed">Personalized solutions on how to avoid emergency repairs and problems</p>
                </div>
              </div>
            </div>

            {/* Benefit 5 */}
            <div className="bg-gray-50 rounded-2xl p-6 lg:p-8 border border-gray-100 shadow-lg transition-all duration-300 lg:hover:-translate-y-1.5 lg:hover:shadow-xl lg:hover:scale-[1.02] cursor-pointer [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] relative">
              <div className="absolute top-3 right-3 hidden w-6 h-6 bg-[var(--royal-red)] rounded-full items-center justify-center">
                <span className="text-white font-bold text-[10px]">5</span>
              </div>
              <div className="lg:flex lg:items-start lg:gap-5">
                <div className="hidden lg:flex w-12 h-12 bg-[var(--royal-red)] rounded-full items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white font-bold text-base">5</span>
                </div>
                <div>
                  <h3 className="text-base lg:text-xl font-bold text-[var(--royal-dark)] mb-2 pr-8 lg:pr-0">Maximize System Life</h3>
                  <p className="text-gray-600 text-sm lg:text-base leading-relaxed mb-1">Proper operation and maintenance allows for system efficiency to perform well and last longer</p>
                  <p className="text-gray-500 text-sm leading-relaxed">Extended repair buyback up to $1000 within 3 months</p>
                </div>
              </div>
            </div>

            {/* Benefit 6 */}
            <div className="bg-gray-50 rounded-2xl p-6 lg:p-8 border border-gray-100 shadow-lg transition-all duration-300 lg:hover:-translate-y-1.5 lg:hover:shadow-xl lg:hover:scale-[1.02] cursor-pointer [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] relative">
              <div className="absolute top-3 right-3 hidden w-6 h-6 bg-[var(--royal-red)] rounded-full items-center justify-center">
                <span className="text-white font-bold text-[10px]">6</span>
              </div>
              <div className="lg:flex lg:items-start lg:gap-5">
                <div className="hidden lg:flex w-12 h-12 bg-[var(--royal-red)] rounded-full items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white font-bold text-base">6</span>
                </div>
                <div>
                  <h3 className="text-base lg:text-xl font-bold text-[var(--royal-dark)] mb-2 pr-8 lg:pr-0">Maintain Manufacturer&apos;s Warranty</h3>
                  <p className="text-gray-600 text-sm lg:text-base leading-relaxed mb-1">Lack of maintenance voids manufacturer warranties</p>
                  <p className="text-gray-500 text-sm leading-relaxed">Double parts warranty to 2 years on all repairs</p>
                </div>
              </div>
            </div>

            {/* Benefit 7 */}
            <div className="bg-gray-50 rounded-2xl p-6 lg:p-8 border border-gray-100 shadow-lg transition-all duration-300 lg:hover:-translate-y-1.5 lg:hover:shadow-xl lg:hover:scale-[1.02] cursor-pointer [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] relative">
              <div className="absolute top-3 right-3 hidden w-6 h-6 bg-[var(--royal-red)] rounded-full items-center justify-center">
                <span className="text-white font-bold text-[10px]">7</span>
              </div>
              <div className="lg:flex lg:items-start lg:gap-5">
                <div className="hidden lg:flex w-12 h-12 bg-[var(--royal-red)] rounded-full items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white font-bold text-base">7</span>
                </div>
                <div>
                  <h3 className="text-base lg:text-xl font-bold text-[var(--royal-dark)] mb-2 pr-8 lg:pr-0">Peace Of Mind</h3>
                  <p className="text-gray-600 text-sm lg:text-base leading-relaxed mb-1">Rest assured your system will operate when you need it most</p>
                  <p className="text-gray-500 text-sm leading-relaxed">100% satisfaction guarantee: We&apos;ll make it right!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Closing Reinforcement Section */}
      <section 
        ref={(el) => { sectionRefs.current[4] = el; }}
        className="hidden lg:block py-12 lg:py-24 pb-20 lg:pb-40 bg-gray-50 relative z-20 -mt-1 -mb-1"
      >
        <div className="max-w-[900px] mx-auto px-4 lg:px-6">
          <div className={`transition-all duration-700 ${sectionsVisible[4] ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-sm'}`}>
            <div className="bg-gradient-to-r from-[var(--royal-red)]/5 to-transparent border-l-4 border-[var(--royal-red)] rounded-r-xl p-6 lg:p-8">
              <h3 className="text-xl lg:text-2xl font-bold text-[var(--royal-dark)] mb-4">
                The Smarter Way to Own an HVAC System
              </h3>
              <p className="text-gray-600 text-sm lg:text-base leading-relaxed mb-4">
                Royal Members don&apos;t wait for something to go wrong. They stay ahead of breakdowns, enjoy priority scheduling when service is needed, and save consistently on every repair, filter, and diagnostic. It&apos;s not just a maintenance plan — it&apos;s a commitment to the long-term health and performance of your home&apos;s most critical system.
              </p>
              <p className="text-gray-600 text-sm lg:text-base leading-relaxed">
                Protection. Priority. Peace of mind. That&apos;s the Royal standard.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section 
        ref={(el) => { sectionRefs.current[5] = el; }}
        className="py-12 lg:py-28 pb-20 lg:pb-40 bg-[var(--royal-cream)] relative z-20 -mt-1 -mb-1"
      >
        <div className="max-w-[1200px] mx-auto px-4 lg:px-6">
          <div className={`text-center max-w-2xl mx-auto mb-8 lg:mb-12 transition-all duration-700 ${sectionsVisible[5] ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-sm'}`}>
            <span className="inline-block text-xs font-bold text-[var(--royal-red)] uppercase tracking-widest mb-3">Customer Reviews</span>
            <h2 className="text-2xl lg:text-3xl font-bold text-[var(--royal-dark)] leading-tight">
              What Our Customers <span className="text-[var(--royal-red)]">Say</span>
            </h2>
            <p className="text-gray-600 mt-3 lg:mt-4 text-sm lg:text-base">
              <span className="lg:hidden">Real experiences from real homeowners.</span>
              <span className="hidden lg:inline">Real experiences from real homeowners in our community.</span>
            </p>
          </div>

          <div className={`grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8 mb-8 lg:mb-10 transition-all duration-700 delay-200 ${sectionsVisible[5] ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-sm'}`}>
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
          <div className={`text-center transition-all duration-700 delay-300 ${sectionsVisible[5] ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-sm'}`}>
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
          <div className="text-center max-w-5xl mx-auto">
            <h2 className={`text-2xl lg:text-5xl font-bold text-white mb-4 lg:mb-6 transition-all duration-700 leading-tight lg:whitespace-nowrap ${ctaVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-sm'}`}>
              <span className="lg:hidden">Become a <span className="text-[var(--royal-gold)]">Royal Member</span></span>
              <span className="hidden lg:inline">Ready to Become a <span className="text-[var(--royal-gold)]">Royal Member?</span></span>
            </h2>
            <p className={`text-white/80 text-sm lg:text-lg mb-12 lg:mb-14 transition-all duration-700 delay-100 ${ctaVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-sm'}`}>
              Join today and enjoy priority service, exclusive savings, and total peace of mind — all for just $12/month.
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
              <button
                onClick={openMemberModal}
                className="group relative overflow-hidden inline-flex items-center justify-center gap-3 bg-transparent border-2 border-white text-white px-10 py-4 rounded-full font-bold text-base lg:text-lg shadow-md hover:shadow-xl transition-all duration-300 ease-out hover:scale-110 hover:bg-white hover:text-[var(--royal-red)] active:scale-95 active:shadow-sm w-full sm:w-auto"
              >
                <svg className="w-5 h-5 lg:w-6 lg:h-6 relative z-10 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span className="relative z-10">Become Member</span>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>

            <p className={`text-white/60 text-xs lg:text-sm mt-6 lg:mt-8 transition-all duration-700 delay-300 ${ctaVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-sm'}`}>
              Same-day service available
            </p>
          </div>
        </div>
      </section>

      {/* Royal Member Request Modal */}
      {isMemberModalOpen && (
        <div className={`fixed inset-0 z-[1200] flex items-center justify-center p-4 sm:p-6 ${isMemberModalClosing ? 'animate-modal-fade-out' : 'animate-modal-fade-in'}`}>
          <div
            className={`absolute inset-0 ${isMemberModalClosing ? 'animate-backdrop-unblur' : 'animate-backdrop-blur'}`}
            onClick={closeMemberModal}
          />
          <div className={`relative w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-3xl bg-white shadow-[0_30px_80px_-20px_rgba(0,0,0,0.45)] border border-white/40 ${isMemberModalClosing ? 'animate-modal-slide-down' : 'animate-modal-slide-up'}`}>
            {!isMemberSubmitted ? (
              <>
                <div className="bg-gradient-to-r from-[var(--royal-red)] to-[var(--royal-red-dark)] px-6 py-6 sm:px-8 sm:py-7">
                  <button
                    onClick={closeMemberModal}
                    className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/20 text-white hover:bg-white/30 transition-all duration-200"
                    aria-label="Close member form"
                  >
                    ✕
                  </button>
                  <p className="text-[var(--royal-gold)] text-xs font-semibold uppercase tracking-[0.16em] mb-2">
                    Royal Comfort Plan
                  </p>
                  <h2 className="text-white text-2xl sm:text-3xl font-bold leading-tight">Become a Royal Member</h2>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setIsMemberSubmitted(true);
                  }}
                  className="px-6 py-6 sm:px-8 sm:py-8 space-y-6"
                >
                  <div>
                    <label htmlFor="member-full-name" className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name <span className="text-[var(--royal-red)]">*</span>
                    </label>
                    <input
                      required
                      id="member-full-name"
                      type="text"
                      value={memberForm.fullName}
                      onChange={(e) => setMemberForm((prev) => ({ ...prev, fullName: e.target.value }))}
                      placeholder="John Doe"
                      className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--royal-red)]/30 focus:border-[var(--royal-red)]"
                    />
                  </div>

                  <div>
                    <label htmlFor="member-phone" className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number <span className="text-[var(--royal-red)]">*</span>
                    </label>
                    <input
                      required
                      id="member-phone"
                      type="tel"
                      value={memberForm.phone}
                      onChange={(e) => setMemberForm((prev) => ({ ...prev, phone: e.target.value }))}
                      placeholder="(330) 555-1234"
                      className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--royal-red)]/30 focus:border-[var(--royal-red)]"
                    />
                  </div>

                  <div>
                    <label htmlFor="member-email" className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address <span className="text-[var(--royal-red)]">*</span>
                    </label>
                    <input
                      required
                      id="member-email"
                      type="email"
                      value={memberForm.email}
                      onChange={(e) => setMemberForm((prev) => ({ ...prev, email: e.target.value }))}
                      placeholder="john.doe@example.com"
                      className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--royal-red)]/30 focus:border-[var(--royal-red)]"
                    />
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
                  We will reach out as soon as possible to help you become a Royal Member!
                </p>
                <p className="text-gray-500 text-sm">Closing in 5 seconds...</p>
              </div>
            )}
          </div>
        </div>
      )}

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
