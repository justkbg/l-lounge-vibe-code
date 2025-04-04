
import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email' }),
  phone: z.string().min(10, { message: 'Please enter a valid phone number' }),
  date: z.date({
    required_error: "Please select a date",
  }),
  time: z.string({
    required_error: "Please select a time",
  }),
  guests: z.string().min(1, "Please select the number of guests"),
  area: z.string().min(1, "Please select a seating area"),
  occasion: z.string().optional(),
  specialRequests: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const ReservationForm = () => {
  const { toast } = useToast();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      guests: '',
      area: '',
      occasion: '',
      specialRequests: '',
    },
  });

  function onSubmit(data: FormValues) {
    console.log(data);
    toast({
      title: "Reservation Requested",
      description: "Thank you for your reservation request. We'll confirm your booking shortly.",
    });
    form.reset();
  }

  const timeSlots = [
    "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM", 
    "8:00 PM", "8:30 PM", "9:00 PM", "9:30 PM", 
    "10:00 PM", "10:30 PM", "11:00 PM"
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Your email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input placeholder="Your phone number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="guests"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Number of Guests</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select number of guests" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num} {num === 1 ? 'Guest' : 'Guests'}
                      </SelectItem>
                    ))}
                    <SelectItem value="more">More than 12 (Large Party)</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Select date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="time"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Time</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select time">
                        {field.value ? (
                          <div className="flex items-center">
                            <Clock className="mr-2 h-4 w-4" />
                            <span>{field.value}</span>
                          </div>
                        ) : (
                          <span>Select time</span>
                        )}
                      </SelectValue>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {timeSlots.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="area"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Seating Area</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select seating area" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="main">Main Dining Area</SelectItem>
                    <SelectItem value="bar">Bar Area</SelectItem>
                    <SelectItem value="lounge">Lounge Seating</SelectItem>
                    <SelectItem value="private">Private Dining Room</SelectItem>
                    <SelectItem value="terrace">Outdoor Terrace</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="occasion"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Special Occasion (Optional)</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select if applicable" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="birthday">Birthday</SelectItem>
                    <SelectItem value="anniversary">Anniversary</SelectItem>
                    <SelectItem value="business">Business Dinner</SelectItem>
                    <SelectItem value="date">Date Night</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="specialRequests"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Special Requests (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="Any special requests or dietary requirements" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full md:w-auto">Request Reservation</Button>
      </form>
    </Form>
  );
};

const ReservationPolicy = () => {
  const policies = [
    {
      title: "Reservation Timing",
      description: "Reservations are held for 15 minutes past the scheduled time. Please call if you're running late to hold your table."
    },
    {
      title: "Cancellation Policy",
      description: "Cancellations must be made at least 24 hours in advance. Late cancellations may incur a fee."
    },
    {
      title: "Large Groups",
      description: "For parties of 8 or more, please contact us directly at +233 20 123 4567 for special arrangements."
    },
    {
      title: "Special Events",
      description: "For private events or buyouts, please email reservations@l-lounge.com with your requirements."
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {policies.map((policy, index) => (
        <div key={index} className="bento-card animate-fade-in" style={{ animationDelay: `${0.1 * index}s` }}>
          <h3 className="text-lg font-playfair font-bold text-primary mb-2">{policy.title}</h3>
          <p className="text-muted-foreground">{policy.description}</p>
        </div>
      ))}
    </div>
  );
};

const Reservations = () => {
  const [selectedTable, setSelectedTable] = useState<null | string>(null);
  
  // Simplified seating map data
  const tables = [
    { id: "t1", name: "Table 1", type: "main", status: "available" },
    { id: "t2", name: "Table 2", type: "main", status: "available" },
    { id: "t3", name: "Table 3", type: "main", status: "booked" },
    { id: "t4", name: "Table 4", type: "main", status: "available" },
    { id: "t5", name: "Table 5", type: "window", status: "available" },
    { id: "t6", name: "Table 6", type: "window", status: "booked" },
    { id: "b1", name: "Bar Seat 1", type: "bar", status: "available" },
    { id: "b2", name: "Bar Seat 2", type: "bar", status: "available" },
    { id: "l1", name: "Lounge 1", type: "lounge", status: "available" },
    { id: "p1", name: "Private Room", type: "private", status: "available" },
  ];

  const handleTableSelect = (tableId: string) => {
    setSelectedTable(tableId);
  };

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h1 className="section-title animate-fade-in">Book Your Table</h1>
            <p className="section-subtitle animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Reserve your exclusive L-Lounge experience with our easy booking system
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-12 mb-16">
            <div className="w-full lg:w-1/2 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <h2 className="text-2xl font-playfair font-bold text-primary mb-6">Make a Reservation</h2>
              <ReservationForm />
            </div>
            
            <div className="w-full lg:w-1/2 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <h2 className="text-2xl font-playfair font-bold text-primary mb-6">Seating Map</h2>
              <div className="bg-card p-6 rounded-xl border border-border">
                <p className="text-muted-foreground mb-4">Select a table to see more details. This is a simplified representation of our seating arrangement.</p>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {tables.map((table) => (
                    <button
                      key={table.id}
                      onClick={() => handleTableSelect(table.id)}
                      disabled={table.status === "booked"}
                      className={`
                        p-4 rounded-md text-center transition-colors duration-300
                        ${selectedTable === table.id ? 'bg-primary text-primary-foreground' : ''}
                        ${table.status === "booked" ? 'bg-muted cursor-not-allowed opacity-50' : 'bg-card hover:bg-card/80 border border-border'}
                      `}
                    >
                      <div className="text-sm font-medium">{table.name}</div>
                      <div className="text-xs mt-1 capitalize">{table.type}</div>
                    </button>
                  ))}
                </div>
                <div className="flex items-center justify-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-primary"></div>
                    <span>Available</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-muted"></div>
                    <span>Booked</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <h2 className="text-2xl font-playfair font-bold text-primary mb-6">Reservation Policy</h2>
            <ReservationPolicy />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Reservations;
