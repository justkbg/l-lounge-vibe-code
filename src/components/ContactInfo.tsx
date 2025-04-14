
import React from 'react';
import { MapPin, Phone, Clock, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

interface ContactInfoProps {
  showTitle?: boolean;
  showSocials?: boolean;
  showHours?: boolean;
  className?: string;
}

const ContactInfo: React.FC<ContactInfoProps> = ({ 
  showTitle = false,
  showSocials = false,
  showHours = false,
  className = ''
}) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <motion.div 
      className={`marcello-contact-info mt-8 ${className}`}
      variants={container}
      initial="hidden"
      animate="show"
    >
      {showTitle && (
        <motion.h3 
          className="text-2xl font-playfair mb-6 text-primary"
          variants={item}
        >
          Visit Us
        </motion.h3>
      )}
      
      <motion.div 
        className="marcello-location flex items-center justify-center gap-2 mb-3"
        variants={item}
      >
        <MapPin size={18} className="text-primary" />
        <span>Regimanuel Estate, Comm 14, Tema, Ghana</span>
      </motion.div>
      
      <motion.div 
        className="marcello-phone flex items-center justify-center gap-2 mb-3"
        variants={item}
      >
        <Phone size={18} className="text-primary" />
        <a href="tel:0505609581" className="hover:text-primary transition-colors">
          0505609581
        </a>
      </motion.div>
      
      {showHours && (
        <motion.div 
          className="marcello-hours flex items-center justify-center gap-2 mb-3"
          variants={item}
        >
          <Clock size={18} className="text-primary" />
          <span>Open daily 3:00 PM - 2:00 AM</span>
        </motion.div>
      )}
      
      {showSocials && (
        <motion.div 
          className="marcello-socials flex items-center justify-center gap-4 mt-4"
          variants={item}
        >
          <a 
            href="https://instagram.com/llounge_gh" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors flex items-center gap-1"
          >
            <span>Instagram</span>
            <ExternalLink size={14} />
          </a>
          <a 
            href="https://facebook.com/lloungegh" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors flex items-center gap-1"
          >
            <span>Facebook</span>
            <ExternalLink size={14} />
          </a>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ContactInfo;
