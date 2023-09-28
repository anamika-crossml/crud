import { AppBar, Grid, Toolbar, Typography } from "@mui/material";
import "./App.css";
import UserTable from "./tables/UserTable";
import { useState } from "react";
import AddForm from "./form/AddForm";
import EditForm from "./form/EditForm";

function App() {
  const usersData = [
    {
      id: 1,
      first_name: "gaurav",
      last_name: "verma",
      email: "gaurav@gmail.com",
      age: 22,
      phone_number: 9128374653,
      qualification_details: "graduation",
    },
    {
      id: 2,
      first_name: "namita",
      last_name: "bilandi",
      email: "namita@gmail.com",
      age: 21,
      phone_number: 6628374653,
      qualification_details: "Bachelor's of Engineering",
    },
    {
      id: 3,
      first_name: "Anamika",
      last_name: "nain",
      email: "anamika@gmail.com",
      age: 28,
      phone_number: 6228374653,
      qualification_details: "Computer Science Engineering",
    },
  ];

  const initialState = {
    id: null,
    first_name: "",
    last_name: "",
    email: "",
    age: "",
    phone_number: "",
    qualification_details: "",
  };

  const [users, setUsers] = useState(usersData);
  const [editing, setEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState(initialState);
  const [open, setOpen] = useState(false);
  


  const addUser = (user) => {
    user.id = users.length + 1;
    setUsers([...users, user]);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const editRow = (user) => {
    setEditing(true);
  
    setCurrentUser({
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      phone_number: user.phone_number,
      age: user.age,
      qualification_details: user.qualification_details,
    });
  };

  const deleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const updateUser = (id, updatedUser) => {
    setEditing(false);

    setUsers(users.map((user) => (user.id === id ? updatedUser : user)));
  };

  return (
    <div className="App">
      <AppBar position="static" style={{ background: "#2E3B55" }}>
        <Toolbar>
          <Typography
            variant="h3"
            color="lightblue"
            textAlign={"center"}
            style={{ marginLeft: "600px", fontWeight: 'bold' }}
          >
            CRUD App with Hooks
          </Typography>
        </Toolbar>
      </AppBar>
      <Grid container spacing={2} style={{ marginTop: "20px" }}>
  {editing ? (
    <Grid item xs={6}>
      {/* <Typography>Edit user</Typography> */}
      <EditForm
        editing={editing}
        setEditing={setEditing}
        currentUser={currentUser}
        updateUser={updateUser}
      />

    </Grid>
  ) : (
    <Grid item xs={6}>
     <AddForm addUser={addUser} handleOpen={handleOpen} open={open} setOpen={setOpen} />
    </Grid>
  )}
  <Grid item xs={12}>
    <UserTable users={users} deleteUser={deleteUser} editRow={editRow} />
  </Grid>
</Grid>
    </div>
  );
}

export default App;
