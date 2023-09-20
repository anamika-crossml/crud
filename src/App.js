import { AppBar, Grid, Toolbar, Typography } from '@mui/material';
import './App.css';
import UserTable from './tables/UserTable';
import { useState } from 'react';
import AddForm from './form/AddForm';
import EditForm from './form/EditForm';

function App() {
  const usersData = [
    {id: 1, name: 'anamika', username: 'anamika11'},
    {id: 2, name: 'priya', username: '123an'},
    {id: 3, name: 'kaku', username: 'ewe12'},
  ];

  const initialState = { id: null, name: '', username: '' }

const [users, setUsers] = useState(usersData)
const [editing, setEditing] = useState(false)
const [currentUser, setCurrentUser] = useState(initialState)

const addUser = (user) => {
  user.id = users.length + 1
  setUsers([...users, user])
}

const editRow = (user) => {
  setEditing(true)

  setCurrentUser({ id: user.id, name: user.name, username: user.username })
} 

const deleteUser = (id) => {
  setUsers(users.filter((user) => user.id !== id))
}

const updateUser = (id, updatedUser) => {
  setEditing(false)

  setUsers(users.map((user) => (user.id === id ? updatedUser : user)))
}

  return (
    <div className="App">
       <AppBar position="static" style={{ background: '#2E3B55' }}>
        <Toolbar>
        <Typography variant="h3" color="lightblue" textAlign={'center'} style={{marginLeft: '600px'}}>CRUD App with Hooks</Typography>
        </Toolbar>
      </AppBar>
        <Grid container spacing={2} style={{marginTop:'20px'}}>
        {editing ? (
      <Grid item xs={6}>
        <Typography>Edit user</Typography>
        <EditForm 
        editing={editing}
        setEditing={setEditing}
        currentUser={currentUser}
        updateUser={updateUser}
         />
      </Grid>
      ) : (
      <Grid item xs={6}>
        <Typography>Add User</Typography>
        <AddForm addUser={addUser} />
      </Grid>
        )}
      <Grid item xs={6}>
        <Typography>View Users</Typography>
        <UserTable users={users} deleteUser={deleteUser} editRow={editRow} />
      </Grid>
      </Grid>
  
    </div>
  );
}

export default App;


