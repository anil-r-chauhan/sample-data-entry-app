import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Typography, Box } from "@mui/material";

const UserDetailsPage = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUserDetails = () => {
      const users = JSON.parse(localStorage.getItem("usersData")) || [];
      const foundUser = users.find((user) => user.id == id);
      setUser(foundUser);
    };

    getUserDetails();
  }, [id]);

  return (
    <Box
      style={{
        padding: "20px",
        margin: "20px auto",
        maxWidth: "600px",
        width:"400px",
        border: "1px solid grey",
        borderRadius: "5px",
      }}
    >
      <Typography variant="h4" gutterBottom>
        User Details
      </Typography>
      {user ? (
        <Box sx={{
            display:"flex",
            alignItems:"start",
            flexDirection:"column"
        }}>
          <Typography variant="body1">
            <strong>Name:</strong> {user.name}
          </Typography>
          <Typography variant="body1">
            <strong>Phone:</strong> {user.phoneNumber ? user.phoneNumber : "-"}
          </Typography>
          <Typography variant="body1">
            <strong>Email:</strong> {user.email ? user.email : "-"}
          </Typography>
          <Typography variant="body1">
            <strong>Address:</strong> {user.address ? user.address : "-"}
          </Typography>
        </Box>
      ) : (
        <Typography variant="body1">User not found</Typography>
      )}
    </Box>
  );
};

export default UserDetailsPage;
