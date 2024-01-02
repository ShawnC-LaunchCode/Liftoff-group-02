import axios from 'axios';
import {DateTimePicker, LocalizationProvider} from '@mui/x-date-pickers';
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";



function HomePage(){

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
  

  const loadEvents = async() => {
    try {
      const response = await axios.get('http://localhost:8080/api/events');
      setAllEvents(response.data);
    } catch (error) {
      setError(error.message);
    }
  };



  const [newEvent, setNewEvent] = useState({title: "", start: "", end:"", allDay:true});
    const [allEvents, setAllEvents] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);


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



    const handleAddEvent = async() => {
      try {
        const response = await axios.post('http://localhost:8080/api/createEvent', newEvent);
        console.log(response.data);  // Handle success response
        
      } catch (error) {
        console.error('Error creating event:', error);
      }

        loadEvents();
    };


  return (
    <div className="App">
              <h1>EventFlow</h1>
              <h2>Add New Event</h2>

              <div>
                <input type="text" placeholder="Add Title" style={{width:"20%", marginRight: "10px"}}
                value={newEvent.title} onChange={(e) => setNewEvent({...newEvent, title: e.target.value})} />
                
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker label="Start Date" selected={newEvent.start} onChange={(start) => setNewEvent({...newEvent, start})}/>
                    <DateTimePicker label="End Date" selected={newEvent.end} onChange={(end) => setNewEvent({...newEvent, end})}/>
                </LocalizationProvider>

                <label style ={{marginRight: "10px"}}>All Day?</label>

                <input type = "checkbox" id="allDayCheck" name="allDayCheck" style={{marginRight: "10px"}} value={newEvent.allDay} onChange={async (e) => setNewEvent({...newEvent, allDay: document.getElementById("allDayCheck").checked })} />

                <button style={{marginTop: "10px"}} onClick={handleAddEvent}>Add Event</button>
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