import React, { useEffect, useState } from 'react';
import { Box, Button, Dialog, DialogContent, TextField, useTheme, } from '@mui/material';
import Header from 'components/Header';
import { DataGrid } from '@mui/x-data-grid';

const RecentBookings = () => {
    const theme = useTheme();
    const [rows, setRows] = useState([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
  
    const columns = [
      {
        field: 'id',
        headerName: 'ID',
        flex: 0.4,
      },
      {
        field: 'user_name',
        headerName: 'Customer Name',
        flex: 0.8,
      },
      {
        field: 'user_phone_number',
        headerName: 'Customer PhoneNumber',
        flex: 0.8,
      },
      // {
      //   field: 'user_address',
      //   headerName: 'User Address',
      //   flex: 1,
      // },
      {
        field: 'Region',
        headerName: 'Area Name',
        flex: 1,
      },
      {
        field: 'apartment',
        headerName: 'Apartment Name',
        flex: 1,
      },
      {
        field: 'service_type',
        headerName: 'Service Type',
        flex: 0.5,
      },
      {
        field: 'start_time',
        headerName: 'Timings',
        flex: 0.5,
      },
      // {
      //   field: 'BookingType',
      //   headerName: 'BookingType',
      //   flex: 0.8,
      // },
      // {
      //   field: 'apartment',
      //   headerName: 'Apartment Name',
      //   flex: 1,
      // },
      // {
      //   field: 'Region',
      //   headerName: 'Area Name',
      //   flex: 1,
      // },
      {
        field: 'StartDate',
        headerName: 'BookingDate',
        flex: 0.8,
      },
      // {
      //   field: 'ServiceStatus',
      //   headerName: 'ServiceStatus',
      //   flex: 0.8,
      // },
      // {
      //   field: 'TransactionAmount',
      //   headerName: 'TransactionAmount',
      //   flex: 0.8,
      // },
      // {
      //   field: 'TransactionId',
      //   headerName: 'TransactionId',
      //   flex: 0.8,
      // },
      // {
      //   field: 'TransactionDate',
      //   headerName: 'TransactionDate',
      //   flex: 1,
      // },
  
      // {
      //   field: 'Comments',
      //   headerName: 'Comments',
      //   flex: 1.2,
      // },
      // {
      //   field: 'NonFulfillmentReason',
      //   headerName: 'NonFulfillmentReason',
      //   flex: 1.2,
      // },
      // {
      //   field: 'OperationalStatus',
      //   headerName: 'OperationalStatus',
      //   flex: 0.8,
      // },
      // {
      //   field: 'child_number',
      //   headerName: 'child_number',
      //   flex: 0.6,
      // },
      // {
      //   field: 'complete_address',
      //   headerName: 'complete_address',
      //   flex: 0.6,
      // },
      // {
      //   field: 'created_at',
      //   headerName: 'created_at',
      //   flex: 0.6,
      // },
      // {
      //   field: 'customer_status',
      //   headerName: 'customer_status',
      //   flex: 0.6,
      // },
      // {
      //   field: 'food_preferences',
      //   headerName: 'food_preferences',
      //   flex: 0.6,
      // },
      // {
      //   field: 'house_size',
      //   headerName: 'house_size',
      //   flex: 0.6,
      // },
      // {
      //   field: 'new_mobilenumber',
      //   headerName: 'new_mobilenumber',
      //   flex: 0.6,
      // },
      {
        field: 'provider_name',
        headerName: 'Provider Name',
        flex: 0.6,
      },
      {
        field: 'provider_phone_number',
        headerName: 'Provider Phone Number',
        flex: 0.6,
      },
      // {
      //   field: 'special_requirements',
      //   headerName: 'special_requirements',
      //   flex: 0.6,
      // },
      // {
      //   field: 'status',
      //   headerName: 'status',
      //   flex: 0.6,
      // },
      // {
      //   field: 'user_email',
      //   headerName: 'user_email',
      //   flex: 1,
      // },
      {
        field: 'AdditionalRequirements',
        headerName: 'AdditionalRequirements',
        flex: 0.6,
      },
    ];

    const fetchData = async () => {
        try {
          console.log("entered");
          const response = await fetch('https://backendapiyellowsense.azurewebsites.net/bookings');
      
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
      
          const result = await response.json();
          const recentBookings = result.slice(0, 10);
          setRows(recentBookings);// Update rows state with maid_details array
          console.log("api call", result);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      useEffect(() => {
        fetchData();
      }, []);
    
      const getRowId = (row) => row.id;
  return (
    <Box m="1.5rem 2.5rem">
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
            loading={!rows.length}
            getRowId={getRowId}
            rows={rows}
            columns={columns}
          />
        </Box>
    </Box>
  )
}

export default RecentBookings