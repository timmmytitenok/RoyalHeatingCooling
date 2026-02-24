'use client';

import { useState, useEffect } from 'react';
import { submitLead } from '../lib/submitLead';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    description: ''
  });

  const [errors, setErrors] = useState({
    fullName: '',
    phone: '',
    email: '',
    description: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  // Handle modal visibility with animation
  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setIsClosing(false);
    } else if (shouldRender) {
      setIsClosing(true);
      const timer = setTimeout(() => {
        setShouldRender(false);
        setIsClosing(false);
      }, 400); // Match animation duration
      return () => clearTimeout(timer);
    }
  }, [isOpen, shouldRender]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setFormData({
          fullName: '',
          phone: '',
          email: '',
          description: ''
        });
        setErrors({
          fullName: '',
          phone: '',
          email: '',
          description: ''
        });
        setSubmitSuccess(false);
      }, 400);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 400);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {
      fullName: '',
      phone: '',
      email: '',
      description: ''
    };

    let isValid = true;

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
      isValid = false;
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
      isValid = false;
    }

    if (!/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(formData.phone.trim())) {
      newErrors.phone = 'Please enter a valid phone number';
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email';
      isValid = false;
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await submitLead({
        formType: 'Contact Request',
        fullName: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        description: formData.description,
      });
      setSubmitSuccess(true);
      setTimeout(() => {
        handleClose();
      }, 2000);
    } catch (error) {
      console.error(error);
      window.alert('Unable to send request right now. Please call us at (330) 662-1123.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-start sm:items-center justify-center px-3 py-5 sm:px-6 sm:py-6 overflow-y-auto ${
        isClosing ? 'animate-modal-fade-out' : 'animate-modal-fade-in'
      }`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 lg:backdrop-blur-md"
        onClick={handleClose}
      />

      {/* Modal Content */}
      <div
        className={`relative w-full max-w-2xl max-h-[calc(100dvh-4rem)] sm:max-h-[92vh] overflow-y-auto bg-white rounded-2xl sm:rounded-3xl shadow-[0_30px_80px_-20px_rgba(0,0,0,0.45)] border border-white/40 ${
          isClosing ? 'animate-modal-slide-down' : 'animate-modal-slide-up'
        }`}
      >
        <div className="bg-gradient-to-r from-[var(--royal-red)] to-[var(--royal-red-dark)] px-6 py-6 sm:px-8 sm:py-7">
          <button
            onClick={handleClose}
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/20 text-white hover:bg-white/30 transition-all duration-200"
            aria-label="Close modal"
          >
            ✕
          </button>
          <p className="text-[var(--royal-gold)] text-xs font-semibold uppercase tracking-[0.16em] mb-2">
            Contact Request
          </p>
          <h2 className="text-white text-2xl sm:text-3xl font-bold leading-tight">
            Get In Touch
          </h2>
        </div>

        <div className="px-6 py-6 sm:px-8 sm:py-8">

          {/* Success Message */}
          {submitSuccess && (
            <div className="text-center px-2 py-10 animate-[fadeInUp_0.35s_ease-out]">
              <div className="w-16 h-16 rounded-full bg-[var(--royal-red)]/10 text-[var(--royal-red)] mx-auto flex items-center justify-center mb-5">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-[var(--royal-dark)] mb-3">Thank You!</h3>
              <p className="text-gray-600 text-base sm:text-lg mb-2">
                We will reach out as soon as possible.
              </p>
            </div>
          )}

          {/* Form */}
          {!submitSuccess && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name <span className="text-[var(--royal-red)]">*</span>
                </label>
                <input
                  required
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`w-full rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--royal-red)]/30 focus:border-[var(--royal-red)] ${
                    errors.fullName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="John Doe"
                />
                {errors.fullName && <p className="mt-1 text-xs text-red-500">{errors.fullName}</p>}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number <span className="text-[var(--royal-red)]">*</span>
                </label>
                <input
                  required
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--royal-red)]/30 focus:border-[var(--royal-red)] ${
                    errors.phone ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="(330) 555-1234"
                />
                {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address <span className="text-[var(--royal-red)]">*</span>
                </label>
                <input
                  required
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--royal-red)]/30 focus:border-[var(--royal-red)] ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="john.doe@example.com"
                />
                {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
                  Description <span className="text-[var(--royal-red)]">*</span>
                </label>
                <textarea
                  required
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className={`w-full rounded-xl border px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[var(--royal-red)]/30 focus:border-[var(--royal-red)] ${
                    errors.description ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Briefly describe how we can help..."
                />
                {errors.description && <p className="mt-1 text-xs text-red-500">{errors.description}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center bg-[var(--royal-red)] text-white font-semibold px-6 py-3 rounded-full transition-all duration-300 hover:bg-[var(--royal-red-dark)] hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Request'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
