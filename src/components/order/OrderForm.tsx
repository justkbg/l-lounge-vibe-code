
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { OrderItem } from '@/types/order';
import OrderFormContact from './OrderFormContact';
import OrderSummary from './OrderSummary';
import EmptyCart from './EmptyCart';

interface OrderFormProps {
  cart: OrderItem[];
  removeFromCart: (itemId: number) => void;
  updateItemQuantity: (itemId: number, quantity: number) => void;
}

const OrderForm: React.FC<OrderFormProps> = ({ 
  cart, 
  removeFromCart, 
  updateItemQuantity 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    orderType: 'pickup',
    paymentMethod: 'cash',
    specialInstructions: ''
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.phone) {
      toast({
        title: "Missing information",
        description: "Please fill out all required fields",
        variant: "destructive"
      });
      return;
    }
    
    // Submit order logic would go here
    toast({
      title: "Order placed successfully!",
      description: "We'll contact you shortly to confirm your order",
    });
    
    // Reset form
    setFormData({
      name: '',
      phone: '',
      email: '',
      address: '',
      orderType: 'pickup',
      paymentMethod: 'cash',
      specialInstructions: ''
    });
  };
  
  if (cart.length === 0) {
    return <EmptyCart />;
  }
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          
          <OrderFormContact 
            formData={formData}
            handleInputChange={handleInputChange}
          />
          
          <div className="p-6 pt-0">
            <Button 
              type="submit" 
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              onClick={handleSubmit}
            >
              Place Order
            </Button>
          </div>
        </Card>
      </div>
      
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          
          <OrderSummary 
            cart={cart}
            removeFromCart={removeFromCart}
            updateItemQuantity={updateItemQuantity}
            calculateTotal={calculateTotal}
          />
        </Card>
      </div>
    </div>
  );
};

export default OrderForm;
