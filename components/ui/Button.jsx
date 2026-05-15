import React from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import { motion } from 'framer-motion';

export const Button = ({ 
  children, 
  variant = 'primary', 
  className, 
  icon: Icon,
  type = 'button',
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-neon-blue/10 text-neon-blue border border-neon-blue/50 hover:bg-neon-blue/20 hover:shadow-[0_0_15px_rgba(0,240,255,0.4)]",
    secondary: "bg-dark-700 text-slate-300 hover:text-white hover:bg-dark-600 border border-dark-600",
    neon: "bg-neon-blue text-dark-900 hover:bg-white hover:shadow-[0_0_20px_rgba(0,240,255,0.6)]",
    danger: "bg-neon-red/10 text-neon-red border border-neon-red/50 hover:bg-neon-red/20",
    ghost: "bg-transparent text-slate-400 hover:text-white hover:bg-dark-800",
  };

  return (
    <motion.button 
      type={type}
      whileTap={{ scale: 0.97 }}
      className={twMerge(clsx(baseStyles, variants[variant], className))}
      {...props}
    >
      {Icon && <Icon className="w-5 h-5" />}
      {children}
    </motion.button>
  );
};
