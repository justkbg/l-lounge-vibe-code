
import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email' }),
  phone: z.string().min(10, { message: 'Please enter a valid phone number' }),
  subject: z.string().min(5, { message: 'Subject must be at least 5 characters' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters' }),
});

type FormValues = z.infer<typeof formSchema>;

const ContactForm = () => {
  const { toast } = useToast();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    },
  });

  function onSubmit(data: FormValues) {
    console.log(data);
    toast({
      title: "Message Sent",
      description: "Thank you for contacting L-Lounge. We'll be in touch soon!",
    });
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
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
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subject</FormLabel>
                <FormControl>
                  <Input placeholder="Message subject" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Your message" 
                  className="min-h-[150px]" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full md:w-auto">Send Message</Button>
      </form>
    </Form>
  );
};

const ContactInfo = () => {
  const contactItems = [
    {
      icon: <MapPin className="h-6 w-6 text-primary" />,
      title: "Address",
      details: ["123 Independence Avenue", "Accra, Ghana"],
    },
    {
      icon: <Phone className="h-6 w-6 text-primary" />,
      title: "Phone",
      details: ["+233 20 123 4567", "+233 30 123 4567"],
    },
    {
      icon: <Mail className="h-6 w-6 text-primary" />,
      title: "Email",
      details: ["info@l-lounge.com", "reservations@l-lounge.com"],
    },
    {
      icon: <Clock className="h-6 w-6 text-primary" />,
      title: "Opening Hours",
      details: [
        "Monday - Thursday: 4:00 PM - 12:00 AM",
        "Friday - Saturday: 4:00 PM - 2:00 AM",
        "Sunday: 12:00 PM - 10:00 PM"
      ],
    },
  ];

  return (
    <div className="space-y-8">
      {contactItems.map((item, index) => (
        <div key={index} className="flex items-start gap-4 animate-fade-in" style={{ animationDelay: `${0.1 * index}s` }}>
          <div className="bg-card p-3 rounded-full">{item.icon}</div>
          <div>
            <h3 className="text-lg font-playfair font-bold text-primary mb-1">{item.title}</h3>
            <div className="space-y-1">
              {item.details.map((detail, idx) => (
                <p key={idx} className="text-muted-foreground">{detail}</p>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const GoogleMap = () => {
  return (
    <div className="h-[300px] md:h-[400px] rounded-xl overflow-hidden border border-border">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31767.036535327266!2d-0.21861562089837327!3d5.576927136608337!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf9084b2b7a773%3A0xbed14ed8650e2dd3!2sAccra%2C%20Ghana!5e0!3m2!1sen!2sus!4v1712211391811!5m2!1sen!2sus"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

const Contact = () => {
  return (
    <>
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h1 className="section-title animate-fade-in">Contact Us</h1>
            <p className="section-subtitle animate-fade-in" style={{ animationDelay: '0.2s' }}>
              We'd love to hear from you. Reach out for inquiries, feedback, or to book your experience.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <h2 className="text-2xl font-playfair font-bold text-primary mb-6">Get in Touch</h2>
              <ContactForm />
            </div>
            
            <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <h2 className="text-2xl font-playfair font-bold text-primary mb-6">Contact Information</h2>
              <ContactInfo />
            </div>
          </div>

          <div className="animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <h2 className="text-2xl font-playfair font-bold text-primary mb-6">Find Us</h2>
            <GoogleMap />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Contact;
