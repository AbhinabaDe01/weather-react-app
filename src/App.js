import './App.css';
import { useState } from 'react';
import axios from 'axios';

import './output.css'

function App() {


  const [data, setData] = useState({})
  const [location, setLocation] = useState('')

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=954426cfa3a0793acfb28e9dbd059f78`

  const searchLocation = (event) => {
    if(event.key === 'Enter'){
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data)
      }).catch(e => {
        console.log(e)
      })
      setLocation('')
    }
    
  }

  return (
    <div className="App">
      <div className='mt-10 -mb-8 text-3xl font-bold text-fuchsia-600'>Weather App</div>
      <div className='container max-w-2xl mx-auto mt-20 p-8 rounded-3xl shadow-2xl'>
        <div className=''>
          <input 
          type='text'
          placeholder='enter location'
          className='text-black px-8 py-4 outline-none border-2 rounded-full w-72 hover:shadow-xl' 
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          />
        </div>
        <div className='flex justify-between mt-10 items-center'>
          <div className='text-left ml-11'>
            <h2 className='text-3xl'>{data.name}</h2>
            {data.main ? <p className='text-6xl font-semibold'>{(data.main.temp - 273).toFixed()}°C</p> : null}
          </div>
          <div>
            {data.main ? <p className='text-2xl mr-11'>{data.weather[0].main}</p> : null}
          </div>
        </div>

        <div className='flex flex-col md:flex-row justify-around mt-60 bg-blue-400 mx-10 px-6 py-4 items-center rounded-full hover:shadow-lg space-y-10 md:space-y-0'>
          {data.main ? <div>{(data.main.temp-273).toFixed()}°C</div> : null}
          <div><p>{data.main ? <div>{data.main.humidity} %</div> : null}</p><p>Humidity</p></div>
          <div><p>{data.wind ? <div>{data.wind.speed} KMPH</div> : null}</p><p>Wind Speed</p></div>
        </div>

      </div>
    </div>
  );
}

export default App;
