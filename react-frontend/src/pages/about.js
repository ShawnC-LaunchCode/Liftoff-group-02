import React, { useState } from 'react';
import withCredentials from '../components/withCredentials';
import Logout from '../components/logout';
import { Fade } from '@mui/material';
import jacob from '../resources/Jacob.png';
import riley from '../resources/Riley.jpg';
import WeatherModal from '../components/WeatherModal';


function AboutPage(){
    const [member, setMember] = useState(true);
    const [isWeatherModalOpen, setWeatherModalOpen] = useState(false);

    const openWeatherModal = () => {
        setWeatherModalOpen(true);
      };
    
      const closeWeatherModal = () => {
        setWeatherModalOpen(false);
      };

    const handleRiley = ()=>{
        setMember(true);
    }

    const handleJacob = ()=>{
        setMember(false);
    }
    return(
    <div className="App">
      <nav>
    <a href="#" className='logo'>EventFlow</a>
    <a href="http://localhost:3000/">Home</a>
    <a href="http://localhost:3000/friends">Friends</a>
    <a onClick={openWeatherModal}>Weather</a>
    <a href="http://localhost:3000/about">About</a>
    <Logout/>
  </nav>
  <br/>
        <nav className='aboutNav'>
            
            <a className='aboutA' onClick={handleRiley} style={member ? {borderBottom: '2px solid black'}: {borderBottom: 'transparent'}}>Riley Neuville</a>
            <a className='aboutA' onClick={handleJacob} style={member ? {borderBottom: 'transparent'}: {borderBottom: '2px solid black'}}>Jacob Kellog</a>
        </nav>
<br/>
<br/>
        <div className='wrapper'>
        <div className='riley'>
        <WeatherModal isOpen={isWeatherModalOpen} onClose={closeWeatherModal}/>
        <Fade in timeout={2000}>
        <img img src={riley} style = { member ? {opacity: 100, width: 300, borderRadius: '25px'} : {opacity: 0, width: 300, borderRadius: '25px'} }/>
        </Fade>
        <Fade in timeout={2000}>
        <p style = { member ? {opacity: 100} : {opacity: 0}}>I'm Riley Neuville, and I'm learning to code at a professional level. I've coded for many years as a hobbyist and in biomedical engineering settings, but I have had no formal training until now. I have always loved tinkering and creating odd things with arduinos, and now I can do so on the internet! Outside of coding I love soccer, rock climbing, and video games. I hope you enjoy your time on our website!</p>
        </Fade>
        </div>
        <div className='jacob'>
        <Fade in timeout={2000}>
        <img src={jacob} style = { member ? {opacity: 0, width: 300, borderRadius: '25px'} : {opacity: 100, width: 300, borderRadius: '25px'}} />
        </Fade>
        <Fade in timeout={2000}>
        <p style = { member ? {opacity: 0} : {opacity: 100}}>I'm Jacob Kellogg, and I've just embarked on my programming journey. However, since a young age, I've been interested in the world of computers and how they operate. It's always been a dream to create my own website, and now, I can accomplish that with my own hands. Apart from coding endeavors, I'm an avid reader, gamer and esports enthusiast. I hope you enjoy your time on our website!</p>
        </Fade>
        </div>
        </div>
    </div>
    );
};

export default AboutPage;