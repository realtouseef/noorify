import {
  Card,
  CardContent,
  CardDescription,
  MarketingHeader,
} from '@/app/components';
import React from 'react';

const Canvas: React.FunctionComponent = () => {
  return (
    <>
      <MarketingHeader />
      <Card className='w-max max-w-2xl mx-auto'>
        <CardContent>
          <CardDescription>Verse goes here</CardDescription>
        </CardContent>
      </Card>
    </>
  );
};

export default Canvas;
