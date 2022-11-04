import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'

import { useState, useEffect } from "react";
import axios from "axios";


function Hi() {

    const [data, setData] = useState(0);
    const [cityName, setCityName] = useState("");
  const [weather, setWeather] = useState({});

  const submitHandler = (e) => {
    e.preventDefault();

    console.log("city: " + cityName);

    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=e0f99c494c2ce394a18cc2fd3f100543&units=metric`)
      .then(function (response) {

        console.log("data: ", response.data);

        setWeather(response.data)

      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  }

    useEffect(() => {
        const getWeather =()=>{
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${'cityName'}&appid=e0f99c494c2ce394a18cc2fd3f100543&units=metric`)
            .then(function (response) {
                console.log("data: ", response.data);
                setWeather(response.data)
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    getWeather();
},[])
    return <div id='container'>
        
        <h1>
            Weather App
        </h1>
        <form onSubmit={submitHandler}>

            <input
            type="text"
            placeholder='Enter City Name'
            onChange={(e) =>{
                setCityName(e.target.value)
            }}
            />
<br />
<br />
            <button type="submit"><b>Get Weather</b></button>
            </form>

            <br />
            {(weather?.name)?

            <div id='resultbox'>
                <div id='result'>Weather of {weather?.name}</div>
                <div id='result'>Current Temp {weather?.main?.temp}</div>
                <div id='result'>Temp Max {weather?.main.temp_max}</div>
                <div id='result'>Temp Max {weather?.main.temp_min}</div>
            </div>
            :
            null
}
    </div>
}

ReactDOM.render(<Hi />, document.querySelector('#root'));