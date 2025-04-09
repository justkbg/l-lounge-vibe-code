
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const MarcelloComponents: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {/* Marcello Button */}
      <Card className="spotlight-effect">
        <CardHeader>
          <CardTitle>Buttons</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <button className="marcello-minimal-button">Minimal Button</button>
          <button className="marcello-minimal-button with-x">
            Button with X
          </button>
          <button className="px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-all">
            Primary Button
          </button>
        </CardContent>
      </Card>

      {/* Marcello Cards */}
      <Card className="spotlight-effect">
        <CardHeader>
          <CardTitle>Cards</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="marcello-card p-4 border border-primary/20 rounded-md">
            <h3 className="text-lg font-bold">Marcello Card</h3>
            <p className="text-sm text-muted-foreground">Elegant design component</p>
          </div>
          <div className="marcello-frame p-4">
            <p className="text-sm">Framed content</p>
          </div>
        </CardContent>
      </Card>

      {/* Marcello Decorative Elements */}
      <Card className="spotlight-effect">
        <CardHeader>
          <CardTitle>Decorative Elements</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4">
          <div className="marcello-x"></div>
          <div className="marcello-divider"></div>
          <div className="marcello-circle">X</div>
        </CardContent>
      </Card>

      {/* Marcello Images */}
      <Card className="spotlight-effect">
        <CardHeader>
          <CardTitle>Image Treatments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="marcello-image-hover rounded-md overflow-hidden aspect-video">
            <img 
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=1370&q=80" 
              alt="Showcase" 
              className="w-full h-full object-cover"
            />
          </div>
        </CardContent>
      </Card>

      {/* Marcello Text Treatments */}
      <Card className="spotlight-effect">
        <CardHeader>
          <CardTitle>Text Treatments</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <span className="marcello-caption">Elegant Caption</span>
          <span className="marcello-bold-text text-lg">Bold Statement</span>
          <a href="#" className="marcello-underline">Animated Link</a>
        </CardContent>
      </Card>

      {/* Marcello Patterns */}
      <Card className="spotlight-effect">
        <CardHeader>
          <CardTitle>Background Patterns</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="h-20 marcello-x-pattern rounded-md"></div>
          <div className="h-20 marcello-x-background rounded-md"></div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MarcelloComponents;
