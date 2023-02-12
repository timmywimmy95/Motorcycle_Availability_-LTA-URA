require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const axios = require('axios');
const PORT = process.env.PORT || 3001;

app.use(
  cors({
    origin: '*',
  })
);

app.get('/', (req, res) => {
  const config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'http://datamall2.mytransport.sg/ltaodataservice/CarParkAvailabilityv2',
    headers: {
      AccountKey: `${process.env.API_KEY}`,
    },
  };
  axios(config)
    .then(function (response) {
      res.json(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
});

app.get('/search', (req, res) => {
  const config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `https://maps.googleapis.com/maps/api/geocode/json?`,
    params: {
      key: `${process.env.REACT_APP_API_KEY}`,
      address: `${req.query.address}Singapore`,
    },
  };

  axios(config)
    .then(function (response) {
      res.json(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
});

app.get('/search', (req, res) => {
  res.json('gmap');
});

app.listen(PORT, () => {
  console.log(`Server Listening onnn ${PORT}`);
});
