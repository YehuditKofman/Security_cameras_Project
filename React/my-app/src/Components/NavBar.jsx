import React, { useState } from "react";
import { Link } from 'react-router-dom';  

import { Menubar } from "primereact/menubar";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { Avatar } from "primereact/avatar";
import SighInAdministrator from "./SighInAdministrator";
import Login from "./Login/Login";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";



export default function Navbar() {
  const [visible, setVisible] = useState(false);

  const items = [
    {
      label: "לוח שנה",
      icon: "pi pi-calendar",
    },
    {
      label: "פרופיל",
      icon: "pi pi-user",
    },
    {
      label: "הגדרות",
      icon: "pi pi-cog",
    },
  ];

  const start = (
    <div className="flex align-items-center gap-3">
      <Button
        icon="pi pi-bars"
        className="p-button-text p-button-plain p-button-rounded"
        onClick={() => setVisible(true)}
      />
      <img
        alt="logo"
        src="https://www.sakaiproject.org/themes/sakai/logo.svg"
        height="30"
        className="mr-2"
      />
      <span className="text-xl font-bold">SAKAI</span>
    </div>
  );

  const end = (
    <div className="flex align-items-center gap-3">
      <Link to="/Login">
        <Button
          label="Login"
          severity="secondary"
          className="shadow-2 p-button-sm p-button-rounded transition-colors hover:bg-primary hover:text-white"
        />
      </Link>
      <Link to="/Sigh-In">
        <Button label="Sign In"
        severity="secondary"
        className="shadow-2 p-button-outlined p-button-sm p-button-rounded transition-colors hover:bg-primary hover:text-white"/>
     </Link>
 
    </div>
  );
  return (
    <>
      <Menubar start={start} end={end} className="shadow-2 surface-0 border-none px-3" />
      <Sidebar visible={visible} onHide={() => setVisible(false)} position="left">
        <h3>תפריט</h3>
        <ul className="list-none p-0 m-0">
          {items.map((item, index) => (
            <li key={index} className="p-2 border-bottom-1 border-200 flex align-items-center gap-2 hover:surface-200 transition-colors">
              <i className={item.icon}></i>
              {item.label}
            </li>
          ))}
        </ul>
      </Sidebar>

    </>
  );
}
