'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import { ReactNode } from 'react';

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}: ButtonProps) {
  const baseClasses = 'relative overflow-hidden font-medium transition-all duration-300 ease-smooth';

  const variantClasses = {
    primary: 'bg-gold text-gray-900 hover:shadow-glow',
    secondary: 'bg-transparent border-2 border-gold text-gold hover:bg-gold hover:text-gray-900',
  };

  const sizeClasses = {
    sm: 'px-6 py-2 text-sm rounded-lg',
    md: 'px-8 py-3 text-base rounded-lg',
    lg: 'px-10 py-4 text-lg rounded-xl',
  };

  return (
    <motion.button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {/* Shimmer effect overlay */}
      <span className="absolute inset-0 shimmer opacity-0 hover:opacity-100 transition-opacity duration-500" />
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
