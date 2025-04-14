
import React from 'react';
import { MapPin, Phone } from 'lucide-react';

const ContactInfo: React.FC = () => {
  return (
    <div className="marcello-contact-info mt-12">
      <div className="marcello-location flex items-center justify-center gap-2 mb-3">
        <MapPin size={18} className="text-primary" />
        <span>Regimanuel Estate, Comm 14, Tema, Ghana</span>
      </div>
      
      <div className="marcello-phone flex items-center justify-center gap-2">
        <Phone size={18} className="text-primary" />
        <a href="tel:0505609581" className="hover:text-primary transition-colors">0505609581</a>
      </div>
    </div>
  );
};

export default ContactInfo;
