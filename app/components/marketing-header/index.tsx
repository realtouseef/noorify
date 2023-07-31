import React from 'react';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/app/components';

const MarketingHeader = () => {
  return (
    <>
      <Card className='text-center'>
        <CardHeader>
          <CardTitle>
            <Button variant='outline' className='h-0 p-2 text-xs'>
              Try it now
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardTitle className='mt-2 mb-6'>
            Open-source Verse Image Generator
          </CardTitle>
          <CardDescription className='text-base'>
            Create beautiful background images with verses from quran on top of
            them.
          </CardDescription>
          <Button variant='link' className='pl-0'>
            Star on GitHub
          </Button>
        </CardContent>
      </Card>
    </>
  );
};

export default MarketingHeader;
