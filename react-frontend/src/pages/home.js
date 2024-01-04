import Modal from '../components/Modal.js';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import React, { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';



function HomePage(){
  const [isModalOpen, setModalOpen] = useState(false);
  const [allEvents, setAllEvents] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

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
                <button onClick={openModal}>Open Modal</button>

                <Modal isOpen={isModalOpen} onClose={closeModal} />

              </div>

              <Calendar
                localizer={localizer}
                events={allEvents}
                startAccessor="start"
                endAccessor="end"
                style={{height: 500, margin: "50px"}}
              />

        </div>
  );
}

export default HomePage;