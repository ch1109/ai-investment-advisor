'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export default function Card({ 
  children, 
  className = '', 
  hover = false,
  onClick 
}: CardProps) {
  const baseClasses = 'bg-white rounded-xl shadow-lg border border-gray-100';
  const hoverClasses = hover ? 'cursor-pointer' : '';
  
  const cardContent = (
    <div className={`${baseClasses} ${hoverClasses} ${className}`}>
      {children}
    </div>
  );
  
  if (hover) {
    return (
      <motion.div
        whileHover={{ 
          scale: 1.02,
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
        }}
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
        className="transition-all duration-200"
      >
        {cardContent}
      </motion.div>
    );
  }
  
  return cardContent;
}
