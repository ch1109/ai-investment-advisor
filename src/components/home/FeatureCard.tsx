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
          scale: 1.02,
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
        }}
        whileTap={{scale: 0.98}}
        className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 cursor-pointer transition-all duration-200 group"
      >
        <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4 group-hover:bg-blue-200 transition-colors duration-200">
          {icon}
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-200">
          {title}
        </h3>

        <p className="text-gray-600 leading-relaxed mb-4">
          {description}
        </p>

        {ctaLabel && (
          <div className="flex items-center text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <span className="text-sm font-medium">{ctaLabel}</span>
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        )}
      </motion.div>
    </Link>
  );
}
