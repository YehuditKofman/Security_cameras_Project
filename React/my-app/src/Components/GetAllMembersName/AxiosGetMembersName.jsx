import { useState, useEffect } from 'react';
import axios from 'axios';

const AxiosGetMembersName = () => {
    
  const administratorId = "68043ccf8b5cb28fe901eb41"; // תעודת זהות של המנהל, יש לשים את הערך הנכון כאן
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 

  useEffect(() => {
    async function fetchMembers() {
      try {
        const response = await axios.get(`http://localhost:8080/Administators/getAllMembersNamesByAdministrator/${administratorId}`);
        setMembers(response.data);
      } catch (err) {
        setError('Failed to fetch members.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchMembers();
  }, [administratorId]);

  return { members, loading, error };
};

export default AxiosGetMembersName;

