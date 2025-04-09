
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import MarcelloTypography from '@/components/marcello/MarcelloTypography';
import MarcelloComponents from '@/components/marcello/MarcelloComponents';
import MarcelloPatterns from '@/components/marcello/MarcelloPatterns';

const MarcelloShowcase: React.FC = () => {
  return (
    <Tabs defaultValue="components" className="w-full">
      <div className="flex justify-center mb-12">
        <TabsList className="glass-effect">
          <TabsTrigger value="components">Components</TabsTrigger>
          <TabsTrigger value="patterns">Patterns</TabsTrigger>
          <TabsTrigger value="typography">Typography</TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="components" className="animate-fade-in">
        <MarcelloComponents />
      </TabsContent>

      <TabsContent value="patterns" className="animate-fade-in">
        <MarcelloPatterns />
      </TabsContent>

      <TabsContent value="typography" className="animate-fade-in">
        <MarcelloTypography />
      </TabsContent>
    </Tabs>
  );
};

export default MarcelloShowcase;
