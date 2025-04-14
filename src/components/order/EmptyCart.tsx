
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ShoppingCart, ArrowRight } from 'lucide-react';
import AdinkraSymbol from '@/components/AdinkraSymbol';

const EmptyCart: React.FC = () => {
  return (
    <motion.div 
      className="text-center py-20 max-w-md mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="mb-6 flex justify-center relative"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center relative overflow-hidden glass-effect">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              type: "spring", 
              stiffness: 260, 
              damping: 20,
              delay: 0.4 
            }}
          >
            <ShoppingCart size={32} className="text-primary/70" />
          </motion.div>
          
          {/* Decorative adinkra background */}
          <div className="absolute inset-0 -z-10 opacity-10">
            <AdinkraSymbol symbol="nyameNti" size={80} opacity={0.2} />
          </div>
          
          {/* Ring animation */}
          <motion.div
            className="absolute inset-0 rounded-full border border-primary/30"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.2, 0.5]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </motion.div>
      
      <motion.h3 
        className="text-2xl font-playfair mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        Your cart is empty
      </motion.h3>
      
      <motion.p 
        className="text-muted-foreground mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        Browse our menu to add delicious items to your order
      </motion.p>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <Button 
          onClick={() => document.querySelector('[value="menu"]')?.dispatchEvent(new Event('click'))}
          className="group neo-glow relative overflow-hidden"
          size="lg"
        >
          <span className="relative z-10">View Menu</span>
          <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform relative z-10" />
          
          {/* Animated background */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary to-primary/80"
            initial={{ x: '-100%' }}
            whileHover={{ x: '0%' }}
            transition={{ duration: 0.4 }}
          />
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default EmptyCart;
