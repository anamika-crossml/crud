import React, { useState } from "react";
import {
  Button,
  Grid,
  Modal,
  Paper,
  Typography,
  TextField,
} from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputMask from "react-input-mask";

const validationSchema = Yup.object().shape({
  first_name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .matches(/^[A-Za-z]+$/, "Only alphabets are allowed for First Name")
    .required("First Name is required"),
  last_name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .matches(/^[A-Za-z]+$/, "Only alphabets are allowed for Last Name")
    .required("Last Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  age: Yup.number()
  .typeError("Age must be a number")
    .required("Age is required")
    .positive("Age must be positive")
    .integer("Age must be an integer"),
  phone_number: Yup.string().required("Phone Number is required"),
  qualification_details: Yup.string().matches(
    /^[A-Za-z\s]+$/,
    "Only alphabets and spaces are allowed for Qualification Details"),
});

const AddForm = (props) => {

  const [showQualificationDetails, setShowQualificationDetails] = useState(false);
  
  const resetForm = () => {
    setShowQualificationDetails(false);
  };

  const handleClose = () => {
    props.setOpen(false);
  };

  return (
    <>
      <Button
        onClick={() => {
          props.handleOpen();
          resetForm();
        }}
        variant="contained"
        color="primary"
        style={{ marginTop: "20px", marginLeft: "700px" }}
        size="large"
      >
        Add new user
      </Button>
      <Modal
        onClose={handleClose}
        open={props.open}
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
            initialValues={{
              first_name: "",
              last_name: "",
              email: "",
              age: "",
              phone_number: "",
              qualification_details: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              if (!showQualificationDetails) {
                setShowQualificationDetails(true);
              } else {
                props.addUser(values);
                handleClose();
              }
            }}
          >
            {(formikProps) => (
              <Form>
                <Grid>
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: "bold", marginLeft: "20px" }}
                  >
                    {formikProps.values.qualification_details
                      ? "Qualification Details"
                      : "Personal Details "}
                  </Typography>
                </Grid>
                <Grid>
                {showQualificationDetails ? (
                    <Typography variant="body1" style={{ marginTop: "20px" }}>
                      First Name: {formikProps.values.first_name}
                    </Typography>
                  ) : (
                  <TextField
                    type="text"
                    label="First Name"
                    name="first_name"
                    variant="outlined"
                    size="small"
                    style={{ marginTop: "20px" }}
                    value={formikProps.values.first_name}
                    onChange={formikProps.handleChange}
                    error={
                      formikProps.touched.first_name &&
                      Boolean(formikProps.errors.first_name)
                    }
                    helperText={
                      formikProps.touched.first_name &&
                      formikProps.errors.first_name
                    }
                    InputProps={{
                      readOnly: showQualificationDetails,
                    }}
                  />
                  )}
                </Grid>
                <Grid>
                {showQualificationDetails ? (
                    <Typography variant="body1" style={{ marginTop: "20px" }}>
                      Last Name: {formikProps.values.last_name}
                    </Typography>
                  ) : (
                  <TextField
                    size="small"
                    type="text"
                    name="last_name"
                    label="Last name"
                    variant="outlined"
                    style={{ marginTop: "20px" }}
                    value={formikProps.values.last_name}
                    onChange={formikProps.handleChange}
                    error={
                      formikProps.touched.last_name &&
                      Boolean(formikProps.errors.last_name)
                    }
                    helperText={
                      formikProps.touched.last_name &&
                      formikProps.errors.last_name
                    }
                    InputProps={{
                      readOnly: showQualificationDetails,
                    }}
                  />
                  )}
                </Grid>
                <Grid>
                {showQualificationDetails ? (
                    <Typography variant="body1" style={{ marginTop: "20px" }}>
                      Email: {formikProps.values.email}
                    </Typography>
                  ) : (
                  <TextField
                    type="text"
                    label="Email"
                    name="email"
                    variant="outlined"
                    size="small"
                    style={{ marginTop: "20px" }}
                    value={formikProps.values.email}
                    onChange={formikProps.handleChange}
                    error={
                      formikProps.touched.email &&
                      Boolean(formikProps.errors.email)
                    }
                    helperText={
                      formikProps.touched.email && formikProps.errors.email
                    }
                    InputProps={{
                      readOnly: showQualificationDetails,
                    }}
                  />
                  )}
                </Grid>
                <Grid>
                {showQualificationDetails ? (
                    <Typography variant="body1" style={{ marginTop: "20px" }}>
                      Phone Number: {formikProps.values.phone_number}
                    </Typography>
                  ) : (
                  <InputMask
                    mask="+91 (999) 999-9999"
                    maskChar=""
                    value={formikProps.values.phone_number}
                    onChange={formikProps.handleChange}
                  >
                    {() => (
                      <TextField
                        type="tel"
                        label="Phone Number"
                        name="phone_number"
                        variant="outlined"
                        size="small"
                        style={{ marginTop: "20px" }}
                        error={
                          formikProps.touched.phone_number &&
                          Boolean(formikProps.errors.phone_number)
                        }
                        helperText={
                          formikProps.touched.phone_number &&
                          formikProps.errors.phone_number
                        }
                        InputProps={{
                          readOnly: showQualificationDetails,
                        }}
                      />
                    )}
                  </InputMask>
                   )}
                </Grid>
                <Grid>
                {showQualificationDetails ? (
                    <Typography variant="body1" style={{ marginTop: "20px" }}>
                      Age: {formikProps.values.age}
                    </Typography>
                  ) : (
                  <TextField
                    type="text"
                    label="Age"
                    name="age"
                    variant="outlined"
                    size="small"
                    style={{ marginTop: "20px" }}
                    value={formikProps.values.age}
                    onChange={formikProps.handleChange}
                    error={
                      formikProps.touched.age && Boolean(formikProps.errors.age)
                    }
                    helperText={
                      formikProps.touched.age && formikProps.errors.age
                    }
                    InputProps={{
                      readOnly: showQualificationDetails,
                    }}
                  />
                  )}
                </Grid>
                {showQualificationDetails && (
        <Grid>
          <TextField
            type="text"
            label="Qualification Details"
            name="qualification_details"
            variant="outlined"
            size="small"
            style={{ marginTop: "20px" }}
            value={formikProps.values.qualification_details}
            onChange={formikProps.handleChange}
            error={
              formikProps.touched.qualification_details && Boolean(formikProps.errors.qualification_details)
            }
            helperText={
              formikProps.touched.qualification_details && formikProps.errors.qualification_details
            }
          />
        </Grid>
      )}
                <Button
                  type="submit"
                  variant="contained"
                  style={{ marginTop: "10px", marginLeft: "10px" }}
                >
                  Save
                </Button>
                <Button
                  variant="contained"
                  style={{ marginTop: "10px", marginLeft: "10px" }}
                  onClick={handleClose}
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

//s
// .matches(
  // /^[A-Za-z\s]+$/,
  // "Only alphabets and spaces are allowed for Qualification Details"