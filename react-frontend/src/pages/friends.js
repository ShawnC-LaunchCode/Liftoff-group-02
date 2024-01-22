import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import React, { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import withCredentials from '../components/withCredentials.js';
import 'semantic-ui-css/semantic.min.css';
import '../index.css';
import Logout from '../components/logout.js';
import WeatherModal from '../components/WeatherModal.js';
import { Dropdown } from 'semantic-ui-react'



function FriendsPage(){
  const [isWeatherModalOpen, setWeatherModalOpen] = useState(false);
  const [allEvents, setAllEvents] = useState([]);
  const [error, setError] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [createEvent, setCreateEvent] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [userView, setUserView] = useState(null);
  const [user, setUser] = useState(null);

  const loadEventsByUser = async(user) => {
    try {
      const response = await axios.get('http://localhost:8080/api/events/' + user, withCredentials());
      setAllEvents(response.data);
    } catch (error) {
      setError(error.message);
    }
  };

  const userlist = async() => {
try {
  const response = await axios.get('http://localhost:8080/api/users', withCredentials());
  const userArray = [];

  for(let i = 0; i < response.data.length; i++){
    var keyValueObject = {
      key: response.data[i].id,
      value: response.data[i].username,
      text: response.data[i].username
    };
    userArray.push(keyValueObject);
  }
      setAllUsers(userArray.filter(item => item.value !== user ));
    } catch (error) {
      setError(error.message);
    }
};



  const openWeatherModal = () => {
    setWeatherModalOpen(true);
  };

  const closeWeatherModal = () => {
    setWeatherModalOpen(false);
    loadEventsByUser(userView);
  };

  
  const locales = {
    "en-US": require("date-fns/locale/en-US")
  };

  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales
  });

  const handleUserChange = (event, {value})=>{
    setUserView(value);
    loadEventsByUser(value);
  }


  const getLoggedInUser = async() => {
    try {
      const response = await axios.get('http://localhost:8080/sessions/user', withCredentials());
      setUser(response.data.username);
    } catch (error) {
      setError(error.message);
    }
  }
  
  useEffect(() => {
    const fetchData = async()=>{
        await getLoggedInUser();
        userlist();
    }
    fetchData();
  }, [user]);

  return (
    <div className="App">
      <nav>
    <a className='logo'>EventFlow</a>
    <a href="http://localhost:3000/">Home</a>
    <a href="http://localhost:3000/friends">Friends</a>
    <a onClick={openWeatherModal}>Weather</a>
    <a href="http://localhost:3000/about">About</a>
    <Logout/>
  </nav>
  <br/>
    <div>
        <h3 style={{textAlign: 'center'}}>Welcome to your friends page {user}!</h3>
        <label>Which calendar would you like to view?</label>
    <Dropdown
    id = 'userDropdown'
    placeholder='Select User'
    fluid
    search
    selection
    options={allUsers}
    onChange={handleUserChange}
    value = {userView}
  />
    </div>

              <div>
                <WeatherModal isOpen={isWeatherModalOpen} onClose={closeWeatherModal}/>
              </div>
              

      <Calendar
        localizer={localizer}
        events={allEvents}
        startAccessor= {(event) => {
          return new Date(event.start);
        }}
        endAccessor = {(event) => {
          return new Date(event.end);
        }}
        selectable={true}
        style={{ height: 500, margin: "50px" }}
        
      />

    </div>
  );
}

export default FriendsPage;