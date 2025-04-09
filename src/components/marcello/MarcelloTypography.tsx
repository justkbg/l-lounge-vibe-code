
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const MarcelloTypography: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <Card className="spotlight-effect">
        <CardHeader>
          <CardTitle>Headings</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <h1 className="text-4xl font-playfair font-bold">Heading 1</h1>
          <h2 className="text-3xl font-playfair font-bold">Heading 2</h2>
          <h3 className="text-2xl font-playfair font-bold">Heading 3</h3>
          <h4 className="text-xl font-playfair font-bold">Heading 4</h4>
          <h5 className="text-lg font-playfair font-bold">Heading 5</h5>
        </CardContent>
      </Card>

      <Card className="spotlight-effect">
        <CardHeader>
          <CardTitle>Specialty Text</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <span className="marcello-caption">Elegant Caption</span>
          <span className="gold-shimmer text-2xl">Gold Shimmer Text</span>
          <p className="font-playfair italic text-muted-foreground">Elegant italic text</p>
          <a href="#" className="marcello-underline">Animated underline link</a>
          <span className="marcello-bold-text">Bold statement text</span>
        </CardContent>
      </Card>

      <Card className="spotlight-effect col-span-1 md:col-span-2">
        <CardHeader>
          <CardTitle>Typography Scale</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-xs mb-2">Extra Small (xs)</p>
              <p className="text-xs text-muted-foreground">The quick brown fox jumps over the lazy dog.</p>
            </div>
            <div>
              <p className="text-sm mb-2">Small (sm)</p>
              <p className="text-sm text-muted-foreground">The quick brown fox jumps over the lazy dog.</p>
            </div>
            <div>
              <p className="text-base mb-2">Base (base)</p>
              <p className="text-base text-muted-foreground">The quick brown fox jumps over the lazy dog.</p>
            </div>
            <div>
              <p className="text-lg mb-2">Large (lg)</p>
              <p className="text-lg text-muted-foreground">The quick brown fox jumps over the lazy dog.</p>
            </div>
            <div>
              <p className="text-xl mb-2">Extra Large (xl)</p>
              <p className="text-xl text-muted-foreground">The quick brown fox jumps over the lazy dog.</p>
            </div>
            <div>
              <p className="text-2xl mb-2">2XL (2xl)</p>
              <p className="text-2xl text-muted-foreground">The quick brown fox jumps over the lazy dog.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MarcelloTypography;
