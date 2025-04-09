
import React from 'react';
import { Button } from '@/components/ui/button';

const EmptyCart: React.FC = () => {
  return (
    <div className="text-center py-20">
      <h3 className="text-2xl font-playfair mb-4">Your cart is empty</h3>
      <p className="text-muted-foreground mb-8">Browse our menu to add items to your order</p>
      <Button onClick={() => document.querySelector('[value="menu"]')?.dispatchEvent(new Event('click'))}>
        View Menu
      </Button>
    </div>
  );
};

export default EmptyCart;
