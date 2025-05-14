// import { useState, useEffect } from 'react';
// import axios from 'axios';

// const AxiosGetCountMember = (administratorId,nameAxios) => {

//   const [memberCount, setMemberCount] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     async function fetchMemberCount() {
//       try {
//         const token = localStorage.getItem("token");
//         if (!token) {
//           setError("Token is missing. Please log in again.");
//           setLoading(false);
//           return;
//         }

//         const response = await axios.get(
//           `http://localhost:8080/Administators/${nameAxios}/${administratorId}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         console.log("Member count from server:", response.data);
//         setMemberCount(response.data.memberCount); // שמירה של המספר בלבד
//       } catch (err) {
//         setError("Failed to fetch member count.");
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchMemberCount();
//   }, [administratorId]);

//   return { memberCount };
// };

// export default AxiosGetCountMember;
import { useState, useEffect } from 'react';
import axios from 'axios';

const AxiosGetCountMember = (administratorId, endpointName) => {
  const [count, setCount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 

  useEffect(() => {
    async function fetchCount() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Token is missing.");
          setLoading(false);
          return;
        }

        const response = await axios.get(
          `http://localhost:8080/Administators/${endpointName}/${administratorId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setCount(response.data.memberCount || response.data.cameraCount || 0);
      } catch (err) {
        setError('Failed to fetch count.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchCount();
  }, [administratorId, endpointName]);

  return { count, loading, error };
};

export default AxiosGetCountMember;

