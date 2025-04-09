
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AdinkraBackground from '@/components/3d/AdinkraBackground';
import OrderPageContent from '@/components/order/OrderPageContent';

const Order: React.FC = () => {
  const pageEnterClasses = "animate-fade-in transition-all duration-700";

  return (
    <>
      <Navbar />
      <main className={`pt-24 pb-20 relative ${pageEnterClasses} scroll-container`}>
        <AdinkraBackground 
          symbol="random" 
          density={0.15} 
          opacity={0.1} 
          animated={true} 
          cinematicEffect="float"
        />
        
        <OrderPageContent />
      </main>
      <Footer />
    </>
  );
};

export default Order;
