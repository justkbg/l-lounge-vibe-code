
import React, { useEffect, useState } from 'react';
import { MapPin, Phone, Mail, Send, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AdinkraBackground from '@/components/3d/AdinkraBackground';
import FloatingElement from '@/components/3d/FloatingElement';
import { adinkraSymbols } from '@/assets/cultural-textures/adinkra-symbols';

const ContactPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ghanaTime, setGhanaTime] = useState<string>('');

  // Update Ghana time
  useEffect(() => {
    const updateGhanaTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Africa/Accra',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      };
      setGhanaTime(new Date().toLocaleTimeString('en-US', options));
    };
    
    updateGhanaTime();
    const timer = setInterval(updateGhanaTime, 1000);
    
    return () => clearInterval(timer);
  }, []);

  // Create cursor trail effect
  useEffect(() => {
    const cursorTrailElements: HTMLDivElement[] = [];
    const numTrails = 7;
    
    for (let i = 0; i < numTrails; i++) {
      const trail = document.createElement('div');
      trail.className = 'cursor-trail';
      document.body.appendChild(trail);
      cursorTrailElements.push(trail);
    }
    
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      
      cursorTrailElements.forEach((trail, index) => {
        setTimeout(() => {
          trail.style.left = `${clientX}px`;
          trail.style.top = `${clientY}px`;
          trail.style.opacity = `${0.8 - (index * 0.1)}`;
          trail.style.width = `${10 - index}px`;
          trail.style.height = `${10 - index}px`;
        }, index * 40);
      });
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      cursorTrailElements.forEach(trail => {
        document.body.removeChild(trail);
      });
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message Sent",
        description: "We've received your message and will get back to you soon!",
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <>
      <Navbar />
      
      {/* Add Adinkra background */}
      <AdinkraBackground symbol="random" density={0.3} />
      
      <main className="pt-24 pb-20 relative overflow-hidden">
        <div className="container-custom relative z-10">
          <div className="flex justify-end mb-6">
            <div className="ghana-time" title="Current time in Ghana">
              {ghanaTime} GMT (Accra)
            </div>
          </div>
          
          <div className="text-center mb-16 fade-up">
            <div className="sankofa-symbol mb-4" style={{ animation: 'pulse-glow 2s infinite' }}></div>
            <h1 className="section-title kinetic-text">Contact Us</h1>
            <p className="section-subtitle gold-shimmer">
              Connect with L-Lounge for inquiries, reservations, and private events
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative">
            {/* Floating info cards */}
            <div className="space-y-8 stagger-fade">
              <FloatingElement className="glass-card p-6" depth={15} glowColor="rgba(255, 157, 0, 0.4)">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-gradient-to-br from-[#FFD700] to-[#FF9900] neo-glow">
                    <MapPin className="text-primary-foreground h-6 w-6" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg font-playfair font-bold text-primary mb-1 kente-border">Our Location</h3>
                    <p className="text-muted-foreground">123 Independence Avenue</p>
                    <p className="text-muted-foreground">Accra, Ghana</p>
                  </div>
                </div>
              </FloatingElement>
              
              <FloatingElement className="glass-card p-6" depth={15} glowColor="rgba(255, 157, 0, 0.4)">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-gradient-to-br from-[#FFD700] to-[#FF9900] neo-glow">
                    <Phone className="text-primary-foreground h-6 w-6" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg font-playfair font-bold text-primary mb-1 kente-border">Call Us</h3>
                    <p className="text-muted-foreground">+233 20 123 4567</p>
                    <p className="text-muted-foreground">+233 30 987 6543</p>
                  </div>
                </div>
              </FloatingElement>
              
              <FloatingElement className="glass-card p-6" depth={15} glowColor="rgba(255, 157, 0, 0.4)">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-gradient-to-br from-[#FFD700] to-[#FF9900] neo-glow">
                    <Mail className="text-primary-foreground h-6 w-6" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg font-playfair font-bold text-primary mb-1 kente-border">Email Us</h3>
                    <p className="text-muted-foreground">info@l-lounge.com</p>
                    <p className="text-muted-foreground">reservations@l-lounge.com</p>
                  </div>
                </div>
              </FloatingElement>
              
              <FloatingElement className="glass-card p-6" depth={15} glowColor="rgba(255, 157, 0, 0.4)">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-gradient-to-br from-[#FFD700] to-[#FF9900] neo-glow">
                    <Clock className="text-primary-foreground h-6 w-6" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg font-playfair font-bold text-primary mb-1 kente-border">Opening Hours</h3>
                    <p className="text-muted-foreground">Monday - Thursday: 4PM - 1AM</p>
                    <p className="text-muted-foreground">Friday - Sunday: 4PM - 3AM</p>
                  </div>
                </div>
              </FloatingElement>
            </div>
            
            {/* Contact form with enhanced styling */}
            <FloatingElement className="glass-card p-8 fade-up" depth={10}>
              <form onSubmit={handleSubmit} className="space-y-6">
                <h2 className="text-2xl font-playfair font-bold text-primary mb-4 kente-border">Send Us a Message</h2>
                
                <div className="space-y-4">
                  <div>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your Name"
                      required
                      className="bg-black/20 border-white/10 text-white placeholder:text-gray-400 focus:border-primary neo-glow"
                    />
                  </div>
                  
                  <div>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Your Email"
                      required
                      className="bg-black/20 border-white/10 text-white placeholder:text-gray-400 focus:border-primary neo-glow"
                    />
                  </div>
                  
                  <div>
                    <Input
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Subject"
                      required
                      className="bg-black/20 border-white/10 text-white placeholder:text-gray-400 focus:border-primary neo-glow"
                    />
                  </div>
                  
                  <div>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Your Message"
                      required
                      rows={5}
                      className="bg-black/20 border-white/10 text-white placeholder:text-gray-400 focus:border-primary neo-glow resize-none"
                    />
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-[#FFD700] to-[#FF9900] hover:from-[#FF9900] hover:to-[#FFD700] text-primary-foreground font-medium py-2 rounded-md transition-all hover-float btn-hover-effect"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="loading-adinkra w-5 h-5" dangerouslySetInnerHTML={{ __html: adinkraSymbols.adinkrahene }}></div>
                      <span>Sending...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 justify-center">
                      <span>Send Message</span>
                      <Send className="h-4 w-4" />
                    </div>
                  )}
                </Button>
              </form>
            </FloatingElement>
          </div>
          
          <div className="kente-divider my-16"></div>
          
          {/* Map section */}
          <FloatingElement className="w-full rounded-2xl overflow-hidden glass-card mt-10 fade-up" depth={5}>
            <div className="aspect-video w-full relative">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.9735705835837!2d-0.18686858521906195!3d5.5756045959564765!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf9c9933da4505%3A0x32db627e697fce0a!2sAccra%2C%20Ghana!5e0!3m2!1sen!2sus!4v1650045226412!5m2!1sen!2sus"
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="L-Lounge Location"
                className="grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
              ></iframe>
              
              {/* Map overlay with Adinkra pattern */}
              <div className="absolute inset-0 pointer-events-none adinkra-pattern opacity-10"></div>
              
              {/* Location marker */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-bounce">
                <div className="w-8 h-8 bg-gradient-to-br from-[#FFD700] to-[#FF9900] rounded-full flex items-center justify-center neo-glow">
                  <MapPin className="text-primary-foreground h-4 w-4" />
                </div>
                <div className="w-3 h-10 bg-gradient-to-b from-[#FFD700] to-transparent absolute -bottom-10 left-1/2 transform -translate-x-1/2"></div>
              </div>
            </div>
          </FloatingElement>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default ContactPage;
