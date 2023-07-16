import React, { useState } from 'react'
import './App.css'

const Api = {
  key: "837406f2258df7d1b0861e39c3e6057d",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  
  const [query, setQuery] = useState('');
    const [weather, setWeather] = useState({});

    const search = event => {
        if(event.key === "Enter"){
            fetch(`${Api.base}weather?q=${query}&units=metric&APPID=${Api.key}`)
            .then(response => response.json())
            .then(data => {setWeather(data); setQuery(''); /* console.log(data) */ console.log(weather);});
        }
    }

  return (
    <div className="container">
        <input type='text' className="search-input" placeholder="City..." value={query} onChange={e=>setQuery(e.target.value)} onKeyDown={search}/>

      {(typeof weather.main != "undefined" ?
        <>
        <div className="city"><h1>Weather in {weather.name}, {weather.sys.country}</h1></div>
        <div className="header">
          <div className="state">
            <h3>{weather.weather[0].main}</h3>
            <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="icon" />
          </div>
          <h1>{Math.round(weather.main.temp)}°C</h1>
        </div>

        <div className="info">
          <div className="temp">
            <h4>{weather.main.feels_like.toFixed(0)}°C</h4>
            <span>Feels like</span>
          </div>
          <div className="hmty">
            <h4>{weather.main.humidity}%</h4>
            <span>Humidity</span>
          </div>
          <div className="wind">
            <h4>{weather.wind.speed.toFixed(0)}MPH</h4>
            <span>Winds</span>
          </div>
        </div>
        </>
        : (''))}
      </div>
  )
}

export default App
