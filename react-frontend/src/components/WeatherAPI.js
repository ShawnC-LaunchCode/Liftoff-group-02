import { useState } from 'react';
import axios from 'axios';
import './WeatherAPI.css';

export default function WeatherAPI() {

    const [data, setData] = useState({});
    const [location, setLocation] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const OPEN_WEATHER_API_KEY = process.env.REACT_APP_OPEN_WEATHER_API_KEY;
    const OPEN_WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=dd08a0981bd7ccbc7cef7495a7d12a69`;


    const searchlocation = (event) => {
        if (event.key === 'Enter') {
            axios.get(OPEN_WEATHER_API_URL).then((response) => {
                setErrorMsg('');
                setData(response.data);
                console.log(response.data);
            }).catch((error) => {
                setErrorMsg(error.response.data.message);
                setData({});
            });

            setLocation('');
        }
    }

    return (
        <div className='weather-design'>

            <div className='search'>

                <input className='input'
                    type='text'
                    value={location}
                    onChange={event => setLocation(event.target.value)}
                    placeholder='Enter Location'
                    onKeyDown={searchlocation}
                />

                <div>
                    <h2>{errorMsg}</h2>
                </div>

            </div>
            <div className='container'>
                <div className='top'>
                    <p>{data.name}</p>
                </div>

                <div className='temp'>
                    {data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : null}
                </div>

                <div className='description'>
                    {data.weather ? <p>{data.weather[0].main}</p> : null}
                </div>

                {data.name !== undefined &&

                    <div>

                        <div className='feels'>
                            {data.main ? <p>Feels Like {data.main.feels_like.toFixed()}°F</p> : null}
                        </div>

                        <div className='humidity'>
                            {data.main ? <p>{data.main.humidity}% Humidity</p> : null}
                        </div>

                        <div className='wind'>
                            {data.wind ? <p>Wind Speed {data.wind.speed.toFixed()}MPH</p> : null}
                        </div>

                    </div>
                }
            </div>
        </div>
    )

}