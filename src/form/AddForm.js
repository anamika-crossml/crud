import { Button, TextField } from "@mui/material";
import React, { useState } from "react";

const AddForm = (props) => {
  const initalState = { id: null, name: "", username: "" };
  const [user, setUser] = useState(initalState);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault(); 
        if (!user.name || !user.username) return
        props.addUser(user);
        setUser(initalState);
      }}
    >
      <TextField
        type="text"
        label="Name"
        name="name"
        variant="outlined"
        size="small"
        value={user.name}
        style={{ marginTop: "20px" }}
        onChange={handleInputChange}
      />
      <br />
      <TextField
        size="small"
        type="text"
        name="username"
        label="Username"
        variant="outlined"
        value={user.username}
        style={{ marginTop: "20px" }}
        onChange={handleInputChange}
      />
      <br />
      <Button type="submit" variant="contained" color="primary" style={{ marginTop: "20px" }}>
        Add new user
      </Button>
    </form>
  );
};

export default AddForm;
