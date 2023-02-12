import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Menu from './Components/Menu';
import Home from './Components/Home';
import Carparks from './Components/Carparks';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function App() {
  const [LTAMalldata, setLTAMallData] = useState([]);
  const [HDBcarparksData, setHDBCarparksData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [retrievedTime, setRetrievedTime] = useState('');
  useEffect(() => {
    let apiCall = async () => {
      setLoading(true);
      try {
        let response = await axios.get(
          `https://api.data.gov.sg/v1/transport/carpark-availability`
        );
        setHDBCarparksData(response.data.items[0].carpark_data);
        // setRetrievedTime(response.data.items[0].timestamp);
        // console.log(response.data.items[0].timestamp);
        // let time = response.data.items[0].timestamp.slice(11, 16);
        // let year = response.data.items[0].timestamp.slice(2, 4);
        // let month = response.data.items[0].timestamp.slice(5, 7);
        // let day = response.data.items[0].timestamp.slice(8, 10);
        // console.log(day, month, year);
        // let formattedTimestamp = time + ' (HH:MM)';
        // setRetrievedTime(formattedTimestamp);
        setLoading(false);
      } catch (error) {
        console.error(error.message);
      }
    };
    apiCall();
  }, []);
  // console.log(HDBcarparksData, 'HDB');

  useEffect(() => {
    fetch('https://us-central1-motorcycle-avail.cloudfunctions.net/app/')
      .then((res) => res.json())
      .then((data) => setLTAMallData(data.value));
  }, []);

  let motorcycleDataURA = [];

  LTAMalldata.forEach((carpark) => {
    if (carpark.Agency === 'URA' || carpark.Agency === 'HDB') {
      if (carpark.LotType === 'Y') {
        motorcycleDataURA.push(carpark);
      }
    }
  });
  console.log(motorcycleDataURA, 'ura');

  return (
    <div className='App'>
      <BrowserRouter>
        <Menu />
        <Routes>
          <Route path='/' element={<Home carparksData={motorcycleDataURA} />} />
          <Route
            path='/carpark-list'
            element={<Carparks carparksData={motorcycleDataURA} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
