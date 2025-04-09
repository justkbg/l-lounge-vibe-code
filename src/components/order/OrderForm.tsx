
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { OrderItem } from '@/types/order';

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
    return (
      <div className="text-center py-20">
        <h3 className="text-2xl font-playfair mb-4">Your cart is empty</h3>
        <p className="text-muted-foreground mb-8">Browse our menu to add items to your order</p>
        <Button onClick={() => document.querySelector('[value="menu"]')?.dispatchEvent(new Event('click'))}>
          View Menu
        </Button>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium">
                    Name *
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="phone" className="block text-sm font-medium">
                    Phone *
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="orderType" className="block text-sm font-medium">
                  Order Type
                </label>
                <select
                  id="orderType"
                  name="orderType"
                  value={formData.orderType}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-input bg-background px-3 py-2"
                >
                  <option value="pickup">Pickup</option>
                  <option value="delivery">Delivery</option>
                </select>
              </div>
              
              {formData.orderType === 'delivery' && (
                <div className="space-y-2">
                  <label htmlFor="address" className="block text-sm font-medium">
                    Delivery Address *
                  </label>
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required={formData.orderType === 'delivery'}
                  />
                </div>
              )}
              
              <div className="space-y-2">
                <label htmlFor="paymentMethod" className="block text-sm font-medium">
                  Payment Method
                </label>
                <select
                  id="paymentMethod"
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-input bg-background px-3 py-2"
                >
                  <option value="cash">Cash on Delivery/Pickup</option>
                  <option value="card">Card on Delivery/Pickup</option>
                  <option value="momo">Mobile Money</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="specialInstructions" className="block text-sm font-medium">
                  Special Instructions
                </label>
                <textarea
                  id="specialInstructions"
                  name="specialInstructions"
                  value={formData.specialInstructions}
                  onChange={handleInputChange}
                  className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2"
                ></textarea>
              </div>
              
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                Place Order
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
      
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
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
        </Card>
      </div>
    </div>
  );
};

export default OrderForm;
