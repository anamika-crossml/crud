import { Button, Grid, Modal, Paper, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import InputMask from "react-input-mask";

const EditForm = (props) => {
  const [user, setUser] = useState(props.currentUser);

  const [showQualificationDetails, setShowQualificationDetails] =
    useState(false);

  useEffect(() => {
    setUser(props.currentUser);
  }, [props]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleToggleQualificationDetails = () => {
    setShowQualificationDetails(!showQualificationDetails);
  };

  return (
    <>
      <Modal
        open={props.editing}
        onClose={() => props.setEditing(false)}
        aria-labelledby="edit-user-modal"
        aria-describedby="edit-user-form"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Paper elevation={3} style={{ padding: "20px", maxWidth: "400px" }}>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              if (!showQualificationDetails) {
                handleToggleQualificationDetails();
              } else {
                props.updateUser(user.id, user);
                handleToggleQualificationDetails();
              }
            }}
          >
            <Grid>
              <TextField
                type="text"
                label="First Name"
                name="first_name"
                variant="outlined"
                size="small"
                value={user.first_name}
                style={{ marginTop: "20px" }}
                onChange={handleInputChange}
                required
                InputProps={{
                  readOnly: showQualificationDetails,
                }}
              />
            </Grid>
            <Grid>
              <TextField
                size="small"
                type="text"
                name="last_name"
                label="Last name"
                variant="outlined"
                value={user.last_name}
                style={{ marginTop: "20px" }}
                onChange={handleInputChange}
                required
                InputProps={{
                  readOnly: showQualificationDetails,
                }}
              />
            </Grid>
            <Grid>
              <TextField
                type="text"
                label="Email"
                name="email"
                variant="outlined"
                size="small"
                value={user.email}
                style={{ marginTop: "20px" }}
                onChange={handleInputChange}
                required
                InputProps={{
                  readOnly: showQualificationDetails,
                }}
              />
            </Grid>

            <Grid>
              <InputMask
                mask="+91 (999) 999-9999"
                maskChar=""
                value={user.phone_number}
                onChange={handleInputChange}
              >
                {() => (
                  <TextField
                    type="tel"
                    label="Phone Number"
                    name="phone_number"
                    variant="outlined"
                    size="small"
                    style={{ marginTop: "20px" }}
                    required
                    InputProps={{
                      readOnly: showQualificationDetails,
                    }}
                  />
                )}
              </InputMask>
            </Grid>

            <Grid>
              <TextField
                type="text"
                label="Age"
                name="age"
                variant="outlined"
                size="small"
                value={user.age}
                style={{ marginTop: "20px" }}
                onChange={handleInputChange}
                required
                InputProps={{
                  readOnly: showQualificationDetails,
                }}
              />
            </Grid>

            {showQualificationDetails && (
              <Grid>
                <TextField
                  type="text"
                  label="Qualification Details"
                  name="qualification_details"
                  variant="outlined"
                  size="small"
                  value={user.qualification_details}
                  style={{ marginTop: "20px" }}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
            )}

            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ marginTop: "20px" }}
            >
              {showQualificationDetails ? "Update" : "Save"}
            </Button>
            <Button
              onClick={() => props.setEditing(false)}
              style={{ marginTop: "20px" }}
            >
              Cancel
            </Button>
          </form>
        </Paper>
      </Modal>
    </>
  );
};

export default EditForm;
