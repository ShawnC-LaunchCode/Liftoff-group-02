import React, { useEffect, useState } from "react";
import axios from 'axios';
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import {DateTimePicker, LocalizationProvider} from '@mui/x-date-pickers';
import parseISO from "date-fns/parseISO";
import '../Modal.css';
import withCredentials from "./withCredentials";

const DeleteModal = ({ isOpen, selectedEvent, onClose }) => {
    const loadEvents = async() => {
        try {
          const response = await axios.get('http://localhost:8080/api/events', withCredentials());
          setAllEvents(response.data);
        } catch (error) {
          setError(error.message);
        }
      };

    
    
        const [newEvent, setNewEvent] = useState({title: "", start: "", end:  "", allDay:true});
        const [allEvents, setAllEvents] = useState([]);
        const [error, setError] = useState(null);
        const [loading, setLoading] = useState(true);
        const [isHovered, setHovered] = useState(false);
        const [isEditing, setEditing] = useState(false);

        const handleHover = (hoverState) => {
          setHovered(hoverState);
        };

        const handleEditEvent = async() => {
          try {
            const response = await axios.post('http://localhost:8080/api/editEvent', {title :newEvent.title, start: newEvent.start, end: newEvent.end, allDay: newEvent.allDay, user:selectedEvent.user, id : selectedEvent.id}, withCredentials());
            console.log(response.data);  // Handle success response
            
          } catch (error) {
            console.error('Error editing event:', error);
          }
    
            loadEvents();
            handleEditToggle();
            onClose();
        };

        const handleDeleteEvent = async() => {
            try {
              const response = await axios.post('http://localhost:8080/api/deleteEvent', { id: selectedEvent.id }, withCredentials() );
              console.log(response.data);  // Handle success response
              
            } catch (error) {
              console.error('Error deleting event:', error);
            }
      
              loadEvents();
              setEditing(false);
              onClose();
          };

          const handleEditToggle = () => {
            setEditing(!isEditing);
          };

          useEffect(() => {
            if (isOpen && selectedEvent){
                setEditing(false);
            const eventData = {title: selectedEvent.title , start: selectedEvent.start , end: selectedEvent.end, allDay: selectedEvent.allDay, user: selectedEvent.user};
            setNewEvent(eventData);
            }
          },[isOpen, selectedEvent]);
  return (
    <>
      {isOpen && (
        <div className="modal-overlay" onClick={() => {onClose(); setEditing(false)}}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className= 'close' style= {{color: isHovered ? 'crimson' : 'black'}} onClick={() => {onClose(); handleHover(false); setEditing(false);}} onMouseOver={() => handleHover(true)} onMouseOut={() => handleHover(false)}>
              &times;
            </span>
            <br/>
            <br/>
            { isEditing ? (
                <div>
                    <h2>Edit or Delete Event</h2>
            <input type="text" id = "titleInput" placeholder={selectedEvent.title} style={{width:"75%", marginRight: "10px"}}
                value={newEvent.title} onChange={(e) => setNewEvent({...newEvent, title: e.target.value})} />
                <br/>
                <br/>
                
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker label="Start Date" id = "startDate" defaultValue={parseISO(selectedEvent.start)} selected={newEvent.start} onChange={(start) => setNewEvent({...newEvent, start})}/>
                    <br/>
                    <br/>
                    <DateTimePicker label="End Date" id = "endDate" defaultValue={parseISO(selectedEvent.end)} selected={newEvent.end} onChange={(end) => setNewEvent({...newEvent, end})}/>
                </LocalizationProvider>
                <br/>
                <br/>
                <label style ={{marginRight: "10px"}}>All Day?</label>

                <input type = "checkbox" id="allDayCheck" name="allDayCheck" defaultChecked={selectedEvent.allDay ? true : false} style={{marginRight: "10px"}} value={newEvent.allDay} onChange={async (e) => setNewEvent({...newEvent, allDay: document.getElementById("allDayCheck").checked })} />

                <button style={{marginTop: "10px"}} onClick={handleEditEvent}>Submit Edit</button>
                <br/>
                <button style={{marginTop: "10px", backgroundColor: "crimson"}} onClick={handleDeleteEvent}>Delete Event</button>
                </div>
            ):(
                <div>
                    <h2>Event</h2>
                <input type="text" id = "titleInput" placeholder={selectedEvent.title} style={{width:"75%", marginRight: "10px"}}
                value={newEvent.title} readOnly />
                <br/>
                <br/>
                
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker label="Start Date" id = "startDate" defaultValue={parseISO(selectedEvent.start)} selected={newEvent.start} readOnly/>
                    <br/>
                    <br/>
                    <DateTimePicker label="End Date" id = "endDate" defaultValue={parseISO(selectedEvent.end)} selected={newEvent.end} readOnly/>
                </LocalizationProvider>
                <br/>
                <br/>
                <button style={{marginTop: "10px"}} onClick={handleEditToggle}>Edit Event</button>
                <br/>
                </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteModal;