import React, { useState } from "react";
import { Close } from "@mui/icons-material";
import { TextField, Modal, Button, Grid, Box, Typography } from "@mui/material";

const UserFormModal = ({ open, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleSubmit = () => {
    const { name, email, phoneNumber, address } = formData;
    const newErrors = {};

    const phoneNumberRegex = /^\d{10}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (name.trim() === "") {
      newErrors.name = "Name Field is required";
    }
    if (email.trim() === "") {
      newErrors.email = "Email Field is required";
    } else if (!email.match(emailRegex)) {
      newErrors.email = "Invalid email format";
    }
    if (phoneNumber.trim() === "") {
      newErrors.phoneNumber = "Phone number Field is required";
    } else if (!phoneNumber.match(phoneNumberRegex)) {
      newErrors.phoneNumber = "Invalid phone number";
    }
    if (address.trim() === "") {
      newErrors.address = "Address Field is required";
    }

    if (Object.keys(newErrors).length === 0) {
      onSubmit(formData);
      handleClose();
    } else {
      setErrors(newErrors);
    }
  };

  const handleClose = () => {
    setFormData({
      name: "",
      email: "",
      phoneNumber: "",
      address: "",
    });
    setErrors({
      name: "",
      email: "",
      phoneNumber: "",
      address: "",
    });
    onClose();
  };

  return (
    <>
      <Modal open={open} onClose={() => handleClose()}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "8px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <Typography variant="h5">Create User</Typography>
            <Close
              sx={{ color: "black", cursor: "pointer" }}
              onClick={() => handleClose()}
            />
          </Box>
          <Grid container spacing={1} justify="center" alignItems="center">
            <Grid item xs={12}>
              <TextField
                label="Name*"
                name="name"
                variant="outlined"
                value={formData.name}
                error={!!errors.name}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              {!!errors.name ? (
                <Typography color="error" variant="body2">
                  {errors.name}
                </Typography>
              ) : null}
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email*"
                name="email"
                error={!!errors.email}
                type="email"
                variant="outlined"
                value={formData.email}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              {!!errors.email ? (
                <Typography color="error" variant="body2">
                  {errors.email}
                </Typography>
              ) : null}
            </Grid>
            <Grid item xs={12}>
              <TextField
                sx={{
                  '& input[type="number"]::-webkit-outer-spin-button, & input[type="number"]::-webkit-inner-spin-button':
                    {
                      WebkitAppearance: "none",
                      margin: 0,
                    },
                  '& input[type="number"]': {
                    MozAppearance: "textfield", // For Firefox
                  },
                }}
                label="Phone Number*"
                name="phoneNumber"
                error={!!errors.phoneNumber}
                type="number"
                variant="outlined"
                value={formData.phoneNumber}
                onKeyPress={(e) => {
                  const char = e.key;
                  if (
                    !/[\d]/.test(char) &&
                    char !== "Backspace" &&
                    char !== "ArrowLeft" &&
                    char !== "ArrowRight"
                  ) {
                    e.preventDefault();
                  }
                }}
                onChange={(e) => {
                  const { name, value } = e.target;
                  const sanitizedValue = value.replace(/[^0-9]/g, "");

                  e.target.value = sanitizedValue;
                  handleChange(e);
                }}
                fullWidth
                margin="normal"
              />
              {!!errors.phoneNumber ? (
                <Typography color="error" variant="body2">
                  {errors.phoneNumber}
                </Typography>
              ) : null}
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Address*"
                name="address"
                error={!!errors.address}
                variant="outlined"
                value={formData.address}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              {!!errors.address ? (
                <Typography color="error" variant="body2">
                  {errors.address}
                </Typography>
              ) : null}
            </Grid>
          </Grid>
          <Box sx={{ textAlign: "right", marginTop: "20px" }}>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Save
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default UserFormModal;
