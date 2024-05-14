// import React, { useState, useEffect } from 'react';
// import { DataGrid } from '@mui/x-data-grid';

// function Home() {
//   const [userData, setUserData] = useState([]);

//   useEffect(() => {
//     const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
//     const userDataWithIds = existingUsers.map((users, index) => ({ id: index, ...users }));
//     setUserData(userDataWithIds);
//   }, []);

//   const columns = [
//     { field: 'name', headerName: 'Name', width: 150 },
//     { field: 'email', headerName: 'Email', width: 200 },
//     { field: 'gender', headerName: 'Gender', width: 120 },
//     { field: 'address', headerName: 'Address', width: 250 },
//     { field: 'courses', headerName: 'Courses', width: 200,headerClassName: 'bold-header'},
//     { field: 'center', headerName: 'Center', width: 150 },
     
     
     
//   ];

//   return (
//     <div>
//       <DataGrid
//         rows={userData}
//         columns={columns}
//       />
//     </div>
//   );
// }

// export default Home;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';

function Home() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

   const columns = [
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'gender', headerName: 'Gender', width: 120 },
    { field: 'address', headerName: 'Address', width: 250 },
    { field: 'courses', headerName: 'Courses', width: 200,headerClassName: 'bold-header'},
    { field: 'center', headerName: 'Center', width: 150 },
   ]

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8081/users');
      setUsers(response.data.map((user, index) => ({ ...user, id: index + 1 })));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div >
      <DataGrid
        rows={users}
        columns={columns}
      />
    </div>
  );
}

export default Home;