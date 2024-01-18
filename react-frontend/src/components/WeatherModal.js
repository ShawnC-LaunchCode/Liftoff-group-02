import React, { useEffect} from "react";
import '../Modal.css';
import WeatherAPI from "./WeatherAPI";

const WeatherModal = ({ isOpen, onClose }) => {

    

        useEffect(() => {
          }
        ,[isOpen,]);

  return (
    <>
      {isOpen && (
        <div className="modal-overlay" onClick={onClose}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className= 'close'  onClick={onClose} >
              &times;
            </span>
            <br/>
            <h3 style={{textAlign: 'center'}}>Input your city for the weather today!</h3>
            <br/>
            <div style = {{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <WeatherAPI />
        </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WeatherModal;