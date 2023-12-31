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
import WeatherAPI from '../components/WeatherAPI';
import axios from 'axios';



function HomePage(){
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDelModalOpen, setDelModalOpen] = useState(false);
  const [allEvents, setAllEvents] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const loadEvents = async() => {
    try {
      const response = await axios.get('http://localhost:8080/api/events');
      setAllEvents(response.data);
    } catch (error) {
      setError(error.message);
    }
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    loadEvents();
  };

  const openDelModal = () => {
    setDelModalOpen(true);
  };

  const closeDelModal = () => {
    setDelModalOpen(false);
    loadEvents();
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    openDelModal();
  };
  
  const locales = {
    "en-US": require("date-fns/locale/en-US")
  }

  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales
  })

  
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/events');
        
        setAllEvents(response.data);
       
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="App">
              <h1>EventFlow</h1>
    <div>
        <h3>Input your city for the weather today!</h3>
        <WeatherAPI />
    </div>
              <div>
                <button onClick={openModal}>Open Modal</button>

                <Modal isOpen={isModalOpen} onClose={closeModal} />

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
        style={{ height: 500, margin: "50px" }}
        onSelectEvent={handleEventClick}
      />

    </div>
  );
}

export default HomePage;