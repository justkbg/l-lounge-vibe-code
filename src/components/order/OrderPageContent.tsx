
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import OrderForm from '@/components/order/OrderForm';
import OrderItems from '@/components/order/OrderItems';
import { OrderItem } from '@/types/order';

const OrderPageContent: React.FC = () => {
  const [cart, setCart] = useState<OrderItem[]>([]);
  
  const addToCart = (item: OrderItem) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    
    if (existingItem) {
      // Update quantity if item already exists
      setCart(cart.map(cartItem => 
        cartItem.id === item.id 
          ? { ...cartItem, quantity: cartItem.quantity + 1 } 
          : cartItem
      ));
    } else {
      // Add new item with quantity 1
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };
  
  const removeFromCart = (itemId: number) => {
    setCart(cart.filter(item => item.id !== itemId));
  };
  
  const updateItemQuantity = (itemId: number, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(itemId);
      return;
    }
    
    setCart(cart.map(item => 
      item.id === itemId ? { ...item, quantity } : item
    ));
  };
  
  return (
    <div className="container-custom">
      <motion.h1 
        className="section-title text-4xl md:text-5xl font-playfair mb-6 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span className="gold-shimmer">Place Your Order</span>
        <span className="block h-1 w-20 bg-primary mx-auto mt-4 rounded"></span>
      </motion.h1>
      
      <motion.p 
        className="text-center text-lg md:text-xl max-w-2xl mx-auto mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Order our signature dishes and cocktails for pickup or delivery
      </motion.p>
      
      <Tabs defaultValue="menu" className="w-full">
        <div className="flex justify-center mb-12">
          <TabsList className="glass-effect">
            <TabsTrigger value="menu">Menu</TabsTrigger>
            <TabsTrigger value="checkout">Checkout {cart.length > 0 && `(${cart.length})`}</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="menu" className="animate-fade-in">
          <OrderItems addToCart={addToCart} />
        </TabsContent>

        <TabsContent value="checkout" className="animate-fade-in">
          <OrderForm 
            cart={cart} 
            removeFromCart={removeFromCart} 
            updateItemQuantity={updateItemQuantity} 
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OrderPageContent;
