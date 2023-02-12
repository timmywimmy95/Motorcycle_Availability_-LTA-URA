/* eslint-disable */

const functions = require('firebase-functions');

// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const axios = require('axios');
const PORT = 3001;

// process.env.PORT

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

exports.app = functions.https.onRequest(app);
