
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface BentoCardProps {
  title: string;
  description: string;
  image: string;
  link: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  style?: React.CSSProperties;
}

const BentoCard = ({ 
  title, 
  description, 
  image, 
  link, 
  className,
  size = 'md',
  style
}: BentoCardProps) => {
  return (
    <Link 
      to={link} 
      className={cn(
        'bento-card group block',
        size === 'sm' && 'row-span-1 col-span-1',
        size === 'md' && 'row-span-1 col-span-1 md:col-span-1',
        size === 'lg' && 'row-span-1 col-span-1 md:col-span-2 md:row-span-2',
        className
      )}
      style={style}
    >
      <div className="absolute inset-0">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
      </div>
      <div className="relative z-10 h-full flex flex-col justify-end">
        <h3 className="text-xl md:text-2xl font-playfair font-bold text-primary mb-2">{title}</h3>
        <p className="text-sm md:text-base text-white mb-4 max-w-xs">{description}</p>
        <span className="text-primary text-sm font-medium inline-flex items-center gap-1 transition-transform group-hover:translate-x-2">
          Explore more
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14"></path>
            <path d="m12 5 7 7-7 7"></path>
          </svg>
        </span>
      </div>
    </Link>
  );
};

export default BentoCard;
