// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { DataGrid } from '@mui/x-data-grid';
// import { Button, IconButton, Toolbar, Snackbar, Badge, List, ListItem, Paper, Typography, Card } from '@mui/material';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import SaveIcon from '@mui/icons-material/Save';
// import CancelIcon from '@mui/icons-material/Cancel';
// import CloseIcon from '@mui/icons-material/Close';
// import MuiAlert from '@mui/material/Alert';
// import NotificationsIcon from '@mui/icons-material/Notifications';
// import { useNavigate } from 'react-router-dom';
// import '../Components/style.css';

// function Home() {
//   const [users, setUsers] = useState([]);
//   const [editMode, setEditMode] = useState({ id: null });
//   const [editRowsModel, setEditRowsModel] = useState({});
//   const [selectedRows, setSelectedRows] = useState([]);
//   const [notifications, setNotifications] = useState([]);
//   const [openNotifications, setOpenNotifications] = useState(false);
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('http://192.168.1.61:8081/users');
//         setUsers(response.data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };
//     fetchData();
//   }, []);

//   const handleCloseNotification = (id) => {
//     setNotifications(notifications.filter(notification => notification.id !== id));
//   };

//   const handleNotification = (message) => {
//     const id = Math.random();
//     const newNotification = { id, message };
//     setNotifications([...notifications, newNotification]);
//     setSnackbarMessage(message);
//     setSnackbarOpen(true);
//   };

//   const handleProcessRowUpdate = async (newRow) => {
//     try {
//       await axios.put(`http://192.168.1.61:8081/userupdate/${newRow.id}`, newRow);
//       setUsers(users.map((user) => (user.id === newRow.id ? newRow : user)));
//       setEditMode({ id: null });
//       handleNotification(`User ID ${newRow.id} updated successfully`);
//       return newRow;
//     } catch (error) {
//       console.error('Error updating user:', error);
//       handleNotification(`Error updating user ID ${newRow.id}`, 'error');
//       return newRow;
//     }
//   };

//   const handleEditClick = (id) => {
//     setEditMode({ id });
//   };

//   const handleCancelClick = () => {
//     setEditMode({ id: null });
//   };

//   const handleSaveClick = async (id) => {
//     const updatedRow = editRowsModel[id];
//     if (updatedRow) {
//       await handleProcessRowUpdate(updatedRow.data);
//     }
//   };

//   const handleEditRowsModelChange = (model) => {
//     setEditRowsModel(model);
//   };

//   const handleDeleteClick = async (id) => {
//     try {
//       await axios.delete(`http://192.168.1.61:8081/del/${id}`);
//       setUsers(users.filter((user) => user.id !== id));
//       handleNotification(`User ID ${id} deleted successfully`);
//     } catch (error) {
//       console.error('Error deleting user:', error);
//       handleNotification(`Error deleting user ID ${id}`, 'error');
//     }
//   };

//   const handleDeleteSelected = async () => {
//     try {
//       await Promise.all(selectedRows.map(id => axios.delete(`http://192.168.1.61:8081/del/${id}`)));
//       setUsers(users.filter((user) => !selectedRows.includes(user.id)));
//       setSelectedRows([]);
//       handleNotification('Selected users deleted successfully');
//     } catch (error) {
//       console.error('Error deleting selected users:', error);
//       handleNotification('Error deleting selected users', 'error');
//     }
//   };

//   const handleDeleteAll = async () => {
//     try {
//       await axios.delete('http://192.168.1.61:8081/del-all');
//       setUsers([]);
//       handleNotification('All users deleted successfully');
//     } catch (error) {
//       console.error('Error deleting all users:', error);
//       handleNotification('Error deleting all users', 'error');
//     }
//   };

//   const columns = [
//     { field: 'id', headerName: 'ID', width: 70 },
//     { field: 'name', headerName: 'Name', width: 130, editable: true },
//     { field: 'email', headerName: 'E-mail', width: 200, editable: true },
//     { field: 'gender', headerName: 'Gender', width: 100, editable: true },
//     { field: 'address', headerName: 'Address', width: 150, editable: true },
//     { field: 'courses', headerName: 'Courses', width: 150, editable: true },
//     { field: 'center', headerName: 'Center', width: 150, editable: true },
//     {
//       field: 'actions',
//       headerName: 'Actions',
//       width: 150,
//       renderCell: (params) => {
//         const isInEditMode = editMode.id === params.row.id;
//         return (
//           <div>
//             {isInEditMode ? (
//               <>
//                 <IconButton onClick={() => handleSaveClick(params.row.id)} color="primary">
//                   <SaveIcon />
//                 </IconButton>
//                 <IconButton onClick={handleCancelClick} color="secondary">
//                   <CancelIcon />
//                 </IconButton>
//               </>
//             ) : (
//               <>
//                 <IconButton onClick={() => handleEditClick(params.row.id)} color="primary">
//                   <EditIcon />
//                 </IconButton>
//                 <IconButton onClick={() => handleDeleteClick(params.row.id)} color="secondary">
//                   <DeleteIcon />
//                 </IconButton>
//               </>
//             )}
//           </div>
//         );
//       },
//     },
//   ];

//   return (
//     <div>
//       <h2 align="center"><b>ADMIN PANEL</b></h2>
//       <Toolbar>
//         <Button
//           onClick={() => navigate('/')}
//           variant="contained"
//           color="primary"
//           style={{ marginRight: '10px', marginLeft: '10px' }}
//         >
//           Registration Form
//         </Button>
//         <Button
//           onClick={handleDeleteSelected}
//           variant="contained"
//           color="secondary"
//           disabled={selectedRows.length === 0}
//         >
//           Delete Selected
//         </Button>
//         <Button
//           onClick={handleDeleteAll}
//           variant="contained"
//           color="secondary"
//           style={{ marginLeft: '10px' }}
//         >
//           Delete All
//         </Button>
//       </Toolbar>
//       <div className="container">
//         <DataGrid
//           className="styl"
//           rows={users}
//           columns={columns}
//           checkboxSelection
//           disableRowSelectionOnClick
//           onRowSelectionModelChange={(ids) => {
//             setSelectedRows(ids)
//           }}
//           onSelectionModelChange={(newSelection) => setSelectedRows(newSelection.selectionModel)}
//           editRowsModel={editRowsModel}
//           onEditRowsModelChange={handleEditRowsModelChange}
//           processRowUpdate={handleProcessRowUpdate}
//           experimentalFeatures={{ newEditingApi: true }}
//         />
//       </div>
//       <div style={{ position: 'fixed', top: 20, right: 20 }}>
//         <Badge badgeContent={notifications.length} color="secondary">
//           <IconButton onClick={() => setOpenNotifications(!openNotifications)}>
//             <NotificationsIcon style={{ color: 'blue' }}/>
//           </IconButton>
//         </Badge>
//         {openNotifications && (
//           <Paper
//             elevation={4}
//             style={{
//               position: 'fixed',
//               bottom: 50,
//               right: 20,
//               top: 80,
//               maxWidth: 1000,
//               maxHeight: 300,
//               padding: '4px',
//               background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)', color: 'white',
//               overflowY: 'auto',
//               border: '1px solid',
//               borderRadius: '4px',
//             }}
//           >
//             <List>
//               {notifications.map(notification => (
//                 <ListItem key={notification.id}>
//                   <Card style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexGrow: 1, padding: '4px' }}>
//                     <Typography variant="body2" component="p">
//                       {notification.message}
//                     </Typography>
//                     <IconButton
//                       edge="end"
//                       aria-label="close"
//                       onClick={() => handleCloseNotification(notification.id)}
//                     >
//                       <CloseIcon style={{ color: 'black' }} />
//                     </IconButton>
//                   </Card>
//                 </ListItem>
//               ))}
//             </List>
//           </Paper>
//         )}
//       </div>
//       <Snackbar open={snackbarOpen} autoHideDuration={2000} onClose={() => setSnackbarOpen(false)}>
//         <MuiAlert
//           elevation={6}
//           variant="filled"
//           onClose={() => setSnackbarOpen(false)}
//           sx={{ background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)', color: 'white' }}
//         >
//           {snackbarMessage}
//         </MuiAlert>
//       </Snackbar>
//     </div>
//   );
// }

// export default Home;


 
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { Button, IconButton, Toolbar, Snackbar, Badge } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MuiAlert from '@mui/material/Alert';
import NotificationPanel from './notification'; 
import { useNavigate } from 'react-router-dom';
import '../Components/style.css';



function Home() {
  const [users, setUsers] = useState([]);
  const [editMode, setEditMode] = useState({ id: null });
  const [editRowsModel, setEditRowsModel] = useState({});
  const [selectedRows, setSelectedRows] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [openNotifications, setOpenNotifications] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://192.168.1.61:8081/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleCloseNotification = (id) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  const handleNotification = (message) => {
    const id = Math.random();
    const newNotification = { id, message };
    setNotifications([...notifications, newNotification]);
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const handleProcessRowUpdate = async (newRow) => {
    try {
      await axios.put(`http://192.168.1.61:8081/userupdate/${newRow.id}`, newRow);
      setUsers(users.map((user) => (user.id === newRow.id ? newRow : user)));
      setEditMode({ id: null });
      handleNotification(`User ID ${newRow.id} updated successfully`);
      return newRow;
    } catch (error) {
      console.error('Error updating user:', error);
      handleNotification(`Error updating user ID ${newRow.id}`, 'error');
      return newRow;
    }
  };

  const handleEditClick = (id) => {
    setEditMode({ id });
  };

  const handleCancelClick = () => {
    setEditMode({ id: null });
  };

  const handleSaveClick = async (id) => {
    const updatedRow = editRowsModel[id];
    if (updatedRow) {
      await handleProcessRowUpdate(updatedRow.data);
    }
  };

  const handleEditRowsModelChange = (model) => {
    setEditRowsModel(model);
  };

  const handleDeleteClick = async (id) => {
    try {
      await axios.delete(`http://192.168.1.61:8081/del/${id}`);
      setUsers(users.filter((user) => user.id !== id));
      handleNotification(`User ID ${id} deleted successfully`);
    } catch (error) {
      console.error('Error deleting user:', error);
      handleNotification(`Error deleting user ID ${id}`, 'error');
    }
  };

  const handleDeleteSelected = async () => {
    try {
      await Promise.all(selectedRows.map(id => axios.delete(`http://192.168.1.61:8081/del/${id}`)));
      setUsers(users.filter((user) => !selectedRows.includes(user.id)));
      setSelectedRows([]);
      handleNotification('Selected users deleted successfully');
    } catch (error) {
      console.error('Error deleting selected users:', error);
      handleNotification('Error deleting selected users', 'error');
    }
  };

  const handleDeleteAll = async () => {
    try {
      await axios.delete('http://192.168.1.61:8081/del-all');
      setUsers([]);
      handleNotification('All users deleted successfully');
    } catch (error) {
      console.error('Error deleting all users:', error);
      handleNotification('Error deleting all users', 'error');
    }
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 130, editable: true },
    { field: 'email', headerName: 'E-mail', width: 200, editable: true },
    { field: 'gender', headerName: 'Gender', width: 100, editable: true },
    { field: 'address', headerName: 'Address', width: 150, editable: true },
    { field: 'courses', headerName: 'Courses', width: 150, editable: true },
    { field: 'center', headerName: 'Center', width: 150, editable: true },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => {
        const isInEditMode = editMode.id === params.row.id;
        return (
          <div>
            {isInEditMode ? (
              <>
                <IconButton onClick={() => handleSaveClick(params.row.id)} color="primary">
                  <SaveIcon />
                </IconButton>
                <IconButton onClick={handleCancelClick} color="secondary">
                  <CancelIcon />
                </IconButton>
              </>
            ) : (
              <>
                <IconButton onClick={() => handleEditClick(params.row.id)} color="primary">
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDeleteClick(params.row.id)} color="secondary">
                  <DeleteIcon />
                </IconButton>
              </>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <h2 align="center"><b>ADMIN PANEL</b></h2>
      <Toolbar>
        <Button
          onClick={() => navigate('/')}
          variant="contained"
          color="primary"
          style={{ marginRight: '10px', marginLeft: '10px' }}
        >
          Registration Form
        </Button>
        <Button
          onClick={handleDeleteSelected}
          variant="contained"
          color="secondary"
          disabled={selectedRows.length === 0}
        >
          Delete Selected
        </Button>
        <Button
          onClick={handleDeleteAll}
          variant="contained"
          color="secondary"
          style={{ marginLeft: '10px' }}
        >
          Delete All
        </Button>
      </Toolbar>
      <div className="container">
        <DataGrid
          className="styl"
          rows={users}
          columns={columns}
          checkboxSelection
          disableRowSelectionOnClick
          onRowSelectionModelChange={(ids) => {
            setSelectedRows(ids)
          }}
          onSelectionModelChange={(newSelection) => setSelectedRows(newSelection.selectionModel)}
          editRowsModel={editRowsModel}
          onEditRowsModelChange={handleEditRowsModelChange}
          processRowUpdate={handleProcessRowUpdate}
          experimentalFeatures={{ newEditingApi: true }}
        />
      </div>
      <div style={{ position: 'fixed', top: 20, right: 20 }}>
        <Badge badgeContent={notifications.length} color="secondary">
          <IconButton onClick={() => setOpenNotifications(!openNotifications)}>
            <NotificationsIcon style={{ color: 'blue' }}/>
          </IconButton>
        </Badge>
        <NotificationPanel
          notifications={notifications}
          openNotifications={openNotifications}
          handleCloseNotification={handleCloseNotification}
        />
            
      </div>
      <Snackbar open={snackbarOpen} autoHideDuration={2000} onClose={() => setSnackbarOpen(false)}>
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={() => setSnackbarOpen(false)}
          sx={{ background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)', color: 'white' }}
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </div>
  );
}

export default Home;

