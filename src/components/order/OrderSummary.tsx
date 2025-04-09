
import React from 'react';
import { CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { OrderItem } from '@/types/order';

interface OrderSummaryProps {
  cart: OrderItem[];
  removeFromCart: (itemId: number) => void;
  updateItemQuantity: (itemId: number, quantity: number) => void;
  calculateTotal: () => number;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ 
  cart, 
  removeFromCart, 
  updateItemQuantity,
  calculateTotal
}) => {
  return (
    <CardContent>
      <ScrollArea className="h-[400px] pr-4">
        <div className="space-y-4">
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between items-start border-b pb-4">
              <div className="flex-1">
                <h4 className="font-medium">{item.name}</h4>
                <p className="text-sm text-muted-foreground">${item.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-6 w-6"
                  onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                >
                  -
                </Button>
                <span className="w-6 text-center">{item.quantity}</span>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-6 w-6"
                  onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                >
                  +
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-6 w-6 text-red-500" 
                  onClick={() => removeFromCart(item.id)}
                >
                  ×
                </Button>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      
      <div className="mt-6 pt-4 border-t">
        <div className="flex justify-between font-bold text-lg mb-2">
          <span>Total:</span>
          <span className="gold-shimmer">${calculateTotal().toFixed(2)}</span>
        </div>
        <p className="text-xs text-muted-foreground">
          Delivery charges may apply based on your location
        </p>
      </div>
    </CardContent>
  );
};

export default OrderSummary;
