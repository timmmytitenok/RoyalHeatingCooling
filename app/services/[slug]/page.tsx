'use client';

import { use, useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '../../components/Navbar';

type UrgencyOption = 'emergency' | 'within-48' | 'flexible' | '';

// Service data for each service type
const servicesData: Record<string, {
  name: string;
  tagline: string;
  heroDescription: string;
  heroImageLeft?: boolean;
  heroImage?: string;
  sections: {
    eyebrow: string;
    title: string;
    description: string;
    bullets: string[];
    cta?: { text: string; href: string };
    image: string;
  }[];
  trustPoints: string[];
}> = {
  'furnaces': {
    name: 'Furnace Services',
    tagline: 'Dependable heat for every Ohio winter.',
    heroDescription: "Your furnace is the heart of your home's comfort. We provide expert maintenance, fast repairs, and professional installations — all with clear pricing and no pressure.",
    heroImageLeft: false,
    heroImage: '/furnace-hero-new2.png',
    sections: [
      {
        eyebrow: 'Preventive Heating Maintenance',
        title: 'Keep Your System Running Strong',
        description: 'Our precision tune-up covers every critical component to ensure safe, efficient operation all season long. Regular maintenance prevents costly breakdowns and extends the life of your equipment.',
        bullets: [
          'Burner and heat exchanger inspection',
          'Carbon monoxide safety testing',
          'Thermostat calibration and testing',
          'Blower motor and fan belt check',
          'Air filter replacement and airflow analysis',
          'Gas pressure and ignition verification',
          'Complete system performance report',
        ],
        image: '/furnace-running-strong-new.png',
      },
      {
        eyebrow: 'Furnace Installation & Replacement',
        title: 'Upgrade to Reliable, Efficient Heat',
        description: "Whether your furnace has reached the end of its lifespan or you're building new, we handle every step of the installation process with precision and care.",
        bullets: [
          'In-home assessment and load calculation',
          'Equipment selection based on your home and budget',
          'Professional removal of old system',
          'Expert installation with code-compliant connections',
          'Full system testing and calibration',
          'Walkthrough of your new system and warranty',
        ],
        image: '/furnace-upgrade-efficient-new.png',
      },
      {
        eyebrow: 'Furnace Repair & Diagnostics',
        title: 'Fast Fixes When Heat Goes Out',
        description: "Strange noises, weak airflow, or no heat at all — we've seen it. Our technicians diagnose the root cause quickly and explain your options before any work begins.",
        bullets: [
          'Ignition and pilot light failures',
          'Blower motor and fan issues',
          'Thermostat malfunctions',
          'Cracked heat exchangers',
          'Clogged filters and airflow restrictions',
        ],
        image: '/furnace-section4-new.jpg',
      },
    ],
    trustPoints: ['Same-day emergency service', 'Upfront pricing always', 'All major brands', 'Licensed technicians'],
  },
  'air-conditioning': {
    name: 'Air Conditioning',
    tagline: 'Stay cool when it matters most.',
    heroDescription: "From routine maintenance to emergency repairs and full system replacements, we keep your AC running at peak performance — no surprises, no runaround.",
    heroImageLeft: true,
    heroImage: '/ac-hero-repair-new.png',
    sections: [
      {
        eyebrow: 'Preventive AC Maintenance',
        title: 'Minimize Breakdowns',
        description: 'Annual AC maintenance keeps your system running efficiently and catches small issues before they become expensive repairs. A well-maintained unit cools better and costs less to operate.',
        bullets: [
          'Extends the life of your cooling system',
          'Reduces energy consumption and monthly bills',
          'Prevents unexpected mid-summer failures',
          'Maintains manufacturer warranty compliance',
          'Improves indoor air quality',
        ],
        image: '/ac-section2-new.jpg',
      },
      {
        eyebrow: 'AC Repair & Diagnostics',
        title: 'Get Your Cool Back Fast',
        description: "When your AC struggles or stops working entirely, we respond quickly. Our technicians use systematic diagnostics to pinpoint the problem — whether it's a refrigerant leak, electrical fault, or compressor issue. We explain what's wrong in plain terms and give you honest options before starting any work.",
        bullets: [
          'Thorough diagnostic before any repair',
          'Transparent pricing with no hidden fees',
          'Factory-trained on all major brands',
          'Most repairs completed same-day',
        ],
        image: '/ac-section3-new.jpg',
      },
      {
        eyebrow: 'AC Installation & Replacement',
        title: 'Modern Cooling Done Right',
        description: "If your AC is aging, inefficient, or beyond repair, we'll help you choose the right replacement. Our installation process ensures your new system is sized correctly and installed to last.",
        bullets: [
          'Detailed home assessment and sizing',
          'Equipment options to fit your budget',
          'Professional installation by certified techs',
          'System testing and performance verification',
        ],
        image: '/ac-section4.jpg',
      },
    ],
    trustPoints: ['Fast response times', 'Honest recommendations', 'Works with all brands', 'Satisfaction guaranteed'],
  },
  'heat-pump': {
    name: 'Heat Pump Services',
    tagline: 'Year-round comfort from a single system.',
    heroDescription: 'Heat pumps deliver efficient heating in winter and reliable cooling in summer. We install, maintain, and repair these versatile systems with expert care.',
    heroImageLeft: false,
    heroImage: '/heat-pump-hero-new.jpg',
    sections: [
      {
        eyebrow: 'All-Season Efficiency',
        title: 'Dependable Service for Every System',
        description: 'Heat pumps transfer warmth rather than generating it, making them one of the most energy-efficient options available. They work year-round to keep your home comfortable in every season.',
        bullets: [
          'Heats in winter, cools in summer',
          'Lower operating costs than traditional HVAC',
          'Quiet, consistent temperature control',
          'Reduced carbon footprint',
        ],
        image: '/heat-pump-service-section.jpg',
      },
      {
        eyebrow: 'Heat Pump Maintenance',
        title: 'Protect Your Investment',
        description: 'Heat pumps work hard all year. Regular maintenance ensures peak efficiency, prevents breakdowns, and extends the life of your system.',
        bullets: [
          'Refrigerant level checks',
          'Coil cleaning and inspection',
          'Defrost cycle verification',
          'Electrical connection tightening',
          'Thermostat calibration',
        ],
        image: '/heat-pump-outdoor-new.jpg',
      },
      {
        eyebrow: 'Heat Pump Repair',
        title: 'Expert Troubleshooting & Fixes',
        description: 'Heat pumps have unique components that require specialized knowledge. Our technicians are trained specifically on these systems and can diagnose issues quickly.',
        bullets: [
          'Reversing valve repairs',
          'Defrost system troubleshooting',
          'Compressor diagnostics',
          'Refrigerant leak detection and repair',
        ],
        image: '/heat-pump-consultation-new.jpg',
      },
    ],
    trustPoints: ['Heat pump specialists', 'Energy-saving focus', 'Clear explanations', 'Trusted locally'],
  },
  'mini-split': {
    name: 'Mini-Split Systems',
    tagline: 'Efficient comfort without the ductwork.',
    heroDescription: 'Ductless mini-splits are ideal for home additions, converted spaces, or rooms that are always too hot or cold. We design and install systems tailored to your needs.',
    heroImageLeft: true,
    heroImage: '/mini-split-hero-new.png',
    sections: [
      {
        eyebrow: 'Ductless Flexibility',
        title: 'Comfort Exactly Where You Need It',
        description: 'Mini-splits provide targeted heating and cooling without the expense of installing ductwork. They offer quiet operation, energy efficiency, and individual room control.',
        bullets: [
          'No ductwork required',
          'Independent zone temperature control',
          'Whisper-quiet indoor units',
          'Sleek, modern wall-mounted design',
        ],
        image: '/mini-split.jpg',
      },
      {
        eyebrow: 'Ideal Applications',
        title: 'Where Mini-Splits Work Best',
        description: 'These systems solve comfort problems in spaces traditional HVAC struggles to reach. They are perfect for additions, renovations, and problem rooms.',
        bullets: [
          'Home additions and bonus rooms',
          'Converted garages and workshops',
          'Sunrooms and enclosed patios',
          'Older homes without existing ductwork',
          'Home offices and studios',
        ],
        image: '/mini-split-work-best-new.png',
      },
      {
        eyebrow: 'Professional Installation',
        title: 'Sized Right, Installed Right',
        description: 'Proper sizing and placement are critical for mini-split performance. We calculate your exact needs and install with precision.',
        bullets: [
          'Detailed load calculation for your space',
          'Strategic indoor unit placement',
          'Clean, professional mounting and wiring',
          'Full system testing and walkthrough',
        ],
        image: '/heat-pump-consultation-new.jpg',
      },
    ],
    trustPoints: ['Expert installation', 'Proper sizing guaranteed', 'Clean workmanship', 'Efficient systems'],
  },
  'water-heaters': {
    name: 'Water Heater Services',
    tagline: 'Reliable hot water, every single day.',
    heroDescription: "From minor repairs to complete replacements, we keep your hot water flowing. Whether you prefer a traditional tank or want to upgrade to tankless, we'll find the right solution for your home.",
    heroImageLeft: false,
    heroImage: '/water-heater-hero-new.jpg',
    sections: [
      {
        eyebrow: 'Hot Water Solutions',
        title: 'Dependable Service for Every System',
        description: 'Water heater problems can disrupt your entire household. We diagnose issues quickly and provide honest recommendations — repair when possible, replace when necessary.',
        bullets: [
          'Tank and tankless water heater repairs',
          'Element and thermostat replacement',
          'Leak detection and tank inspections',
          'Same-day emergency service available',
        ],
        image: '/tankless-water-heater-section.jpg',
      },
      {
        eyebrow: 'Tank vs. Tankless',
        title: 'Right System for Your Home',
        description: 'Both options have advantages. We help you weigh the pros and cons based on your household size, usage patterns, and budget.',
        bullets: [
          'Tank: Lower upfront cost, proven reliability, simple maintenance',
          'Tank: Stores 40-80 gallons ready for use',
          'Tankless: Endless hot water on demand',
          'Tankless: Compact design, longer lifespan, lower energy bills',
        ],
        image: '/tank-vs-tankless.jpg',
      },
      {
        eyebrow: 'Installation & Replacement',
        title: 'Professional Setup from Start to Finish',
        description: 'When repair is no longer practical, we handle the entire replacement process — from selecting the right unit to professional installation and disposal of your old system.',
        bullets: [
          'Right-sized recommendations for your household',
          'Code-compliant installation',
          'Old unit removal and disposal',
          'Full testing and warranty registration',
        ],
        image: '/water-heater-install.jpg',
      },
    ],
    trustPoints: ['Fast response', 'Tank & tankless experts', 'Honest pricing', 'Quality installation'],
  },
  'duct-cleaning': {
    name: 'Air Duct Cleaning',
    tagline: 'Cleaner air starts\nwith cleaner ducts.',
    heroDescription: 'Over time, dust, allergens, and debris accumulate in your ductwork. Professional cleaning removes contaminants, improves airflow, and helps your HVAC system run more efficiently.',
    heroImageLeft: true,
    heroImage: '/duct-cleaning-hero-woman-window.jpg',
    sections: [
      {
        eyebrow: 'Professional Equipment',
        title: 'The Tools That Make the Difference',
        description: 'We use commercial-grade equipment designed specifically for thorough duct cleaning — not just a shop vac with a long hose.',
        bullets: [
          'High-powered negative air machines',
          'Rotating brush systems for deep cleaning',
          'HEPA-filtered vacuum collection',
          'Compressed air whips for stubborn debris',
          'Video inspection cameras',
          'Sanitizing and deodorizing treatments',
        ],
        image: '/duct-tools-difference.png',
      },
      {
        eyebrow: 'Our Cleaning Process',
        title: 'Thorough, Systematic, Clean',
        description: 'Our multi-step process ensures every section of your ductwork is properly cleaned without leaving a mess in your home.',
        bullets: [
          'Pre-inspection with camera when needed',
          'Seal and protect all vents and registers',
          'Agitate debris with rotating brushes',
          'Extract contaminants with HEPA vacuum',
          'Clean supply and return ducts separately',
          'Sanitize and deodorize if requested',
          'Final inspection and walkthrough',
        ],
        image: '/duct-cleaning-process.jpg',
      },
      {
        eyebrow: 'When to Schedule',
        title: 'Signs Your Ducts Need Attention',
        description: 'Not sure if your ducts need cleaning? These common signs indicate it may be time.',
        bullets: [
          'Visible dust blowing from vents',
          'Musty or stale odors when HVAC runs',
          'Increased allergy symptoms indoors',
          'Recent home renovation or construction',
          'New pet or smoker in the household',
          'No cleaning in 3-5+ years',
        ],
        image: '/duct-cleaning-technician.jpg',
      },
      {
        eyebrow: 'Real Benefits',
        title: 'What Clean Ducts Do for Your Home',
        description: 'Professional duct cleaning delivers measurable improvements to your indoor environment and HVAC performance.',
        bullets: [
          'Reduces airborne dust and allergens',
          'Eliminates musty odors at the source',
          'Improves HVAC airflow and efficiency',
          'Creates a healthier living environment',
        ],
        image: '/duct-cleaning-happy-dog.jpg',
      },
    ],
    trustPoints: ['Thorough cleaning', 'No mess left behind', 'Improved efficiency', 'Family-safe methods'],
  },
  'indoor-air-quality': {
    name: 'Indoor Air Quality',
    tagline: 'Breathe cleaner, healthier air at home.',
    heroDescription: 'Indoor air can carry dust, allergens, and pollutants you cannot see. We offer proven solutions to filter contaminants, balance humidity, and create a fresher living environment.',
    heroImageLeft: false,
    heroImage: '/iaq-hero-new.jpg',
    sections: [
      {
        eyebrow: 'Professional Duct Cleaning',
        title: 'Start with Clean Ductwork',
        description: 'Your ducts circulate air throughout your home. If they are filled with dust and debris, that is what your family breathes. Professional cleaning removes built-up contaminants and improves overall air quality.',
        bullets: [
          'Removes years of accumulated dust and debris',
          'Eliminates musty odors from your HVAC system',
          'Improves airflow and system efficiency',
          'Recommended every 3-5 years for most homes',
        ],
        image: '/iaq-duct-cleaning-interior.jpg',
      },
      {
        eyebrow: 'Humidity Control',
        title: 'Balance Your Indoor Moisture',
        description: 'Humidity that is too high promotes mold and dust mites. Humidity that is too low causes dry skin, static, and respiratory discomfort. We install whole-home solutions that maintain ideal levels year-round.',
        bullets: [
          'Dehumidifiers: Removes excess moisture in humid months, prevents mold growth, protects wood and furnishings',
          'Humidifiers: Adds moisture during dry winters, reduces static and dry skin, soothes respiratory passages',
        ],
        image: '/iaq-filter-replacement.jpg',
      },
      {
        eyebrow: 'Air Purification',
        title: 'Advanced Filtration & UV Treatment',
        description: 'Standard filters catch large particles, but smaller contaminants pass through. Upgraded filtration and UV light systems capture and neutralize a wider range of pollutants — including bacteria, viruses, and volatile organic compounds.',
        bullets: [
          'HEPA and high-MERV filter upgrades',
          'UV germicidal lights kill airborne pathogens',
          'Reduces odors from cooking, pets, and chemicals',
          'Ideal for allergy and asthma sufferers',
        ],
        image: '/iaq-uv-treatment.png',
      },
      {
        eyebrow: 'Understanding Indoor Pollutants',
        title: 'What You Cannot See\nCan Affect Your Health',
        description: 'Indoor air contains three main types of contaminants: particulates like dust and pollen, bioaerosols like mold spores and bacteria, and volatile organic compounds from household products and building materials. Addressing these requires the right combination of filtration, purification, and humidity control.',
        bullets: [
          'Particulates: dust, pollen, pet dander, smoke',
          'Bioaerosols: mold spores, bacteria, viruses',
          'VOCs: cleaning products, paint fumes, adhesives',
          'Proper solutions target all three categories',
        ],
        image: '/iaq-before-after-dust.jpg',
      },
    ],
    trustPoints: ['Honest recommendations', 'Proven products', 'Health-focused solutions', 'Professional installation'],
  },
};

export default function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const service = servicesData[slug];

  const [heroVisible, setHeroVisible] = useState(false);
  const [sectionsVisible, setSectionsVisible] = useState<boolean[]>([]);
  const [ctaVisible, setCtaVisible] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [isScheduleModalClosing, setIsScheduleModalClosing] = useState(false);
  const [isScheduleSubmitted, setIsScheduleSubmitted] = useState(false);
  const [propertyTypes, setPropertyTypes] = useState<string[]>([]);
  const [urgency, setUrgency] = useState<UrgencyOption>('');
  const [scheduleForm, setScheduleForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    serviceAddress: '',
    issueDescription: '',
  });
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const ctaRef = useRef<HTMLElement>(null);

  // Hero fade-in on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setHeroVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Sections scroll-triggered animations
  useEffect(() => {
    if (!service) return;
    
    const observers: IntersectionObserver[] = [];
    
    sectionRefs.current.forEach((ref, index) => {
      if (!ref) return;
      
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setSectionsVisible((prev) => {
                const newVisible = [...prev];
                newVisible[index] = true;
                return newVisible;
              });
            }
          });
        },
        { threshold: 0.3, rootMargin: '-100px 0px' }
      );
      
      observer.observe(ref);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [service]);

  useEffect(() => {
    if (!isScheduleModalOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [isScheduleModalOpen]);

  useEffect(() => {
    if (!isScheduleSubmitted) return;
    const timer = setTimeout(() => {
      closeScheduleModal(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, [isScheduleSubmitted]);

  const togglePropertyType = (value: string) => {
    setPropertyTypes((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const handleScheduleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsScheduleSubmitted(true);
  };

  const resetScheduleForm = () => {
    setScheduleForm({
      fullName: '',
      phone: '',
      email: '',
      serviceAddress: '',
      issueDescription: '',
    });
    setPropertyTypes([]);
    setUrgency('');
  };

  const closeScheduleModal = (resetAfterClose = true) => {
    setIsScheduleModalClosing(true);
    setTimeout(() => {
      setIsScheduleModalOpen(false);
      setIsScheduleModalClosing(false);
      if (resetAfterClose) {
        setIsScheduleSubmitted(false);
        resetScheduleForm();
      }
    }, 400);
  };

  // CTA section animation
  useEffect(() => {
    if (!ctaRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCtaVisible(true);
          }
        });
      },
      { threshold: 0.3, rootMargin: '-100px 0px' }
    );

    observer.observe(ctaRef.current);

    return () => observer.disconnect();
  }, []);

  if (!service) {
    return (
      <main className="min-h-screen bg-white">
        <Navbar />
        <div className="pt-40 pb-20 text-center">
          <h1 className="text-4xl font-bold text-[var(--royal-dark)]">Service Not Found</h1>
          <p className="text-gray-600 mt-4">The service you are looking for does not exist.</p>
          <Link href="/" className="btn-primary mt-8 inline-block">
            Back to Home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section - Sticky */}
      <section className="lg:sticky lg:top-0 pt-28 pb-16 lg:pt-40 lg:pb-24 min-h-[85vh] flex items-center bg-gradient-to-b from-[var(--royal-red)] via-[var(--royal-red-dark)] to-[var(--royal-red-dark)] z-10">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Content */}
            <div className={service.heroImageLeft ? 'lg:order-2' : ''}>
              <span className={`inline-block text-xs font-bold text-[var(--royal-gold)] uppercase tracking-widest mb-3 lg:mb-4 transition-all duration-700 text-center lg:text-left w-full lg:w-auto ${heroVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-sm'}`}>
                {service.name}
              </span>
              <h1 className={`text-3xl lg:text-5xl font-bold text-white mb-3 lg:mb-4 leading-tight whitespace-pre-line transition-all duration-700 delay-100 text-center lg:text-left ${heroVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-sm'}`}>
                {slug === 'heat-pump' ? (
                  <>
                    <span className="lg:hidden">All-Year Comfort, from a single system.</span>
                    <span className="hidden lg:inline">{service.tagline}</span>
                  </>
                ) : slug === 'mini-split' && service.tagline === 'Efficient comfort without the ductwork.' ? (
                  <>
                    <span className="lg:hidden">Comfort without the ductwork.</span>
                    <span className="hidden lg:inline">{service.tagline}</span>
                  </>
                ) : slug === 'indoor-air-quality' && service.tagline === 'Breathe cleaner, healthier air at home.' ? (
                  <>
                    <span className="lg:hidden">Breathe cleaner, Healthier air</span>
                    <span className="hidden lg:inline">{service.tagline}</span>
                  </>
                ) : (
                  service.tagline
                )}
              </h1>
              <p className={`text-white/80 text-base lg:text-lg leading-relaxed mb-6 lg:mb-8 transition-all duration-700 delay-200 text-center lg:text-left ${heroVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-sm'}`}>
                {service.heroDescription}
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
                <button
                  onClick={() => {
                    resetScheduleForm();
                    setIsScheduleModalClosing(false);
                    setIsScheduleModalOpen(true);
                    setIsScheduleSubmitted(false);
                  }}
                  className="group relative overflow-hidden inline-flex items-center justify-center gap-3 border-2 border-white text-white px-10 py-4 rounded-full font-bold text-base lg:text-lg shadow-md transition-all duration-300 ease-out hover:scale-110 hover:shadow-xl hover:bg-white hover:text-[var(--royal-red)] active:scale-95 active:shadow-sm w-full sm:w-auto"
                >
                  <svg className="w-5 h-5 lg:w-6 lg:h-6 relative z-10 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="relative z-10">Schedule Service</span>
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </div>
            </div>
            
            {/* Image */}
            <div className={`relative transition-all duration-700 delay-400 ${heroVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-sm'} ${service.heroImageLeft ? 'lg:order-1' : ''}`}>
              <div className="rounded-[3rem] aspect-[4/3] flex items-center justify-center overflow-hidden shadow-[0_25px_60px_10px_rgba(0,0,0,0.4)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_30px_80px_15px_rgba(0,0,0,0.5)] cursor-pointer">
                {service.heroImage ? (
                  <Image
                    src={service.heroImage}
                    alt={service.name}
                    fill
                    className="object-cover rounded-[3rem]"
                  />
                ) : (
                  <div className="text-center p-8 bg-white/10 backdrop-blur-sm w-full h-full flex flex-col items-center justify-center">
                    <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                      </svg>
                    </div>
                    <p className="text-white font-medium">Professional {service.name}</p>
                    <p className="text-white/70 text-sm mt-1">Quality service, guaranteed results</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Alternating Content Sections */}
      {service.sections.map((section, index) => (
        <section 
          key={index}
          ref={(el) => { sectionRefs.current[index] = el; }}
          className={`relative z-20 bg-white ${
            index === 0 
              ? 'pt-28 lg:pt-32 pb-4 lg:pb-24 -mt-1 -mb-1 shadow-[0_-25px_50px_-12px_rgba(0,0,0,0.4)]' 
              : index === service.sections.length - 1
              ? 'pt-12 lg:pt-24 pb-4 lg:pb-12 -mt-1'
              : 'py-12 lg:py-24 -mt-1 -mb-1'
          }`}
        >
          <div className="max-w-[1200px] mx-auto px-4 lg:px-6">
            <div className={`grid lg:grid-cols-2 gap-8 lg:gap-20 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
              {/* Image */}
              <div className={`transition-all duration-700 ${sectionsVisible[index] ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-sm'} ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                <div className="bg-[var(--royal-cream)] rounded-[2rem] aspect-[4/3] flex items-center justify-center overflow-hidden shadow-[0_20px_50px_-10px_rgba(0,0,0,0.4)] relative transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_22px_55px_-10px_rgba(0,0,0,0.45)] cursor-pointer">
                  {section.image && (section.image.endsWith('.png') || section.image.endsWith('.jpg') || section.image.endsWith('.jpeg')) ? (
                    <Image
                      src={section.image}
                      alt={section.eyebrow}
                      fill
                      className="object-cover rounded-[2rem]"
                    />
                  ) : (
                    <div className="text-center p-8">
                      <div className="w-16 h-16 bg-[var(--royal-red)]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                        <svg className="w-8 h-8 text-[var(--royal-red)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <p className="text-gray-500 text-sm">{section.eyebrow}</p>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Content */}
              <div className={`transition-all duration-700 delay-200 ${sectionsVisible[index] ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-sm'} ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                <span className="inline-block text-xs font-bold text-[var(--royal-gold)] uppercase tracking-widest mb-3 text-center lg:text-left w-full lg:w-auto">
                  {section.eyebrow}
                </span>
                <h2 className="text-xl lg:text-2xl font-bold text-[var(--royal-dark)] mb-4 whitespace-pre-line text-center lg:text-left">
                  {slug === 'furnaces' && section.title === 'Keep Your System Running Strong' ? (
                    <>
                      <span className="lg:hidden">Keep Your System Running</span>
                      <span className="hidden lg:inline">Keep Your System Running Strong</span>
                    </>
                  ) : slug === 'furnaces' && section.title === 'Upgrade to Reliable, Efficient Heat' ? (
                    <>
                      <span className="lg:hidden">Upgrade for Reliable Heat</span>
                      <span className="hidden lg:inline">Upgrade to Reliable, Efficient Heat</span>
                    </>
                  ) : slug === 'heat-pump' && section.title === 'Dependable Service for Every System' ? (
                    <>
                      <span className="lg:hidden">Service for Every System</span>
                      <span className="hidden lg:inline">Dependable Service for Every System</span>
                    </>
                  ) : slug === 'mini-split' && section.title === 'Comfort Exactly Where You Need It' ? (
                    <>
                      <span className="lg:hidden">Comfort Where You Need It</span>
                      <span className="hidden lg:inline">Comfort Exactly Where You Need It</span>
                    </>
                  ) : slug === 'water-heaters' && section.title === 'Dependable Service for Every System' ? (
                    <>
                      <span className="lg:hidden">Service for Every System</span>
                      <span className="hidden lg:inline">Dependable Service for Every System</span>
                    </>
                  ) : slug === 'water-heaters' && section.title === 'Professional Setup from Start to Finish' ? (
                    <>
                      <span className="lg:hidden">Professional Setup, Start to Finish</span>
                      <span className="hidden lg:inline">Professional Setup from Start to Finish</span>
                    </>
                  ) : slug === 'duct-cleaning' && section.title === 'The Tools That Make the Difference' ? (
                    <>
                      <span className="lg:hidden">Tools Make the Difference</span>
                      <span className="hidden lg:inline">The Tools That Make the Difference</span>
                    </>
                  ) : slug === 'duct-cleaning' && section.title === 'What Clean Ducts Do for Your Home' ? (
                    <>
                      <span className="lg:hidden">What Clean Ducts Do for You</span>
                      <span className="hidden lg:inline">What Clean Ducts Do for Your Home</span>
                    </>
                  ) : slug === 'indoor-air-quality' && section.title === 'Advanced Filtration & UV Treatment' ? (
                    <>
                      <span className="lg:hidden">Filtration &amp; UV Treatment</span>
                      <span className="hidden lg:inline">Advanced Filtration &amp; UV Treatment</span>
                    </>
                  ) : (
                    section.title
                  )}
                </h2>
                <p className="text-gray-600 text-sm lg:text-base leading-relaxed mb-6 lg:mb-8 text-center lg:text-left">
                  {section.description}
                </p>
                
                {/* Bullets */}
                <ul className="space-y-2 lg:space-y-3 mb-6">
                  {section.bullets.map((bullet, bulletIndex) => (
                    <li key={bulletIndex} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-[var(--royal-red)] flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-700 text-sm lg:text-base">{bullet}</span>
                    </li>
                  ))}
                </ul>
                
                {/* Optional CTA Link */}
                {section.cta && (
                  <Link 
                    href={section.cta.href}
                    className="inline-flex items-center gap-2 text-[var(--royal-red)] font-medium hover:underline"
                  >
                    {section.cta.text}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Spacer before CTA */}
      <div className="py-16 bg-white relative z-20"></div>

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
              <button
                onClick={() => {
                  resetScheduleForm();
                  setIsScheduleModalClosing(false);
                  setIsScheduleModalOpen(true);
                  setIsScheduleSubmitted(false);
                }}
                className="group relative overflow-hidden inline-flex items-center justify-center gap-3 bg-transparent border-2 border-white text-white px-10 py-4 rounded-full font-bold text-base lg:text-lg shadow-md hover:shadow-xl transition-all duration-300 ease-out hover:scale-110 hover:bg-white hover:text-[var(--royal-red)] active:scale-95 active:shadow-sm w-full sm:w-auto"
              >
                <svg className="w-5 h-5 lg:w-6 lg:h-6 relative z-10 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="relative z-10">Schedule Service</span>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>

            <p className={`text-white/60 text-xs lg:text-sm mt-6 lg:mt-8 transition-all duration-700 delay-300 ${ctaVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-sm'}`}>
              <span className="lg:hidden">Avalible 24/7 for emergenices</span>
              <span className="hidden lg:inline">Avalible 24/7 for emergenices • Same Day service avbalible</span>
            </p>
          </div>
        </div>
      </section>

      {/* Schedule Modal */}
      {isScheduleModalOpen && (
        <div className={`fixed inset-0 z-[1200] flex items-start sm:items-center justify-center px-3 py-5 sm:p-6 overflow-y-auto ${isScheduleModalClosing ? 'animate-modal-fade-out' : 'animate-modal-fade-in'}`}>
          <div
            className={`absolute inset-0 bg-black/80 ${isScheduleModalClosing ? 'lg:animate-backdrop-unblur' : 'lg:animate-backdrop-blur'}`}
            onClick={() => closeScheduleModal(true)}
          />
          <div className={`relative w-full max-w-2xl max-h-[calc(100dvh-4rem)] sm:max-h-[92vh] overflow-y-auto rounded-2xl sm:rounded-3xl bg-white shadow-[0_30px_80px_-20px_rgba(0,0,0,0.45)] border border-white/40 ${isScheduleModalClosing ? 'animate-modal-slide-down' : 'animate-modal-slide-up'}`}>
            {!isScheduleSubmitted ? (
              <>
                <div className="bg-gradient-to-r from-[var(--royal-red)] to-[var(--royal-red-dark)] px-6 py-6 sm:px-8 sm:py-7">
                  <button
                    onClick={() => closeScheduleModal(true)}
                    className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/20 text-white hover:bg-white/30 transition-all duration-200"
                    aria-label="Close schedule form"
                  >
                    ✕
                  </button>
                  <p className="text-[var(--royal-gold)] text-xs font-semibold uppercase tracking-[0.16em] mb-2">
                    {service.name} Service Request
                  </p>
                  <h2 className="text-white text-2xl sm:text-3xl font-bold leading-tight">Schedule Service</h2>
                </div>

                <form onSubmit={handleScheduleSubmit} className="px-6 py-6 sm:px-8 sm:py-8 space-y-7">
                  <section className="space-y-4">
                    <h3 className="text-lg font-bold text-[var(--royal-dark)]">1. Basic Contact Info (Required)</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input
                        required
                        type="text"
                        placeholder="Full Name"
                        value={scheduleForm.fullName}
                        onChange={(e) => setScheduleForm((prev) => ({ ...prev, fullName: e.target.value }))}
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--royal-red)]/30 focus:border-[var(--royal-red)]"
                      />
                      <input
                        required
                        type="tel"
                        placeholder="Phone Number"
                        value={scheduleForm.phone}
                        onChange={(e) => setScheduleForm((prev) => ({ ...prev, phone: e.target.value }))}
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--royal-red)]/30 focus:border-[var(--royal-red)]"
                      />
                    </div>
                    <input
                      required
                      type="email"
                      placeholder="Email Address"
                      value={scheduleForm.email}
                      onChange={(e) => setScheduleForm((prev) => ({ ...prev, email: e.target.value }))}
                      className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--royal-red)]/30 focus:border-[var(--royal-red)]"
                    />
                    <input
                      required
                      type="text"
                      placeholder="Service Address"
                      value={scheduleForm.serviceAddress}
                      onChange={(e) => setScheduleForm((prev) => ({ ...prev, serviceAddress: e.target.value }))}
                      className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--royal-red)]/30 focus:border-[var(--royal-red)]"
                    />
                  </section>

                  <section className="space-y-3">
                    <h3 className="text-lg font-bold text-[var(--royal-dark)]">2. Urgency Level</h3>
                    <label className="flex items-center gap-3 text-gray-700">
                      <input
                        type="checkbox"
                        checked={urgency === 'emergency'}
                        onChange={() => setUrgency((prev) => (prev === 'emergency' ? '' : 'emergency'))}
                        className="w-4 h-4 rounded border-gray-300 text-[var(--royal-red)] focus:ring-[var(--royal-red)]"
                      />
                      <span>Emergency (Same Day)</span>
                    </label>
                    <label className="flex items-center gap-3 text-gray-700">
                      <input
                        type="checkbox"
                        checked={urgency === 'within-48'}
                        onChange={() => setUrgency((prev) => (prev === 'within-48' ? '' : 'within-48'))}
                        className="w-4 h-4 rounded border-gray-300 text-[var(--royal-red)] focus:ring-[var(--royal-red)]"
                      />
                      <span>Within 24-48 Hours</span>
                    </label>
                    <label className="flex items-center gap-3 text-gray-700">
                      <input
                        type="checkbox"
                        checked={urgency === 'flexible'}
                        onChange={() => setUrgency((prev) => (prev === 'flexible' ? '' : 'flexible'))}
                        className="w-4 h-4 rounded border-gray-300 text-[var(--royal-red)] focus:ring-[var(--royal-red)]"
                      />
                      <span>Flexible Scheduling</span>
                    </label>
                  </section>

                  <section className="space-y-3">
                    <h3 className="text-lg font-bold text-[var(--royal-dark)]">3. Property Type</h3>
                    <label className="flex items-center gap-3 text-gray-700">
                      <input
                        type="checkbox"
                        checked={propertyTypes.includes('Residential')}
                        onChange={() => togglePropertyType('Residential')}
                        className="w-4 h-4 rounded border-gray-300 text-[var(--royal-red)] focus:ring-[var(--royal-red)]"
                      />
                      <span>Residential</span>
                    </label>
                    <label className="flex items-center gap-3 text-gray-700">
                      <input
                        type="checkbox"
                        checked={propertyTypes.includes('Commercial')}
                        onChange={() => togglePropertyType('Commercial')}
                        className="w-4 h-4 rounded border-gray-300 text-[var(--royal-red)] focus:ring-[var(--royal-red)]"
                      />
                      <span>Commercial</span>
                    </label>
                  </section>

                  <section className="space-y-3">
                    <h3 className="text-lg font-bold text-[var(--royal-dark)]">4. Issue Description</h3>
                    <textarea
                      required
                      rows={4}
                      placeholder="Briefly describe the issue (strange noises, not cooling, leaking, etc.)"
                      value={scheduleForm.issueDescription}
                      onChange={(e) => setScheduleForm((prev) => ({ ...prev, issueDescription: e.target.value }))}
                      className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[var(--royal-red)]/30 focus:border-[var(--royal-red)]"
                    />
                  </section>

                  <div className="pt-1">
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center bg-[var(--royal-red)] text-white font-semibold px-6 py-3 rounded-full transition-all duration-300 hover:bg-[var(--royal-red-dark)] hover:scale-[1.02] active:scale-95"
                    >
                      Submit Request
                    </button>
                  </div>
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
                  We will reach out as soon as possible!
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
    </main>
  );
}
