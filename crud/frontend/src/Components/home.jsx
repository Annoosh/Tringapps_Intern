import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { Button, IconButton, Toolbar } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [users, setUsers] = useState([]);
  const [editMode, setEditMode] = useState({ id: null });
  const [editRowsModel, setEditRowsModel] = useState({});
  const [selectedRows, setSelectedRows] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8081/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleProcessRowUpdate = async (newRow) => {
    try {
      await axios.put(`http://localhost:8081/userupdate/${newRow.id}`, newRow);
      setUsers(users.map((user) => (user.id === newRow.id ? newRow : user)));
      setEditMode({ id: null });
      return newRow;
    } catch (error) {
      console.error('Error updating user:', error);
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
      await axios.delete(`http://localhost:8081/del/${id}`);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleDeleteSelected = async () => {
    console.log(selectedRows);
    try {
      await (selectedRows.map(id => axios.delete(`http://localhost:8081/del/${id}`)));
      setUsers(users.filter((user) => !selectedRows.includes(user.id)));
      setSelectedRows([]);
    } catch (error) {
      console.error('Error deleting selected users:', error);
    }
  };

  const handleDeleteAll = async () => {
    try {
      await axios.delete('http://localhost:8081/del-all');
      setUsers([]);
    } catch (error) {
      console.error('Error deleting all users:', error);
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
          onRowSelectionModelChange={(ids)=>{
            setSelectedRows(ids)
          }}
          onSelectionModelChange={(newSelection) => setSelectedRows(newSelection.selectionModel)}
          editRowsModel={editRowsModel}
          onEditRowsModelChange={handleEditRowsModelChange}
          processRowUpdate={handleProcessRowUpdate}
          experimentalFeatures={{ newEditingApi: true }}
        />
      </div>
    </div>
  );
}

export default Home;
