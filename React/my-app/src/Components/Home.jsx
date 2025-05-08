import React, { useState } from 'react';

import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
  return(
    <div className="home-container">
      <h1>Welcome to the Home Page</h1>
      <p>This is a simple home page component...</p>


            <Link to="/Login">Login</Link>
            <br></br>
            <Link to="/Sigh-In">Sign In</Link>

    </div>  
  )
}

export default Home;
