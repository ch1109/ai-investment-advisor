'use client';

import {motion} from 'framer-motion';
import {Link} from '@/i18n/routing';
import {ReactNode} from 'react';

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  href: string;
  ctaLabel?: string;
}

export default function FeatureCard({icon, title, description, href, ctaLabel}: FeatureCardProps) {
  return (
    <Link href={href}>
      <motion.div
        whileHover={{
          scale: 1.03,
          y: -8,
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(59, 130, 246, 0.1)'
        }}
        whileTap={{scale: 0.97}}
        className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 lg:p-5 shadow-lg border border-white/20 cursor-pointer transition-all duration-300 group hover:shadow-2xl h-full flex flex-col relative overflow-hidden"
      >
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-indigo-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>

        <div className="relative z-10">
          <div className="flex items-center justify-center w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl mb-3 group-hover:from-blue-200 group-hover:to-indigo-200 transition-all duration-300 mx-auto shadow-sm">
            <div className="transform group-hover:scale-110 transition-transform duration-300">
              {icon}
            </div>
          </div>

          <h3 className="text-base lg:text-lg font-bold text-gray-900 mb-3 group-hover:text-blue-700 transition-colors duration-300 text-center">
            {title}
          </h3>

          <p className="text-gray-600 text-xs lg:text-sm leading-relaxed mb-4 flex-grow text-center group-hover:text-gray-700 transition-colors duration-300">
            {description}
          </p>

          {ctaLabel && (
            <div className="flex items-center justify-center text-blue-600 opacity-0 group-hover:opacity-100 transition-all duration-300 mt-auto transform translate-y-2 group-hover:translate-y-0">
              <span className="text-xs font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">{ctaLabel}</span>
              <svg className="w-3 h-3 ml-1 text-blue-600 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          )}
        </div>
      </motion.div>
    </Link>
  );
}
