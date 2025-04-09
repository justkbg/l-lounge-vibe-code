
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const MarcelloPatterns: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <Card className="spotlight-effect">
        <CardHeader>
          <CardTitle>X Pattern</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="marcello-x-pattern h-40 w-full rounded-md"></div>
          <p className="mt-4 text-sm text-muted-foreground">
            The X pattern is a signature element in the Marcello design system, 
            representing luxury and attention to detail.
          </p>
        </CardContent>
      </Card>

      <Card className="spotlight-effect">
        <CardHeader>
          <CardTitle>Background X</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="marcello-x-background h-40 w-full rounded-md"></div>
          <p className="mt-4 text-sm text-muted-foreground">
            Large X background elements add depth and sophistication to layouts.
          </p>
        </CardContent>
      </Card>

      <Card className="spotlight-effect">
        <CardHeader>
          <CardTitle>Dividers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="marcello-divider"></div>
          <p className="mt-4 text-sm text-muted-foreground">
            Elegant dividers with the X motif create visual separation while maintaining design consistency.
          </p>
        </CardContent>
      </Card>

      <Card className="spotlight-effect">
        <CardHeader>
          <CardTitle>Frame Treatments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="marcello-frame p-6 text-center">
            <p>Framed Content</p>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Frame treatments add a luxurious border to content.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default MarcelloPatterns;
