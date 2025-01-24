import React, { useState, useEffect, useMemo } from "react";
import Grid from "@mui/material/Grid";
import { DataGrid } from "@mui/x-data-grid";
import UserFormModal from "../modals/UserFormModal";
import { Clear, Search } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { Button, TextField, Box, IconButton } from "@mui/material";
import ConfirmationModal from "../modals/ConfirmationModal";
import { v4 as uuidv4 } from "uuid";

const UsersDataTable = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [searchEmail, setSearchEmail] = useState("");

  const columns = [
    {
      field: "name",
      headerName: "Name",
      headerAlign: "center",
      width: 200,
      align: "center",
    },
    {
      field: "email",
      headerName: "Email",
      headerAlign: "center",
      width: 200,
      align: "center",
    },
    {
      field: "phoneNumber",
      headerName: "Phone",
      headerAlign: "center",
      width: 200,
      align: "center",
    },
    {
      field: "delete",
      headerName: "",
      headerAlign: "center",
      align: "center",
      width: 130,
      renderCell: (params) => (
        <Grid container spacing={1} alignItems="center" justifyContent="center">
          <Grid item>
            <Button
              variant="text"
              color="error"
              onClick={() => {
                setItemToDelete(params.row.id);
                setShowConfirmationModal(true);
              }}
            >
              Delete
            </Button>
          </Grid>
        </Grid>
      ),
    },
    {
      field: "details",
      headerName: "",
      headerAlign: "center",
      align: "center",
      width: 130,
      renderCell: (params) => (
        <Grid container spacing={1} alignItems="center" justifyContent="center">
          <Grid item>
            <Button
              variant="text"
              color="primary"
              onClick={() => handleViewDetails(params.row.id)}
            >
              Details
            </Button>
          </Grid>
        </Grid>
      ),
    },
  ];

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("usersData")) || [];
    setUsers(storedUsers);
  }, []);

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleCreate = (data) => {
    const newId = uuidv4();
    const newItem = { id: newId, ...data };
    const updatedUsers = [...users, newItem];
    setUsers(updatedUsers);
    localStorage.setItem("usersData", JSON.stringify(updatedUsers));
    handleCloseModal();
  };

  const handleDelete = () => {
    const updatedUsers = users.filter((user) => user.id !== itemToDelete);
    setUsers(updatedUsers);
    localStorage.setItem("usersData", JSON.stringify(updatedUsers));
    setItemToDelete(null);
    setShowConfirmationModal(false);
  };

  const handleViewDetails = (id) => {
    navigate(`/userdetails/${id}`);
  };

  const handleSearchEmailChange = (value) => {
    setSearchEmail(value);
  };

  const filteredUsers = useMemo(() => {
    return users.filter((user) =>
      user.email.toLowerCase().includes(searchEmail.toLowerCase())
    );
  }, [users, searchEmail]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      {/* form modal */}
      <UserFormModal
        open={showModal}
        onClose={handleCloseModal}
        onSubmit={handleCreate}
      />
      {/* confirmation modal */}
      <ConfirmationModal
        isOpen={showConfirmationModal}
        onClose={() => setShowConfirmationModal(false)}
        onConfirm={handleDelete}
      />
      <Box>
        <Grid
          container
          justifyContent="space-between"
          style={{ marginBottom: "20px" }}
        >
          <Grid item>
            <TextField
              autoComplete="off"
              variant="outlined"
              value={searchEmail}
              onChange={(e) => handleSearchEmailChange(e?.target?.value)}
              sx={{
                marginBottom: "20px",
              }}
              InputProps={{
                startAdornment: <Search sx={{ color: "gray" }} />,
                endAdornment:
                  searchEmail?.trim()?.length > 0 ? (
                    <IconButton
                      onClick={() => handleSearchEmailChange("")}
                      sx={{ padding: 0 }}
                    >
                      <Clear sx={{ color: "gray" }} />
                    </IconButton>
                  ) : null,
                placeholder: "Search by Email Address",
                style: {
                  borderRadius: "25px",
                  height: "32px",
                  width: "400px",
                  padding: "20px",
                },
              }}
            />
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              sx={{ width: "150px" }}
              onClick={handleToggleModal}
            >
              Create
            </Button>
          </Grid>
        </Grid>
        <Box sx={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={filteredUsers}
            columns={columns}
            disableRowSelectionOnClick
            hideFooter
            pageSize={5}
            rowsPerPageOptions={[5, 10, 20]}
            sx={{
              "& .MuiDataGrid-columnHeader": {
                backgroundColor: "#CCCCCC",
                borderBottom: "1px solid #ddd",
                borderRight: "1px solid #ddd",
              },
              "& .MuiDataGrid-columnHeader:last-child": {
                borderRight: "none",
              },
              "& .MuiDataGrid-cell": {
                borderRight: "1px solid #ddd",
              },
              "& .MuiDataGrid-cell:last-child": {
                borderRight: "none",
              },
              "& .MuiDataGrid-columnSeparator": {
                display: "none",
              },
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default UsersDataTable;
