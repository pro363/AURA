import React from 'react';
import { ArrowRight, Sparkles, Loader2 } from 'lucide-react';

// --- Card Component ---
interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const GlassCard: React.FC<CardProps> = ({ children, className = '', onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`
        bg-glass backdrop-blur-md border border-glass-border 
        rounded-xl p-6 transition-all duration-300
        hover:bg-opacity-10 hover:border-opacity-20 hover:shadow-2xl hover:shadow-black/50
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

// --- Button Component ---
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  icon?: React.ReactNode;
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  icon,
  isLoading,
  ...props 
}) => {
  const baseStyles = "relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-medium transition-all duration-300 rounded-lg group focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-obsidian";
  
  const variants = {
    primary: "bg-white text-black hover:bg-gray-100 focus:ring-white",
    secondary: "bg-glass border border-glass-border text-white hover:bg-white/10 focus:ring-gray-500",
    ghost: "bg-transparent text-gray-400 hover:text-white"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className} ${isLoading ? 'opacity-80 cursor-wait' : ''}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      <span className="flex items-center gap-2 relative z-10">
        {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
        {!isLoading && icon}
        {children}
      </span>
      {variant === 'primary' && !isLoading && (
        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-shimmer" />
      )}
    </button>
  );
};

// --- Input Component ---
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input: React.FC<InputProps> = ({ label, className = '', ...props }) => {
  return (
    <div className="w-full">
      {label && <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">{label}</label>}
      <input 
        className={`
          w-full bg-charcoal/50 border border-glass-border rounded-lg px-4 py-4
          text-lg text-white placeholder-gray-600
          focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/10
          transition-all duration-300
          ${className}
        `}
        {...props}
      />
    </div>
  );
};

// --- Badge ---
export const Badge: React.FC<{ children: React.ReactNode, color?: 'blue' | 'red' | 'green' }> = ({ children, color = 'blue' }) => {
  const colors = {
    blue: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    red: "bg-red-500/10 text-red-400 border-red-500/20",
    green: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
  };
  
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${colors[color]}`}>
      {children}
    </span>
  );
};
