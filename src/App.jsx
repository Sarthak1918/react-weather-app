import React, { useState } from "react";
import './app.css';

const api = {
  key: "ffcbb5402262cde738c157a54cb05d87",
  base: "https://api.openweathermap.org/data/2.5/"

}


function App() {

  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState({

    "weather": [
      {
        "id": "--",
        "main": "--",
        "description": "--",
        "icon": "--"
      }
    ],
    "base": "--",
    "main": {
      "temp": "--",
      "feels_like": "--",
      "temp_min": "--",
      "temp_max": "--",
      "pressure": "--",
      "humidity": "--"
    },

    "wind": {
      "speed": "--",
      "deg": "--"
    },
    "clouds": {
      "all": "--"
    },
    "name": "Search For City"

  });

  const searchStart = (e) => {
    e.preventDefault();
    searchPressed();
  }


  const searchPressed = () => {
    fetch(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        setWeather(result);
        console.log(result);
      })
  }






  return (
    <div className="body">
      <form onSubmit={searchStart} className="searcharea">
        <div className="search">
          <input type="search" placeholder="Search location..." onChange={(e) => setSearch(e.target.value)} />
          <button type="submit">Search</button>
        </div>
      </form>


      <div className="top">
        <div className="location">
          {weather.name}
        </div>


        <div className="temp">
          {Math.floor(weather.main.temp || 0) || "--"}°C
        </div>
        <div className="description">
          {weather.weather && weather.weather[0].description}
        </div>

      </div>

      <div className="footer">
        <div className="bottom">
          <div className="feels">
            <div>
              {weather.main.feels_like}{weather.main.feels_like !="--" && "°C"}
            </div>
            <div>
              Feels Like
            </div>
          </div>


          <div className="humidity">
            <div>
              {weather.main.humidity}{weather.main.humidity !== "--" && "%"}
            </div>
            <div>
              Humidity
            </div>
          </div>
          <div className="wind">
            <div>
              {weather.wind.speed}{weather.wind.speed !== "--" && "M/S"}
            </div>
            <div>
              Wind
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
