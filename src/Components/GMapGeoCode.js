import axios from 'axios';
import { useState, useEffect } from 'react';
import { Search, GpsFixed } from '@mui/icons-material';
import { TextField, InputAdornment, IconButton, Box } from '@mui/material';
import FAQ from './FAQ';

const GMapGeoCode = ({
  handleClick,
  setUserLocation,
  userLocation,
  setIsLoaded,
}) => {
  let [userInput, setUserInput] = useState('');
  let [geocodeLocation, setGeocodeLocation] = useState(userInput);

  useEffect(() => {
    setGeocodeLocation(userInput);
  }, [userInput]);

  const callGeocodeAPI = async () => {
    const config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `http://localhost:3001/search`,
      params: { address: userInput },
    };

    axios(config)
      .then(function (response) {
        setUserInput('');
        console.log(response.data.results[0].geometry.location, 'from new');
        setUserLocation({
          ...userLocation,
          lat: response.data.results[0].geometry.location.lat,
          lng: response.data.results[0].geometry.location.lng,
        });
        setIsLoaded(true);
        return response.data.results[0].geometry.location;
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleChange = (e) => {
    setUserInput(e.currentTarget.value);
  };

  return (
    <div>
      <Box>
        <TextField
          sx={{
            alignSelf: 'center',
            m: { xs: 2, sm: 2, md: 2 },
            mt: {
              xs: 2,
              md: 4,
            },
            mb: {
              xs: 0,
            },
            width: { xs: 470, sm: 550, md: 250, lg: 350 },
          }}
          value={userInput}
          onChange={handleChange}
          label='Search Carparks'
          InputProps={{
            endAdornment: (
              <InputAdornment position='start'>
                <IconButton onClick={callGeocodeAPI}>
                  <Search />
                </IconButton>
                <IconButton onClick={handleClick}>
                  <GpsFixed />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <FAQ />
      </Box>
    </div>
  );
};

export default GMapGeoCode;
