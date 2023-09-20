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
    <Paper style={{ marginRight: "20px" }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Username</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.users.length > 0 ? (
            props.users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell align="right">{user.username}</TableCell>
                <TableCell align="right">
                  <Button
                    onClick={() => {
                      props.editRow(user);
                    }}
                    variant="contained"
                    style={{ maxWidth: "70px" }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    style={{ maxWidth: "70px" }}
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
