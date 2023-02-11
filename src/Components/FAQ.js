import React from 'react';
import { Card } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { GpsFixed, Search } from '@mui/icons-material';

const FAQ = () => {
  return (
    <>
      <Card
        sx={{
          minWidth: 250,
          width: { xs: 470, sm: 550, md: 250, lg: 350 },
          m: { xs: 2, sm: 2, md: 2 },
          mb: { xs: 0 },
        }}
      >
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
            FAQ
          </Typography>
          <Typography variant='h5' component='div'></Typography>
          <Typography sx={{ mb: 1.5 }} color='text.secondary'>
            To search for carparks near a landmark, click on{' '}
            <span>
              <Search />
            </span>
          </Typography>
          <Typography sx={{ mb: 1.5 }} color='text.secondary'>
            To search for carparks near your current location, click on{' '}
            <span>
              <GpsFixed />
            </span>
          </Typography>
          <Typography sx={{ mb: 1.5 }} color='text.secondary'>
            Ride safe & ride free!
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default FAQ;
