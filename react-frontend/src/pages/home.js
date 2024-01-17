import Modal from '../components/Modal.js';
import DeleteModal from '../components/DeleteModal.js';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import React, { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Dropdown } from 'semantic-ui-react'
import WeatherAPI from '../components/WeatherAPI';
import axios from 'axios';
import withCredentials from '../components/withCredentials.js';
import 'semantic-ui-css/semantic.min.css';
import '../index.css';
import Logout from '../components/logout.js';



function HomePage(){
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDelModalOpen, setDelModalOpen] = useState(false);
  const [allEvents, setAllEvents] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [createEvent, setCreateEvent] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
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
      setAllUsers(userArray);
    } catch (error) {
      setError(error.message);
    }
};


  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    loadEventsByUser(user);
  };

  const openDelModal = () => {
    setDelModalOpen(true);
  };

  const closeDelModal = () => {
    setDelModalOpen(false);
    loadEventsByUser(user);
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    console.log(event);
    openDelModal();
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

  const handleSelectSlot = (info) => {
    setCreateEvent(info);
    openModal();
  };

  const handleUserChange = (event, {value}) => {
    setUser(value);
    loadEventsByUser(value);
  }

  useEffect(() => {
    loadEventsByUser(user);
    userlist();
  }, []);

  return (
    <div className="App">
      <div className='container'>
      <div className = "titleBlock">EventFlow</div>
      </div>
      <div>
      <Logout />
    </div>
    <div>
        <h3>Input your city for the weather today!</h3>
        <WeatherAPI />
    </div>
    <label>Logged in as?</label>
    <Dropdown
    id = 'userDropdown'
    placeholder='Select User'
    fluid
    search
    selection
    options={allUsers}
    onChange={handleUserChange}
    value = {user}
  />
              <div>
                <Modal isOpen={isModalOpen} createEvent={createEvent} loggedInUser={user} onClose={closeModal} />

              </div>
              <DeleteModal isOpen={isDelModalOpen} selectedEvent={selectedEvent} onClose={closeDelModal}/>

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
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleEventClick}
        style={{ height: 500, margin: "50px" }}
        
      />

    </div>
  );
}

export default HomePage;