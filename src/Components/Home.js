import { useState } from 'react';
import { Link } from 'react-router-dom';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

import GMapGeoCode from './GMapGeoCode';
import { Box } from '@mui/system';

import { CircularProgress } from '@mui/material';

const Home = ({ carparksData }) => {
  const [userLocation, setUserLocation] = useState({});
  const [isLoaded, setIsLoaded] = useState(true);

  function distance(lat1, lon1, lat2, lon2, unit) {
    var radlat1 = (Math.PI * lat1) / 180;
    var radlat2 = (Math.PI * lat2) / 180;
    var theta = lon1 - lon2;
    var radtheta = (Math.PI * theta) / 180;
    var dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    if (unit === 'K') {
      dist = dist * 1.609344;
    }
    if (unit === 'N') {
      dist = dist * 0.8684;
    }
    return dist;
  }

  let data = [];

  carparksData.forEach((carpark, index) => {
    // console.log(carpark.Location.slice(0, carpark.Location.indexOf(' ')));
    // data['lat'] = carpark.Location.slice(0, carpark.Location.indexOf(' '));
    data['lng'] = carpark.Location.slice(
      carpark.Location.indexOf(' '),
      carpark.Location.length
    );
    data.push({
      lat: carpark.Location.slice(0, carpark.Location.indexOf(' ')),
      lng: carpark.Location.slice(
        carpark.Location.indexOf(' ') + 1,
        carpark.Location.length
      ),
      location: carpark.Development,
      available: carpark.AvailableLots,
    });
  });

  let poslat = userLocation.lat;
  let poslng = userLocation.lng;
  //   console.log(data, 'here');
  let nearestCarparks = [];

  for (let i = 0; i < data.length; i++) {
    // if this location is within 5KM of the user, add it to the list
    if (distance(poslat, poslng, data[i].lat, data[i].lng, 'K') <= 2) {
      nearestCarparks.push({
        location: data[i].location,
        available: data[i].available,
        distance: distance(
          poslat,
          poslng,
          data[i].lat,
          data[i].lng,
          'K'
        ).toFixed(1),
      });
    }
  }

  console.log(userLocation, 'currentlyhere');
  console.log(nearestCarparks);

  const handleClick = () => {
    setIsLoaded(false);
    navigator.geolocation.getCurrentPosition((pos) => {
      setUserLocation({
        ...userLocation,
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      });
    });
    setIsLoaded(true);
  };

  const columns: GridColDef[] = [
    {
      field: 'location',
      headerName: 'Location',
      width: 300,
      renderCell: (params) => (
        <Link to={`http://maps.google.com/?q=${params.value}`} target='_blank'>
          {params.value}
        </Link>
      ),
    },
    { field: 'distance', headerName: 'Distance Away', width: 140 },
    { field: 'available', headerName: 'Available Lots', width: 140 },
  ];

  const rows = nearestCarparks.map((carpark, index) => {
    return {
      id: index + 1,
      location: carpark.location.toUpperCase(),
      distance: carpark.distance,
      available: carpark.available,
    };
  });

  return (
    <div>
      <Box
        id='home-wrapper'
        display='flex'
        sx={{
          mx: 'auto',
          width: {
            sm: 600,
            md: 900,
            lg: 1320,
          },
          flexDirection: {
            xs: 'column',
            sm: 'column',
            md: 'row',
            lg: 'row',
          },
          justifyContent: 'space-between',
        }}
      >
        <div id='search-wrapper' className=''>
          <GMapGeoCode
            handleClick={handleClick}
            setUserLocation={setUserLocation}
            userLocation={userLocation}
            setIsLoaded={setIsLoaded}
          />
        </div>
        <Box
          sx={{
            display: 'flex',
            mx: 'auto',
            justifyContent: 'center',
            alignItems: 'center',
            width: {
              xs: 470,
              sm: 550,
              md: 600,
              lg: 1000,
            },
          }}
        >
          {isLoaded ? (
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              initialState={{
                sorting: {
                  sortModel: [{ field: 'lotsAvail', sort: 'desc' }],
                },
              }}
              sx={{
                m: { xs: 2, sm: 2, md: 2 },
                mt: { md: 4 },
                width: {
                  xs: 470,
                  sm: 550,
                  md: 600,
                  lg: 1000,
                },
                height: {
                  xs: 400,
                  sm: 400,
                  md: 400,
                  lg: 500,
                },
              }}
            />
          ) : (
            <CircularProgress />
          )}
        </Box>
      </Box>
    </div>
  );
};

export default Home;
