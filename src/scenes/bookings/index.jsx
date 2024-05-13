import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  TextField,
  useTheme,
  MenuItem,
  Grid,
  Typography,
} from '@mui/material';
import Header from 'components/Header';
import { DataGrid } from '@mui/x-data-grid';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import exportFromJSON from 'export-from-json';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Bookings = () => {
  const theme = useTheme();
  const [rows, setRows] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [totalLastDayBookings, setTotalLastDayBookings] = useState(0);
  const [totalCurrentDayBookings, setTotalCurrentDayBookings] = useState(0);

  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      flex: 0.4,
      minWidth: 50,
    },
    {
      field: 'booking_source',
      headerName: 'Booking Source',
      flex: 0.8,
      minWidth: 120,
    },
    {
      field: 'user_name',
      headerName: 'Customer Name',
      flex: 0.8,
      minWidth: 140,
    },
    {
      field: 'user_phone_number',
      headerName: 'Customer Number',
      flex: 0.8,
      minWidth: 120,
    },
    {
      field: 'user_address',
      headerName: 'User Address',
      flex: 1,
      minWidth: 160,
    },
    {
      field: 'Region',
      headerName: 'Area Name',
      flex: 1,
      minWidth: 140,
    },
    {
      field: 'apartment',
      headerName: 'Apartment Name',
      flex: 1,
      minWidth: 140,
    },
    {
      field: 'service_type',
      headerName: 'Service Type',
      flex: 0.5,
      minWidth: 100,
    },
    {
      field: 'provider_name',
      headerName: 'Provider Name',
      flex: 0.6,
      minWidth: 140,
    },
    {
      field: 'provider_phone_number',
      headerName: 'Provider Number',
      flex: 0.6,
      minWidth: 120,
    },
    {
      field: 'start_time',
      headerName: 'Timings',
      flex: 0.5,
      minWidth: 140,
    },
    {
      field: 'BookingType',
      headerName: 'BookingType',
      flex: 0.8,
      minWidth: 100,
    },

    {
      field: 'StartDate',
      headerName: 'BookingDate',
      flex: 0.8,
      minWidth: 120,
      valueGetter: (params) => {
        const dateValue = params.row.StartDate; // Assuming onboarding_date is a date string from the API
        if (dateValue) {
          const formattedDate = new Date(dateValue).toLocaleDateString(
            'en-US',
            {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
            }
          );
          return formattedDate;
        }
        return '';
      },
    },
    {
      field: 'status',
      headerName: 'status',
      flex: 0.6,
      minWidth: 120,
    },
    // {
    //   field: 'ServiceStatus',
    //   headerName: 'ServiceStatus',
    //   flex: 0.8,
    //   minWidth: 140,
    // },
    {
      field: 'TotalAmount',
      headerName: 'TransactionAmount',
      flex: 0.8,
      minWidth: 140,
    },
    {
      field: 'Payment_Status',
      headerName: 'Payment Status',
      flex: 0.8,
      minWidth: 140,
    },
    {
      field: 'TransactionId',
      headerName: 'TransactionId',
      flex: 0.8,
      minWidth: 110,
    },
    {
      field: 'TransactionDate',
      headerName: 'TransactionDate',
      flex: 1,
      minWidth: 110,
      valueGetter: (params) => {
        const dateValue = params.row.TransactionDate;
        if (dateValue) {
          const formattedDate = new Date(dateValue).toLocaleDateString(
            'en-US',
            {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
            }
          );
          return formattedDate;
        }
        return '';
      },
    },

    // {
    //   field: 'AdditionalRequirements',
    //   headerName: 'AdditionalRequirements',
    //   flex: 0.6,
    //   minWidth: 140,
    // },

    // {
    //   field: 'special_requirements',
    //   headerName: 'special_requirements',
    //   flex: 0.6,
    //   minWidth: 140,
    // },

    {
      field: 'actions',
      headerName: 'Actions',
      flex: 0.6,
      minWidth: 120,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="secondary"
          onClick={() => handleUpdate(params.row)}
        >
          Update
        </Button>
      ),
    },

    // {
    //   field: 'Comments',
    //   headerName: 'Comments',
    //   flex: 1.2,
    //   minWidth: 140,
    // },
    // {
    //   field: 'NonFulfillmentReason',
    //   headerName: 'NonFulfillmentReason',
    //   flex: 1.2,
    //   minWidth: 140,
    // },
    // {
    //   field: 'OperationalStatus',
    //   headerName: 'OperationalStatus',
    //   flex: 0.8,
    //   minWidth: 140,
    // },
    // {
    //   field: 'child_number',
    //   headerName: 'child_number',
    //   flex: 0.6,
    //   minWidth: 140,
    // },
    // {
    //   field: 'complete_address',
    //   headerName: 'complete_address',
    //   flex: 0.6,
    //   minWidth: 140,
    // },
    // {
    //   field: 'created_at',
    //   headerName: 'created_at',
    //   flex: 0.6,
    //   minWidth: 140,
    // },
    // {
    //   field: 'customer_status',
    //   headerName: 'customer_status',
    //   flex: 0.6,
    //   minWidth: 140,
    // },
    // {
    //   field: 'food_preferences',
    //   headerName: 'food_preferences',
    //   flex: 0.6,
    //   minWidth: 140,
    // },
    // {
    //   field: 'house_size',
    //   headerName: 'house_size',
    //   flex: 0.6,
    //   minWidth: 140,
    // },
    // {
    //   field: 'new_mobilenumber',
    //   headerName: 'new_mobilenumber',
    //   flex: 0.6,
    //   minWidth: 140,
    // },
  ];

  const handleUpdate = (rowData) => {
    const updatedData = {
      provider_name: rowData.provider_name || '',
      provider_phone_number: rowData.provider_phone_number || '',
      status: rowData.status || '',
      TransactionId: rowData.TransactionId || '',
      TransactionAmount: rowData.TransactionAmount || '',
      TransactionDate: rowData.TransactionDate || '',
      ServiceStatus: rowData.ServiceStatus || '',
      Payment_Status: rowData.Payment_Status || '',
      user_phone_number: rowData.user_phone_number || '',
      id: rowData.id || '',
    };
    setSelectedRow(updatedData);
    setIsFormOpen(true);
  };

  // Function to handle updating data through API
  const handleUpdateSubmit = async (updatedData) => {
    setIsLoading(true); // Set loading to true when starting the PUT request
    try {
      // Check if mandatory fields are present
      if (!updatedData.user_phone_number || !updatedData.id) {
        throw new Error('Missing mandatory fields: user_phone_number and id');
      }

      const response = await axios.put(
        'https://backendapiyellowsense.azurewebsites.net/update_service_booking',
        updatedData
      );

      console.log('Update success:', response.data);

      fetchData();

      setIsFormOpen(false);
      toast.success('Booking details updated successfully!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.error('Update error:', error);
      toast.error(
        'Error updating booking details. Please Fill All the Required Fields.',
        {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
    } finally {
      setIsLoading(false);
    }
  };

  const calculatePaymentStatus = (bookings) => {
    const updatedBookings = bookings.map((booking) => {
      const totalAmount = parseFloat(booking.TotalAmount) || 0;
      const amountPaid = parseFloat(booking.amountPaid) || 0;
      const remainingAmount = totalAmount - amountPaid;
      return {
        ...booking,
        totalAmountPaid: amountPaid.toFixed(2), // Total amount paid
        remainingAmount: remainingAmount.toFixed(2), // Remaining amount
      };
    });
    return updatedBookings;
  };

  const fetchData = async () => {
    try {
      const response = await fetch(
        'https://backendapiyellowsense.azurewebsites.net/bookings'
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log('api call', result);

      // Calculate total last day's bookings and current day's bookings
      const currentDate = new Date();
      const lastDay = new Date(currentDate);
      lastDay.setDate(lastDay.getDate() - 1);

      const lastDayBookings = result.filter((booking) => {
        const bookingDate = new Date(booking.created_at);
        return (
          bookingDate.getDate() === lastDay.getDate() &&
          bookingDate.getMonth() === lastDay.getMonth() &&
          bookingDate.getFullYear() === lastDay.getFullYear()
        );
      });

      setTotalLastDayBookings(lastDayBookings.length);

      const currentDayBookings = result.filter((booking) => {
        const bookingDate = new Date(booking.created_at);
        return (
          bookingDate.getDate() === currentDate.getDate() &&
          bookingDate.getMonth() === currentDate.getMonth() &&
          bookingDate.getFullYear() === currentDate.getFullYear()
        );
      });

      setTotalCurrentDayBookings(currentDayBookings.length);

      const updatedRows = calculatePaymentStatus(result);

      setRows(updatedRows);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getRowId = (row) => row.id;

  const DownloadButton = ({ data }) => {
    const handleDownload = () => {
      const fileName = 'data';
      exportFromJSON({ data, fileName, exportType: 'csv' });
    };

    return (
      <Button variant="contained" color="primary" onClick={handleDownload}>
        Sales Report
      </Button>
    );
  };

  const handleDownload = () => {
    // Extract specific fields for the payment report
    const dataToDownload = rows.map((row) => ({
      user_name: row.user_name,
      user_phone_number: row.user_phone_number,
      provider_name: row.provider_name,
      provider_phone_number: row.provider_phone_number,
      BookingType: row.BookingType,
      BoookingDate: row.StartDate,
      TransactionDate: row.TransactionDate,
      TotalAmount: row.TotalAmount,
      TransactionId: row.TransactionId,
      Payment_Status: row.Payment_Status,
      Payment_Mode: row.Payment_mode,
      totalAmountPaid: row.totalAmountPaid,
      remainingAmount: row.remainingAmount,
    }));

    // Define the file name for the downloaded CSV file
    const fileName = 'payment_report';
    // Export the data as CSV using export-from-json
    exportFromJSON({ data: dataToDownload, fileName, exportType: 'csv' });
  };

  return (
    <Box m="1.5rem 2.5rem">
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Header title="Booking Details" subtitle="List of Booking Details" />
        <Box display="flex" alignItems="center" flexWrap="nowrap">
          <Box mr={2} width={300}>
            <DownloadButton data={rows} />
          </Box>
          <Button
            mr={2}
            variant="contained"
            color="primary"
            onClick={handleDownload}
            width={300}
          >
            Payment Report
          </Button>
        </Box>
      </Box>

      {/*Conditionally render the form*/}
      {isFormOpen && selectedRow && (
        <Dialog open={isFormOpen} onClose={() => setIsFormOpen(false)}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            px={2}
            py={1}
            sx={{
              whiteSpace: 'nowrap', // Prevent text wrapping
              width: '100%', // Adjust width as needed
              overflowX: 'hidden',
            }}
          >
            <Box fontWeight="h2" fontSize={24}>
              Update Booking Details
            </Box>
            <IconButton onClick={() => setIsFormOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          <DialogContent>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdateSubmit(selectedRow);
              }}
            >
              <Grid container spacing={2}>
                {/* First column */}
                <Grid item xs={12} md={6}>
                  {/* Customer Name and Phone Number */}
                  <TextField
                    label="Customer Name"
                    value={selectedRow.user_name || ''}
                    disabled
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Customer Number"
                    value={selectedRow.user_phone_number || ''}
                    disabled
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Provider Name"
                    value={selectedRow.provider_name || ''}
                    fullWidth
                    margin="normal"
                    onChange={(e) =>
                      setSelectedRow({
                        ...selectedRow,
                        provider_name: e.target.value,
                      })
                    }
                  />
                  <TextField
                    label="Provider Number"
                    value={selectedRow.provider_phone_number || ''}
                    fullWidth
                    margin="normal"
                    onChange={(e) =>
                      setSelectedRow({
                        ...selectedRow,
                        provider_phone_number: e.target.value,
                      })
                    }
                  />
                  <TextField
                    label="Transaction Date"
                    type="date"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={selectedRow.TransactionDate || ''}
                    fullWidth
                    margin="normal"
                    onChange={(e) =>
                      setSelectedRow({
                        ...selectedRow,
                        TransactionDate: e.target.value,
                      })
                    }
                  />
                </Grid>

                {/* Second column */}
                <Grid item xs={12} md={6}>
                  {/* Additional input fields */}
                  <TextField
                    label="Status"
                    name="status"
                    value={selectedRow.status || ''}
                    fullWidth
                    margin="normal"
                    onChange={(e) =>
                      setSelectedRow({ ...selectedRow, status: e.target.value })
                    }
                  />
                  <TextField
                    label="Transaction ID"
                    name="transactionId"
                    value={selectedRow.TransactionId || ''}
                    fullWidth
                    margin="normal"
                    onChange={(e) =>
                      setSelectedRow({
                        ...selectedRow,
                        TransactionId: e.target.value,
                      })
                    }
                  />
                  <TextField
                    label="Transaction Amount"
                    name="transactionAmount"
                    value={selectedRow.TransactionAmount || ''}
                    fullWidth
                    margin="normal"
                    onChange={(e) =>
                      setSelectedRow({
                        ...selectedRow,
                        TransactionAmount: e.target.value,
                      })
                    }
                  />
                  <TextField
                    select
                    label="Amount Paid"
                    name="amountPaid"
                    value={selectedRow.Payment_Status || ''}
                    fullWidth
                    margin="normal"
                    onChange={(e) =>
                      setSelectedRow({
                        ...selectedRow,
                        Payment_Status: e.target.value,
                      })
                    }
                  >
                    <MenuItem value="Paid">Yes</MenuItem>
                    <MenuItem value="Not paid">No</MenuItem>
                  </TextField>
                </Grid>
              </Grid>

              {/* Update button */}
              <Box display="flex" justifyContent="center" mt={3}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isLoading}
                  onClick={(e) => {
                    e.preventDefault();
                    handleUpdateSubmit(selectedRow);
                  }}
                >
                  {isLoading ? 'Updating...' : 'Update'}
                </Button>
              </Box>
            </form>
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
        <Box mb={2} gap={20}>
          <Typography variant="h5" gutterBottom color="#FFAB40">
            Today's Bookings: {totalCurrentDayBookings}
          </Typography>
          <Typography variant="h5" gutterBottom color="#FFAB40">
            Last Day's Bookings: {totalLastDayBookings}
          </Typography>
        </Box>
        <DataGrid
          loading={!rows.length}
          getRowId={getRowId}
          rows={rows}
          columns={columns}
        />
      </Box>
      <ToastContainer />
    </Box>
  );
};

export default Bookings;
