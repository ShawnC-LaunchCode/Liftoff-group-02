import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import {DateTimePicker, LocalizationProvider} from '@mui/x-date-pickers';
import React, { useEffect, useState } from "react";
import parseISO from "date-fns/parseISO";
import axios from 'axios';
import '../Modal.css';
import { colors } from "@mui/material";
import withCredentials from "./withCredentials";

const Modal = ({ isOpen, createEvent, loggedInUser, onClose }) => {
    const loadEvents = async() => {
        try {
          const response = await axios.get('http://localhost:8080/api/events', withCredentials());
          setAllEvents(response.data);
        } catch (error) {
          setError(error.message);
        }
      };
    
    
    
      const [newEvent, setNewEvent] = useState({title: "", start: "", end:"", allDay: false, username: ''});
        const [allEvents, setAllEvents] = useState([]);
        const [error, setError] = useState(null);
        const [loading, setLoading] = useState(true);

        const handleAddEvent = async() => {
          try {
            const updateEvent = newEvent;
            updateEvent.username = loggedInUser;
            setNewEvent(updateEvent);
            console.log(newEvent);
            const response = await axios.post('http://localhost:8080/api/createEvent', newEvent, withCredentials());
            console.log(response.data);  // Handle success response
            
          } catch (error) {
            console.error('Error creating event:', error);
          }
    
            loadEvents();
            onClose();
        };

        useEffect(() => {
          if (isOpen && createEvent){
          const eventData = {title: "" , start: createEvent.start , end: createEvent.end, allDay: false};
          setNewEvent(eventData);
          }
        },[isOpen, createEvent]);

  return (
    <>
      {isOpen && (
        <div className="modal-overlay" onClick={onClose}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className= 'close'  onClick={onClose} >
              &times;
            </span>
            <br/>
            <br/>
            <h2>New Event</h2>
            <input type="text" placeholder="Add Title" style={{width:"75%", marginRight: "10px"}}
                value={newEvent.title} onChange={(e) => setNewEvent({...newEvent, title: e.target.value})} />
                <br/>
                <br/>
                
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker label="Start Date" defaultValue={new Date(createEvent.start)} selected={newEvent.start} onChange={(start) => setNewEvent({...newEvent, start})}/>
                    <br/>
                    <br/>
                    <DateTimePicker label="End Date" defaultValue={new Date(createEvent.end)} selected={newEvent.end} onChange={(end) => setNewEvent({...newEvent, end})}/>
                </LocalizationProvider>
                <br/>
                <br/>
                <label style ={{marginRight: "10px"}}>All Day?</label>

                <input type = "checkbox" id="allDayCheck" name="allDayCheck" style={{marginRight: "10px"}} value={newEvent.allDay} onChange={(e) => setNewEvent({...newEvent, allDay: document.getElementById("allDayCheck").checked })} />

                <button style={{marginTop: "10px"}} onClick={handleAddEvent}>Add Event</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
