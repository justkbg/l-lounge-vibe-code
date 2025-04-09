
export interface OrderItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  quantity: number;
}

export interface Order {
  items: OrderItem[];
  customerInfo: {
    name: string;
    phone: string;
    email?: string;
    address?: string;
  };
  orderType: 'pickup' | 'delivery';
  paymentMethod: 'cash' | 'card' | 'momo';
  specialInstructions?: string;
  status: 'pending' | 'confirmed' | 'ready' | 'delivered' | 'completed';
  total: number;
  createdAt: Date;
}
