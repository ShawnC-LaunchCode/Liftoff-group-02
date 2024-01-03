import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import {DateTimePicker, LocalizationProvider} from '@mui/x-date-pickers';
import React, { useEffect, useState } from "react";
import axios from 'axios';

const Modal = ({ isOpen, onClose }) => {
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
    <>
      {isOpen && (
        <div className="modal-overlay" onClick={onClose}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={onClose}>
              &times;
            </span>
            <h2>Your Modal</h2>
            <input type="text" placeholder="Add Title" style={{width:"20%", marginRight: "10px"}}
                value={newEvent.title} onChange={(e) => setNewEvent({...newEvent, title: e.target.value})} />
                
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker label="Start Date" selected={newEvent.start} onChange={(start) => setNewEvent({...newEvent, start})}/>
                    <DateTimePicker label="End Date" selected={newEvent.end} onChange={(end) => setNewEvent({...newEvent, end})}/>
                </LocalizationProvider>

                <label style ={{marginRight: "10px"}}>All Day?</label>

                <input type = "checkbox" id="allDayCheck" name="allDayCheck" style={{marginRight: "10px"}} value={newEvent.allDay} onChange={async (e) => setNewEvent({...newEvent, allDay: document.getElementById("allDayCheck").checked })} />

                <button style={{marginTop: "10px"}} onClick={handleAddEvent}>Add Event</button>
            {/* Add your form or other content here */}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
