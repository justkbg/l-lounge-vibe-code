
import React from 'react';
import { CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

interface OrderFormContactProps {
  formData: {
    name: string;
    phone: string;
    email: string;
    address: string;
    orderType: string;
    paymentMethod: string;
    specialInstructions: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const OrderFormContact: React.FC<OrderFormContactProps> = ({ 
  formData, 
  handleInputChange 
}) => {
  return (
    <CardContent>
      <form className="space-y-6">
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
      </form>
    </CardContent>
  );
};

export default OrderFormContact;
