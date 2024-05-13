import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  TextField,
  useTheme,
  CircularProgress,
} from '@mui/material';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from 'components/Header';
import { DataGrid } from '@mui/x-data-grid';

const Providers = () => {
  const theme = useTheme();
  const [rows, setRows] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdateLoading, setIsUpdateLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  const columns = [
    {
      field: 'ID',
      headerName: 'ID',
      flex: 0.4,
    },
    // {
    //   field: 'onboarding_date',
    //   headerName: 'Onboarding Date',
    //   flex: 1,
    //   valueGetter: (params) => {
    //     const dateValue = params.row.onboarding_date; // Assuming onboarding_date is a date string from the API
    //     if (dateValue) {
    //       const formattedDate = new Date(dateValue).toLocaleDateString(
    //         'en-US',
    //         {
    //           day: '2-digit', // Include day (two-digit)
    //           month: 'short',
    //           year: 'numeric',
    //         }
    //       );
    //       return formattedDate;
    //     }
    //     return ''; // Handle empty date or invalid date values
    //   },
    // },
    {
      field: 'Name',
      headerName: 'Name',
      flex: 0.8,
    },
    {
      field: 'Gender',
      headerName: 'Gender',
      flex: 0.5,
    },
    {
      field: 'PhoneNumber',
      headerName: 'PhoneNumber',
      flex: 0.6,
      // renderCell: (params) => {
      //   return params.value.replace(/^(\d{3})(\d{3})(\d{4})/, "($1)$2-$3");
      // },
    },
    {
      field: 'Locations',
      headerName: 'Apartment',
      flex: 1,
    },
    {
      field: 'Region',
      headerName: 'Area',
      flex: 1,
    },
    {
      field: 'Services',
      headerName: 'Services',
      flex: 0.5,
    },
    {
      field: 'Timings',
      headerName: 'Timings',
      flex: 0.6,
    },
    // {
    //   field: 'AadharNumber',
    //   headerName: 'AadharNumber',
    //   flex: 0.7,
    // },
    {
      field: 'Actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: (params) => (
        <>
          <div style={{ marginRight: '15px' }}>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleEdit(params.row)}
            >
              Edit
            </Button>
          </div>
          <Button
            variant="contained"
            color="error"
            onClick={() => handleDelete(params.row.ID)}
          >
            {isDeleteLoading && selectedRow?.ID === params.row.ID ? (
              <CircularProgress size={20} />
            ) : (
              'Delete'
            )}
          </Button>
        </>
      ),
    },
  ];

  // Function to handle editing a row
  const handleEdit = (rowData) => {
    setSelectedRow(rowData);
    setIsFormOpen(true);
    console.log('Edit clicked for row:', rowData);
  };

  const handleDelete = async (rowId) => {
    try {
      setIsDeleteLoading(true);
      // Show confirmation dialog
      const isConfirmed = window.confirm('Are you sure you want to delete?');

      if (isConfirmed) {
        // If user clicks "OK" in the confirmation dialog
        // Implement your delete logic here
        console.log('Delete confirmed for row ID:', rowId);

        // Fetch the selected row based on rowId
        const selectedRow = rows.find((row) => row.ID === rowId);

        if (!selectedRow) {
          console.error('Selected row not found!');
          return;
        }

        // Make a DELETE request to delete the data in the database
        const response = await fetch(
          `https://backendapiyellowsense.azurewebsites.net/delete_service_provider`,
          {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              PhoneNumber: selectedRow.PhoneNumber,
            }),
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Update rows state to remove the deleted row
        setRows((prevRows) => prevRows.filter((row) => row.ID !== rowId));

        // Show success alert
        window.alert('Data deleted successfully!');
      }
    } catch (error) {
      console.error('Error deleting data:', error);
      // Show error alert
      window.alert('Error deleting data. Please try again.');
    } finally {
      setIsDeleteLoading(false); // Set loading to false after the operation is complete
    }
  };

  const fetchData = async () => {
    try {
      console.log('entered');
      const response = await fetch(
        'https://backendapiyellowsense.azurewebsites.net/serviceproviders'
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      setRows(result); // Update rows state with maid_details array
      console.log('api call 1', result);
      setIsLoading(false);
      // Cache the data
      await AsyncStorage.setItem('serviceProviderData', JSON.stringify(result));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchCachedData = async () => {
    try {
      const cachedData = await AsyncStorage.getItem('serviceProviderData');

      if (cachedData) {
        setRows(JSON.parse(cachedData));
      }

      // Always try to fetch fresh data in the background
      fetchData();
    } catch (error) {
      console.error('Error fetching cached data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getRowId = (row) => row.ID;

  // Function to handle form submission
  // Function to handle form submission
  const handleFormSubmit = async (formData) => {
    try {
      setIsUpdateLoading(true);
      // Prepare the data to be sent in the PUT request
      const requestData = {
        // ID: selectedRow?.ID,
        Name: formData.name,
        Gender: formData.gender,
        PhoneNumber: formData.phoneNumber,
        Locations: formData.locations,
        Region: formData.region,
        Services: formData.services,
        Timings: formData.timings,
        AadharNumber: formData.aadharNumber,
        OldPhoneNumber: selectedRow?.PhoneNumber,
      };

      // Log the request data before sending the request
      console.log('Request Data:', JSON.stringify(requestData));

      // Make a PUT request to update the data in the database
      const response = await fetch(
        'https://backendapiyellowsense.azurewebsites.net/update_service_provider',
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestData),
        }
      );

      // Log the response data after receiving the response
      console.log('Response Data:', await response.json());

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Update rows with new data
      setRows((prevRows) =>
        prevRows.map((row) =>
          row.ID === selectedRow.ID ? { ...row, ...requestData } : row
        )
      );

      // Close the form
      setIsFormOpen(false);

      // Show success alert
      window.alert('Data updated successfully!');
    } catch (error) {
      console.error('Error updating data:', error);
      // Show error alert
      window.alert('Error updating data. Please try again.');
    } finally {
      setIsUpdateLoading(false); // Set loading to false after the operation is complete
    }
  };

  return (
    <Box m="1.5rem 2.5rem">
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Header
          title="Service Provider"
          subtitle="List of All Service Providers"
        />

        {/* Button to open the form */}
        {/* <Button variant="contained" onClick={() => setIsFormOpen(true)}>
          Add
        </Button> */}
      </Box>
      {/* Conditionally render the form */}
      {isFormOpen && (
        <Dialog open={isFormOpen} onClose={() => setIsFormOpen(false)}>
          <DialogContent>
            <Box>
              {/* <Typography variant="h5" sx={{ marginBottom: '1rem' }}> */}
              Edit Service Provider Data
              {/* </Typography> */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  // Call the function to handle form submission
                  handleFormSubmit({
                    name: e.target.name.value || selectedRow?.Name || '',
                    gender: e.target.gender.value || selectedRow?.Gender || '',
                    phoneNumber:
                      e.target.phoneNumber.value ||
                      selectedRow?.PhoneNumber ||
                      '',
                    locations:
                      e.target.locations.value || selectedRow?.Locations || '',
                    services:
                      e.target.services.value || selectedRow?.Services || '',
                    timings:
                      e.target.timings.value || selectedRow?.Timings || '',
                    aadharNumber:
                      e.target.aadharNumber.value ||
                      selectedRow?.AadharNumber ||
                      '',
                    region: e.target.region.value || selectedRow?.Region || '', // Add Region field
                  });
                }}
              >
                <TextField
                  label="Name"
                  name="name"
                  defaultValue={selectedRow?.Name || ''}
                  fullWidth
                  margin="normal"
                />

                <div>
                  <label>
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      defaultChecked={selectedRow?.Gender === 'male'}
                    />
                    Male
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      defaultChecked={selectedRow?.Gender === 'female'}
                    />
                    Female
                  </label>
                </div>

                <TextField
                  label="Phone Number"
                  name="phoneNumber"
                  defaultValue={selectedRow?.PhoneNumber || ''}
                  fullWidth
                  margin="normal"
                />

                <TextField
                  label="Locations"
                  name="locations"
                  defaultValue={selectedRow?.Locations || ''}
                  fullWidth
                  margin="normal"
                />

                <TextField
                  label="Region"
                  name="region"
                  defaultValue={selectedRow?.Region || ''}
                  fullWidth
                  margin="normal"
                />

                <TextField
                  label="Services"
                  name="services"
                  defaultValue={selectedRow?.Services || ''}
                  fullWidth
                  margin="normal"
                />

                <TextField
                  label="Timings"
                  name="timings"
                  defaultValue={selectedRow?.Timings || ''}
                  fullWidth
                  margin="normal"
                />

                <TextField
                  label="Aadhar Number"
                  name="aadharNumber"
                  defaultValue={selectedRow?.AadharNumber || ''}
                  fullWidth
                  margin="normal"
                />

                <Button type="submit" variant="contained">
                  {isUpdateLoading ? <CircularProgress size={25} /> : 'Update'}
                </Button>
              </form>
            </Box>
          </DialogContent>
        </Dialog>
      )}

      <Box
        mt="40px"
        height="75vh"
        sx={{
          '& .MuiDataGrid-root': {
            border: 'none',
          },
          '& .MuiDataGrid-cell': {
            borderBottom: 'none',
          },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: 'none',
          },
          '& .MuiDataGrid-virtualScroller': {
            backgroundColor: theme.palette.primary.light,
          },
          '& .MuiDataGrid-footerContainer': {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: 'none',
          },
          '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid
          loading={isLoading}
          getRowId={getRowId}
          rows={rows}
          columns={columns}
        />
      </Box>
    </Box>
  );
};

export default Providers;
