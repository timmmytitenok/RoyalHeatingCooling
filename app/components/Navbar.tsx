'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import ContactModal from './ContactModal';


const services = [
  { name: 'Furnaces', href: '/services/furnaces' },
  { name: 'Air Conditioning', href: '/services/air-conditioning' },
  { name: 'Heat Pump', href: '/services/heat-pump' },
  { name: 'Mini-Split Systems', href: '/services/mini-split' },
  { name: 'Hot Water Heaters & Tankless', href: '/services/water-heaters' },
  { name: 'Duct Cleaning', href: '/services/duct-cleaning' },
  { name: 'Indoor Air Quality', href: '/services/indoor-air-quality' },
];

const additionalServices = [
  { name: 'New Construction', subtext: 'Residential & Commercial', href: '/services/new-construction' },
  { name: 'Renovation', subtext: 'Residential & Commercial', href: '/services/renovation' },
];

const offers = [
  { name: 'Maintenance Plan', href: '/maintenance' },
  { name: 'Financing Options', href: '/financing' },
];

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isOffersOpen, setIsOffersOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const [isMobileOffersOpen, setIsMobileOffersOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [mobileSubmenu, setMobileSubmenu] = useState<'main' | 'services' | 'offers'>('main');
  const pathname = usePathname();
  const router = useRouter();

  const handleReviewsClick = () => {
    if (pathname === '/') {
      // Already on home page, just scroll
      const reviewsSection = document.getElementById('reviews');
      if (reviewsSection) {
        reviewsSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // On another page, navigate to home first
      router.push('/');
      setTimeout(() => {
        const reviewsSection = document.getElementById('reviews');
        if (reviewsSection) {
          reviewsSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 500);
    }
  };

  // Handle swipe gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      // Swiped left (no action)
    }
    if (touchEnd - touchStart > 75) {
      // Swiped right - close menu
      setIsMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      const isMobile = window.innerWidth < 1024;
      const threshold = isMobile ? 50 : 300;
      
      if (currentScrollY < threshold) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > threshold) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setMobileSubmenu('main');
  }, [pathname]);

  // Prevent body scroll when mobile menu is open and reset submenu on close
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setMobileSubmenu('main'); // Reset to main menu when closed
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
      <nav className={`navbar ${isVisible ? 'navbar-visible' : 'navbar-hidden'} bg-white shadow-sm`}>
        <div className="container">
          <div className="flex items-center justify-between h-20 lg:h-24">
            {/* Logo */}
            <Link 
              href="/" 
              className="flex items-center flex-shrink-0 overflow-visible group z-50"
            >
              <Image
                src="/logo.png"
                alt="Royal Heating and Cooling"
                width={420}
                height={120}
                className="h-32 lg:h-36 w-auto transition-all duration-300 ease-out group-hover:scale-105 group-hover:brightness-110 group-hover:drop-shadow-lg"
                priority
              />
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-10">
              {/* Services Dropdown */}
              <div 
                className="dropdown"
                onMouseEnter={() => setIsServicesOpen(true)}
                onMouseLeave={() => setIsServicesOpen(false)}
              >
                <button 
                  className={`nav-link flex items-center gap-1.5 font-semibold text-base transition-all duration-300 ease-out hover:tracking-wide
                    ${isActive('/services') 
                      ? 'text-[var(--royal-red)] active' 
                      : 'text-gray-700 hover:text-[var(--royal-red)]'
                    }`}
                >
                  Services
                  <svg 
                    className={`w-4 h-4 transition-transform duration-300 ease-out ${isServicesOpen ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="dropdown-menu !min-w-[520px] !p-4">
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <div className="text-xs font-bold text-[var(--royal-gold)] uppercase tracking-wider px-2 pb-2 mb-1 border-b border-gray-100">
                        Our Services
                      </div>
                      {services.map((service, index) => (
                        <Link 
                          key={service.name} 
                          href={service.href} 
                          className={`dropdown-item ${pathname === service.href ? 'bg-[var(--royal-red)]/8 text-[var(--royal-red)] font-semibold !border-l-2 !border-l-[var(--royal-red)] !pl-3' : ''}`}
                          style={{ animationDelay: `${index * 30}ms` }}
                        >
                          {service.name}
                        </Link>
                      ))}
                    </div>
                    <div className="flex-1">
                      <div className="text-xs font-bold text-[var(--royal-gold)] uppercase tracking-wider px-2 pb-2 mb-1 border-b border-gray-100">
                        Additional Services
                      </div>
                      {additionalServices.map((service, index) => (
                        <Link 
                          key={service.name} 
                          href={service.href} 
                          className={`dropdown-item !py-2 ${pathname === service.href ? 'bg-[var(--royal-red)]/8 !border-l-2 !border-l-[var(--royal-red)] !pl-3' : ''}`}
                          style={{ animationDelay: `${(services.length + index) * 30}ms` }}
                        >
                          <span className={`block font-semibold ${pathname === service.href ? 'text-[var(--royal-red)]' : ''}`}>{service.name}</span>
                          <span className="block text-xs text-gray-400">{service.subtext}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Offers Dropdown */}
              <div 
                className="dropdown"
                onMouseEnter={() => setIsOffersOpen(true)}
                onMouseLeave={() => setIsOffersOpen(false)}
              >
                <button 
                  className={`nav-link flex items-center gap-1.5 font-semibold text-base transition-all duration-300 ease-out hover:tracking-wide
                    ${isActive('/offers') || isActive('/maintenance') || isActive('/financing')
                      ? 'text-[var(--royal-red)] active' 
                      : 'text-gray-700 hover:text-[var(--royal-red)]'
                    }`}
                >
                  Offers
                  <svg 
                    className={`w-4 h-4 transition-transform duration-300 ease-out ${isOffersOpen ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="dropdown-menu !min-w-[200px] !p-3">
                  <div className="text-xs font-bold text-[var(--royal-gold)] uppercase tracking-wider px-2 pb-2 mb-1 border-b border-gray-100">
                    Special Offers
                  </div>
                  {offers.map((offer, index) => (
                    <Link 
                      key={offer.name} 
                      href={offer.href} 
                      className={`dropdown-item ${pathname === offer.href ? 'bg-[var(--royal-red)]/8 text-[var(--royal-red)] font-semibold !border-l-2 !border-l-[var(--royal-red)] !pl-3' : ''}`}
                      style={{ animationDelay: `${index * 30}ms` }}
                    >
                      {offer.name}
                    </Link>
                  ))}
                </div>
              </div>

              <button 
                onClick={handleReviewsClick}
                className={`nav-link font-semibold text-base transition-all duration-300 ease-out hover:tracking-wide text-gray-700 hover:text-[var(--royal-red)]`}
              >
                Reviews
              </button>

              <Link 
                href="/about" 
                className={`nav-link font-semibold text-base transition-all duration-300 ease-out hover:tracking-wide
                  ${isActive('/about') 
                    ? 'text-[var(--royal-red)] active' 
                    : 'text-gray-700 hover:text-[var(--royal-red)]'
                  }`}
              >
                About
              </Link>
            </div>

            {/* Desktop CTA Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              <button
                onClick={() => setIsContactModalOpen(true)}
                className="px-4 py-2 text-sm border-2 border-[var(--royal-red)] text-[var(--royal-red)] rounded-full font-medium 
                  transition-all duration-300 ease-out hover:bg-[var(--royal-red)] hover:text-white hover:scale-105 hover:shadow-md"
              >
                Contact Us
              </button>
              
              <a 
                href="tel:3306621123" 
                className="group flex items-center gap-2 px-6 py-3 bg-[var(--royal-red)] text-white rounded-full font-bold text-lg
                  transition-all duration-300 ease-out hover:bg-[var(--royal-red-dark)] hover:scale-110 hover:shadow-xl hover:shadow-[var(--royal-red)]/40"
              >
                <svg 
                  className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
                <span className="transition-all duration-300 group-hover:tracking-wide">(330) 662-1123</span>
              </a>
            </div>

            {/* Mobile: Hamburger Only */}
            <div className="flex lg:hidden items-center gap-3 z-50">
              {/* Hamburger Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="flex flex-col items-center justify-center w-12 h-12 gap-1.5 transition-all duration-300"
                aria-label="Toggle menu"
              >
                <span className={`block w-7 h-0.5 bg-[var(--royal-dark)] rounded-full transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                <span className={`block w-7 h-0.5 bg-[var(--royal-dark)] rounded-full transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                <span className={`block w-7 h-0.5 bg-[var(--royal-dark)] rounded-full transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-black/40 backdrop-blur-[2px] z-40 lg:hidden transition-all duration-400 ease-in-out ${
          isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile Menu */}
      <div 
        className={`fixed top-0 right-0 bottom-0 w-full max-w-sm bg-white z-50 lg:hidden transform transition-transform duration-400 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-100">
            <span className="text-gray-400 font-bold text-sm uppercase tracking-widest">Menu</span>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 transition-all duration-200 active:scale-90"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Menu Items */}
          <div className="flex-1 overflow-y-auto px-4 py-4">
            {/* Main Menu */}
            <div className={`space-y-1 transition-all duration-300 ${mobileSubmenu === 'main' ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0 absolute'}`}>
              {/* Home */}
              <Link
                href="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`group flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-200 ${
                  pathname === '/' 
                    ? 'bg-[var(--royal-red)]/5 border border-[var(--royal-red)]/15' 
                    : 'hover:bg-gray-50 active:bg-gray-100'
                } ${isMobileMenuOpen && mobileSubmenu === 'main' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
                style={{ transitionDelay: isMobileMenuOpen && mobileSubmenu === 'main' ? '80ms' : '0ms' }}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 flex items-center justify-center rounded-lg ${pathname === '/' ? 'bg-[var(--royal-red)] text-white' : 'bg-gray-100 text-gray-500'}`}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  </div>
                  <span className={`font-medium text-[15px] ${pathname === '/' ? 'text-[var(--royal-red)]' : 'text-[var(--royal-dark)]'}`}>Home</span>
                </div>
                {pathname === '/' && <div className="w-1.5 h-1.5 rounded-full bg-[var(--royal-red)]"></div>}
              </Link>

              {/* Services */}
              <button
                onClick={() => setMobileSubmenu('services')}
                className={`group flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-200 w-full ${
                  pathname.startsWith('/services')
                    ? 'bg-[var(--royal-red)]/5 border border-[var(--royal-red)]/15'
                    : 'hover:bg-gray-50 active:bg-gray-100'
                } ${isMobileMenuOpen && mobileSubmenu === 'main' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
                style={{ transitionDelay: isMobileMenuOpen && mobileSubmenu === 'main' ? '140ms' : '0ms' }}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 flex items-center justify-center rounded-lg ${pathname.startsWith('/services') ? 'bg-[var(--royal-red)] text-white' : 'bg-gray-100 text-gray-500'}`}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <span className={`font-medium text-[15px] ${pathname.startsWith('/services') ? 'text-[var(--royal-red)]' : 'text-[var(--royal-dark)]'}`}>Services</span>
                </div>
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Offers */}
              <button
                onClick={() => setMobileSubmenu('offers')}
                className={`group flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-200 w-full ${
                  pathname.startsWith('/financing') || pathname.startsWith('/maintenance')
                    ? 'bg-[var(--royal-red)]/5 border border-[var(--royal-red)]/15'
                    : 'hover:bg-gray-50 active:bg-gray-100'
                } ${isMobileMenuOpen && mobileSubmenu === 'main' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
                style={{ transitionDelay: isMobileMenuOpen && mobileSubmenu === 'main' ? '200ms' : '0ms' }}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 flex items-center justify-center rounded-lg ${pathname.startsWith('/financing') || pathname.startsWith('/maintenance') ? 'bg-[var(--royal-red)] text-white' : 'bg-gray-100 text-gray-500'}`}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                  </div>
                  <span className={`font-medium text-[15px] ${pathname.startsWith('/financing') || pathname.startsWith('/maintenance') ? 'text-[var(--royal-red)]' : 'text-[var(--royal-dark)]'}`}>Offers</span>
                </div>
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* About */}
              <Link
                href="/about"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`group flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-200 ${
                  pathname === '/about' 
                    ? 'bg-[var(--royal-red)]/5 border border-[var(--royal-red)]/15' 
                    : 'hover:bg-gray-50 active:bg-gray-100'
                } ${isMobileMenuOpen && mobileSubmenu === 'main' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
                style={{ transitionDelay: isMobileMenuOpen && mobileSubmenu === 'main' ? '260ms' : '0ms' }}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 flex items-center justify-center rounded-lg ${pathname === '/about' ? 'bg-[var(--royal-red)] text-white' : 'bg-gray-100 text-gray-500'}`}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className={`font-medium text-[15px] ${pathname === '/about' ? 'text-[var(--royal-red)]' : 'text-[var(--royal-dark)]'}`}>About</span>
                </div>
                {pathname === '/about' && <div className="w-1.5 h-1.5 rounded-full bg-[var(--royal-red)]"></div>}
              </Link>
            </div>

            {/* Services Submenu */}
            <div className={`transition-all duration-300 ${mobileSubmenu === 'services' ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 absolute'}`}>
              <button
                onClick={() => setMobileSubmenu('main')}
                className={`flex items-center gap-2 px-2 py-3 text-gray-400 text-sm font-medium transition-all duration-200 active:text-[var(--royal-red)] ${mobileSubmenu === 'services' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
                style={{ transitionDelay: mobileSubmenu === 'services' ? '50ms' : '0ms' }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                Back
              </button>

              <p className={`text-xs font-bold text-gray-400 uppercase tracking-widest px-4 mt-2 mb-3 transition-all duration-300 ${mobileSubmenu === 'services' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`} style={{ transitionDelay: mobileSubmenu === 'services' ? '80ms' : '0ms' }}>Our Services</p>

              <div className="space-y-2">
                {services.map((service, index) => (
                  <Link
                    key={service.href}
                    href={service.href}
                    onClick={() => { setMobileSubmenu('main'); setIsMobileMenuOpen(false); }}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-200 ${
                      pathname === service.href
                        ? 'bg-[var(--royal-red)]/5 border-[var(--royal-red)]/15'
                        : 'border-gray-200 hover:bg-gray-50 active:bg-gray-100'
                    } ${mobileSubmenu === 'services' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
                    style={{ transitionDelay: mobileSubmenu === 'services' ? `${100 + index * 40}ms` : '0ms' }}
                  >
                    {pathname === service.href && <div className="w-1.5 h-1.5 rounded-full bg-[var(--royal-red)] flex-shrink-0"></div>}
                    <span className={`text-[15px] ${pathname === service.href ? 'font-semibold text-[var(--royal-red)]' : 'font-medium text-[var(--royal-dark)]'}`}>{service.name}</span>
                  </Link>
                ))}
              </div>

              <p className={`text-xs font-bold text-gray-400 uppercase tracking-widest px-4 mt-6 mb-3 transition-all duration-300 ${mobileSubmenu === 'services' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`} style={{ transitionDelay: mobileSubmenu === 'services' ? `${100 + services.length * 40}ms` : '0ms' }}>Additional</p>

              <div className="space-y-2">
                {additionalServices.map((service, index) => (
                  <Link
                    key={service.href}
                    href={service.href}
                    onClick={() => { setMobileSubmenu('main'); setIsMobileMenuOpen(false); }}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-200 ${
                      pathname === service.href
                        ? 'bg-[var(--royal-red)]/5 border-[var(--royal-red)]/15'
                        : 'border-gray-200 hover:bg-gray-50 active:bg-gray-100'
                    } ${mobileSubmenu === 'services' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
                    style={{ transitionDelay: mobileSubmenu === 'services' ? `${140 + services.length * 40 + index * 40}ms` : '0ms' }}
                  >
                    {pathname === service.href && <div className="w-1.5 h-1.5 rounded-full bg-[var(--royal-red)] flex-shrink-0"></div>}
                    <div>
                      <span className={`block text-[15px] ${pathname === service.href ? 'font-semibold text-[var(--royal-red)]' : 'font-medium text-[var(--royal-dark)]'}`}>{service.name}</span>
                      <span className="block text-xs text-gray-400 mt-0.5">{service.subtext}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Offers Submenu */}
            <div className={`transition-all duration-300 ${mobileSubmenu === 'offers' ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 absolute'}`}>
              <button
                onClick={() => setMobileSubmenu('main')}
                className={`flex items-center gap-2 px-2 py-3 text-gray-400 text-sm font-medium transition-all duration-200 active:text-[var(--royal-red)] ${mobileSubmenu === 'offers' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
                style={{ transitionDelay: mobileSubmenu === 'offers' ? '50ms' : '0ms' }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                Back
              </button>

              <p className={`text-xs font-bold text-gray-400 uppercase tracking-widest px-4 mt-2 mb-3 transition-all duration-300 ${mobileSubmenu === 'offers' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`} style={{ transitionDelay: mobileSubmenu === 'offers' ? '80ms' : '0ms' }}>Special Offers</p>

              <div className="space-y-2">
                {offers.map((offer, index) => (
                  <Link
                    key={offer.href}
                    href={offer.href}
                    onClick={() => { setMobileSubmenu('main'); setIsMobileMenuOpen(false); }}
                    className={`flex items-center gap-3 px-4 py-3.5 rounded-xl border transition-all duration-200 ${
                      pathname === offer.href
                        ? 'bg-[var(--royal-red)]/5 border-[var(--royal-red)]/15'
                        : 'border-gray-200 hover:bg-gray-50 active:bg-gray-100'
                    } ${mobileSubmenu === 'offers' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
                    style={{ transitionDelay: mobileSubmenu === 'offers' ? `${100 + index * 60}ms` : '0ms' }}
                  >
                    {pathname === offer.href && <div className="w-1.5 h-1.5 rounded-full bg-[var(--royal-red)] flex-shrink-0"></div>}
                    <span className={`text-[15px] ${pathname === offer.href ? 'font-semibold text-[var(--royal-red)]' : 'font-medium text-[var(--royal-dark)]'}`}>{offer.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="px-4 pb-6 pt-4 border-t border-gray-100 space-y-2.5">
            <a
              href="tel:3306621123"
              className="w-full px-5 py-3.5 bg-[var(--royal-red)] text-white rounded-xl font-semibold text-[15px] transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2.5"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
              </svg>
              Call (330) 662-1123
            </a>

            <button
              onClick={() => { setIsMobileMenuOpen(false); setTimeout(() => setIsContactModalOpen(true), 300); }}
              className="w-full px-5 py-3.5 bg-gray-100 text-[var(--royal-dark)] rounded-xl font-semibold text-[15px] transition-all duration-200 active:scale-[0.98] active:bg-gray-200 flex items-center justify-center gap-2.5"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Contact Us
            </button>
            
            <p className="text-gray-400 text-[11px] text-center pt-1">Available 24/7 for emergencies</p>
          </div>
        </div>
      </div>

      {/* Contact Modal */}
      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
    </>
  );
}
