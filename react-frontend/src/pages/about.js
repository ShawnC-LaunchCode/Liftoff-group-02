import React, { useState } from 'react';
import withCredentials from '../components/withCredentials';

function AboutPage(){

    return(
    <div className="App">
      <nav>
    <a href="#" className='logo'>EventFlow</a>
    <a href="http://localhost:3000/">Home</a>
    <a href="#">Weather</a>
    <a href="http://localhost:3000/about">About</a>
    <Logout/>
  </nav>
  <br/>
        <nav>
            <ul>
                <li>Riley Neuville</li>
                <li>Jacob Kellogg</li>
            </ul>
        </nav>
    </div>
    );
};

export default AboutPage;