import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";

const UserTable = (props) => {
  return (
    <Paper style={{  marginTop: "20px", marginLeft: '20px', marginRight: '20px' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell >First Name</TableCell>
            <TableCell >Last Name</TableCell>
            <TableCell >Email</TableCell>
            <TableCell >Phone Number</TableCell>
            <TableCell >Age</TableCell>
            <TableCell >Qualification Details</TableCell>
            <TableCell >Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.users.length > 0 ? (
            props.users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.first_name}</TableCell>
                <TableCell>{user.last_name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone_number}</TableCell>
                <TableCell>{user.age}</TableCell>
                <TableCell>{user.qualification_details}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => {
                      props.editRow(user);
                    }}
                    variant="contained"
                    style={{ marginRight: '20px' }}
                    size="medium"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    size="medium"
                    onClick={() => props.deleteUser(user.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan="3">No users</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default UserTable;
