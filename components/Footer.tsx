'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Footer() {
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoad(false);
    }, 3750);

    return () => clearTimeout(timer);
  }, []);

  return (
    <footer className="bg-navy text-white py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="flex flex-col items-center text-center space-y-6">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group"
          >
            <div className="text-3xl font-bold flex items-center justify-center transition-all duration-[600ms] ease-smooth group-hover:drop-shadow-[0_0_20px_rgba(201,169,98,0.5)]">
              <span className="inline-block text-white transition-all duration-[600ms] ease-smooth">
                T
              </span>
              <span className={`inline-block overflow-hidden whitespace-nowrap text-white transition-all duration-[600ms] ease-smooth ${
                isInitialLoad
                  ? 'max-w-[90px] opacity-100'
                  : 'max-w-0 opacity-0 group-hover:max-w-[90px] group-hover:opacity-100'
              }`}>
                agle
              </span>
              <span className={`inline-block text-white transition-all duration-[600ms] ease-smooth ${isInitialLoad ? 'ml-1.5' : ''} group-hover:ml-1.5`}>
                R
              </span>
              <span className="inline-block text-gold transition-all duration-[600ms] ease-smooth scale-x-[-1]">
                E
              </span>
            </div>
          </button>

          {/* Tagline */}
          <p className="text-gray-400 max-w-md">
            San Diego's only 0.5% full-service real estate brokerage
          </p>

          {/* DRE License (Required in California) */}
          <div className="text-sm text-gray-500">
            DRE License #XXXXXXX
          </div>

          {/* Divider */}
          <div className="w-24 h-px bg-gold/30" />

          {/* Links */}
          <div className="flex items-center gap-6 text-sm">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-gray-400 hover:text-gold transition-colors"
            >
              Back to Top
            </button>
            <span className="text-gray-600">•</span>
            <a
              href="mailto:gianni@taglere.com"
              className="text-gray-400 hover:text-gold transition-colors"
            >
              Contact
            </a>
          </div>

          {/* Copyright */}
          <div className="text-sm text-gray-500 pt-4">
            © {currentYear} Tagle Real Estate. All rights reserved.
          </div>

          {/* Compliance text */}
          <div className="text-xs text-gray-600 max-w-2xl leading-relaxed">
            Equal Housing Opportunity. All information deemed reliable but not guaranteed.
            Buyers and sellers should verify all information to their satisfaction.
          </div>
        </div>
      </div>
    </footer>
  );
}
