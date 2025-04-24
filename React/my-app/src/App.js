import logo from './logo.svg';
import './App.css';
import Home from './Components/Home';
import CreateAdministrator from './Components/CreateAdministrator';
import SighInAdministrator from './Components/SighInAdministrator';
import Try from './Components/Try'; 
import CreatNewMember from './Components/AddMembers/CreatNewMember';
import UploadVideo from './Components/UploadVideo/UploadVidea';
import GetAllmembersName from './Components/GetAllMembersName/GetAllmembersName';



function App() {
  return (
  
     <>
     <SighInAdministrator/>
     <GetAllmembersName/> 
     </>

  );
}

export default App;
