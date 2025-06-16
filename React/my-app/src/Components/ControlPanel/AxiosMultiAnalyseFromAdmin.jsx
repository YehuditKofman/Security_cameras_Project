
import axios from 'axios';

const AxiosMultiAnalyseFromAdmin = async (id) => {
  const response = await axios.get(`http://localhost:8080/Administators/getLast4SecurityCamerasByAdministrator/${id}`);
  console.log(">>> response.data:", response.data); 
    console.log(">>> response.data:", id); 

  return response.data;
};

export default AxiosMultiAnalyseFromAdmin;
