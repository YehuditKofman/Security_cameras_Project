import logo from './logo.svg';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import React, { Suspense } from 'react';
import './App.css';
import Home from './Components/Home';
import CreateAdministrator from './Components/CreateAdministrator';
import SighInAdministrator from './Components/SighInAdministrator';
import Try from './Components/Try';
import CreatNewMember from './Components/AddMembers/CreatNewMember';
import UploadVideo from './Components/UploadVideo/UploadVidea';
import GetAllmembersName from './Components/GetAllMembersName/GetAllmembersName';
import Login from './Components/Login/Login';
import Table from './Components/Table';
import Navbar from './Components/NavBar';
import 'primereact/resources/themes/lara-light-indigo/theme.css';  // theme
import 'primereact/resources/primereact.min.css';                  // core css
import 'primeicons/primeicons.css';                                // icons
import 'primeflex/primeflex.css';    

import VideoPlayer from './Components/GetAllSecurityCameras/GetAllSecurityCamera';
import VideoCard from './Components/GetSecurity';


const LazyNavBar = React.lazy(() => import('./Components/NavBar'))
const LazyLogin = React.lazy(() => import('./Components/Login/Login'))
const LazySighIn = React.lazy(() => import('./Components/SighInAdministrator'))
const LazyHome = React.lazy(() => import('./Components/Home'))

function App() {
  return (


    <>
  <VideoCard/>
      <BrowserRouter>

      {/* <PremiumSecurityCard />
       
        <VideoPlayer filename="1746042985280-176516495.mp4"/> 
        <Suspense fallback={'loading...'}><LazyNavBar /></Suspense>
          
        <Routes>
          <Route path="/" element={<Suspense fallback={'loading...'}><LazyHome /></Suspense>} />
          <Route path="/Sigh-In" element={<Suspense fallback={'loading...'}><LazySighIn /></Suspense>} />
          <Route path="/Login" element={<Suspense fallback={'loading...'}><LazyLogin /></Suspense>} />
        </Routes> */}
      </BrowserRouter>
    </>


  );
}

export default App;
