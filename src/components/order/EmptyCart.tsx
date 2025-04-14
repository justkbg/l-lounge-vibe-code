
import React from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingCart, ArrowRight } from 'lucide-react';

const EmptyCart: React.FC = () => {
  return (
    <div className="text-center py-20 max-w-md mx-auto">
      <div className="mb-6 flex justify-center">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
          <ShoppingCart size={32} className="text-primary/70" />
        </div>
      </div>
      <h3 className="text-2xl font-playfair mb-4">Your cart is empty</h3>
      <p className="text-muted-foreground mb-8">Browse our menu to add items to your order</p>
      <Button 
        onClick={() => document.querySelector('[value="menu"]')?.dispatchEvent(new Event('click'))}
        className="group"
      >
        View Menu
        <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
      </Button>
    </div>
  );
};

export default EmptyCart;
