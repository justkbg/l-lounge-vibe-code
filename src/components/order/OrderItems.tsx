
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { OrderItem } from '@/types/order';
import { menuItems } from '@/data/orderData';

interface OrderItemsProps {
  addToCart: (item: OrderItem) => void;
}

const OrderItems: React.FC<OrderItemsProps> = ({ addToCart }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {menuItems.map((item) => (
        <Card key={item.id} className="marcello-card overflow-hidden">
          <div className="relative h-48">
            <img 
              src={item.image} 
              alt={item.name} 
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
            <div className="absolute top-2 right-2 bg-primary/80 text-primary-foreground px-2 py-1 rounded-full text-xs">
              {item.category}
            </div>
          </div>
          
          <CardHeader>
            <CardTitle className="font-playfair">{item.name}</CardTitle>
            <CardDescription>{item.description}</CardDescription>
          </CardHeader>
          
          <CardContent>
            <p className="text-lg font-bold gold-shimmer">${item.price.toFixed(2)}</p>
          </CardContent>
          
          <CardFooter className="flex justify-between">
            <Button 
              onClick={() => addToCart({...item, quantity: 1})} 
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Add to Order
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default OrderItems;
