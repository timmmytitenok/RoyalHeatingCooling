'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { submitLead } from '../../../lib/submitLead';
import { formatPhoneInput } from '../../../lib/phone';

type UrgencyOption = 'emergency' | 'within-48' | 'flexible' | '';

export default function AirConditioningSchedulePage() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [propertyTypes, setPropertyTypes] = useState<string[]>([]);
  const [urgency, setUrgency] = useState<UrgencyOption>('');
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    serviceAddress: '',
    issueDescription: '',
  });

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isSubmitted) return;
    const timer = setTimeout(() => {
      router.push('/');
    }, 5000);
    return () => clearTimeout(timer);
  }, [isSubmitted, router]);

  const togglePropertyType = (value: string) => {
    setPropertyTypes((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await submitLead({
        formType: 'Air Conditioning Schedule Page',
        service: 'Air Conditioning',
        fullName: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        serviceAddress: formData.serviceAddress,
        issueDescription: formData.issueDescription,
        urgency,
        propertyTypes,
      });
      setIsSubmitted(true);
    } catch (error) {
      console.error(error);
      window.alert('Unable to send request right now. Please call us at (330) 662-1123.');
    }
  };

  return (
    <main className="min-h-screen bg-[var(--royal-cream)] flex items-center justify-center px-4 py-12">
      <div
        className={`w-full max-w-2xl transition-all duration-700 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        {!isSubmitted ? (
          <div className="bg-white rounded-3xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.2)] border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-[var(--royal-red)] to-[var(--royal-red-dark)] px-6 py-6 sm:px-8 sm:py-7">
              <p className="text-[var(--royal-gold)] text-xs font-semibold uppercase tracking-[0.18em] mb-2">
                Air Conditioning Service Request
              </p>
              <h1 className="text-white text-2xl sm:text-3xl font-bold leading-tight">Schedule Service</h1>
            </div>

            <form onSubmit={handleSubmit} className="px-6 py-6 sm:px-8 sm:py-8 space-y-7">
              <section className="space-y-4">
                <h2 className="text-lg font-bold text-[var(--royal-dark)]">1. Basic Contact Info (Required)</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    required
                    type="text"
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChange={(e) => setFormData((prev) => ({ ...prev, fullName: e.target.value }))}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--royal-red)]/30 focus:border-[var(--royal-red)]"
                  />
                  <input
                    required
                    type="tel"
                    inputMode="numeric"
                    maxLength={14}
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={(e) => setFormData((prev) => ({ ...prev, phone: formatPhoneInput(e.target.value) }))}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--royal-red)]/30 focus:border-[var(--royal-red)]"
                  />
                </div>
                <input
                  required
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--royal-red)]/30 focus:border-[var(--royal-red)]"
                />
                <input
                  required
                  type="text"
                  placeholder="Service Address"
                  value={formData.serviceAddress}
                  onChange={(e) => setFormData((prev) => ({ ...prev, serviceAddress: e.target.value }))}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--royal-red)]/30 focus:border-[var(--royal-red)]"
                />
              </section>

              <section className="space-y-3">
                <h2 className="text-lg font-bold text-[var(--royal-dark)]">2. Property Type</h2>
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
                <h2 className="text-lg font-bold text-[var(--royal-dark)]">3. Issue Description</h2>
                <textarea
                  required
                  rows={4}
                  placeholder="Briefly describe the issue (strange noises, not cooling, leaking, etc.)"
                  value={formData.issueDescription}
                  onChange={(e) => setFormData((prev) => ({ ...prev, issueDescription: e.target.value }))}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[var(--royal-red)]/30 focus:border-[var(--royal-red)]"
                />
              </section>

              <section className="space-y-3">
                <h2 className="text-lg font-bold text-[var(--royal-dark)]">4. Urgency Level</h2>
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

              <div className="pt-1 flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center bg-[var(--royal-red)] text-white font-semibold px-6 py-3 rounded-full transition-all duration-300 hover:bg-[var(--royal-red-dark)] hover:scale-[1.02] active:scale-95"
                >
                  Submit Request
                </button>
                <Link
                  href="/services/air-conditioning"
                  className="inline-flex items-center justify-center border border-gray-300 text-gray-700 font-semibold px-6 py-3 rounded-full transition-all duration-300 hover:bg-gray-100"
                >
                  Cancel
                </Link>
              </div>
            </form>
          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.2)] border border-gray-100 px-6 py-12 sm:px-10 sm:py-14 text-center transition-all duration-700 ease-out animate-[fadeInUp_0.6s_ease-out_forwards]">
            <div className="w-16 h-16 rounded-full bg-[var(--royal-red)]/10 text-[var(--royal-red)] mx-auto flex items-center justify-center mb-5">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--royal-dark)] mb-3">
              Thank You!
            </h2>
            <p className="text-gray-600 text-base sm:text-lg mb-2">
              We will reach out as soon as possible.
            </p>
            <p className="text-gray-500 text-sm">
              Auto redirecting to the home page in 5 seconds...
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
