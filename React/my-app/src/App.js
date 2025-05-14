import { Route, Routes, BrowserRouter, useLocation } from 'react-router-dom';
import React, { Suspense } from 'react';
import './App.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

import SideBar from './Components/SideBar';
import GetSecurity from './Components/GetSecurity';
import UploadVideo from './Components/UploadVideo/UploadVidea';
import CreateAdministrator from './Components/CreateAdministrator';
import CreatNewMember from './Components/AddMembers/CreatNewMember';

// const LazyNavBar = React.lazy(() => import('./Components/NavBar'));
const LazyLogin = React.lazy(() => import('./Components/Login/Login'));
const LazySighIn = React.lazy(() => import('./Components/SighInAdministrator'));
const LazyHome = React.lazy(() => import('./Components/Home'));
const LasyPersonalArea = React.lazy(() => import('./Components/PersonalArea'));
const LazyGetSecurity = React.lazy(() => import('./Components/GetSecurity'));
const LazyTable = React.lazy(() => import('./Components/TableMembers/Table'));


function LayoutWithSidebar({ children }) {
  return <><SideBar />{children}</>;
}

function AppContent() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <>

      {/* <Suspense fallback={'loading...'}><LazyNavBar /></Suspense> */}
      <Routes>
        <Route path="/" element={<Suspense fallback={'loading...'}><LazyHome /></Suspense>} />
        <Route path="/Sigh-In" element={<LayoutWithSidebar><Suspense fallback={'loading...'}><LazySighIn /></Suspense></LayoutWithSidebar>} />
        <Route path="/Login" element={<LayoutWithSidebar><Suspense fallback={'loading...'}><LazyLogin /></Suspense></LayoutWithSidebar>} />
        <Route path="/Login/PersonalArea" element={<LayoutWithSidebar><Suspense fallback={'loading...'}><LasyPersonalArea /></Suspense></LayoutWithSidebar>} />
        <Route path="/GetSecurity" element={<LayoutWithSidebar><Suspense fallback={'loading...'}><LazyGetSecurity /></Suspense></LayoutWithSidebar>} />
        <Route path="/Table" element={<LayoutWithSidebar><Suspense fallback={'loading...'}><LazyTable /></Suspense></LayoutWithSidebar>} />
        {/* <Route path="/recordings" element={<Recordings />} />
        <Route path="/analysis" element={<Analysis />} />
        <Route path="/storage" element={<Storage />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/login" element={<Login />} /> */}
      
      </Routes>
    </>
  );
}

function App() {
  return <BrowserRouter>
    <AppContent />
  </BrowserRouter>;
}

export default App;
