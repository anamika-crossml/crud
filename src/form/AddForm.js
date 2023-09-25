import {
  Button,
  Grid,
  TextField,
  Modal,
  Paper,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import InputMask from "react-input-mask";
import { Formik, Form } from "formik";
import * as Yup from "yup";

const AddForm = (props) => {
  const initialState = {
    id: null,
    first_name: "",
    last_name: "",
    email: "",
    age: "",
    phone_number: "",
    qualification_details: "",
  };

  const validationSchema = Yup.object().shape({
    first_name: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .matches(/^[A-Za-z]+$/, "First Name should contain only alphabets")
      .required("First Name is Required"),
    last_name: Yup.string()
      .required("Last Name is required")
      .matches(/^[A-Za-z]+$/, "Last Name should contain only alphabets"),
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email address"),
    age: Yup.number()
      .required("Age is required")
      .positive("Age must be a positive number")
      .integer("Age must be an integer")
      .typeError("Age must be a number"),
  });

  const [user, setUser] = useState(initialState);
  const [open, setOpen] = useState(false);
  const [showQualificationDetails, setShowQualificationDetails] =
    useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleClose = () => {
    setOpen(false);
    setShowQualificationDetails(false);
    setUser(initialState);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleSave = (values) => {
    console.log("Save button clicked");
    if (!showQualificationDetails) {
      setShowQualificationDetails(true);
    } else if (values.qualification_details) {
      props.addUser(values);
      handleClose();
    }
  };

  

  const handleCancel = () => {
    setOpen(false);
    setShowQualificationDetails(false);
    setUser(initialState);
  };

  const renderQualificationDetailsForm = () => {
    if (showQualificationDetails) {
      return (
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
          />
        </Grid>
      );
    }
    return null;
  };

  return (
    <>
      <Button
        onClick={handleOpen}
        variant="contained"
        color="primary"
        style={{ marginTop: "20px", marginLeft: "700px" }}
        size="large"
      >
        Add new user
      </Button>
      <Modal
        onClose={handleClose}
        open={open}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          width: "100%",
        }}
      >
        <Paper elevation={3} style={{ padding: "20px", maxWidth: "400px" }}>
          <Formik
            initialValues={initialState}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              if (!showQualificationDetails) {
                setShowQualificationDetails(true);
              } else {
                validationSchema
                  .validate(values, { abortEarly: false })
                  // .then(() => {
                  //   handleSave(values);
                  // })
                  .catch((errors) => {
                    console.error(errors);
                  });
              }
            }}
          >
            {(errors, touched ) => (
              <Form>
                <Grid>
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: "bold", marginLeft: "20px" }}
                  >
                    {showQualificationDetails
                      ? "Qualification Details"
                      : "Personal Details "}
                  </Typography>
                </Grid>
                <Grid>
                  {showQualificationDetails ? (
                    <Typography
                      variant="body1"
                      style={{ marginTop: "20px" }}
                    >
                      First Name: {user.first_name}
                    </Typography>
                  ) : (
                    <TextField
                      type="text"
                      label="First Name"
                      name="first_name"
                      variant="outlined"
                      size="small"
                      value={user.first_name}
                      style={{ marginTop: "20px" }}
                      onChange={handleInputChange}
                    />
                  )}
                    {errors.first_name && touched.first_name ? (
            <div>{errors.first_name}</div>
           ) : null}
                  
                </Grid>
                <Grid>
                  {showQualificationDetails ? (
                    <Typography
                      variant="body1"
                      style={{ marginTop: "20px" }}
                    >
                      Last Name: {user.last_name}
                    </Typography>
                  ) : (
                    <TextField
                      size="small"
                      type="text"
                      name="last_name"
                      label="Last name"
                      variant="outlined"
                      value={user.last_name}
                      style={{ marginTop: "20px" }}
                      onChange={handleInputChange}
                    />
                  )}
                    {errors.last_name && touched.last_nameirst_name ? (
            <div>{errors.last_name}</div>
           ) : null}
                </Grid>
                <Grid>
                  {showQualificationDetails ? (
                    <Typography
                      variant="body1"
                      style={{ marginTop: "20px" }}
                    >
                      Email: {user.email}
                    </Typography>
                  ) : (
                    <TextField
                      type="text"
                      label="Email"
                      name="email"
                      variant="outlined"
                      size="small"
                      value={user.email}
                      style={{ marginTop: "20px" }}
                      onChange={handleInputChange}
                    />
                  )}
                     {errors.email && touched.email ? (
            <div>{errors.email}</div>
           ) : null}
                </Grid>
                <Grid>
                  {showQualificationDetails ? (
                    <Typography
                      variant="body1"
                      style={{ marginTop: "20px" }}
                    >
                      Phone Number: {user.phone_number}
                    </Typography>
                  ) : (
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
                        />
                      )}
                    </InputMask>
                  )}
                </Grid>
                <Grid>
                  {showQualificationDetails ? (
                    <Typography
                      variant="body1"
                      style={{ marginTop: "20px" }}
                    >
                      Age: {user.age}
                    </Typography>
                  ) : (
                    <TextField
                      type="text"
                      label="Age"
                      name="age"
                      variant="outlined"
                      size="small"
                      value={user.age}
                      style={{ marginTop: "20px" }}
                      onChange={handleInputChange}
                    />
                  )}
                    {errors.age && touched.age ? (
            <div>{errors.age}</div>
           ) : null}
                </Grid>
                {renderQualificationDetailsForm()}
                <Button
                  type="submit"
                  variant="contained"
                  style={{ marginTop: "10px", marginLeft: "10px" }}
                  onClick={handleSave}
                >
                  Save
                </Button>
                <Button
                  variant="contained"
                  style={{ marginTop: "10px", marginLeft: "10px" }}
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
              </Form>
            )}
          </Formik>
        </Paper>
      </Modal>
    </>
  );
};

export default AddForm;
